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



function retrieveCommentsById(articleId) {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
      [articleId]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return rows;
    });
}
function deleteComment(comment_id) {
  return db
    .query("DELETE FROM comments WHERE comment_id = $1 RETURNING *;", [
      comment_id,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 400,
          msg: "this comment does not exist",
        });
      }
      Promise.resolve(rows);
    });
}

module.exports = { retrieveCommentsById, deleteComment, addComment };

