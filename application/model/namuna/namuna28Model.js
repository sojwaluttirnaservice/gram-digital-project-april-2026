const { runQuery } = require('../../utils/runQuery');
const namuna28Model = {
	// Save a new record
	saveNamuna28Details: (pool, data) => {
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
			data.dw_5_remarks
		];

		return runQuery(pool, query, [insertArray]);
	},

	// Update an existing record by ID
	updateNamuna28Details: (pool, data) => {
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
			data.id
		];

		return runQuery(pool, query, updateArray);
	},

	// Fetch all records
	fetchAllNamuna28Details: (pool) => {
		const query = `
                SELECT * 
                FROM ps_namuna_28
            `;
		return runQuery(pool, query);
	},

	fetchNamuna28DetailsByYearRange: (pool, fromYear, toYear) => {
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

		return runQuery(pool, query, [fromYear, fromYear, toYear, toYear]);
	},

	// Fetch records for specific month and year
	fetchNamuna28DetailsByMonthAndYear: (pool, month, year) => {
		const query = `
                SELECT * 
                FROM ps_namuna_28
                WHERE month = ? AND year = ?
            `;
		return runQuery(pool, query, [month, year]);
	},

	// Fetch records for a specific year
	fetchNamuna28DetailsByYear: (pool, year) => {
		const query = `
                SELECT * 
                FROM ps_namuna_28
                WHERE year = ?
            `;
		return runQuery(pool, query, [year]);
	},

	// Fetch record by ID
	fetchNamuna28DetailsById: (pool, id) => {
		const query = `
                SELECT * 
                FROM ps_namuna_28
                WHERE id = ?
            `;
		return runQuery(pool, query, [id]);
	},

	// Delete record by ID
	deleteNamuna28DetailsById: (pool, id) => {
		const query = `DELETE FROM ps_namuna_28 WHERE id = ?`;
		return runQuery(pool, query, [id]);
	}
};

module.exports = namuna28Model;
