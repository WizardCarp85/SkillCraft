require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3002;
const connectDB = require('./config/db');

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);

connectDB()

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});