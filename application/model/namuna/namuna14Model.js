const { runQuery } = require('../../utils/runQuery');
const namuna14Model = {
	// Save a new record for Namuna 14
	saveNamuna14Details: (pool, data) => {
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
			data.remarks
		];

		return runQuery(pool, query, insertArray);
	},

	// Update an existing record by ID for Namuna 14
	updateNamuna14Details: (pool, data) => {
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
			data.id
		];

		return runQuery(pool, query, updateArray);
	},

	// Delete record by ID for Namuna 14
	deleteNamuna14DetailsById: (pool, id) => {
		const query = `DELETE FROM ps_namuna_14 WHERE id = ?`;
		return runQuery(pool, query, [id]);
	},

	// Fetch all records for Namuna 14 with formatted dates
	fetchAllNamuna14Details: (pool) => {
		const query = `
                SELECT *, 
                    IFNULL(DATE_FORMAT(date, '%d-%m-%Y'), 'Invalid Date') AS _date,
                    IFNULL(DATE_FORMAT(receipt_date, '%d-%m-%Y'), 'Invalid Date') AS _receipt_date
                FROM ps_namuna_14
            `;
		return runQuery(pool, query);
	},

	// Fetch records for specific month and year with formatted dates
	fetchNamuna14DetailsByMonthAndYear: (pool, month, year) => {
		const query = `
                SELECT *, 
                    IFNULL(DATE_FORMAT(date, '%d-%m-%Y'), 'Invalid Date') AS _date,
                    IFNULL(DATE_FORMAT(receipt_date, '%d-%m-%Y'), 'Invalid Date') AS _receipt_date
                FROM ps_namuna_14
                WHERE month = ? AND year = ?
            `;
		return runQuery(pool, query, [month, year]);
	},

	// Fetch records for a specific year with formatted dates
	fetchNamuna14DetailsByYear: (pool, year) => {
		const query = `
                SELECT *, 
                    IFNULL(DATE_FORMAT(date, '%d-%m-%Y'), 'Invalid Date') AS _date,
                    IFNULL(DATE_FORMAT(receipt_date, '%d-%m-%Y'), 'Invalid Date') AS _receipt_date
                FROM ps_namuna_14
                WHERE year = ?
            `;
		return runQuery(pool, query, [year]);
	},

	// Fetch record by ID with formatted dates for Namuna 14
	fetchNamuna14DetailsById: (pool, id) => {
		const query = `
                SELECT *, 
                    IFNULL(DATE_FORMAT(date, '%d-%m-%Y'), 'Invalid Date') AS _date,
                    IFNULL(DATE_FORMAT(receipt_date, '%d-%m-%Y'), 'Invalid Date') AS _receipt_date
                FROM ps_namuna_14
                WHERE id = ?
            `;
		return runQuery(pool, query, [id]);
	}
};

module.exports = namuna14Model;
