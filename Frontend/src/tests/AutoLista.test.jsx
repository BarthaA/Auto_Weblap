import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AutoLista from "../components/AutoLista";

beforeEach(() => {
    global.fetch = jest.fn();
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe("AutoLista Component", () => {
    it("renders loading state initially", () => {
        render(<AutoLista />);
        expect(screen.getByText(/Betöltés.../i)).toBeInTheDocument();
    });

    it("fetches and displays cars", async () => {
        const mockCars = {
            data: [
                {
                    id: 1,
                    brand: "Toyota",
                    model: "Corolla",
                    fuel: "Petrol",
                    power: 100,
                    price: 3000000,
                },
            ],
            currentPage: 1,
            totalPages: 1,
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockCars,
        });

        render(<AutoLista />);

        await waitFor(() => expect(screen.queryByText(/Betöltés.../i)).toBeNull());

        expect(screen.getByText(/Toyota/i)).toBeInTheDocument();
        expect(screen.getByText(/Corolla/i)).toBeInTheDocument();
        expect(screen.getByText(/3000000 Ft/i)).toBeInTheDocument();
    });

    it("handles fetch error", async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
        });

        render(<AutoLista />);

        await waitFor(() =>
            expect(screen.getByText(/Hiba történt/i)).toBeInTheDocument()
        );
    });

    it("filters cars based on search input", async () => {
        const mockCars = {
            data: [
                {
                    id: 1,
                    brand: "Toyota",
                    model: "Corolla",
                    fuel: "Petrol",
                    power: 100,
                    price: 3000000,
                },
                {
                    id: 2,
                    brand: "Honda",
                    model: "Civic",
                    fuel: "Diesel",
                    power: 120,
                    price: 4000000,
                },
            ],
            currentPage: 1,
            totalPages: 1,
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockCars,
        });

        render(<AutoLista />);

        await waitFor(() => expect(screen.getByText(/Toyota/i)).toBeInTheDocument());

        const searchInput = screen.getByPlaceholderText(/Keresés/i);
        fireEvent.change(searchInput, { target: { value: "Honda" } });

        expect(screen.getByText(/Honda/i)).toBeInTheDocument();
        expect(screen.queryByText(/Toyota/i)).toBeNull();
    });

    it("deletes a car and displays success message", async () => {
        const mockCars = {
            data: [
                {
                    id: 1,
                    brand: "Toyota",
                    model: "Corolla",
                    fuel: "Petrol",
                    power: 100,
                    price: 3000000,
                },
            ],
            currentPage: 1,
            totalPages: 1,
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockCars,
        });

        render(<AutoLista />);

        await waitFor(() => expect(screen.getByText(/Toyota/i)).toBeInTheDocument());

        fetch.mockResolvedValueOnce({
            ok: true,
        });

        const deleteButton = screen.getByText(/Törlés/i);
        fireEvent.click(deleteButton);

        await waitFor(() =>
            expect(screen.getByText(/Sikeres törlés/i)).toBeInTheDocument()
        );
    });
});
