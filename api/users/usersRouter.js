const express = require("express");
const { editUser } = require("./usersModels");
const { getPlantsByUser } = require("../plants/plantsModels");
const { validateUserId, } = require("../middleware");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(res.user);
});

router.get("/:id/plants", validateUserId, (req, res) => {
  getPlantsByUser(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json("Error retrieving plants by user.")
    })
})

router.put("/:id", validateUserId, (req, res) => {
  const credentials = req.body;
  if (req.body.password) {
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
  }
  editUser(req.params.id, credentials)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json("Error editing user.")
    })
});

module.exports = router;
