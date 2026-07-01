const { runQuery } = require('../../utils/runQuery');
const namuna29Model = {
	// Save a new record
	saveNamuna29Details: (pool, data) => {
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
			data.installment_interest
		];

		return runQuery(pool, query, [insertArray]);
	},

	// save installment record corresponding to the above loan entry

	saveNamuna29InstallmentDetails: (pool, installmentData) => {
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
			installmentData.remarks
		];

		return runQuery(pool, query, [insertArray]);
	},
	// Update an existing record by ID
	updateNamuna29Details: (pool, data) => {
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

			data.id // id (for identifying which record to update)
		];

		return runQuery(pool, query, updateArray);
	},

	updateNamuna29InstallmentDetails: (pool, installmentData) => {
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
			installmentData.id // Identifying the record to update solely by its id
		];

		return runQuery(pool, query, updateArray);
	},

	// Fetch all records
	fetchAllNamuna29Details: (pool) => {
		const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(loan_approval_order_date, '%d-%m-%Y'), '') AS _loan_approval_order_date,
                    IFNULL(DATE_FORMAT(loan_received_date, '%d-%m-%Y'), '') AS _loan_received_date,
                    IFNULL(DATE_FORMAT(installment_start_date, '%d-%m-%Y'), '') AS _installment_start_date
                FROM ps_namuna_29;
            `;
		return runQuery(pool, query);
	},

	fetchNamuna29DetailsByYearRange: (pool, fromYear, toYear) => {
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

		return runQuery(pool, query, [fromYear, fromYear, toYear, toYear]);
	},

	// Fetch records for specific month and year
	fetchNamuna29DetailsByMonthAndYear: (pool, month, year) => {
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
		return runQuery(pool, query, [month, year]);
	},

	// Fetch records for a specific year
	fetchNamuna29DetailsByYear: (pool, year) => {
		const query = `
                SELECT * ,
                 IFNULL(DATE_FORMAT(loan_approval_order_date, '%d-%m-%Y'), '') AS _loan_approval_order_date,
                    IFNULL(DATE_FORMAT(loan_received_date, '%d-%m-%Y'), '') AS _loan_received_date,
                    IFNULL(DATE_FORMAT(installment_start_date, '%d-%m-%Y'), '') AS _installment_start_date
                FROM ps_namuna_29
                WHERE year = ?
            `;
		return runQuery(pool, query, [year]);
	},

	// Fetch record by ID
	fetchNamuna29DetailsById: (pool, id) => {
		const query = `
                SELECT * ,
                 IFNULL(DATE_FORMAT(loan_approval_order_date, '%d-%m-%Y'), '') AS _loan_approval_order_date,
                    IFNULL(DATE_FORMAT(loan_received_date, '%d-%m-%Y'), '') AS _loan_received_date,
                    IFNULL(DATE_FORMAT(installment_start_date, '%d-%m-%Y'), '') AS _installment_start_date

                    
                FROM ps_namuna_29
                WHERE id = ?
            `;
		return runQuery(pool, query, [id]);
	},

	fetchNamuna29InstallmentDetailsById: (pool, id) => {
		const query = `
                SELECT * ,
                 IFNULL(DATE_FORMAT(disbursement_date, '%d-%m-%Y'), '') AS _disbursement_date                    
                FROM ps_namuna_29_installment
                WHERE id = ?
            `;
		return runQuery(pool, query, [id]);
	},

	fetchAllInstallmentsForLoan: (pool, id) => {
		const query = `
                SELECT * ,
                 IFNULL(DATE_FORMAT(disbursement_date, '%d-%m-%Y'), '') AS _disbursement_date                    
                FROM ps_namuna_29_installment
                WHERE namuna_29_loan_id_fk = ?
            `;
		return runQuery(pool, query, [id]);
	},

	// Delete record by ID
	deleteNamuna29DetailsById: (pool, id) => {
		const query = `DELETE FROM ps_namuna_29 WHERE id = ?`;
		return runQuery(pool, query, [id]);
	},

	deleteNamuna29InstallmentDetailsById: (pool, id) => {
		const query = `DELETE FROM ps_namuna_29_installment WHERE id = ?`;
		return runQuery(pool, query, [id]);
	}
};

module.exports = namuna29Model;
