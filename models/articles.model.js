const db = require("../db/connection");

function retrieveArticleById(id) {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }

      return rows[0];
    });
}

function retrieveAllArticles(topic, sort_by = "created_at", order_by = "DESC") {
  const validColumns = [
    "article_id",
    "title",
    "topic",
    "author",
    "created_at",
    "article_img_url",
    "votes",
    "comments",
  ];
  const validOrders = ["ASC", "DESC"];
  if (!validColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  if (!validOrders.includes(order_by)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  let queryArr = [];
  let baseSqlString = `SELECT
  articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url ,
  COUNT(comments.comment_id) AS comments
FROM
  articles
LEFT JOIN comments ON articles.article_id = comments.article_id `;

  if (topic) {
    baseSqlString += `WHERE topic = $1 `;
    queryArr.push(topic);
  }

  baseSqlString += `GROUP BY articles.article_id ORDER BY ${sort_by} ${order_by}`;
  return db.query(baseSqlString, queryArr).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "No topics by that name" });
    }
    return rows;
  });
}

function patchArticleVotes(article_id, inc_votes) {
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;",
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "User Not Found" });
      }

      return rows;
    });
}

module.exports = {
  retrieveArticleById,
  retrieveAllArticles,
  patchArticleVotes,
};
