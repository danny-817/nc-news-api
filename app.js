const express = require("express");
const app = express();
const getApiList = require("./controllers/api.controller");
const getArticleById = require("./controllers/articles.controller");
const getTopicsController = require("./controllers/topics.controller");
const fs = require("fs/promises");

app.use(express.json());

app.get("/api/topics", getTopicsController);

app.get("/api", getApiList);

app.get("/api/articles/:article_id", getArticleById);

app.use((err, request, response, next) => {
  if (err.status && err.msg) {
    response.status(err.status).send({ msg: "Not Found" });
  } else next(err);
});

app.use((err, request, response, next) => {
  response.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
