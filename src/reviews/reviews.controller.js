const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_REVIEW_PROPERTIES = ["score", "content"];

// VALIDATIONS
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const data = await service.read(reviewId);
  if (data) {
    res.locals.review = data;
    return next();
  } else {
    next({
      status: 404,
      message: "Review cannot be found.",
    });
  }
}

function hasProperty(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `Must include a ${propertyName}` });
  };
}

// OPERATIONS
async function destroy(req, res) {
  const { reviewId } = req.params;
  await service.destroy(reviewId);
  res.sendStatus(204);
}

async function update(req, res) {
  const { content, score } = req.body.data;
  const newReview = { ...res.locals.review, content, score };
  const data = await service.update(newReview);
  res.json({ data });
}

module.exports = {
  destroy: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(hasProperty("content")),
    asyncErrorBoundary(hasProperty("score")),
    asyncErrorBoundary(update),
  ],
};
