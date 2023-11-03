const express = require("express");
const userRouter = express.Router();
const {isLogin} = require("../Middlewares/authorization")
const {singleUpload} = require("../Middlewares/diskUpload")
const {searchUser, getUserProfile, updateUser, confirmPin, updateUserPin} = require("../Handlers/user.handler")

userRouter.get("/",isLogin, searchUser)
userRouter.get("/profile",isLogin, getUserProfile)
userRouter.post("/",isLogin, confirmPin)
userRouter.patch("/",isLogin, singleUpload("photo_profile"), updateUser)
userRouter.patch("/pin",isLogin, updateUserPin)

module.exports = userRouter