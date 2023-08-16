const db = require("../db/connection");

function addComment(comment) {
  console.log(comment, "in the model");
  const { body, username } = comment;
  return db
    .query(
      "INSERT INTO comments(body, author) VALUES ($1, $2, $3) RETURNING *;",
      [body, username]
    )
    .then(({ rows }) => {
      console.log(rows[0]);
    });
}

module.exports = { addComment };

// (newSnack) => {
//   const { snack_name, price, flavour_text } = newSnack;
//   return db
//     .query(
//       "INSERT INTO snacks (snack_name, price, flavour_text) VALUES ($1, $2, $3) RETURNING *;",
//       [snack_name, price, flavour_text]
//     )
//     .then(({ rows }) => rows[0])
