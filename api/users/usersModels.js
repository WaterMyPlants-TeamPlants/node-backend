const db = require("../../data/dbconfig");

module.exports = {
  getUserById,
  getByUsername,
  addUser,
  editUser,
  deleteUser
};

async function getUserById(id) {
  let plants = await db("plants").where("user_id", id);
  return db("users")
    .where({ id })
    .select("username", "id", "telephone")
    .first()
    .then(data => {
      data.plants = plants;
      return Promise.resolve(data);
    });
}

function getByUsername(username) {
  return db("users")
    .where({ username })
    .first()
    .then(async data => {
      if (data) {
        let plants = await db("plants").where("user_id", data.id);
        data.plants = plants;
        return Promise.resolve(data);
      } else return null;
    });
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
