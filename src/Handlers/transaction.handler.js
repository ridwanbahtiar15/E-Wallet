const { getTransaction, metaTransaction, getIncome, getExpense, dashboardChartData, getTotal7Days, getTotalLastWeek, topUp, addBalance } = require("../Models/transaction.model");
const snap = require("../Configs/midtrans")
const db = require("../Configs/postgre");
const { v4: uuidv4 } = require('uuid');


const getHistory = async (req, res) => {
  try {
    const { query, params, userInfo } = req;
    const { full_name } = userInfo;
    console.log(userInfo);
    const result = [];

    const data = await getTransaction(query, params);
    if (!data.rows.length)
      return res.status(404).json({
        msg: "No Transaction Found",
        result: [],
      });
    for (let i = 0; i < data.rows.length; i++) {
      if (data.rows[i].transaction_type === "Transfer") {
        if (data.rows[i].sender_full_name === full_name)
          result.push({
            id: data.rows[i].id,
            full_name: data.rows[i].receiver_full_name,
            phone_number: data.rows[i].receiver_phone_number,
            photo_profile: data.rows[i].receiver_photo_profile,
            transaction_type: data.rows[i].transaction_type,
            transaction_amount: data.rows[i].transaction_amount,
            summary: data.rows[i].summary,
            created_at: data.rows[i].created_at,
          });
        if (data.rows[i].receiver_full_name === full_name)
          result.push({
            id: data.rows[i].id,
            full_name: data.rows[i].sender_full_name,
            phone_number: data.rows[i].sender_phone_number,
            photo_profile: data.rows[i].sender_photo_profile,
            transaction_type: data.rows[i].transaction_type,
            transaction_amount: data.rows[i].transaction_amount,
            summary: data.rows[i].summary,
            created_at: data.rows[i].created_at,
          });
      } else {
        result.push({
          id: data.rows[i].id,
          full_name: data.rows[i].receiver_full_name,
          phone_number: data.rows[i].receiver_phone_number,
          photo_profile: data.rows[i].receiver_photo_profile,
          transaction_type: data.rows[i].transaction_type,
          transaction_amount: data.rows[i].transaction_amount,
          summary: data.rows[i].summary,
          created_at: data.rows[i].created_at,
        });
      }
    }

    const metaResult = await metaTransaction(query, params);
    const totalData = parseInt(metaResult.rows[0].total_data);
    const totalPage = Math.ceil(totalData / parseInt(query.limit));
    const isLastPage = parseInt(query.page) >= totalPage;
    const nextPage = parseInt(query.page) + 1;
    const prevPage = parseInt(query.page) - 1;
    const meta = {
      page: parseInt(query.page),
      totalPage,
      totalData,
      next: isLastPage ? null : `http://localhost:1600${req.originalUrl.slice(0, -1) + nextPage}`,
      prev: parseInt(query.page) === 1 ? null : `http://localhost:1600${req.originalUrl.slice(0, -1) + prevPage}`,
    };

    res.status(200).json({
      msg: "Success",
      result: result,
      meta,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const transactionChart = async (req, res) => {
  try {
    const { query, params } = req;

    const thisWeek = await getTotal7Days(params);
    const lastWeek = await getTotalLastWeek(params);

    if (query.summary === "Income") {
      const result = await getIncome(query, params);
      if (!result.rows.length)
        return res.status(404).json({
          msg: "No Transaction Found",
          result: [],
          thisWeekData: thisWeek.rows,
          lastWeekData: lastWeek.rows,
        });

      return res.status(200).json({
        msg: "Success",
        result: result.rows,
        thisWeekData: thisWeek.rows,
        lastWeekData: lastWeek.rows,
      });
    }

    const result = await getExpense(query, params);
    if (!result.rows.length)
      return res.status(404).json({
        msg: "No Transaction Found",
        result: [],
        thisWeekData: thisWeek.rows,
        lastWeekData: lastWeek.rows,
      });

    res.status(200).json({
      msg: "Success",
      result: result.rows,
      thisWeekData: thisWeek.rows,
      lastWeekData: lastWeek.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const getDashboardData = async (req, res) => {
  try {
    const { query, params } = req;

    const result = await dashboardChartData(query, params);
    const thisWeek = await getTotal7Days(params);
    const lastWeek = await getTotalLastWeek(params);
    if (!result.rows.length)
      return res.status(404).json({
        msg: "No Transaction Found",
        result: [],
        thisWeekData: thisWeek.rows,
        lastWeekData: lastWeek.rows,
      });

    res.status(200).json({
      msg: "Success",
      result: result.rows,
      thisWeekData: thisWeek.rows,
      lastWeekData: lastWeek.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const getTokenTopUp = async (req, res) => {
  const {body} = req;
  if (body.amount === 0)
  return res.status(400).json({
    msg: "Plese input amount that greater than 1"
  })
  const transactionDetails = {
    transaction_details: {
      order_id: uuidv4(),
      gross_amount: parseInt(body.amount),
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: body.name
    },
    enabled_payments: ["bca_va"]
  };
  try {
    const snapToken = await snap.createTransactionToken(transactionDetails);
    res.status(201).json({ snapToken });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create Snap token' });
  }
}

const topUpUser = async (req, res) => {
  const client = await db.connect();
  try {
    await client.query("begin");
    const {body} = req;
    const data = await topUp(body.id, body);
    const balance = await addBalance(body.id, body.amount);
    await client.query("commit");
    res.status(200).json({
      msg: "Success for Top Up"
    })
  } catch (error) {
    console.error(error);
    await client.query("rollback");
    res.status(500).json({
      msg: "Internal Server Error"
    })
  } finally {
    client.release();
  }
}

module.exports = {
  getHistory,
  transactionChart,
  getDashboardData,
  getTokenTopUp,
  topUpUser
};
