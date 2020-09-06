const express = require("express");
const cors = require("cors");
const expressFileupload = require("express-fileupload");
const connectDB = require("./database/connection");
const homeRoutes = require("./API/routes/homeRoutes");
const userRoutes = require("./API/routes/userRoutes");

const app = express();

// connection database
connectDB();

// middlewares
app.use(express.json());
app.use(expressFileupload());
app.use(express.static("images")); // for the images to load in client
app.use(cors());

// routes
app.use("/home", homeRoutes);
app.use("/user", userRoutes);

//
app.use(function (req, res) {
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

module.exports = app;