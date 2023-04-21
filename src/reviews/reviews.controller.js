const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function read(req, res, next) {
  const { movieId } = req.params;

  if (movieId) {
    const data = await service.read(movieId);
    res.json({ data });
  } else {
    return next();
  }
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(read), asyncErrorBoundary(list)],
};
