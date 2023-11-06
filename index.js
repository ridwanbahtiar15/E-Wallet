require("dotenv").config();
const express = require("express");
const server = express();
const mainRouter = require("./src/Routers/main.router");
const cors = require("cors");

server.listen(1600, () => {
  console.log("Server is running at port 1600");
});
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static("./public"));
server.use(mainRouter);
server.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["PATCH", "POST", "DELETE"],
  })
);
server.get("/", (req, res) => {
  const data = "Hello World";
  res.status(200).json({
    msg: data,
  });
});
