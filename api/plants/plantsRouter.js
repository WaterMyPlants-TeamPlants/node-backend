const express = require("express");
const { addPlant, editPlant, deletePlant } = require("./plantsModels");
const { validatePlantId, validatePlantBody, validateOwnerId, validateUserId } = require("../middleware");

const router = express.Router();

router.get("/:id", validatePlantId, (req, res) => {
  res.status(200).json(res.plant);
});

router.post("/", [validatePlantBody, validateUserId], (req, res) => [
  addPlant(req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json("Error adding plant.");
    })
]);

router.put("/:id", [validatePlantId, validateOwnerId], (req, res) => {
  editPlant(req.params.id, req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json("Error editing plant.");
    });
});

router.delete("/:id", validatePlantId, (req, res) => {
  deletePlant(req.params.id)
  .then(data => {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).json("No plants were deleted.");
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json("Error deleting plant.");
  });
});


module.exports = router;
