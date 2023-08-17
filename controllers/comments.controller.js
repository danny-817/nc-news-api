const { addComment } = require("../models/comments.model");

function postComment(request, response, next) {
  const comment = request.body;
  const { article_id } = request.params;

  addComment(comment, article_id)
    .then((comment) => {
      response.status(201).send(comment);
    })
    .catch((err) => next(err));
}

module.exports = { postComment };
