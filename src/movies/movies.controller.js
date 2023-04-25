const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// VALIDATION
async function movieHasMatchingId(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  } else {
    next({
      status: 404,
      message: `Movie cannot be found.`,
    });
  }
}

// OPERATIONS
async function list(req, res) {
  const { is_showing } = req.query;
  let data = {};
  if (is_showing) {
    data = await service.listShowing();
  } else {
    data = await service.list();
  }
  res.json({ data });
}

async function read(req, res) {
  res.json({ data: res.locals.movie });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieHasMatchingId), asyncErrorBoundary(read)],
  movieHasMatchingId,
};
