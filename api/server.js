const express = require("express");
const usersRouter = require("./users/usersRouter");
const plantsRouter = require("./plants/plantsRouter");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/users", usersRouter);
server.use("/plants", plantsRouter);

module.exports = server;
