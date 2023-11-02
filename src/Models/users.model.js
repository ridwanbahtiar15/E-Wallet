const db = require("../Configs/postgre");

const readUsers = (query) => {
    let sql = 
    `select u.id as "No",
    u.user_photo as "Photo",
    u.user_name as "Photo",
    u.user_phone as "Photo"
    from users u`
    const values = [parseInt(query.page) || 1];
    const conditions = [];
    if (query.name) {
        conditions.push(`u.user_name ILIKE $${values.length + 1} `);
        values.push(`%${query.user_name}%`);
    }
    if (query.phone) {
        conditions.push(`u.user_phone = $${values.length + 1} `);
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