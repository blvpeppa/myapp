const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'users',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to closed server dbms');
        return;
    }
    else {
        console.log('MYSQL server connected')
    }
});
const db = connection.promise();
module.exports = db;