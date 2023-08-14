const retrieveAllTopicsModel = require("../models/topics.model");

function getTopicsController(request, response, next) {
  retrieveAllTopicsModel()
    .then((topics) => {
      response.status(200).send(topics);
    })
    .catch(next);
}

module.exports = getTopicsController;
