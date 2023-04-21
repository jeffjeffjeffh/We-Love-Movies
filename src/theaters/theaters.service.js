const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

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

// TODO: Having trouble embedding the movie's created_at and updated_at properties.
//  It looks like knex is only giving us the created_at and updated_at for each theater.
//    Same thing goes for theater_id; it looks like a property name can only be used once,
//    even if it is to be embedded in an object with reduceProperties.
function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("t.*", "m.*", "mt.theater_id")
    .then(addMovies);
}

module.exports = { list };
