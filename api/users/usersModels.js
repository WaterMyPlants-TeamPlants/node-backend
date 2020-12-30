const db = require("../../data/dbconfig");

module.exports = {
  getUserById,
  getByUsername,
  addUser,
  editUser,
  deleteUser
};

function getUserById(id) {
  return db("users")
    .where({ id })
    .select("username", "id", "telephone")
    .first();
}

function getByUsername(username) {
  return db("users")
    .where({ username })
    .first();
}

function addUser(body) {
  return db("users")
    .insert(body)
    .then(id => {
      return getUserById(id);
    });
}

function editUser(id, body) {
  return db("users")
    .where({ id })
    .update(body)
    .then(data => {
      return getUserById(id);
    });
}

function deleteUser(id) {
  return db("users")
    .where({ id })
    .del();
}
