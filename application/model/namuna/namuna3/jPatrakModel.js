const jPatrakModel = {
    // Create a new record using raw SQL query
    create: (pool, createData) => {
        // console.log(createData);
        return new Promise((resolve, reject) => {
            const q = `
            INSERT INTO ps_n_3_j_patrak (
                year,
                gram_panchayat_name,
                year_total_income,
                construction_grant_income,
                net_income_excluding_construction_grant,
                net_income_after_construction_grant,
                outstanding_loan_installment,
                current_loan_installment,
                total_paid_amount,
                date_invoice,
                outstanding_amount,
                remarks
            ) VALUES (?);
            `;

            const insertArray = [
                createData.year,
                createData.gram_panchayat_name,
                createData.year_total_income,
                createData.construction_grant_income,
                createData.net_income_excluding_construction_grant,
                createData.net_income_after_construction_grant,
                createData.outstanding_loan_installment,
                createData.current_loan_installment,
                createData.total_paid_amount,
                createData.date_invoice,
                createData.outstanding_amount,
                createData.remarks
            ];

            pool.query(q, [insertArray], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // Update an existing record using raw SQL query
    update: (pool, updateData) => {
        console.log(updateData);
        return new Promise((resolve, reject) => {
            const q = `
            UPDATE ps_n_3_j_patrak
            SET
                year = ?,
                gram_panchayat_name = ?,
                year_total_income = ?,
                construction_grant_income = ?,
                net_income_excluding_construction_grant = ?,
                net_income_after_construction_grant = ?,
                outstanding_loan_installment = ?,
                current_loan_installment = ?,
                total_paid_amount = ?,
                date_invoice = ?,
                outstanding_amount = ?,
                remarks = ?
            WHERE id = ?;
            `;

            const updateArray = [
                updateData.year,
                updateData.gram_panchayat_name,
                updateData.year_total_income,
                updateData.construction_grant_income,
                updateData.net_income_excluding_construction_grant,
                updateData.net_income_after_construction_grant,
                updateData.outstanding_loan_installment,
                updateData.current_loan_installment,
                updateData.total_paid_amount,
                updateData.date_invoice,
                updateData.outstanding_amount,
                updateData.remarks,
                updateData.id
            ];

            pool.query(q, updateArray, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // Get records by year using raw SQL query
    getByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const q = `
            SELECT 
                *,
                CASE 
                    WHEN date_invoice IS NOT NULL THEN DATE_FORMAT(date_invoice, '%d-%m-%Y')
                    ELSE NULL
                END AS _date_invoice
            FROM ps_n_3_j_patrak
            WHERE year = ?;
            `;

            pool.query(q, [year], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // Get all records
    getAll: (pool) => {
        return new Promise((resolve, reject) => {
            const q = `
            SELECT 
                *,
                CASE 
                    WHEN date_invoice IS NOT NULL THEN DATE_FORMAT(date_invoice, '%d-%m-%Y')
                    ELSE NULL
                END AS _date_invoice
            FROM ps_n_3_j_patrak;

            `;

            pool.query(q, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // Delete a record by ID
    delete: (pool, id) => {
        return new Promise((resolve, reject) => {
            const q = `
            DELETE FROM ps_n_3_j_patrak
            WHERE id = ?;
            `;

            pool.query(q, [id], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    }
};

module.exports = jPatrakModel;
