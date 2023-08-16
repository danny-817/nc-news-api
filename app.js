const express = require("express");
const app = express();
const getApiList = require("./controllers/api.controller");
const {
  getArticleById,
  getAllArticles,
} = require("./controllers/articles.controller");
const getTopicsController = require("./controllers/topics.controller");
const fs = require("fs/promises");

app.use(express.json());

app.get("/api/topics", getTopicsController);

app.get("/api", getApiList);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getAllArticles);

app.post("/api/articles/:article_id/comments", postComment);

app.use((_, response) => {
  response.status(404).send({ msg: "Path Not Found" });
});

app.use((err, request, response, next) => {
  if (err.status && err.msg) {
    response.status(err.status).send({ msg: err.msg });
  } else next(err);
});
app.use((err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "Bad Request" });
  }
});

app.use((err, request, response, next) => {
  response.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
