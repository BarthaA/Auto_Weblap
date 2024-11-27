import React from "react";
import Footer from "./Footer";
import "../assets/styles/style.css";
import "../assets/styles/autoFelvetel.css";
import Navbar from "./Navbar";

const AutoFelvetel = () => {
    const [success, setSuccess] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [brand, setBrand] = React.useState("");
    const [model, setModel] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [fuel, setFuel] = React.useState("");
    const [power, setPower] = React.useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError(null);

        const newCar = {
            brand: brand,
            model: model,
            fuel: fuel,
            power: Number(power),
            price: Number(price),
        };

        try {
            const response = await fetch("http://localhost:3005/cars", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCar),
            });
            if (!response.ok) {
                throw new Error("Szerverhiba: " + response.status);
            }
            setSuccess(true);
            setBrand("");
            setModel("");
            setFuel("");
            setPower("");
            setPrice("");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ismeretlen hiba történt");
            }
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (success) {
            alert("Sikeres felvétel");
        }
        if (error) {
            alert(`Hiba történt: ${error}`);
        }
    }, [success, error]);

    return (
        <>
            <Navbar />
            {loading && <p className="loadingText">Betöltés...</p>}
            <div className="wrapper">
                <h1>Autó felvétel</h1>
                <div className="input-wrapper">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={brand}
                            id="brandInput"
                            name="brand"
                            placeholder="Márka"
                            onChange={(e) => setBrand(e.target.value)}
                            required
                        />
                        <br />
                        <input
                            type="text"
                            value={model}
                            id="modelInput"
                            name="model"
                            placeholder="Modell"
                            onChange={(e) => setModel(e.target.value)}
                            required
                        />
                        <br />
                        <input
                            type="text"
                            value={fuel}
                            id="fuelInput"
                            name="fuel"
                            placeholder="Üzemanyag"
                            onChange={(e) => setFuel(e.target.value)}
                            required
                        />
                        <br />
                        <input
                            type="number"
                            value={power}
                            id="powerInput"
                            name="power"
                            placeholder="Teljesítmény"
                            onChange={(e) => setPower(e.target.value)}
                            required
                        />
                        <br />
                        <input
                            type="number"
                            value={price}
                            id="priceInput"
                            name="price"
                            placeholder="Ár"
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                        <br />
                        <label htmlFor="felvetel" id="submitLabel">
                            Felvétel
                        </label>
                        <button id="felvetel" type="submit" />
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AutoFelvetel;
