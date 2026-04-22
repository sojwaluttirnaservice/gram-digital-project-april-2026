const namuna29Model = {
    // Save a new record
    saveNamuna29Details: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO ps_namuna_29 (
                    month,
                    year,
                    borrower_name, 
                    loan_sources, 
                    loan_approval_order_number, 
                    loan_approval_order_date, 
                    loan_purpose, 
                    loan_amount, 
                    interest_rate, 
                    loan_received_date,

                    number_of_installments,
                    installment_start_date,
                    installment_amount,
                    installment_interest

                ) VALUES (?)
            `;

            const insertArray = [
                data.month,
                data.year,
                data.borrower_name, // borrower_name
                data.loan_sources, // loan_sources
                data.loan_approval_order_number, // loan_approval_order_number
                data.loan_approval_order_date, // loan_approval_order_date
                data.loan_purpose, // loan_purpose
                data.loan_amount, // loan_amount
                data.interest_rate, // interest_rate
                data.loan_received_date, // loan_received_date

                data.number_of_installments,
                data.installment_start_date,
                data.installment_amount,
                data.installment_interest,
            ];

            pool.query(query, [insertArray], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // save installment record corresponding to the above loan entry

    saveNamuna29InstallmentDetails: (pool, installmentData) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO ps_namuna_29_installment (
                    namuna_29_loan_id_fk,
                    installment_month,
                    installment_year,
                    installment_principal,
                    installment_interest_amount,
                    disbursement_date,
                    disbursement_principal,
                    disbursement_interest,
                    total_balance,
                    balance_principal,
                    balance_interest,
                    remarks
                ) VALUES (?)`;

            const insertArray = [
                installmentData.namuna_29_loan_id_fk,
                installmentData.installment_month,
                installmentData.installment_year,
                installmentData.installment_principal,
                installmentData.installment_interest_amount,
                installmentData.disbursement_date,
                installmentData.disbursement_principal,
                installmentData.disbursement_interest,
                installmentData.total_balance,
                installmentData.balance_principal,
                installmentData.balance_interest,
                installmentData.remarks,
            ];

            pool.query(query, [insertArray], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
    // Update an existing record by ID
    updateNamuna29Details: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE ps_namuna_29
                SET 
                    month = ?,
                    year = ?,
                    borrower_name = ?,
                    loan_sources = ?,
                    loan_approval_order_number = ?,
                    loan_approval_order_date = ?,
                    loan_purpose = ?,
                    loan_amount = ?,
                    interest_rate = ?,
                    loan_received_date = ?,
                    number_of_installments = ?,
                    installment_start_date  = ?,
                    installment_amount  = ?,
                    installment_interest  = ?
                WHERE id = ?
            `;

            const updateArray = [
                data.month,
                data.year,
                data.borrower_name, // borrower_name
                data.loan_sources, // loan_sources
                data.loan_approval_order_number, // loan_approval_order_number
                data.loan_approval_order_date, // loan_approval_order_date
                data.loan_purpose, // loan_purpose
                data.loan_amount, // loan_amount
                data.interest_rate, // interest_rate
                data.loan_received_date, // loan_received_date

                data.number_of_installments,
                data.installment_start_date,
                data.installment_amount,
                data.installment_interest,

                data.id, // id (for identifying which record to update)
            ];

            pool.query(query, updateArray, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    updateNamuna29InstallmentDetails: (pool, installmentData) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE ps_namuna_29_installment
                SET
                    installment_month = ?,
                    installment_year = ?,
                    installment_principal = ?,
                    installment_interest_amount = ?,
                    disbursement_date = ?,
                    disbursement_principal = ?,
                    disbursement_interest = ?,
                    total_balance = ?,
                    balance_principal = ?,
                    balance_interest = ?,
                    remarks = ?
                WHERE id = ?`;

            const updateArray = [
                installmentData.installment_month,
                installmentData.installment_year,
                installmentData.installment_principal,
                installmentData.installment_interest_amount,
                installmentData.disbursement_date,
                installmentData.disbursement_principal,
                installmentData.disbursement_interest,
                installmentData.total_balance,
                installmentData.balance_principal,
                installmentData.balance_interest,
                installmentData.remarks,
                installmentData.id, // Identifying the record to update solely by its id
            ];

            pool.query(query, updateArray, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch all records
    fetchAllNamuna29Details: (pool) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(loan_approval_order_date, '%d-%m-%Y'), '') AS _loan_approval_order_date,
                    IFNULL(DATE_FORMAT(loan_received_date, '%d-%m-%Y'), '') AS _loan_received_date,
                    IFNULL(DATE_FORMAT(installment_start_date, '%d-%m-%Y'), '') AS _installment_start_date
                FROM ps_namuna_29;
            `;
            pool.query(query, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchNamuna29DetailsByYearRange: (pool, fromYear, toYear) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *, 
                    IFNULL(DATE_FORMAT(loan_approval_order_date, '%d-%m-%Y'), '') AS _loan_approval_order_date,
                    IFNULL(DATE_FORMAT(loan_received_date, '%d-%m-%Y'), '') AS _loan_received_date,
                    IFNULL(DATE_FORMAT(installment_start_date, '%d-%m-%Y'), '') AS _installment_start_date
                FROM ps_namuna_29
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
    fetchNamuna29DetailsByMonthAndYear: (pool, month, year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(loan_approval_order_date, '%d-%m-%Y'), '') AS _loan_approval_order_date,
                    IFNULL(DATE_FORMAT(loan_received_date, '%d-%m-%Y'), '') AS _loan_received_date,
                    IFNULL(DATE_FORMAT(installment_start_date, '%d-%m-%Y'), '') AS _installment_start_date,
                    IFNULL(DATE_FORMAT(disbursement_date, '%d-%m-%Y'), '') AS _disbursement_date
                FROM ps_namuna_29 AS p29
                INNER JOIN ps_namuna_29_installment AS p29inst
                    ON p29.id = p29inst.namuna_29_loan_id_fk
                
                WHERE
                 p29.id = p29inst.namuna_29_loan_id_fk
                    AND p29inst.installment_month = ? 
                    AND p29inst.installment_year = ? ;

            `;
            pool.query(query, [month, year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch records for a specific year
    fetchNamuna29DetailsByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * ,
                 IFNULL(DATE_FORMAT(loan_approval_order_date, '%d-%m-%Y'), '') AS _loan_approval_order_date,
                    IFNULL(DATE_FORMAT(loan_received_date, '%d-%m-%Y'), '') AS _loan_received_date,
                    IFNULL(DATE_FORMAT(installment_start_date, '%d-%m-%Y'), '') AS _installment_start_date
                FROM ps_namuna_29
                WHERE year = ?
            `;
            pool.query(query, [year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch record by ID
    fetchNamuna29DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * ,
                 IFNULL(DATE_FORMAT(loan_approval_order_date, '%d-%m-%Y'), '') AS _loan_approval_order_date,
                    IFNULL(DATE_FORMAT(loan_received_date, '%d-%m-%Y'), '') AS _loan_received_date,
                    IFNULL(DATE_FORMAT(installment_start_date, '%d-%m-%Y'), '') AS _installment_start_date

                    
                FROM ps_namuna_29
                WHERE id = ?
            `;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchNamuna29InstallmentDetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * ,
                 IFNULL(DATE_FORMAT(disbursement_date, '%d-%m-%Y'), '') AS _disbursement_date                    
                FROM ps_namuna_29_installment
                WHERE id = ?
            `;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchAllInstallmentsForLoan: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * ,
                 IFNULL(DATE_FORMAT(disbursement_date, '%d-%m-%Y'), '') AS _disbursement_date                    
                FROM ps_namuna_29_installment
                WHERE namuna_29_loan_id_fk = ?
            `;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Delete record by ID
    deleteNamuna29DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ps_namuna_29 WHERE id = ?`;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    deleteNamuna29InstallmentDetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ps_namuna_29_installment WHERE id = ?`;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
};

module.exports = namuna29Model;
