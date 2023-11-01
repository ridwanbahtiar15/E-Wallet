const express = require('express')
const server = express();

server.listen()

server.listen(1600, () => {
    console.log("Server is running at port 1600");
  });

server.use(express.json());
server.use(express.urlencoded({extended: false}));


server.get("/", (req, res) => {
    const data = "Hello World";
    res.status(200).json({
        msg: data
    })
})
