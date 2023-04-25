const router = require("express").Router({ mergeParams: true });
const reviewsRouter = require("../reviews/reviews.router");
const controller = require("./movies.controller.js");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.use("/:movieId/reviews", controller.movieHasMatchingId, reviewsRouter);

router
  .route("/:movieId/theaters")
  .get(controller.listTheaters)
  .all(methodNotAllowed);

router.route("/:movieId").get(controller.read).all(methodNotAllowed);

router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
