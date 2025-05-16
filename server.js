const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');
const participantDetailsRoutes = require("./routes/participantDetailsRoutes.js");
//const informationRoutes = require("./routes/informationRoutes.js");
//const scalesRoutes = require("./routes/scalesRoutes.js");
//const trialRoutes = require("./routes/trialRoutes.js");
const dbServices = require("./services/dbServices.js");

const app = express();

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use("/public", express.static(path.join(__dirname, "/public")));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.use(methodOverride('_method'));

app.use((req, res, next) => {
    console.log("Checking dbServices...");
    console.log("Type of dbServices:", typeof dbServices);
    req.dbServices = dbServices;
    next();
});

app.use('/participant', participantDetailsRoutes);
app.use('/information', informationRoutes);
app.use('/scales', scalesRoutes);
app.use('/trial', trialRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;