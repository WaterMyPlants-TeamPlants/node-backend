const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersRouter = require("./users/usersRouter");
const plantsRouter = require("./plants/plantsRouter");
const { validateUser, authorize, validateLoginBody, validateUserBody } = require("./middleware");
const { addUser } = require("./users/usersModels");
const secrets = require("../config/secrets");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use("/api/users", authorize, usersRouter);
server.use("/api/plants", authorize, plantsRouter);

server.post("/api/login", [validateLoginBody, validateUser], (req, res) => {
  const user = res.user;
  if (bcrypt.compareSync(req.body.password, user.password)) {
    const token = generateToken(user);
    const noPasswordUser = { username: user.username, id: user.id, telephone: user.telephone }
      return res.status(200).json({ user: noPasswordUser, token: token });
  } else {
    return res.status(401).json("Incorrect password.");
  }
  function generateToken(user) {
    const payload = {
      subject: user.id
    };
    const options = {
      expiresIn: '1d'
    };
    return jwt.sign(payload, secrets.jwtSecret, options);
  }
});

server.post("/api/register", validateUserBody, (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;
  addUser(credentials)
    .then(data => {
      return res.status(201).json(data);
    })
    .catch(err => {
      console.log(err.message);
      return res.status(500).json("Error while adding user to database.");
    });
});

module.exports = server;
