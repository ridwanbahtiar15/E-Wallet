const db = require("../Configs/postgre");

const register = (body, hashedPassword, otp) => {
    const sql =
        "insert into users(user_name, user_email, user_password, user_pin, user_phone, user_otp) VALUES ($1, $2, $3, $4, $5, $6) returning id, user_name";
    const values = [body.name, body.email, hashedPassword, body.pin, body.phone, otp];
    return db.query(sql, values)
}
const selectUsers = (email) => {
    const sql = "select id, user_photo, user_name, user_password, user_pin, user_phone, user_activated, user_otp from users where user_email = $1";
    const values = [email];
    return db.query(sql, values)
}
const activating = (email) => {
    const sql = "update users set user_activated = true where user_email = $1";
    const value = [email]
    return db.query(sql, value)
}
const blacklistToken = (token) => {
    const sql = "insert into blacklist (jwt_code) values ($1)";
    const value = [token];
    return db.query(sql,value)
}



module.exports = {register, selectUsers, activating};