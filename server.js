const express = require('express');
const dbServices = require("./services/dbServices.js");

const app = express();

// This is the crucial part we are testing
app.use((req, res, next) => {
    console.log("Checking dbServices..."); // Add this log
    console.log("Type of dbServices:", typeof dbServices); // And this log
    req.dbServices = dbServices;
    next();
});

app.get('/', (req, res) => {
    res.send('This is a test!'); // Simple response
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;