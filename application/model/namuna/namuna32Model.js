const { runQuery } = require('../../utils/runQuery');
const namuna32Model = {
	// Save a new record
	saveNamuna32Details: (pool, data) => {
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
			data.date_of_receipt
		];

		return runQuery(pool, query, [insertArray]);
	},

	// Update an existing record by ID
	updateNamuna32Details: (pool, data) => {
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
			data.id
		];

		return runQuery(pool, query, updateArray);
	},

	// Fetch all records
	fetchAllNamuna32Details: (pool) => {
		const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(given_original_amount_date, '%d-%m-%Y'), 'Invalid Date') AS _given_original_amount_date,
                    IFNULL(DATE_FORMAT(date_of_receipt, '%d-%m-%Y'), 'Invalid Date') AS _date_of_receipt
                FROM ps_namuna_32;
            `;
		return runQuery(pool, query);
	},

	// Fetch records for a financial year range
	fetchNamuna32DetailsByFinancialYear: (pool, fromYear, toYear) => {
		const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(given_original_amount_date, '%d-%m-%Y'), 'Invalid Date') AS _given_original_amount_date,
                    IFNULL(DATE_FORMAT(date_of_receipt, '%d-%m-%Y'), 'Invalid Date') AS _date_of_receipt
                FROM ps_namuna_32
                WHERE 
                    (year = ? AND month BETWEEN 4 AND 12)
                    OR
                    (year = ? AND month BETWEEN 1 AND 3);
            `;
		return runQuery(pool, query, [fromYear, toYear]);
	},

	// Fetch records for specific month and year
	fetchNamuna32DetailsByMonthAndYear: (pool, month, year) => {
		const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(given_original_amount_date, '%d-%m-%Y'), 'Invalid Date') AS _given_original_amount_date,
                    IFNULL(DATE_FORMAT(date_of_receipt, '%d-%m-%Y'), 'Invalid Date') AS _date_of_receipt
                FROM ps_namuna_32
                WHERE month = ? AND year = ?;
            `;
		return runQuery(pool, query, [month, year]);
	},

	// Fetch records for a specific year
	fetchNamuna32DetailsByYear: (pool, year) => {
		const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(given_original_amount_date, '%d-%m-%Y'), 'Invalid Date') AS _given_original_amount_date,
                    IFNULL(DATE_FORMAT(date_of_receipt, '%d-%m-%Y'), 'Invalid Date') AS _date_of_receipt
                FROM ps_namuna_32
                WHERE year = ?;
            `;
		return runQuery(pool, query, [year]);
	},

	// Fetch record by ID
	fetchNamuna32DetailsById: (pool, id) => {
		const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(given_original_amount_date, '%d-%m-%Y'), 'Invalid Date') AS _given_original_amount_date,
                    IFNULL(DATE_FORMAT(date_of_receipt, '%d-%m-%Y'), 'Invalid Date') AS _date_of_receipt
                FROM ps_namuna_32
                WHERE id = ?;
            `;
		return runQuery(pool, query, [id]);
	},

	// Delete record by ID
	deleteNamuna32DetailsById: (pool, id) => {
		const query = `
                DELETE FROM ps_namuna_32
                WHERE id = ?;
            `;
		return runQuery(pool, query, [id]);
	}
};

module.exports = namuna32Model;
