const knex = require("../db/connection");

function list(is_showing) {
  // TODO: This test fails on local machine, but the feature works just fine for me.
  // What happen?
  // Test on Qualified and see if it works there.
  if (is_showing) {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select("m.*")
      .distinct("m.title")
      .where({ "mt.is_showing": is_showing })
      .orderBy("m.movie_id");
  } else {
    return knex("movies").select("*");
  }
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

module.exports = { list, read };
