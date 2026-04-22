const mysql = require('mysql2/promise');
require('dotenv').config({ path: './bin/.env' });

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_POST || 3306, // Default to 3306 if not set
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 30000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    multipleStatements: true, // 👈 Add this
});

module.exports = db;
