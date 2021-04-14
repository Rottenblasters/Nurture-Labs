if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const app = express();

// Databse connection url
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/nuture-labs';

// Connect mongoose
mongoose.connect(dbUrl, {                                
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// Database error handler
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
    console.log("Database connected");
});

// Middleware
app.use(express.urlencoded({ extended: true }));

// Admin Route
app.use('/admin', adminRoutes);

// User Route
app.use('/user', userRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
});