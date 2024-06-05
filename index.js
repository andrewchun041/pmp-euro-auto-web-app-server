const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { PORT, BASE_URL } = process.env;



// middleware
app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
    res.json({ message: "Home Route" });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}${PORT}`);
});