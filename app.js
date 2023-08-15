const express = require("express");
const app = express();
const getApiList = require("./controllers/api.controller");

const getArticleById = require("./controllers/articles.controller");
const getTopicsController = require("./controllers/topics.controller");
const fs = require("fs/promises");

app.use(express.json());

const getTopicsController = require("./controllers/topics.controller");
const fs = require("fs/promises");


app.get("/api/topics", getTopicsController);

app.get("/api", getApiList);


app.get("/api/articles/:article_id", getArticleById);

app.use((err, request, response, next) => {
  console.log(err);
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

// fs.readFile(`./data/owners/o${id}.json`, "utf-8").then(
//     (ownerFile) => {
//       response.status(200).send(ownerFile);
//     },
//     () => {
//       response.status(400).send("no such user");
