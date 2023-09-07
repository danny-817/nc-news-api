const cors = require("cors");
const express = require("express");
const app = express();
const getApiList = require("./controllers/api.controller");
const {
  getCommentsByArticleId,
  deleteCommentById,
} = require("./controllers/comments.controller");

const {
  getArticleById,
  getAllArticles,
  patchArticle,
} = require("./controllers/articles.controller");

const getTopicsController = require("./controllers/topics.controller");
const { getAllUsers } = require("./controllers/users.controller");
const fs = require("fs/promises");

const { postComment } = require("./controllers/comments.controller");

app.use(cors());

app.use(express.json());

app.get("/api/topics", getTopicsController);

app.get("/api", getApiList);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.get("/api/articles", getAllArticles);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchArticle);

app.get("/api/users", getAllUsers);

app.delete("/api/comments/:comment_id", deleteCommentById);

app.use((request, response) => {
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
  } else next(err);
});
app.use((err, request, response, next) => {
  if (err.code === "23503") {
    response.status(400).send({ msg: "Username doesn't exist" });
  } else next(err);
});

app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
