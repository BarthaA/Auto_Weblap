import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../assets/styles/login.css";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        axios
            .post("http://localhost:3005/login", { username, password })
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                navigate("/autolista");
            })
            .catch(() => alert("Helytelen adatok"));
    };
    return (
        <>
            <Navbar />
            <Container className="mt-5" id="wrapper">
                <h1>Admin Login</h1>
                <Form>
                    <Form.Group className="inputDiv">
                        <Form.Control
                            type="text"
                            className="input"
                            placeholder="Felhasználónév"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="inputDiv">
                        <Form.Control
                            type="password"
                            className="input"
                            placeholder="Jelszó"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <a href="https://media.tenor.com/u6002ayqdi4AAAAM/good-morning.gif">Elfelejtetted a jelszavad?</a>
                    <label htmlFor="submit" className="submit-button">Bejelentkezés</label>
                    <Button className="mt-3 submit-button" id="submit" onClick={handleLogin} hidden/>
                </Form>
            </Container>
            <Footer/>
        </>
    );
};

export default AdminLogin;
