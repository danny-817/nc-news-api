const fs = require("fs/promises");

function getApiList(request, response) {
  fs.readFile("endpoints.json", "utf-8").then((apiJson) => {
    response.send(apiJson);
  });
}

module.exports = getApiList;
