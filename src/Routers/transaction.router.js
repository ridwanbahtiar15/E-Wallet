const express = require("express");

const transactionRouter = express.Router();
const { getHistory, transactionChart, getDashboardData } = require("../Handlers/transaction.handler");
const { isLogin } = require("../Middlewares/authorization");

transactionRouter.get("/:userid", getHistory);
transactionRouter.get("/chart/:userid", transactionChart);
transactionRouter.get("/dashboard/:userid", getDashboardData);

module.exports = transactionRouter;
