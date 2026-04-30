const mysql = require("mysql2");
const AppError = require("../utils/AppError");

const __alreadyCreatedPools = new Map();

const getPoolConnection = (dbName) => {
  if (!dbName) {
    throw new Error("No db name provided.");
  }

  if (__alreadyCreatedPools.has(dbName)) {
    return __alreadyCreatedPools.get(dbName);
  }

  const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: dbName,
    port: process.env.DB_PORT || 3306,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 30000,
  };

  const pool = mysql.createPool(options);

  // 🔥 PATCH query method ONCE
  const originalQuery = pool.query.bind(pool);

  pool.query = (sql, values, cb) => {
    // handle optional params
    if (typeof values === "function") {
      cb = values;
      values = undefined;
    }

    return originalQuery(sql, values, (err, results, fields) => {
      if (err) {
        if (err.code === "ER_BAD_DB_ERROR") {
          return cb(
            new AppError(`Database '${dbName}' does not exist`, 500)
          );
        }

        return cb(new AppError("Database query failed", 500));
      }

      cb(null, results, fields);
    });
  };

  __alreadyCreatedPools.set(dbName, pool);

  return pool;
};

module.exports = {
  getPoolConnection,
};