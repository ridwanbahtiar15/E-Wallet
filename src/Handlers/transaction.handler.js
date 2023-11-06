const {
  getTransaction,
  metaTransaction,
  getIncome,
  getExpense,
  dashboardChartData,
  getTotal7Days,
  getTotalLastWeek,
  topUp,
  addBalance,
  deleteFromUser,
  deleteToUser,
  deleteFromToUser,
  getUserBalance,
  createTransfer,
  updateSenderBalance,
  updateReceiverBalance,
  getBalanceDashboard,
} = require("../Models/transaction.model");
const db = require("../Configs/postgre");
const snap = require("../Configs/midtrans");
const { v4: uuidv4 } = require("uuid");

const getHistory = async (req, res) => {
  try {
    const { query, userInfo } = req;
    const { id } = userInfo;
    // console.log(id);
    const result = [];
    const resultMeta = [];

    const data = await getTransaction(query, id);
    // console.log(data.rows);
    if (!data.rows.length)
      return res.status(404).json({
        msg: "No Transaction Found",
        result: [],
      });
    for (let i = 0; i < data.rows.length; i++) {
      if (data.rows[i].transaction_type === "Transfer") {
        if (parseInt(data.rows[i].from_user_id) === id) {
          if (data.rows[i].sender_deleted_at) continue;
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
        if (parseInt(data.rows[i].to_user_id) === id) {
          if (data.rows[i].receiver_deleted_at) continue;
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
        }
      } else {
        if (data.rows[i].receiver_deleted_at) continue;
        result.push({
          id: data.rows[i].id,
          full_name: data.rows[i].receiver_full_name,
          phone_number: data.rows[i].receiver_phone_number,
          photo_profile: data.rows[i].receiver_photo_profile,
          transaction_type: data.rows[i].transaction_type,
          transaction_amount: data.rows[i].transaction_amount,
          summary: "Income",
          created_at: data.rows[i].created_at,
        });
      }
    }

    const metaData = await metaTransaction(query, id);
    for (let j = 0; j < metaData.rows.length; j++) {
      if (parseInt(metaData.rows[j].from_user_id) === id) {
        if (metaData.rows[j].sender_deleted_at) continue;
        resultMeta.push({
          full_name: metaData.rows[j].receiver_full_name,
        });
      } else if (parseInt(metaData.rows[j].to_user_id) === id) {
        if (metaData.rows[j].receiver_deleted_at) continue;
        resultMeta.push({
          full_name: metaData.rows[j].sender_full_name,
        });
      }
    }
    const totalData = parseInt(resultMeta.length);
    const totalPage = Math.ceil(totalData / 7);
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
    const userBalance = await getBalanceDashboard(params);

    if (query.summary === "Income") {
      const result = await getIncome(query, params);
      if (!result.rows.length)
        return res.status(404).json({
          msg: "No Transaction Found",
          result: {
            chart_data: [],
            userBalance: userBalance.rows[0],
            thisWeekData: { expense: thisWeek.rows[0], income: thisWeek.rows[1] },
            lastWeekData: { expense: lastWeek.rows[0], income: lastWeek.rows[1] },
          },
        });

      return res.status(200).json({
        msg: "Success",
        result: {
          chart_data: result.rows,
          userBalance: userBalance.rows[0],
          thisWeekData: { expense: thisWeek.rows[0], income: thisWeek.rows[1] },
          lastWeekData: { expense: lastWeek.rows[0], income: lastWeek.rows[1] },
        },
      });
    }

    const result = await getExpense(query, params);
    if (!result.rows.length)
      return res.status(404).json({
        msg: "No Transaction Found",
        result: {
          chart_data: [],
          userBalance: userBalance.rows[0],
          thisWeekData: { expense: thisWeek.rows[0], income: thisWeek.rows[1] },
          lastWeekData: { expense: lastWeek.rows[0], income: lastWeek.rows[1] },
        },
      });

    res.status(200).json({
      msg: "Success",
      result: {
        chart_data: result.rows,
        userBalance: userBalance.rows[0],
        thisWeekData: { expense: thisWeek.rows[0], income: thisWeek.rows[1] },
        lastWeekData: { expense: lastWeek.rows[0], income: lastWeek.rows[1] },
      },
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
  const { body } = req;
  if (body.amount === 0)
    return res.status(400).json({
      msg: "Plese input amount that greater than 1",
    });
  if (body.method !== "bca_va" && body.method !== "bni_va" && body.method !== "gopay" && body.method !== "bri_va")
    return res.status(400).json({
      msg: "Payment Method Unavailable",
      method: body.method,
    });
  const transactionDetails = {
    transaction_details: {
      order_id: uuidv4(),
      gross_amount: parseInt(body.amount),
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: body.name,
    },
    enabled_payments: [body.method],
  };
  try {
    const snapToken = await snap.createTransactionToken(transactionDetails);
    res.status(201).json({ snapToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create Snap token" });
  }
};

const topUpUser = async (req, res) => {
  const client = await db.connect();
  try {
    await client.query("begin");
    const { body } = req;
    const data = await topUp(body.id, body);
    const balance = await addBalance(body.id, body.amount);
    await client.query("commit");
    res.status(200).json({
      msg: "Success for Top Up",
    });
  } catch (error) {
    console.error(error);
    await client.query("rollback");
    res.status(500).json({
      msg: "Internal Server Error",
    });
  } finally {
    client.release();
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { query, params } = req;

    if (query.transaction_type === "Transfer") {
      if (query.summary === "Income") {
        const result = await deleteToUser(params);
        return res.status(200).json({
          msg: "Delete Success",
          result: result.rows,
        });
      }
      const result = await deleteFromUser(params);
      return res.status(200).json({
        msg: "Delete Success",
        result: result.rows,
      });
    }
    const result = await deleteFromToUser(params);
    res.status(200).json({
      msg: "Delete Success",
      result: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const postTransfer = async (req, res) => {
  const client = await db.connect();
  try {
    const { body, userInfo } = req;
    const userid = userInfo.id;
    if (body.amount < 10000)
      return res.status(400).json({
        msg: "Cannot Transfer Money Under Rp. 10.000",
      });

    await client.query("BEGIN");
    const getData = await getUserBalance(client, userid);
    if (body.amount > getData.rows[0].balance) {
      await client.query("ROLLBACK");
      return res.status(400).json({
        msg: "Your Balance is Not Enough",
      });
    }

    const result = await createTransfer(client, userid, body);
    const newBalance = await updateSenderBalance(client, userid, body);
    await updateReceiverBalance(client, body);
    await client.query("COMMIT");
    res.status(200).json({
      msg: " Transfer Success",
      result: { transfer_data: result.rows[0], new_balance: newBalance.rows[0] },
    });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK");
    res.status(500).json({
      msg: "Internal Server Error",
    });
  } finally {
    client.release();
  }
};

module.exports = {
  getHistory,
  transactionChart,
  getDashboardData,
  getTokenTopUp,
  topUpUser,
  deleteTransaction,
  postTransfer,
};
