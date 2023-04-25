const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_REVIEW_PROPERTIES = ["score", "content"];

// VALIDATIONS
async function reviewExists(req, res, next) {
  const reviewId = Number(req.params.reviewId);
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

function hasPropertyToUpdate(req, res, next) {
  const { score, content } = req.body.data;
  if (score || content) {
    return next();
  }
  next({ status: 400, message: `Must include a score or content` });
}

// OPERATIONS
async function list(req, res) {
  const movieId = Number(req.params.movieId);
  const data = await service.list(movieId);
  res.json({ data });
}

async function update(req, res) {
  const { content, score } = req.body.data;
  const newReview = { ...res.locals.review, content, score };
  const data = await service.update(newReview);
  res.json({ data });
}

async function destroy(req, res) {
  const { reviewId } = req.params;
  await service.destroy(reviewId);
  res.sendStatus(204);
}

module.exports = {
  list: asyncErrorBoundary(list),
  update: [
    asyncErrorBoundary(reviewExists),
    hasPropertyToUpdate,
    asyncErrorBoundary(update),
  ],
  destroy: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
