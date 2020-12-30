const db = require("../../data/dbconfig");

module.exports = {
  getPlantById,
  getPlantsByUser,
  addPlant,
  editPlant,
  deletePlant
};

function getPlantById(id) {
  return db("plants")
    .where({ id })
    .first();
}

function getPlantsByUser(id) {
  return db("plants")
    .where("user_id", id)
}

function addPlant(body) {
  return db("plants")
    .insert(body)
    .then(id => {
      return getPlantById(id);
    });
}

function editPlant(id, body) {
  return db("plants")
    .where({ id })
    .update(body)
    .then(data => {
      return getPlantById(id);
    });
}

function deletePlant(id) {
  return db("plants")
    .where({ id })
    .del();
}
