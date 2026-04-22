const namuna14Model = {
    // Save a new record for Namuna 14
    saveNamuna14Details: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO ps_namuna_14 (
                    month,
                    year,
                    date,
                    certificate_number,
                    received_stamp_value,
                    letter_number,
                    receipt_number,
                    receipt_date,
                    used_stamp_value,
                    daily_balance,
                    remarks
                ) VALUES (?,?,?,?,?,?,?,?,?,?,?)
            `;
            const insertArray = [
                data.month,
                data.year,
                data.date,
                data.certificate_number,
                data.received_stamp_value,
                data.letter_number,
                data.receipt_number,
                data.receipt_date,
                data.used_stamp_value,
                data.daily_balance,
                data.remarks,
            ];

            pool.query(query, insertArray, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Update an existing record by ID for Namuna 14
    updateNamuna14Details: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE ps_namuna_14
                SET 
                    month = ?,
                    year = ?,
                    date = ?,
                    certificate_number = ?,
                    received_stamp_value = ?,
                    letter_number = ?,
                    receipt_number = ?,
                    receipt_date = ?,
                    used_stamp_value = ?,
                    daily_balance = ?,
                    remarks = ?
                WHERE id = ?
            `;
            const updateArray = [
                data.month,
                data.year,
                data.date,
                data.certificate_number,
                data.received_stamp_value,
                data.letter_number,
                data.receipt_number,
                data.receipt_date,
                data.used_stamp_value,
                data.daily_balance,
                data.remarks,
                data.id,
            ];

            pool.query(query, updateArray, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Delete record by ID for Namuna 14
    deleteNamuna14DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ps_namuna_14 WHERE id = ?`;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch all records for Namuna 14 with formatted dates
    fetchAllNamuna14Details: (pool) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *, 
                    IFNULL(DATE_FORMAT(date, '%d-%m-%Y'), 'Invalid Date') AS _date,
                    IFNULL(DATE_FORMAT(receipt_date, '%d-%m-%Y'), 'Invalid Date') AS _receipt_date
                FROM ps_namuna_14
            `;
            pool.query(query, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch records for specific month and year with formatted dates
    fetchNamuna14DetailsByMonthAndYear: (pool, month, year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *, 
                    IFNULL(DATE_FORMAT(date, '%d-%m-%Y'), 'Invalid Date') AS _date,
                    IFNULL(DATE_FORMAT(receipt_date, '%d-%m-%Y'), 'Invalid Date') AS _receipt_date
                FROM ps_namuna_14
                WHERE month = ? AND year = ?
            `;
            pool.query(query, [month, year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch records for a specific year with formatted dates
    fetchNamuna14DetailsByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *, 
                    IFNULL(DATE_FORMAT(date, '%d-%m-%Y'), 'Invalid Date') AS _date,
                    IFNULL(DATE_FORMAT(receipt_date, '%d-%m-%Y'), 'Invalid Date') AS _receipt_date
                FROM ps_namuna_14
                WHERE year = ?
            `;
            pool.query(query, [year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch record by ID with formatted dates for Namuna 14
    fetchNamuna14DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *, 
                    IFNULL(DATE_FORMAT(date, '%d-%m-%Y'), 'Invalid Date') AS _date,
                    IFNULL(DATE_FORMAT(receipt_date, '%d-%m-%Y'), 'Invalid Date') AS _receipt_date
                FROM ps_namuna_14
                WHERE id = ?
            `;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
};

module.exports = namuna14Model;
