const knex = require("../db/connection");

function list() {
  return knex("movies").select(
    "movie_id",
    "title",
    "runtime_in_minutes",
    "rating",
    "description",
    "image_url"
  );
}

function listShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select(
      "m.movie_id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url"
    )
    .distinct("m.title")
    .where({ "mt.is_showing": true })
    .orderBy("m.movie_id");
}

function read(movieId) {
  return knex("movies")
    .select(
      "movie_id",
      "title",
      "runtime_in_minutes",
      "rating",
      "description",
      "image_url",
      "created_at",
      "updated_at"
    )
    .where({ movie_id: movieId })
    .first();
}

module.exports = { list, listShowing, read };
