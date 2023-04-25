const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// ROUTES
router
  .route("/:reviewId")
  .delete(controller.destroy)
  .put(controller.update)
  .all(methodNotAllowed);

router.route("/").get(controller.list).all(methodNotAllowed);

// EXPORT ROUTER
module.exports = router;
