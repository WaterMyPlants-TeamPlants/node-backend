const db = require("../../data/dbconfig");

module.exports = {
  getById,
  addPlant,
  editPlant,
  deletePlant
};

function getById(id) {
  return db("plants")
    .where({ id })
    .first();
}

function addPlant(body) {
  return db("plants")
    .insert(body)
    .then(id => {
      return getById(id);
    });
}

function editPlant(id, body) {
  return db("plants")
    .where({ id })
    .update(body)
    .then(data => {
      return getById(id);
    });
}

function deletePlant(id) {
  return db("plants")
    .where({ id })
    .del();
}
