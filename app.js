if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const app = express();
// const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/nuture-labs';
const dbUrl = 'mongodb://localhost:27017/nuture-labs';

mongoose.connect(dbUrl, {                                
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(express.urlencoded({ extended: true }));
app.use('/admin', adminRoutes)
app.use('/user', userRoutes)



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
});