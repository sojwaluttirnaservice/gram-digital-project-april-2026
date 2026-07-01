const { runQuery } = require('../../../../utils/runQuery');
const namuna1OtherExpendituresModel = {
	// 1. Save other expenditures (Create)
	saveNamuna1OtherExpenditures: (pool, data) => {
		// SQL query to insert data into the table
		const q = `INSERT INTO ps_namuna_1_other_expenditures 
                        (
                            year, 
                            monthly_resolution, 
                            monthly_resolution_date, 
                            backward_class_15_percent_expenditure, 
                            women_and_child_welfare_10_percent_expenditure, 
                            disabled_people_3_percent_expenditure, 
                            district_rural_development_fund_contribution_025_percent, 
                            remarks
                        ) 
                        VALUES 
                        (?, ?, ?, ?, ?, ?, ?, ?)`;

		const insertArray = [
			data.year,
			data.monthly_resolution,
			data.monthly_resolution_date,
			data.backward_class_15_percent_expenditure,
			data.women_and_child_welfare_10_percent_expenditure,
			data.disabled_people_3_percent_expenditure,
			data.district_rural_development_fund_contribution_025_percent,
			data.remarks
		];

		return runQuery(pool, q, insertArray);
	},

	fetchAllNamuna1OtherExpenditures: (pool) => {
		const q = `SELECT *,
                 IFNULL(DATE_FORMAT(monthly_resolution_date, '%d-%m-%Y'), '') AS _monthly_resolution_date
                 FROM ps_namuna_1_other_expenditures`;

		return runQuery(pool, q);
	},

	// 2. Create new other expenditures record
	createNamuna1OtherExpenditures: (pool, data) => {
		const q = `INSERT INTO ps_namuna_1_other_expenditures 
                        (
                            year, 
                            monthly_resolution, 
                            monthly_resolution_date, 
                            backward_class_15_percent_expenditure, 
                            women_and_child_welfare_10_percent_expenditure, 
                            disabled_people_3_percent_expenditure, 
                            district_rural_development_fund_contribution_025_percent, 
                            remarks
                        ) 
                        VALUES 
                        (?, ?, ?, ?, ?, ?, ?, ?)`;

		const insertArray = [
			data.year,
			data.monthly_resolution,
			data.monthly_resolution_date,
			data.backward_class_15_percent_expenditure,
			data.women_and_child_welfare_10_percent_expenditure,
			data.disabled_people_3_percent_expenditure,
			data.district_rural_development_fund_contribution_025_percent,
			data.remarks
		];

		return runQuery(pool, q, insertArray);
	},

	// 3. Update existing other expenditures record by ID
	updateNamuna1OtherExpenditures: (pool, data) => {
		const q = `UPDATE ps_namuna_1_other_expenditures SET 
                        monthly_resolution = ?, 
                        monthly_resolution_date = ?, 
                        backward_class_15_percent_expenditure = ?, 
                        women_and_child_welfare_10_percent_expenditure = ?, 
                        disabled_people_3_percent_expenditure = ?, 
                        district_rural_development_fund_contribution_025_percent = ?, 
                        remarks = ? 
                        WHERE id = ?`;

		const insertArray = [
			data.monthly_resolution,
			data.monthly_resolution_date,
			data.backward_class_15_percent_expenditure,
			data.women_and_child_welfare_10_percent_expenditure,
			data.disabled_people_3_percent_expenditure,
			data.district_rural_development_fund_contribution_025_percent,
			data.remarks,
			data.id
		];

		return runQuery(pool, q, insertArray);
	},

	// 4. Delete other expenditures record by ID
	deleteNamuna1OtherExpenditures: (pool, id) => {
		const q = `DELETE FROM ps_namuna_1_other_expenditures WHERE id = ?`;

		const insertArray = [id];

		return runQuery(pool, q, insertArray);
	},

	// 5. Fetch other expenditures record by year
	fetchNamuna1OtherExpendituresByYear: (pool, year) => {
		const q = `SELECT *,
                IFNULL(DATE_FORMAT(monthly_resolution_date, '%d-%m-%Y'), '') AS _monthly_resolution_date
                 FROM ps_namuna_1_other_expenditures WHERE year = ?`;

		const insertArray = [year];

		return runQuery(pool, q, insertArray);
	},

	// 6. Fetch other expenditures record by ID
	fetchNamuna1OtherExpendituresById: (pool, id) => {
		const q = `SELECT *,
            IFNULL(DATE_FORMAT(monthly_resolution_date, '%d-%m-%Y'), '') AS _monthly_resolution_date
             FROM ps_namuna_1_other_expenditures WHERE id = ?`;

		const insertArray = [id];

		return runQuery(pool, q, insertArray);
	}
};

module.exports = namuna1OtherExpendituresModel;
