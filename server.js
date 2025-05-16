const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');      // Add this back
const methodOverride = require('method-override'); // And this

const dbServices = require("./services/dbServices.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);
app.use(flash());
app.use(methodOverride('_method'));

app.use((req, res, next) => {
    console.log("Checking dbServices...");
    console.log("Type of dbServices:", typeof dbServices);
    req.dbServices = dbServices;
    next();
});

app.get('/', (req, res) => {
    res.send('This is a test!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;