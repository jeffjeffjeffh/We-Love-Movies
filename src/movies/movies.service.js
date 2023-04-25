const knex = require("../db/connection");

function list(is_showing) {
  // TODO: This test fails on local machine, but the feature works just fine for me.
  // What happen?
  // Test on Qualified and see if it works there.
  if (is_showing) {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select(
        "m.movie_id as id",
        "m.title",
        "m.runtime_in_minutes",
        "m.rating",
        "m.description",
        "m.image_url"
      )
      .distinct("m.title")
      .where({ "mt.is_showing": true })
      .orderBy("m.movie_id");
  } else {
    return knex("movies").select(
      "movie_id as id",
      "title",
      "runtime_in_minutes",
      "rating",
      "description",
      "image_url"
    );
  }
}

function listTheaters(movieId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing", "m.movie_id")
    .where({ "m.movie_id": movieId });
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

module.exports = { list, listTheaters, read };
