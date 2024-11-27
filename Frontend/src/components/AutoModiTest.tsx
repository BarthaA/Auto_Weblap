import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

interface Car {
    id: number;
    brand: string;
    model: string;
    fuel: string;
    power: number;
    price: number;
}

const AutoModiTest = () => {
    const { id } = useParams<{ id: string }>();
    const [currentCar, setCurrentCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:3005/cars/${id}`)
            .then((response) => {
                setCurrentCar(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching car data:", error);
                setLoading(false);
            });
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currentCar) {
            const { name, value } = e.target;
            setCurrentCar({
                ...currentCar,
                [name]:
                    name === "power" || name === "price"
                        ? parseInt(value)
                        : value,
            });
        }
    };

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentCar) {
            axios
                .put(`http://localhost:3005/cars/${currentCar.id}`, currentCar)
                .then(() => {
                    alert("Car updated successfully!");
                })
                .catch((err) => {
                    console.error("Error updating car:", err);
                });
        }
    };

    if (loading) {
        return <p>Loading car data...</p>;
    }

    if (!currentCar) {
        return <p>Error: Car not found!</p>;
    }

    return (
        <>
            <Navbar />
            <div className="wrapper">
                <h1>Autó Módosítás</h1>
                <div className="input-wrapper">
                    <form onSubmit={handleEdit}>
                        <input
                            type="text"
                            value={currentCar.brand}
                            id="brandInput"
                            name="brand"
                            placeholder="Márka"
                            onChange={handleInputChange}
                            required
                        />
                        <br />
                        <input
                            type="text"
                            value={currentCar.model}
                            id="modelInput"
                            name="model"
                            placeholder="Modell"
                            onChange={handleInputChange}
                            required
                        />
                        <br />
                        <input
                            type="text"
                            value={currentCar.fuel}
                            id="fuelInput"
                            name="fuel"
                            placeholder="Üzemanyag"
                            onChange={handleInputChange}
                            required
                        />
                        <br />
                        <input
                            type="number"
                            value={currentCar.power}
                            id="powerInput"
                            name="power"
                            placeholder="Teljesítmény (HP)"
                            onChange={handleInputChange}
                            required
                        />
                        <br />
                        <input
                            type="number"
                            value={currentCar.price}
                            id="priceInput"
                            name="price"
                            placeholder="Ár (HUF)"
                            onChange={handleInputChange}
                            required
                        />
                        <br />
                        <label htmlFor="modosit">Módosítás</label>
                        <button
                            id="modosit"
                            type="submit"
                            name="modosit"
                            hidden
                        ></button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AutoModiTest;
