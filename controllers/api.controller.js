const fs = require("fs/promises");

function getApiList(request, response) {
  console.log("controller");
  fs.readFile("endpoints.json", "utf-8").then((apiJson) => {
    console.log(apiJson);
    response.send(apiJson);
  });
}

module.exports = getApiList;
