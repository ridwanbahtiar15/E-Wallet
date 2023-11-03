const express = require("express");

const transactionRouter = express.Router();
const { getHistory } = require("../Handlers/transaction.handler");
const { isLogin } = require("../Middlewares/authorization");

transactionRouter.get("/:userid", getHistory);

module.exports = transactionRouter;
