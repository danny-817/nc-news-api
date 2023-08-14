const db = require("../db/connection");

function retrieveAllTopicsModel() {
  return db.query("SELECT * FROM topics").then((topics) => topics.rows);
}

module.exports = retrieveAllTopicsModel;
