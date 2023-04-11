// Import environtment variable
require("dotenv").config();

// Import
const mainRouter = require("./src/router/index"); // Import main router
const express = require("express"); // Import express library
const helmet = require("helmet"); // Import helmet
const cors = require("cors"); // Import cors
const morgan = require("morgan"); // Import morgan
const xss = require("xss-clean"); // Import xss
const app = express(); // Import express
const commonHelper = require("./src/helper/common");

// Use middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(xss());

// Port choice
const port = process.env.PORT || 4000;

// use Main Router
app.use("/", mainRouter);
app.all("*", (req, res, next) => {
    next(commonHelper.response(res, null, 404, "URL not Found"));
});

//Error code and message
app.use((err, req, res) => {
    if (err && err.message === "File too large"){
        return commonHelper.response(res, null, 413, "Image size too large (Max 2MB)")
    }
    // const messageError = err.message || "Internal server error";
    const statusCode = err.status || 500;
    res.status(statusCode).json(err)
})

// Listening port awaiting requests
app.listen(port, () => {
    console.log(`Server run on port: ${port}`);
});