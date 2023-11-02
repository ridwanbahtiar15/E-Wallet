const express = require("express");
const mainRouter = express.Router();

const authRouter = require("./auth.router");
const transactionRouter = require("./transaction.router");

mainRouter.use("/auth", authRouter);
mainRouter.use("/transaction", transactionRouter);

module.exports = mainRouter;
