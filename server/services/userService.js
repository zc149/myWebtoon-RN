const db = require('../db');

const getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT user_id FROM user_info WHERE user_id = ?'

        db.query(sql, [userId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const saveUserById = (userId) => {
    return new Promise((resolve, reject) => {
        const createDate = new Date().toISOString().split('T')[0];

        const sql = 'INSERT INTO user_info (user_id, create_day) VALUES (?, ?)';

        db.query(sql, [userId, createDate], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};


module.exports = {
    getUserById,
    saveUserById,
}