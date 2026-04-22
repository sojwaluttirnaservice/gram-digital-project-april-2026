var mysql = require('mysql2');
// const dotenv = require("dotenv")

require('dotenv').config({ path: './bin/.env' });

// dotenv.config();

// console.log("------------------------", process.env.DB_POST)
// node-mysql2 module

var myConnection = require('express-myconnection'), // express-myconnection module
    dbOptions = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_POST,
        database: process.env.DB_DATABASE,
        waitForConnections: true,
        connectTimeout: 30000, // Increase timeout to 30 seconds
        queueLimit: 0,
    };

exports.myConnection = myConnection;

exports.dbOptions = dbOptions;
exports.mysql = mysql;
