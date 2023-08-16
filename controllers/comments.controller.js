const {
  retrieveCommentsById,
  deleteComment,
} = require("../models/comments.model");

function getCommentsByArticleId(request, response, next) {
  const articleId = request.params.article_id;

  retrieveCommentsById(articleId)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch(next);
}

function deleteCommentById(request, response, next) {
  const { comment_id } = request.params;

  deleteComment(comment_id)
    .then((result) => {
      response.status(204).send();
    })
    .catch(next);
}

module.exports = { getCommentsByArticleId, deleteCommentById };
