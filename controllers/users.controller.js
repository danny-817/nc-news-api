const { fetchAllUsers } = require("../models/users.model");

function getAllUsers(request, response, next) {
  fetchAllUsers().then((users) => {
    response.status(200).send({ users });
  });
}

module.exports = { getAllUsers };
