const express = require("express");
const transactionRouter = express.Router();

const { getHistory, transactionChart, getDashboardData, getTokenTopUp, topUpUser, deleteTransaction, postTransfer } = require("../Handlers/transaction.handler");
const { isLogin } = require("../Middlewares/authorization");

transactionRouter.get("/", isLogin, getHistory);
transactionRouter.get("/chart/:userid", isLogin, transactionChart);
transactionRouter.get("/dashboard/:userid", isLogin, getDashboardData);
transactionRouter.post("/top-up/checkout", getTokenTopUp);
transactionRouter.post("/top-up/notification", isLogin, topUpUser);
transactionRouter.delete("/:transactionId", isLogin, deleteTransaction);
transactionRouter.post("/transfer", isLogin, postTransfer);

module.exports = transactionRouter;
