const { getByUsername, getUserById } = require("./users/usersModels");
const { getPlantById } = require("./plants/plantsModels");
const secrets = require("../config/secrets");
const jwt = require("jsonwebtoken");

module.exports = {
  authorize,
  validatePlantId,
  validateUserId,
  validateUser,
  validateUserBody,
  validatePlantBody,
  validateLoginBody,
  validateOwnerId
};

function validatePlantId(req, res, next) {
  getPlantById(req.params.id)
    .then(data => {
      console.log("inside .then")
      if (data) {
        console.log("inside next()")
        res.plant = data;
        next();
      } else {
        console.log("inside res.status 404")
        return res.status(404).json("Plant not found.");
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json("Error while searching for plant.");
    });
}

function validateUserId(req, res, next) {
  getUserById(req.params.id)
    .then(data => {
      if (data) {
        res.user = data;
        next();
      } else {
        return res.status(404).json("User not found.");
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json("Error while searching for user.");
    });
}

function validateUser(req, res, next) {
  getByUsername(req.body.username)
    .then(data => {
      if (data) {
        res.user = data;
        next();
      } else {
        return res.status(404).json("User not found.");
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json("Error while searching for user.");
    });
}

function validateUserBody(req, res, next) {
  if (!req.body.username) {
    return res.status(400).json("Missing username.");
  } else if (!req.body.password) {
    return res.status(400).json("Missing password.");
  } else if (!req.body.telephone) {
    return res.status(400).json("Missing telephone number.");
  } else {
    getByUsername(req.body.username)
    .then(data => {
      console.log(data)
      if (data) {
        res.status(500).json("Username already taken.")
      } else next();
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json("Error checking if username is taken.");
    })
  }
}

function validatePlantBody(req, res, next) {
  if (!req.body.nickname) {
    return res.status(400).json("Missing nickname.");
  } else if (!req.body.species) {
    return res.status(400).json("Missing species.");
  } else if (!req.body.frequency) {
    return res.status(400).json("Missing water frequency number.");
  } else if (!req.body.user_id) {
    return res.status(400).json("Missing user id of plant owner.");
  } else {
    req.params.id = req.body.user_id;
    next();
  }
}

function validateOwnerId(req, res, next) {
  if (req.body.user_id) {
    getUserById(req.body.user_id)
      .then(data => {
        if (data) {
          res.user = data;
          next();
        } else {
          return res.status(404).json("Owner not found.");
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json("Error while searching for owner.");
      });
  } else {
    next();
  }
}

function authorize(req, res, next) {
  const token = req.headers.authorization;
  !token && res.status(401).json(`Missing authorization token.`);
  jwt.verify(token, secrets.jwtSecret, (err, decoded) => {
    err && res.status(500).json(`Could not verify JWT.`);
    res.token = decoded;
    next();
  });
}

function validateLoginBody(req, res, next) {
  if (!req.body.username) {
    return res.status(400).json("Missing username.");
  } else if (!req.body.password) {
    return res.status(400).json("Missing password.");
  } else {
    next();
  }
}
