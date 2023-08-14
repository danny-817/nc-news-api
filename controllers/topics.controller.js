const retrieveAllTopicsModel = require("../models/topics.model");

function getTopicsController(request, response, next) {
  console.log("in the controller");
  retrieveAllTopicsModel()
    .then((topics) => {
      console.log(topics);
      response.status(200).send(topics);
    })
    .catch(next);
}

module.exports = getTopicsController;
