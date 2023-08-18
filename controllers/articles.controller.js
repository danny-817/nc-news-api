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
  retrieveAllArticles().then((articlesArray) => {
    response.status(200).send(articlesArray);
  });
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
