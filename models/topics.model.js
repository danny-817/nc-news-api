const db = require("../db/connection");

function retrieveAllTopicsModel() {
  console.log("in the model");
  return db.query("SELECT * FROM topics").then((topics) => topics.rows);
}

module.exports = retrieveAllTopicsModel;
