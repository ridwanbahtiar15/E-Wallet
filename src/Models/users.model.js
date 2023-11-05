const db = require("../Configs/postgre");

const readUsers = (query) => {
    let sql = 
    `select u.id as "No",
    u.photo_profile as "photo_profile",
    u.full_name as "full_name",
    u.phone_number as "phone_number"
    from users u`
    const values = [parseInt(query.page) || 1];
    const conditions = [];
    if (query.name) {
        conditions.push(`u.full_name ILIKE $${values.length + 1} `);
        values.push(`%${query.name}%`);
    }
    if (query.phone) {
        conditions.push(`u.phone_number = $${values.length + 1} `);
        values.push(`%${query.phone}%`);
    }
    if (conditions.length > 0) {
        sql += ` where ${conditions[0]}`;
    }
    const sortColumn = query.sortBy || 'u.id';
    const sortOrder = query.sortOrder === 'desc' ? 'DESC' : 'ASC';
    sql += ` ORDER BY ${sortColumn} ${sortOrder}`;
    sql += ` LIMIT 8 OFFSET ($1 * 8) - 8`;
    return db.query(sql, values);
}
const totalData = (query) => {
    let sql = `SELECT COUNT(*) AS "total_user" FROM users u`;
    const values = [];
    const conditions = [];
    if (query.name) {
        conditions.push(`u.full_name ILIKE $${values.length + 1} `);
        values.push(`%${query.user_name}%`);
    }
    if (query.phone) {
        conditions.push(`u.phone_number = $${values.length + 1} `);
        values.push(`%${query.phone}%`);
    }
    if (conditions.length > 0) {
        sql += ` where ${conditions[0]}`;
    }
    return db.query(sql, values)

}
const readProfile = (id) => {
    const sql = `select u.id as "No",
    u.photo_profile as "photo_profile",
    u.email as "email",
    u.full_name as "full_name",
    ub.balance as "balance",
    u.phone_number as "phone_number"
    from users u
    join
    user_balance ub 
    on
    u.id = ub.user_id
    where u.id = $1`
    const value = [id]
    return db.query(sql, value)
}
const sensitiveProfile = (id) => {
    const sql = `select u.id as "No",
    u.full_name as "full_name",
    u.pwd as "password",
    u.pin as "pin"
    from users u
    where u.id = $1`
    const values = [id]
    return db.query(sql, values)
}
const updateProfile = (id, body, hashedPwd, fileLink) => {
    let sql = "update users set "
    const values = [id];
    let i = 1;
    if (!body.last_password && !body.new_password )
    for (const [key, value] of Object.entries(body)) {
        if (key !== "pwd") {
        sql += `${key} = $${i + 1}, `;
        values.push(value);
        i++;
        }
    }
  if (hashedPwd) {
    sql += `pwd = $${i + 1}, `;
    values.push(hashedPwd);
  }
  if (fileLink) {
    sql += `photo_profile = $${i + 1}, `;
    values.push(fileLink);
    i++;
  }
  sql += `updated_at = now() WHERE id = $1 returning full_name`;
  return db.query(sql, values);
}
const updatePin = (id, pin) => {
    const sql = "update users set pin = $2 where id = $1";
    const values = [id, pin];
    return db.query(sql, values)
}

module.exports = {readUsers, totalData, readProfile, sensitiveProfile, updateProfile, updatePin}