import { useEffect, useState } from "react";
import "../assets/styles/style.css";
import "../assets/styles/autoLista.css";
import { FaSearch } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Footer from "./Footer";
import Navbar from "./Navbar";

const AutoLista = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [allCars, setAllCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortConfig, setSortConfig] = useState<{
        key: keyof Car;
        direction: "asc" | "desc";
    } | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCars, setFilteredCars] = useState<Car[]>([]);

    interface Car {
        id: number;
        brand: string;
        model: string;
        fuel: string;
        power: number;
        price: number;
    }

    const fetchCars = (page: number) => {
        setLoading(true);
        setError(null);
        fetch(`http://localhost:3005/cars?page=${page}&limit=15`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Server responded with status ${response.status}`
                    );
                }
                return response.json();
            })
            .then((data) => {
                setCars(data.data);
                setAllCars(data.data);
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);
                setLoading(false);
                setFilteredCars(data.data);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCars(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            const startIndex = (page - 1) * 15;
            const endIndex = startIndex + 15;
            setFilteredCars(allCars.slice(startIndex, endIndex));
        }
    };

    const handleDelete = async (id: number) => {
        const answer = confirm("Biztosan akarod törölni?");
        if (answer) {
            try {
                const response = await fetch(
                    `http://localhost:3005/cars/${id}`,
                    {
                        method: "DELETE",
                    }
                );
                if (!response.ok) {
                    throw new Error("Szerverhiba: " + response.status);
                }
                const newCars = cars.filter((car) => car.id !== id);
                setCars(newCars);
                setSuccess(true);
                fetchCars(currentPage);
                setTimeout(() => setSuccess(false), 1000);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ismeretlen hiba történt");
                }
            }
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = allCars.filter(
            (car) =>
                car.brand.toLowerCase().includes(term) ||
                car.model.toLowerCase().includes(term) ||
                car.fuel.toLowerCase().includes(term) ||
                car.power.toString().includes(term) ||
                car.price.toString().includes(term)
        );
        setFilteredCars(filtered);
    };

    const sortCars = (key: keyof Car, direction: "asc" | "desc") => {
        const sortedCars = [...allCars].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });
        setAllCars(sortedCars);
        const startIndex = (currentPage - 1) * 15;
        const endIndex = startIndex + 15;
        setFilteredCars(sortedCars.slice(startIndex, endIndex));
        setSortConfig({ key, direction });
    };

    return (
        <>
            <Navbar />
            {success && (
                <div className="successDiv">
                    <p className="success-message">Sikeres törlés</p>
                </div>
            )}
            {error && (
                <div className="errorDiv">
                    <p className="error-message">Hiba történt: {error}</p>
                </div>
            )}
            {loading ? (
                <p className="loadingText">Betöltés...</p>
            ) : (
                <div className="wrapper-box">
                    <h1>Autók listája</h1>
                    <div className="search">
                        <input
                            type="text"
                            id="searchInput"
                            placeholder="Keresés"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <FaSearch id="searchIcon" size={20} />
                    </div>
                    <div className="sort">
                        <FaArrowAltCircleUp
                            id="upArrow"
                            size={40}
                            onClick={() =>
                                sortCars(
                                    (
                                        document.getElementById(
                                            "sortSelect"
                                        ) as HTMLSelectElement
                                    ).value as keyof Car,
                                    "asc"
                                )
                            }
                        />
                        <select name="sortSelect" id="sortSelect">
                            <option value="brand">Márka</option>
                            <option value="model">Model</option>
                            <option value="fuel">Üzemanyag</option>
                            <option value="power">Teljesítmény</option>
                            <option value="price">Ár</option>
                        </select>
                        <FaArrowAltCircleDown
                            id="downArrow"
                            size={40}
                            onClick={() =>
                                sortCars(
                                    (
                                        document.getElementById(
                                            "sortSelect"
                                        ) as HTMLSelectElement
                                    ).value as keyof Car,
                                    "desc"
                                )
                            }
                        />
                    </div>
                    <div className="content">
                        <div className="card-wrapper">
                            {filteredCars.map((car) => (
                                <div key={car.id} className="card">
                                    <div className="card-content">
                                        <h2>{car.brand}</h2>
                                        <h3>{car.model}</h3>
                                        <p>
                                            Üzemanyag: <b>{car.fuel}</b>
                                        </p>
                                        <p>
                                            Teljesítmény: <b>{car.power} HP</b>
                                        </p>
                                        <p>
                                            Ár: <b>{car.price} Ft</b>.
                                        </p>
                                        <a href={`/automodositas/${car.id}`}>
                                            <button id="editButton">
                                                Módosítás
                                            </button>
                                        </a>
                                        <button
                                            id="deleteButton"
                                            onClick={() => handleDelete(car.id)}
                                        >
                                            Törlés
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pagination">
                            <FaArrowAltCircleLeft
                                size={40}
                                id="leftArrow"
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                style={{
                                    cursor:
                                        currentPage > 1
                                            ? "pointer"
                                            : "not-allowed",
                                }}
                            />
                            <p>{currentPage}. oldal</p>
                            <FaArrowAltCircleRight
                                size={40}
                                id="rightArrow"
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                style={{
                                    cursor:
                                        currentPage < totalPages
                                            ? "pointer"
                                            : "not-allowed",
                                }}
                            />
                        </div>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Márka</th>
                                        <th>Model</th>
                                        <th>Üzemanyag</th>
                                        <th>Teljesítmény</th>
                                        <th>Ár</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCars.map((car) => (
                                        <tr key={car.id}>
                                            <td>{car.id}</td>
                                            <td>{car.brand}</td>
                                            <td>{car.model}</td>
                                            <td>{car.fuel}</td>
                                            <td>{car.power} HP</td>
                                            <td>{car.price} Ft</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};

export default AutoLista;
