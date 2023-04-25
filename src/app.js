if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const notFound = require("./errors/notFound");
const methodNotAllowed = require("./errors/methodNotAllowed");
const errorHandler = require("./errors/errorHandler");

// ROUTERS
const reviewsRouter = require("./reviews/reviews.router");
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");

// CONFIGURATION
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/reviews", reviewsRouter);
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);

// ERROR HANDLING
app.use(notFound);
app.use(methodNotAllowed);
app.use(errorHandler);

// EXPORT EXPRESS APP
module.exports = app;
