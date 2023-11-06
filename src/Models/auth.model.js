const db = require("../Configs/postgre");

const register = (body, hashedPassword, otp) => {
  const sql = "insert into users (email, pwd, otp) VALUES ($1, $2, $3) returning id, full_name";
  const values = [body.email, hashedPassword, otp];
  return db.query(sql, values);
};
const createBalance = (id) => {
  const sql = "insert into user_balance (user_id) values ($1)";
  const values = [id];
  return db.query(sql, values);
};
const selectUsers = (email) => {
  const sql = "select id, photo_profile, full_name, pwd, pin, phone_number, isactivate, otp from users where email = $1";
  const values = [email];
  return db.query(sql, values);
};
const activating = (email) => {
  const sql = "update users set isactivate = true where email = $1";
  const value = [email];
  return db.query(sql, value);
};
const blacklistToken = (token) => {
  const sql = "insert into blacklist (blacklist_token) values ($1)";
  const value = [token];
  return db.query(sql, value);
};
const checkTokenValidating = (token) => {
  const sql = "select id from blacklist where blacklist_token = $1";
  const values = [token];
  return db.query(sql, values);
};
const pin = (userPin, id) => {
  const sql = "update users set pin = $1 where id = $2";
  const values = [userPin, id];
  return db.query(sql, values);
};
const changePwd = (hashedPassword, email) => {
  const sql = "update users set pwd = $1 where email = $2";
  const values = [hashedPassword, email];
  return db.query(sql, values);
};

module.exports = { register, selectUsers, activating, blacklistToken, checkTokenValidating, pin, createBalance, changePwd };
