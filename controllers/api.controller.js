const fs = require("fs/promises");

function getApiList(request, response) {
  fs.readFile("endpoints.json", "utf-8").then((apiJson) => {
    fs.readFile("endpoints.json", "utf-8").then((apiJson) => {
      response.send(JSON.parse(apiJson));
    });
  });
}

module.exports = getApiList;
