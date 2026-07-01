const { runQuery } = require('../../../utils/runQuery');
const annualExpenditureReportModel = {
	// Create a new record using raw SQL query
	create: (pool, createData) => {
		const q = `
            INSERT INTO ps_n_3_annual_expenditure_report (
                year,
                data_list,
                
                man_days_created,
                tharav_number,
                approval_order_number
            ) VALUES (?);
            `;

		const insertArray = [
			createData.year,
			JSON.stringify(createData.data_list), // Ensure the data_list is stored as a JSON string
			createData.man_days_created,
			createData.tharav_number,
			createData.approval_order_number
		];

		return runQuery(pool, q, [insertArray]);
	},

	// Update an existing record using raw SQL query
	update: (pool, updateData) => {
		const q = `
            UPDATE ps_n_3_annual_expenditure_report
            SET
                year = ?,
                data_list = ?,

                man_days_created = ?,
                tharav_number = ?,
                approval_order_number = ?
            WHERE id = ?;
            `;

		const updateArray = [
			updateData.year,
			JSON.stringify(updateData.data_list), // Ensure the data_list is updated as a JSON string
			updateData.man_days_created,
			updateData.tharav_number,
			updateData.approval_order_number,
			updateData.id
		];

		return runQuery(pool, q, updateArray);
	},

	// Get records by year using raw SQL query
	getByYear: (pool, year) => {
		const q = `
            SELECT 
                * 
            FROM ps_n_3_annual_expenditure_report
            WHERE year = ?;
            `;

		return runQuery(pool, q, [year]);
	}
};

module.exports = annualExpenditureReportModel;
