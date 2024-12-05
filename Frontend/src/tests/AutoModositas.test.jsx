import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AutoModiTest from "../components/AutoModiTest";
import axios from "axios";

jest.mock("axios");

describe("AutoModiTest Component", () => {
    const mockCar = {
        id: 1,
        brand: "Toyota",
        model: "Corolla",
        fuel: "Petrol",
        power: 100,
        price: 3000000,
    };

    it("renders loading state initially", () => {
        render(
            <BrowserRouter>
                <AutoModiTest />
            </BrowserRouter>
        );
        expect(screen.getByText(/Loading car data.../i)).toBeInTheDocument();
    });

    it("fetches and displays car data", async () => {
        axios.get.mockResolvedValueOnce({ data: mockCar });

        render(
            <BrowserRouter>
                <AutoModiTest />
            </BrowserRouter>
        );

        await waitFor(() => expect(screen.getByDisplayValue(/Toyota/i)).toBeInTheDocument());
        expect(screen.getByDisplayValue(/Corolla/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue(/Petrol/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue(/100/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue(/3000000/i)).toBeInTheDocument();
    });

    it("handles fetch error", async () => {
        axios.get.mockRejectedValueOnce(new Error("Error fetching car data"));

        render(
            <BrowserRouter>
                <AutoModiTest />
            </BrowserRouter>
        );

        await waitFor(() => expect(screen.getByText(/Error: Car not found!/i)).toBeInTheDocument());
    });

    it("updates input fields on change", async () => {
        axios.get.mockResolvedValueOnce({ data: mockCar });

        render(
            <BrowserRouter>
                <AutoModiTest />
            </BrowserRouter>
        );

        await waitFor(() => expect(screen.getByDisplayValue(/Toyota/i)).toBeInTheDocument());

        const brandInput = screen.getByPlaceholderText(/Márka/i);
        fireEvent.change(brandInput, { target: { value: "Honda" } });

        expect(screen.getByDisplayValue(/Honda/i)).toBeInTheDocument();
    });

    it("submits the form and navigates on success", async () => {
        axios.get.mockResolvedValueOnce({ data: mockCar });
        axios.put.mockResolvedValueOnce({});

        const mockNavigate = jest.fn();
        jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(mockNavigate);

        render(
            <BrowserRouter>
                <AutoModiTest />
            </BrowserRouter>
        );

        await waitFor(() => expect(screen.getByDisplayValue(/Toyota/i)).toBeInTheDocument());

        const form = screen.getByRole("form");
        fireEvent.submit(form);

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/autolista"));
    });

    it("handles submission error", async () => {
        axios.get.mockResolvedValueOnce({ data: mockCar });
        axios.put.mockRejectedValueOnce(new Error("Error updating car"));

        render(
            <BrowserRouter>
                <AutoModiTest />
            </BrowserRouter>
        );

        await waitFor(() => expect(screen.getByDisplayValue(/Toyota/i)).toBeInTheDocument());

        const form = screen.getByRole("form");
        fireEvent.submit(form);

        await waitFor(() => expect(screen.getByText(/Error updating car/i)).toBeInTheDocument());
    });
});
