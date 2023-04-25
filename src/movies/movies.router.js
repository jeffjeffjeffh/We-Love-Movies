const router = require("express").Router({ mergeParams: true });
const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");
const controller = require("./movies.controller.js");
const methodNotAllowed = require("../errors/methodNotAllowed");

// FOREIGN ROUTES
router.use("/:movieId/reviews", controller.movieHasMatchingId, reviewsRouter);
router.use("/:movieId/theaters", controller.movieHasMatchingId, theatersRouter);

// NATIVE ROUTES
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);

// EXPORT ROUTER
module.exports = router;
