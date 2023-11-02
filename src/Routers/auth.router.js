const express = require("express");
const authRouter = express.Router();
const {registerUser, loginUser, activateUser, logOutUser} = require("../Handlers/auth.handler")
const {isLogin} = require("../Middlewares/authorization")

authRouter.post("/login", loginUser)
authRouter.post("/register", registerUser)
authRouter.get("/", activateUser)
authRouter.delete("/", logOutUser)


module.exports = authRouter