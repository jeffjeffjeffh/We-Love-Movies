if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const reviewsRouter = require("./reviews/reviews.router");
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");

const notFound = require("./errors/notFound");
const methodNotAllowed = require("./errors/methodNotAllowed");

app.use(express.json());
app.use(cors());

app.use("/reviews", reviewsRouter);
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);

app.use(notFound);
app.use(methodNotAllowed);

app.use((err, req, res, next) => {
  console.error(err);
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).json({
    error: err,
  });
});

module.exports = app;
