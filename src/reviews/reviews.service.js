const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

// Should embed the critic in update()
const addCriticToUpdate = reduceProperties("theater_id", {
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],
  c_created_at: ["critic", "created_at"],
  c_updated_at: ["critic", "updated_at"],
});

// Should embed the critic in list()
const addCriticToList = reduceProperties("review_id", {
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],
});

function read(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).first();
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

function list(movieId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ "r.movie_id": movieId })
    .then(addCriticToList);
}

async function update(review) {
  const reviewId = review.review_id;

  await knex("reviews as r").where({ "r.review_id": reviewId }).update(review);

  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .where({ "r.review_id": reviewId })
    .select("r.*", "c.*")
    .then(addCriticToUpdate)
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
  list,
  read,
  update,
  destroy,
};
