const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

// Should embed the movies in each theater in list()
const addMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  rating: ["movies", null, "rating"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  m_created_at: ["movies", null, "created_at"],
  m_updated_at: ["movies", null, "updated_at"],
  is_showing: ["movies", null, "is_showing"],
  mt_theater_id: ["movies", null, "theater_id"],
});

function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("t.*", "m.*", "mt.theater_id")
    .then(addMovies);
}

function listTheaters(movieId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing", "m.movie_id")
    .where({ "m.movie_id": movieId });
}

module.exports = { list, listTheaters };
