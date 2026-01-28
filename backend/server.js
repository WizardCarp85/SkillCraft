require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3002;
const connectDB = require('./config/db');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

connectDB()

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

