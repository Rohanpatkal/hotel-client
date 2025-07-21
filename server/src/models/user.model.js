const db = require('../config/db');

// get all users...
exports.findUserByEmail = async (email) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows;
    } catch (err) {
        throw err;
    }
};

//it creates new user...
exports.createUser = async (user) => {
    try {
        const result = await db.query('INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',[user.first_name, user.last_name, user.email, user.password]);
        return result;
    } catch (err) {
        throw err;
    }
};