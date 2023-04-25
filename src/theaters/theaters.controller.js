const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const movieId = Number(req.params.movieId);
  let data = {};
  if (movieId) {
    data = await service.listTheaters(movieId);
  } else {
    data = await service.list();
  }
  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
};
