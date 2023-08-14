const express = require("express");
const app = express();
const getTopicsController = require("./controllers/topics.controller");
const fs = require("fs/promises");

app.get("/api/topics", getTopicsController);

app.get("/api", (request, response) => {
  fs.readFile("endpoints.json", "utf-8").then((apiJson) => {
    response.send(apiJson);
  });
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
