const express = require("express");
const app = express();
const getApiList = require("./controllers/api.controller");
const getTopicsController = require("./controllers/topics.controller");
const fs = require("fs/promises");

app.get("/api/topics", getTopicsController);

app.get("/api", getApiList);

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
