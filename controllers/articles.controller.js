const retrieveArticleById = require("../models/articles.model");

function getArticleById(request, response, next) {
  const articleId = request.params.article_id;

  retrieveArticleById(articleId)
    .then((article) => {
      response.status(200).send({ article: article });
    })
    .catch(next);
}

function getCommentsByArticleId(request, response, next) {
  const articleId = request.params.article_id;

  retrieveCommentsById(articleId)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch(next);
  console.log(articleId);
}

module.exports = { getArticleById, getCommentsByArticleId };
