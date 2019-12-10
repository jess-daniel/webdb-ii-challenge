const express = require("express");

const carRouter = require("../routes/carRouter");

const server = express();

// middlewares
server.use(express.json());

// routers
server.use("/api/cars", carRouter);

module.exports = server;
