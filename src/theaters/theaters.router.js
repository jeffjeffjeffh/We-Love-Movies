const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// ROUTES
router.route("/").get(controller.list).all(methodNotAllowed);

// EXPORT ROUTER
module.exports = router;
