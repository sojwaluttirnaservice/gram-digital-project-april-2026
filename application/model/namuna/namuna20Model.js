const pool = require('../../config/db-connect-migration');
const { runQuery } = require('../../utils/runQuery');

const namuna20Model = {
	// Save a new record
	saveNamuna20Details: (pool, data) => {
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
			data.remarks
		];

		return runQuery(pool, query, insertArray);
	},

	// Update an existing record by ID
	updateNamuna20Details: (pool, data) => {
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

		return runQuery(pool, query, [
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
			data.id
		]);
	},

	// Fetch all records
	fetchAllNamuna20Details: (pool) => {
		const query = `SELECT *
                             FROM ps_namuna_20`;
		return runQuery(pool, query);
	},

	// Fetch all for financial year
	fetchNamuna20DetailsByFinancialYear: (pool, fromYear, toYear) => {
		const query = `
                SELECT * FROM ps_namuna_20
                WHERE 
                    (year = ? AND month BETWEEN 4 AND 12)
                    OR
                    (year = ? AND month BETWEEN 1 AND 3)
            `;
		return runQuery(pool, query, [fromYear, toYear]);
	},

	// Fetch all for month and year
	fetchAllNamuna20DetailsByMonthAndYear: (pool, month, year) => {
		const query = `SELECT *
                            FROM ps_namuna_20 WHERE month = ? AND year = ?`;
		return runQuery(pool, query, [month, year]);
	},

	// Fetch all for month and year
	fetchAllNamuna20DetailsByYear: (pool, month, year) => {
		const query = `SELECT *
                            FROM ps_namuna_20 WHERE year = ?`;
		return runQuery(pool, query, [year]);
	},
	// Fetch a record by ID
	fetchNamuna20DetailsById: (pool, id) => {
		const query = `SELECT * FROM ps_namuna_20 WHERE id = ?`;
		return runQuery(pool, query, [id]);
	},

	// Delete a record by ID
	deleteNamuna20Details: (pool, id) => {
		const query = `DELETE FROM ps_namuna_20 WHERE id = ?`;
		return runQuery(pool, query, [id]);
	}
};

module.exports = namuna20Model;
