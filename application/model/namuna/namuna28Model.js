const namuna28Model = {
    // Save a new record
    saveNamuna28Details: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO ps_namuna_28 (
                    month,
                    year,
                    bc_15_provision,
                    bc_15_income,
                    bc_15_exp_amount,
                    bc_15_expenditure_scheme,
                    bc_15_expenditure_prev_month,
                    bc_15_expenditure_current_month,
                    bc_15_total_expenditure,
                    bc_15_expenditure_percentage,
                    bc_15_remarks,
                    wc_10_provision,
                    wc_10_income,
                    wc_10_exp_amount,
                    wc_10_expenditure_scheme,
                    wc_10_expenditure_prev_month,
                    wc_10_expenditure_current_month,
                    wc_10_total_expenditure,
                    wc_10_expenditure_percentage,
                    wc_10_remarks,
                    dw_5_provision,
                    dw_5_income,
                    dw_5_exp_amount,
                    dw_5_expenditure_scheme,
                    dw_5_expenditure_prev_month,
                    dw_5_expenditure_current_month,
                    dw_5_total_expenditure,
                    dw_5_expenditure_percentage,
                    dw_5_remarks
                ) VALUES (?)
            `;
            const insertArray = [
                data.month,
                data.year,
                data.bc_15_provision,
                data.bc_15_income,
                data.bc_15_exp_amount,
                data.bc_15_expenditure_scheme,
                data.bc_15_expenditure_prev_month,
                data.bc_15_expenditure_current_month,
                data.bc_15_total_expenditure,
                data.bc_15_expenditure_percentage,
                data.bc_15_remarks,
                data.wc_10_provision,
                data.wc_10_income,
                data.wc_10_exp_amount,
                data.wc_10_expenditure_scheme,
                data.wc_10_expenditure_prev_month,
                data.wc_10_expenditure_current_month,
                data.wc_10_total_expenditure,
                data.wc_10_expenditure_percentage,
                data.wc_10_remarks,
                data.dw_5_provision,
                data.dw_5_income,
                data.dw_5_exp_amount,
                data.dw_5_expenditure_scheme,
                data.dw_5_expenditure_prev_month,
                data.dw_5_expenditure_current_month,
                data.dw_5_total_expenditure,
                data.dw_5_expenditure_percentage,
                data.dw_5_remarks,
            ];

            pool.query(query, [insertArray], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Update an existing record by ID
    updateNamuna28Details: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE ps_namuna_28
                SET 
                    month = ?,
                    year = ?,
                    bc_15_provision = ?,
                    bc_15_income = ?,
                    bc_15_exp_amount = ?,
                    bc_15_expenditure_scheme = ?,
                    bc_15_expenditure_prev_month = ?,
                    bc_15_expenditure_current_month = ?,
                    bc_15_total_expenditure = ?,
                    bc_15_expenditure_percentage = ?,
                    bc_15_remarks = ?,
                    wc_10_provision = ?,
                    wc_10_income = ?,
                    wc_10_exp_amount = ?,
                    wc_10_expenditure_scheme = ?,
                    wc_10_expenditure_prev_month = ?,
                    wc_10_expenditure_current_month = ?,
                    wc_10_total_expenditure = ?,
                    wc_10_expenditure_percentage = ?,
                    wc_10_remarks = ?,
                    dw_5_provision = ?,
                    dw_5_income = ?,
                    dw_5_exp_amount = ?,
                    dw_5_expenditure_scheme = ?,
                    dw_5_expenditure_prev_month = ?,
                    dw_5_expenditure_current_month = ?,
                    dw_5_total_expenditure = ?,
                    dw_5_expenditure_percentage = ?,
                    dw_5_remarks = ?
                WHERE id = ?
            `;
            const updateArray = [
                data.month,
                data.year,
                data.bc_15_provision,
                data.bc_15_income,
                data.bc_15_exp_amount,
                data.bc_15_expenditure_scheme,
                data.bc_15_expenditure_prev_month,
                data.bc_15_expenditure_current_month,
                data.bc_15_total_expenditure,
                data.bc_15_expenditure_percentage,
                data.bc_15_remarks,
                data.wc_10_provision,
                data.wc_10_income,
                data.wc_10_exp_amount,
                data.wc_10_expenditure_scheme,
                data.wc_10_expenditure_prev_month,
                data.wc_10_expenditure_current_month,
                data.wc_10_total_expenditure,
                data.wc_10_expenditure_percentage,
                data.wc_10_remarks,
                data.dw_5_provision,
                data.dw_5_income,
                data.dw_5_exp_amount,
                data.dw_5_expenditure_scheme,
                data.dw_5_expenditure_prev_month,
                data.dw_5_expenditure_current_month,
                data.dw_5_total_expenditure,
                data.dw_5_expenditure_percentage,
                data.dw_5_remarks,
                data.id,
            ];

            pool.query(query, updateArray, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch all records
    fetchAllNamuna28Details: (pool) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * 
                FROM ps_namuna_28
            `;
            pool.query(query, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchNamuna28DetailsByYearRange: (pool, fromYear, toYear) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *
                FROM ps_namuna_28
                WHERE
                    (year = ? AND month >= 4)
                    OR
                    (year > ? AND year < ?)
                    OR
                    (year = ? AND month <= 3)
                ORDER BY year ASC, month ASC
            `;

            pool.query(query, [fromYear, fromYear, toYear, toYear], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch records for specific month and year
    fetchNamuna28DetailsByMonthAndYear: (pool, month, year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * 
                FROM ps_namuna_28
                WHERE month = ? AND year = ?
            `;
            pool.query(query, [month, year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch records for a specific year
    fetchNamuna28DetailsByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * 
                FROM ps_namuna_28
                WHERE year = ?
            `;
            pool.query(query, [year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch record by ID
    fetchNamuna28DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * 
                FROM ps_namuna_28
                WHERE id = ?
            `;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Delete record by ID
    deleteNamuna28DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ps_namuna_28 WHERE id = ?`;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
};

module.exports = namuna28Model;
