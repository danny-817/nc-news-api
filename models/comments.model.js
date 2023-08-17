const db = require("../db/connection");

function addComment(comment, article_id) {
  if (!Object.hasOwn(comment, "username") || !Object.hasOwn(comment, "body")) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  const { body, username } = comment;
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Path Not Found" });
      } else {
        return db
          .query(
            "INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *;",
            [body, username, article_id]
          )
          .then(({ rows }) => {
            return rows[0];
          });
      }
    });
}

module.exports = { addComment };
