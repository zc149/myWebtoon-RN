const db = require('../db');

const getWebtoonListById = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT webtoon_id, count FROM user_webtoon_record WHERE user_id = ?';

        db.query(sql, [userId], (err, result) => {
            if (err) {
                return reject(err);
            }

            if (result.length === 0) {
                return resolve([]);
            }

            const webtoonIds = result.map(row => row.webtoon_id);

            const sqlWebtoon = 'SELECT * FROM webtoon WHERE id IN (?)';
            db.query(sqlWebtoon, [webtoonIds], (err, webtoonResults) => {
                if (err) {
                    return reject(err);
                }

                // webtoonResults와 count 값을 매핑하여 새로운 배열 생성
                const enrichedResults = webtoonResults.map(webtoon => {
                    const countObj = result.find(row => row.webtoon_id === webtoon.id);
                    return {
                        ...webtoon,
                        count: countObj ? countObj.count : 0
                    };
                });

                resolve(enrichedResults);

            });

        });

    });
};

const saveWebtoonById = (userId, webtoonId, count) => {
    return new Promise((resolve, reject) => {
        const checkSql = 'SELECT * FROM user_webtoon_record WHERE user_id = ? AND webtoon_id = ?';

        db.query(checkSql, [userId, webtoonId], (err, checkResult) => {
            if (err) {
                return reject(err);
            }

            if (checkResult.length === 0) {
                const sql = 'INSERT INTO user_webtoon_record (user_id, webtoon_id, count) VALUES (?, ?, ?)';

                db.query(sql, [userId, webtoonId, count], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            } else {
                resolve({ message: 'Record already exists' });
            }
        });
    });
};

const updateWebtoonById = (userId, webtoonId, count) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE user_webtoon_record SET count =? WHERE user_id = ? and webtoon_id =?'

        db.query(sql, [count, userId, webtoonId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });

    });
};

const deleteWebtoonById = (userId, webtoonId) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM user_webtoon_record WHERE user_id = ? and webtoon_id =?'

        db.query(sql, [userId, webtoonId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });

    });
};

const searchWebtoonByTitle = (title) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM webtoon 
                     WHERE REPLACE(title, ' ', '') LIKE CONCAT('%', REPLACE(?, ' ', ''), '%')
                     AND image_url != ''`;

        db.query(sql, [title], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });

    });
};

const createTempWebtoonByTitle = (title) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO webtoon (title) VALUES (?)';

        db.query(sql, [title], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });

    });
};

module.exports = {
    getWebtoonListById,
    saveWebtoonById,
    updateWebtoonById,
    deleteWebtoonById,
    searchWebtoonByTitle,
    createTempWebtoonByTitle,
}