const mysql = require('mysql');

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    port: '3306',
    password: '1234',
    database: 'my_webtoon'
})

db.connect((err) => {
    if (err) {
        console.error('데이터베이스 연결 실패:', err);
        return;
    }
});

module.exports = db;