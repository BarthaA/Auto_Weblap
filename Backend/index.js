import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'autodb',
    port: 8171
}).promise();

app.get('/cars', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try {
        const countResult = await db.query('SELECT COUNT(*) as total FROM autok');
        const total = countResult[0][0].total;
        const temp = await db.query('SELECT * FROM autok LIMIT ? OFFSET ?', [limit, offset]);
        const rows = temp[0];
        res.status(200).json({
            data: rows,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error(`Error retrieving cars: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/cars/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM autok WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Car not found" });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(`Error retrieving car: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post('/cars', async (req, res) => {
    try {
        const { Brand, Model, Fuel, Power, Price } = req.body;

        if (!Brand || Brand.length < 1) {
            return res.status(400).json({ error: "Car brand (Brand) must have at least 1 character" });
        }
        if (!Model || Model.length < 1) {
            return res.status(400).json({ error: "Car model (Model) must have at least 1 character" });
        }
        if (isNaN(Price) || Price <= 0) {
            return res.status(400).json({ error: "Car price (Price) must be a valid number greater than 0" });
        }
        if (isNaN(Fuel) || Fuel <= 0) {
            return res.status(400).json({ error: "Car fuel type (Fuel) must be a valid number greater than 0" });
        }
        if (isNaN(Power) || Power <= 0) {
            return res.status(400).json({ error: "Car power (Power) must be a valid number greater than 0" });
        }

        const [result] = await db.query(
            'INSERT INTO autok (brand, model, fuel, power, price) VALUES (?, ?, ?, ?, ?)',
            [Brand, Model, Fuel, Power, Price]
        );

        res.status(200).json({ message: 'Car successfully added!' });
    } catch (error) {
        console.error(`Error adding car: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete('/cars/:Id', async (req, res) => {
    try {
        let Id = parseInt(req.params.Id);
        const [rows, fields] = await db.query('DELETE FROM autok WHERE id =?', [Id]);
        if (rows.affectedRows === 0) {
            res.status(404).json({ error: "Car not found" });
        } else {
            res.status(200).json({ message: "Car successfully removed" });
        }
    } catch (error) {
        console.error(`Error deleting car: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "Admin" && password === "Admin") {
        res.json({ token: "valid-token" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

app.put("/cars/:id", async (req, res) => {
    const { id } = req.params;
    const { Brand, Model, Fuel, Power, Price } = req.body;

    try {
        const [currentCar] = await db.query("SELECT * FROM autok WHERE id = ?", [id]);
        if (!currentCar.length) {
            return res.status(404).json({ error: "Car not found" });
        }

        const updatedCar = {
            Brand: Brand ?? currentCar[0].Brand,
            Model: Model ?? currentCar[0].Model,
            Fuel: Fuel ?? currentCar[0].Fuel,
            Power: Power ?? currentCar[0].Power,
            Price: Price ?? currentCar[0].Price,
        };

        await db.query(
            `UPDATE autok SET Brand = ?, Model = ?, Fuel = ?, Power = ?, Price = ? WHERE id = ?`,
            [updatedCar.Brand, updatedCar.Model, updatedCar.Fuel, updatedCar.Power, updatedCar.Price, id]
        );

        res.json({ message: "Car updated successfully" });
    } catch (error) {
        console.error("Error updating car:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(3005, () => {
    console.log('Server is running on port 3005');
});
