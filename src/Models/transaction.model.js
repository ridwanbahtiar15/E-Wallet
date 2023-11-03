const db = require("../Configs/postgre");

const getTransaction = (query, path) => {
  let sql =
    'SELECT u1.full_name AS sender_full_name, u1.phone_number as sender_phone_number, u1.photo_profile as sender_photo_profile, u2.full_name AS receiver_full_name, u2.phone_number as receiver_phone_number, u2.photo_profile as receiver_photo_profile, t.transaction_amount, t.created_at FROM "transaction" t JOIN  users u1 ON t.from_user_id = u1.id JOIN  users u2 ON t.to_user_id = u2.id where (u1.id = $2 or u2.id = $2)';
  const values = [parseInt(query.page) || 1, path.userid];

  if (query.name) {
    values.push(`%${query.name}%`);
    sql += "and (u1.full_name ilike $3 or u2.full_name ilike $3) ";
  }
  if (query.phone) {
    values.push(`%${query.phone}%`);
    sql += "and (u1.phone_number ilike $3 or u2.phone_number ilike $3) ";
  }

  sql += "order by t.created_at desc";
  sql += ` limit 7 offset ($1 * 7) - 7`;

  return db.query(sql, values);
};

module.exports = {
  getTransaction,
};
