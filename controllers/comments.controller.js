const addComment = require("../models/comments.model");

function postComment(request, response, next) {
  console.log("in the controller");
  const comment = request.body;
  const { article_id } = request.params;
  addComment(comment, article_id)
    .then((comment) => {
      response.status(200).send(comment);
    })
    .catch(next);
}

module.exports = { postComment };
