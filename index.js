const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { PORT, BASE_URL } = process.env;
// const PORT = process.env.PORT || 5050;

const carsRoutes = require('./routes/cars-routes');

// middleware
app.use(express.json());
app.use(cors());

// Home route
app.get("/", (req, res) => {
    res.json({ message: "Home Route" });
});

// all cars routes
app.use("/cars", carsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}${PORT}`);
});