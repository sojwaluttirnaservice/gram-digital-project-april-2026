const pool = require('../../config/db-connect-migration');

const namuna20Model = {
    // Save a new record
    saveNamuna20Details: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO ps_namuna_20 (
                    month,
                    year,
                    quantity,
                    item_description,
                    rate,
                    per_unit,
                    amount,
                    serial_number,
                    length,
                    width,
                    depth,
                    calculated_quantity,
                    total,
                    remarks
                ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            `;

            const insertArray = [
                data.month,
                data.year,
                data.quantity,
                data.item_description,
                data.rate,
                data.per_unit,
                data.amount,
                data.serial_number,
                data.length,
                data.width,
                data.depth,
                data.calculated_quantity,
                data.total,
                data.remarks,
            ];

            pool.query(query, insertArray, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Update an existing record by ID
    updateNamuna20Details: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE ps_namuna_20
                SET 
                    month = ?,
                    year = ?,
                    quantity = ?,
                    item_description = ?,
                    rate = ?,
                    per_unit = ?,
                    amount = ?,
                    serial_number = ?,
                    length = ?,
                    width = ?,
                    depth = ?,
                    calculated_quantity = ?,
                    total = ?,
                    remarks = ?
                WHERE id = ?
            `;

            pool.query(
                query,
                [
                    data.month,
                    data.year,
                    data.quantity,
                    data.item_description,
                    data.rate,
                    data.per_unit,
                    data.amount,
                    data.serial_number,
                    data.length,
                    data.width,
                    data.depth,
                    data.calculated_quantity,
                    data.total,
                    data.remarks,
                    data.id,
                ],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },

    // Fetch all records
    fetchAllNamuna20Details: (pool) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT *
                             FROM ps_namuna_20`;
            pool.query(query, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch all for month and year
    fetchAllNamuna20DetailsByMonthAndYear: (pool, month, year) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT *
                            FROM ps_namuna_20 WHERE month = ? AND year = ?`;
            pool.query(query, [month, year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch all for month and year
    fetchAllNamuna20DetailsByYear: (pool, month, year) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT *
                             FROM ps_namuna_20 WHERE year = ?`;
            pool.query(query, [year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
    // Fetch a record by ID
    fetchNamuna20DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ps_namuna_20 WHERE id = ?`;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Delete a record by ID
    deleteNamuna20Details: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ps_namuna_20 WHERE id = ?`;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
};

module.exports = namuna20Model;
