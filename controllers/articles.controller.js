const {
  retrieveArticleById,
  retrieveAllArticles,
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

module.exports = { getArticleById, getAllArticles };

