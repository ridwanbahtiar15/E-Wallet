const { getTransaction, metaTransaction, getIncome, getExpense, dashboardChartData, getTotal7Days, getTotalLastWeek } = require("../Models/transaction.model");

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

module.exports = {
  getHistory,
  transactionChart,
  getDashboardData,
};
