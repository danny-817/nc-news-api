const addComment = require("../models/comments.model");

function postComment(request, response, next) {
  console.log(request.body, "in the controller");
  addComment(request.body)
    .then((comment) => {
      response.status(200).send(comment);
    })
    .catch(next);
}

module.exports = { postComment };
