const retrieveArticleById = require("../models/articles.model");

function getArticleById(request, response, next) {
  console.log("in the controller");
  const articleId = request.params.article_id;
  console.log(articleId);
  retrieveArticleById().then((article) => {
    response.status(200).send(article).catch(next);
  });
}

module.exports = getArticleById;
