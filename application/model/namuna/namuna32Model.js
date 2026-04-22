const namuna32Model = {
    // Save a new record
    saveNamuna32Details: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO ps_namuna_32 (
                    month,
                    year,
                    amount_refund_order,
                    certificate_number,
                    receipt_number,
                    given_original_amount_date,
                    amount,
                    amount_to_return,
                    depositor_name,
                    refund_person_name,
                    location,
                    remarks,
                    date_of_receipt
                ) VALUES (?);
            `;
            const insertArray = [
                data.month,
                data.year,
                data.amount_refund_order,
                data.certificate_number,
                data.receipt_number,
                data.given_original_amount_date,
                data.amount,
                data.amount_to_return,
                data.depositor_name,
                data.refund_person_name,
                data.location,
                data.remarks,
                data.date_of_receipt,
            ];

            pool.query(query, [insertArray], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Update an existing record by ID
    updateNamuna32Details: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE ps_namuna_32
                SET
                    month = ?,
                    year = ?,
                    amount_refund_order = ?,
                    certificate_number = ?,
                    receipt_number = ?,
                    given_original_amount_date = ?,
                    amount = ?,
                    amount_to_return = ?,
                    depositor_name = ?,
                    refund_person_name = ?,
                    location = ?,
                    remarks = ?,
                    date_of_receipt = ?
                WHERE id = ?;
            `;
            const updateArray = [
                data.month,
                data.year,
                data.amount_refund_order,
                data.certificate_number,
                data.receipt_number,
                data.given_original_amount_date,
                data.amount,
                data.amount_to_return,
                data.depositor_name,
                data.refund_person_name,
                data.location,
                data.remarks,
                data.date_of_receipt,
                data.id,
            ];

            pool.query(query, updateArray, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch all records
    fetchAllNamuna32Details: (pool) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(given_original_amount_date, '%d-%m-%Y'), 'Invalid Date') AS _given_original_amount_date,
                    IFNULL(DATE_FORMAT(date_of_receipt, '%d-%m-%Y'), 'Invalid Date') AS _date_of_receipt
                FROM ps_namuna_32;
            `;
            pool.query(query, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch records for specific month and year
    fetchNamuna32DetailsByMonthAndYear: (pool, month, year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(given_original_amount_date, '%d-%m-%Y'), 'Invalid Date') AS _given_original_amount_date,
                    IFNULL(DATE_FORMAT(date_of_receipt, '%d-%m-%Y'), 'Invalid Date') AS _date_of_receipt
                FROM ps_namuna_32
                WHERE month = ? AND year = ?;
            `;
            pool.query(query, [month, year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch records for a specific year
    fetchNamuna32DetailsByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(given_original_amount_date, '%d-%m-%Y'), 'Invalid Date') AS _given_original_amount_date,
                    IFNULL(DATE_FORMAT(date_of_receipt, '%d-%m-%Y'), 'Invalid Date') AS _date_of_receipt
                FROM ps_namuna_32
                WHERE year = ?;
            `;
            pool.query(query, [year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch record by ID
    fetchNamuna32DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(given_original_amount_date, '%d-%m-%Y'), 'Invalid Date') AS _given_original_amount_date,
                    IFNULL(DATE_FORMAT(date_of_receipt, '%d-%m-%Y'), 'Invalid Date') AS _date_of_receipt
                FROM ps_namuna_32
                WHERE id = ?;
            `;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Delete record by ID
    deleteNamuna32DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM ps_namuna_32
                WHERE id = ?;
            `;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
};

module.exports = namuna32Model;
