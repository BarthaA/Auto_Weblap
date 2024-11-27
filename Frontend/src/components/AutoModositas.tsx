import { useState, useEffect } from "react";
import "../assets/styles/style.css";
import "../assets/styles/autoFelvetel.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { Modal, Form, Button } from "react-bootstrap";

interface Car {
    id: number;
    brand: string;
    model: string;
    fuel: string;
    power: number;
    price: number;
}

const AutoModositas = () => {
    const [currentCar, setCurrentCar] = useState<Car | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const fetchCar = (id: number) => {
        axios
            .get(`http://localhost:3005/cars/${id}`)
            .then((res) => {
                setCurrentCar(res.data);
                setIsEditMode(true);
                setShowModal(true);
            })
            .catch((err) => console.error("Car fetch error:", err));
    };

    const handleSave = () => {
        if (currentCar) {
            axios
                .put(`http://localhost:3005/cars/${currentCar.id}`, currentCar)
                .then(() => {
                    setShowModal(false);
                    alert("Car updated successfully!");
                })
                .catch((err) => console.error("Save error:", err));
        }
    };

    const handleAdd = () => {
        if (currentCar) {
            axios
                .post("http://localhost:3005/cars", currentCar)
                .then(() => {
                    setShowModal(false);
                    alert("Car added successfully!");
                })
                .catch((err) => {
                    console.error("Add error:", err);
                    alert("An error occurred while adding the car.");
                });
        }
    };

    useEffect(() => {
        if (currentCar?.id && currentCar.id > 0) {
            fetchCar(currentCar.id);
        } else {
            setCurrentCar({
                id: 0,
                brand: "",
                model: "",
                fuel: "",
                power: 0,
                price: 0,
            });
            setIsEditMode(false);
            setShowModal(true);
        }
    }, [currentCar?.id]);

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {isEditMode ? "Edit Car" : "Add New Car"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Márka"
                                    value={currentCar?.brand || ""}
                                    onChange={(e) =>
                                        setCurrentCar({
                                            ...currentCar!,
                                            brand: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Modell"
                                    value={currentCar?.model || ""}
                                    onChange={(e) =>
                                        setCurrentCar({
                                            ...currentCar!,
                                            model: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Üzemanyag"
                                    value={currentCar?.fuel || ""}
                                    onChange={(e) =>
                                        setCurrentCar({
                                            ...currentCar!,
                                            fuel: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    type="number"
                                    placeholder="Teljesítmény (HP)"
                                    value={currentCar?.power || ""}
                                    onChange={(e) =>
                                        setCurrentCar({
                                            ...currentCar!,
                                            power: parseInt(e.target.value),
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    type="number"
                                    placeholder="Ár (Ft.)"
                                    value={currentCar?.price || ""}
                                    onChange={(e) =>
                                        setCurrentCar({
                                            ...currentCar!,
                                            price: parseFloat(e.target.value),
                                        })
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={isEditMode ? handleSave : handleAdd}
                        >
                            {isEditMode ? "Save Changes" : "Add Car"}
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Button
                    variant="success"
                    onClick={() => {
                        setCurrentCar({
                            id: 0,
                            brand: "",
                            model: "",
                            fuel: "",
                            power: 0,
                            price: 0,
                        });
                        setIsEditMode(false);
                        setShowModal(true);
                    }}
                >
                    Add New Car
                </Button>
            </div>

            <Footer />
        </>
    );
};

export default AutoModositas;
