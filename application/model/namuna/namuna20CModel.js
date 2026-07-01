const pool = require('../../config/db-connect-migration');
const { runQuery } = require('../../utils/runQuery');

const namuna20CModel = {
	// Save a new record
	saveNamuna20cMeasurementDetails: (pool, data) => {
		const query = `
                INSERT INTO ps_namuna_20c_measurement_register
                (
                    month,
                    year,
                    measurement,
                    work_description,
                    subhead,
                    sector_authority_name,
                    unit,
                    height,
                    length,
                    width,
                    depth_or_elevation,
                    total,
                    total_measurement,
                    total_quantity,
                    grand_total,
                    rate,
                    amount,
                    remarks
                )
                VALUES (?)
            `;

		const insertArray = [
			data.month,
			data.year,
			data.measurement,
			data.work_description,
			data.subhead,
			data.sector_authority_name,
			data.unit,
			data.height,
			data.length,
			data.width,
			data.depth_or_elevation,
			data.total,
			data.total_measurement,
			data.total_quantity,
			data.grand_total,
			data.rate,
			data.amount,
			data.remarks
		];

		return runQuery(pool, query, [insertArray]);
	},
	// Update an existing record by ID
	updateNamuna20cMeasurementDetails: (pool, data) => {
		const query = `
                UPDATE ps_namuna_20c_measurement_register
                SET 
                    month = ?, 
                    year = ?, 
                    measurement = ?, 
                    work_description = ?, 
                    subhead = ?, 
                    sector_authority_name = ?, 
                    unit = ?, 
                    height = ?, 
                    length = ?, 
                    width = ?, 
                    depth_or_elevation = ?, 
                    total = ?,
                    total_measurement = ?, 
                    total_quantity = ?, 
                    grand_total = ?, 
                    rate = ?, 
                    amount = ?, 
                    remarks = ?
                WHERE id = ?
            `;

		return runQuery(pool, query, [
			data.month,
			data.year,
			data.measurement,
			data.work_description,
			data.subhead,
			data.sector_authority_name,
			data.unit,
			data.height,
			data.length,
			data.width,
			data.depth_or_elevation,
			data.total,
			data.total_measurement,
			data.total_quantity,
			data.grand_total,
			data.rate,
			data.amount,
			data.remarks,
			data.id
		]);
	},

	// Fetch all records
	fetchAllNamuna20cMeasurementDetails: (pool) => {
		const query = `
                SELECT * FROM ps_namuna_20c_measurement_register
            `;
		return runQuery(pool, query);
	},

	// Fetch a record by ID
	fetchNamuna20cMeasurementDetailsById: (pool, id) => {
		const query = `
                SELECT * FROM ps_namuna_20c_measurement_register
                WHERE id = ?
            `;
		return runQuery(pool, query, [id]);
	},

	// Fetch records by financial year range
	fetchNamuna20cMeasurementDetailsByFinancialYear: (
		pool,
		fromYear,
		toYear
	) => {
		const query = `
                SELECT * FROM ps_namuna_20c_measurement_register
                WHERE 
                    (year = ? AND month BETWEEN 4 AND 12)
                    OR
                    (year = ? AND month BETWEEN 1 AND 3)
            `;
		return runQuery(pool, query, [fromYear, toYear]);
	},

	// Fetch records by month and year
	fetchNamuna20cMeasurementDetailsByMonthAndYear: (pool, month, year) => {
		const query = `
                SELECT * FROM ps_namuna_20c_measurement_register
                WHERE month = ? AND year = ?
            `;
		return runQuery(pool, query, [month, year]);
	},

	// Fetch records by year
	fetchNamuna20cMeasurementDetailsByYear: (pool, year) => {
		const query = `
                SELECT * FROM ps_namuna_20c_measurement_register
                WHERE year = ?
            `;
		return runQuery(pool, query, [year]);
	},

	// Delete a record by ID
	deleteNamuna20cMeasurementDetails: (pool, id) => {
		const query = `
                DELETE FROM ps_namuna_20c_measurement_register
                WHERE id = ?
            `;
		return runQuery(pool, query, [id]);
	}
};

module.exports = namuna20CModel;
