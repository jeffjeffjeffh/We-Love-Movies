const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// VALIDATIONS
async function movieHasMatchingId(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  console.log(movieId);

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
  const data = await service.list(is_showing);
  res.json({ data });
}

async function listTheaters(req, res) {
  const { movieId } = req.params;
  const data = await service.listTheaters(movieId);
  res.json({ data });
}

async function listReviews(req, res) {
  const { movieId } = req.params;
  const data = await service.listReviews(movieId);
  res.json({ data });
}

async function read(req, res) {
  res.json({ data: res.locals.movie });
}

module.exports = {
  list: asyncErrorBoundary(list),
  listTheaters: [
    asyncErrorBoundary(movieHasMatchingId),
    asyncErrorBoundary(listTheaters),
  ],
  listReviews: [
    asyncErrorBoundary(movieHasMatchingId),
    asyncErrorBoundary(listReviews),
  ],
  read: [asyncErrorBoundary(movieHasMatchingId), asyncErrorBoundary(read)],
};
