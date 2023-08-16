const { retrieveCommentsById } = require("../models/comments.model");

function getCommentsByArticleId(request, response, next) {
  const articleId = request.params.article_id;

  retrieveCommentsById(articleId)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch(next);
}

module.exports = { getCommentsByArticleId };
