const express = require("express");
const { getById, getPlantsByUser, addPlant, editPlant, deletePlant } = require("./plantsModels");

const router = express.Router();


module.exports = router;
