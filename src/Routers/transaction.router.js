const express = require("express");

const transactionRouter = express.Router();
const { getHistory, transactionChart, getDashboardData, deleteTransaction } = require("../Handlers/transaction.handler");
const { isLogin } = require("../Middlewares/authorization");

transactionRouter.get("/:userid", isLogin, getHistory);
transactionRouter.get("/chart/:userid", isLogin, transactionChart);
transactionRouter.get("/dashboard/:userid", isLogin, getDashboardData);
transactionRouter.delete("/:transactionId", isLogin, deleteTransaction);

module.exports = transactionRouter;
