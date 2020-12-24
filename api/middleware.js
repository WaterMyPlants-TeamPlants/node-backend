const {getByUsername} = require("./users/usersModels");
const secrets = require("../config/secrets");

module.exports = {
  authorize,
  validateUser,
  validateRegisterBody,
  validateLoginBody
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
      console.log(err.message);
      return res.status(500).json("Error while searching for user.")
    })
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

function validateRegisterBody(req, res, next) {
  if (!req.body.username) {
    return res.status(400).json("Missing username.");
  } else if (!req.body.password) {
    return res.status(400).json("Missing password.");
  } else if (!req.body.telephone) {
    return res.status(400).json("Missing telephone number.");
  } else {
    next();
  }
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
