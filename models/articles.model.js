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

function retrieveAllArticles() {
  return db
    .query(
      `SELECT
      articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url ,
      COUNT(comments.comment_id) AS comments
    FROM
      articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id ORDER BY created_at DESC`
    )
    .then(({ rows }) => {
      return rows;
    });
}

module.exports = { retrieveArticleById, retrieveAllArticles };
