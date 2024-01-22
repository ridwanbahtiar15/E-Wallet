require("dotenv").config();
const express = require("express");
const server = express();
const mainRouter = require("./src/Routers/main.router");
const cors = require("cors");

// const snap = require("./src/Configs/midtrans")
// const { v4: uuidv4 } = require('uuid');

server.listen(1600, () => {
  console.log("Server is running at port 1600");
});
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static("./public"));
server.use(
  cors({
    origin: "*",
    methods: ["PATCH", "POST", "DELETE"],
  })
);
server.use(mainRouter);
server.get("/", (req, res) => {
  const data = "Hello World";
  res.status(200).json({
    msg: data,
  });
});

// server.post("/transaction/checkout", async (req, res) => {
//   // const {body} = req;
//   const transactionDetails = {
//     transaction_details: {
//       order_id: uuidv4(),
//       gross_amount: 200000,
//     },
//     credit_card: {
//       secure: true,
//     },
//   };
//   try {
//     const snapToken = await snap.createTransactionToken(transactionDetails);
//     res.json({ snapToken });
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ error: 'Failed to create Snap token' });
//   }
// })
