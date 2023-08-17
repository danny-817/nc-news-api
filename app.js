const express = require("express");
const app = express();
const getApiList = require("./controllers/api.controller");


const { getCommentsByArticleId } = require("./controllers/comments.controller");

const {
  getCommentsByArticleId,
  deleteCommentById,
} = require("./controllers/comments.controller");


const {
  getArticleById,
  getAllArticles,
} = require("./controllers/articles.controller");

const getTopicsController = require("./controllers/topics.controller");
const { getAllUsers } = require("./controllers/users.controller");
const fs = require("fs/promises");
const { log } = require("console");

app.use(express.json());

app.get("/api/topics", getTopicsController);

app.get("/api", getApiList);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.get("/api/articles", getAllArticles);


app.get("/api/users", getAllUsers);

app.delete("/api/comments/:comment_id", deleteCommentById);


app.use((_, response) => {
  response.status(400).send({ msg: "Path Not Found" });
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
