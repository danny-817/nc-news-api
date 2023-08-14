const express = require("express");
const app = express();
const getTopicsController = require("./controllers/topics.controller");

app.get("/api/topics", getTopicsController);

app.use((err, request, response, next) => {
  response.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
