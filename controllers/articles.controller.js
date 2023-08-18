const {
  retrieveArticleById,
  retrieveAllArticles,
  patchArticleVotes,
} = require("../models/articles.model");

function getArticleById(request, response, next) {
  const articleId = request.params.article_id;

  retrieveArticleById(articleId)
    .then((article) => {
      response.status(200).send({ article: article });
    })
    .catch(next);
}

function getAllArticles(request, response, next) {
  const queries = request.query;
  const { topic, sort_by, order_by } = queries;

  retrieveAllArticles(topic, sort_by, order_by)
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch(next);
}
function patchArticle(request, response, next) {
  const { article_id } = request.params;
  const { inc_votes } = request.body;

  patchArticleVotes(article_id, inc_votes)
    .then((patchedArticle) => {
      response.status(200).send({ article: patchedArticle });
    })
    .catch(next);
}

module.exports = { getArticleById, getAllArticles, patchArticle };
