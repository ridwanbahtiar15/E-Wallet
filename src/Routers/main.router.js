const express = require("express");
const mainRouter = express.Router();

const authRouter = require("./auth.router");

mainRouter.use("/auth", authRouter);

module.exports = mainRouter;