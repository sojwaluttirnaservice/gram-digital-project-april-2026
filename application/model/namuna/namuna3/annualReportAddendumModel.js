const { runQuery } = require('../../../utils/runQuery');
const annualReportAddendumModel = {
	// Create a new record using raw SQL query
	create: (pool, createData) => {
		const q = `
            INSERT INTO ps_n_3_annual_report_addendum (
                year,
                data_list
            ) VALUES (?);
            `;

		const insertArray = [
			createData.year,
			JSON.stringify(createData.data_list) // Ensure the data_list is stored as a JSON string
		];

		return runQuery(pool, q, [insertArray]);
	},

	// Update an existing record using raw SQL query
	update: (pool, updateData) => {
		const q = `
            UPDATE ps_n_3_annual_report_addendum
            SET
                year = ?,
                data_list = ?
            WHERE id = ?;
            `;

		const updateArray = [
			updateData.year,
			JSON.stringify(updateData.data_list), // Ensure the data_list is updated as a JSON string
			updateData.id
		];

		return runQuery(pool, q, updateArray);
	},

	// Get records by year using raw SQL query
	getByYear: (pool, year) => {
		const q = `
            SELECT 
                * 
            FROM ps_n_3_annual_report_addendum
            WHERE year = ?;
            `;

		return runQuery(pool, q, [year]);
	}
};

module.exports = annualReportAddendumModel;
