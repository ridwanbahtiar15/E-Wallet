const express = require("express");
const mainRouter = express.Router();

const authRouter = require("./auth.router");
const transactionRouter = require("./transaction.router");
const userRouter = require("./user.router");

mainRouter.use("/auth", authRouter);
mainRouter.use("/transaction", transactionRouter);
mainRouter.use("/user", userRouter);

module.exports = mainRouter;
