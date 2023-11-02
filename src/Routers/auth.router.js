const express = require("express");
const authRouter = express.Router();
const {registerUser, loginUser, activateUser} = require("../Handlers/auth.handler")

authRouter.post("/login", loginUser)
authRouter.post("/register", registerUser)
authRouter.get("/", activateUser)

module.exports = authRouter