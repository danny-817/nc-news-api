const db = require("../db/connection");

function addComment(comment, article_id) {
  console.log(comment, "in the model");
  const { body, username } = comment;
  return db
    .query(
      "INSERT INTO comments(body, author, article_id) VALUES ($1, $2, $3) RETURNING *;",
      [body, username, article_id]
    )
    .then(({ rows }) => {
      console.log(rows[0]);
    });
}

module.exports = { addComment };
