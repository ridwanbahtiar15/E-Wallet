const { getTransaction } = require("../Models/transaction.model");

const getHistory = async (req, res) => {
  try {
    const { query, path } = req;

    const result = await getTransaction(query, path);

    console.log(result);
    res.status(200).json({
      msg: "Success",
      result: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getHistory,
};
