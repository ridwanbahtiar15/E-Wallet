const express = require("express");

const transactionRouter = express.Router();
const { getHistory, transactionChart, getDashboardData, getTokenTopUp, topUpUser } = require("../Handlers/transaction.handler");
const { isLogin } = require("../Middlewares/authorization");

transactionRouter.get("/:userid", isLogin, getHistory);
transactionRouter.get("/chart/:userid", isLogin, transactionChart);
transactionRouter.get("/dashboard/:userid", isLogin, getDashboardData);
transactionRouter.post("/top-up/checkout", getTokenTopUp);
transactionRouter.post("/top-up/notification",isLogin , topUpUser);

module.exports = transactionRouter;
