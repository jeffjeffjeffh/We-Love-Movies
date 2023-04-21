const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const addCritic = reduceProperties("critic_id", {
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],
  created_at: ["critic", "created_at"],
  updated_at: ["critic", "updated_at"],
});

function list() {
  return knex("reviews").select("*");
}

function read(movieId) {
  return knex("reviews as r")
    .join("movies as m", "r.movie_id", "m.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "m.movie_id": movieId })
    .then(addCritic);
}

module.exports = { list, read };
