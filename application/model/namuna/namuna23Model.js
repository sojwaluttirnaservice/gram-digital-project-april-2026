const pool = require('../../config/db-connect-migration');
const { runQuery } = require('../../utils/runQuery');
// Using the connection pool

const namuna23Model = {
	// Save a new record
	saveNamuna23Details: (pool, data) => {
		const query = `
                INSERT INTO ps_namuna_23 (
                    month,
                    year,
                    road_name,
                    start_village,
                    end_village,
                    length_km,
                    width_km,
                    road_type,
                    completion_date,
                    cost_per_km,
                    ongoing_repairs_cost,
                    ongoing_repairs_form,
                    special_repairs_cost,
                    special_repairs_form,
                    original_construction_cost,
                    original_construction_form,
                    remarks
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
		const insertArray = [
			data.month,
			data.year,
			data.road_name,
			data.start_village,
			data.end_village,
			data.length_km,
			data.width_km,
			data.road_type,
			data.completion_date,
			data.cost_per_km,
			data.ongoing_repairs_cost,
			data.ongoing_repairs_form,
			data.special_repairs_cost,
			data.special_repairs_form,
			data.original_construction_cost,
			data.original_construction_form,
			data.remarks
		];

		return runQuery(pool, query, insertArray);
	},

	// Update an existing record by ID
	updateNamuna23Details: (pool, data) => {
		const query = `
                UPDATE ps_namuna_23
                SET 
                    month = ?,
                    year = ?,
                    road_name = ?,
                    start_village = ?,
                    end_village = ?,
                    length_km = ?,
                    width_km = ?,
                    road_type = ?,
                    completion_date = ?,
                    cost_per_km = ?,
                    ongoing_repairs_cost = ?,
                    ongoing_repairs_form = ?,
                    special_repairs_cost = ?,
                    special_repairs_form = ?,
                    original_construction_cost = ?,
                    original_construction_form = ?,
                    remarks = ?
                WHERE id = ?
            `;
		const updateArray = [
			data.month,
			data.year,
			data.road_name,
			data.start_village,
			data.end_village,
			data.length_km,
			data.width_km,
			data.road_type,
			data.completion_date,
			data.cost_per_km,
			data.ongoing_repairs_cost,
			data.ongoing_repairs_form,
			data.special_repairs_cost,
			data.special_repairs_form,
			data.original_construction_cost,
			data.original_construction_form,
			data.remarks,
			data.id
		];

		return runQuery(pool, query, updateArray);
	},

	// Fetch all records
	fetchAllNamuna23Details: (pool) => {
		const query = `SELECT *,
                IFNULL(DATE_FORMAT(completion_date, '%d-%m-%Y'), 'Invalid Date') AS _completion_date
                 FROM ps_namuna_23`;
		return runQuery(pool, query);
	},

	fetchNamuna23DetailsByYearRange: (pool, fromYear, toYear) => {
		const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(completion_date, '%d-%m-%Y'), 'Invalid Date') AS _completion_date
                FROM ps_namuna_23
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
	fetchNamuna23DetailsByMonthAndYear: (pool, month, year) => {
		const query = `
                SELECT *,
                IFNULL(DATE_FORMAT(completion_date, '%d-%m-%Y'), 'Invalid Date') AS _completion_date FROM ps_namuna_23
                WHERE month = ? AND year = ?
            `;
		return runQuery(pool, query, [month, year]);
	},

	// Fetch records for a specific year
	fetchNamuna23DetailsByYear: (pool, year) => {
		const query = `
                SELECT *,
                IFNULL(DATE_FORMAT(completion_date, '%d-%m-%Y'), 'Invalid Date') AS _completion_date FROM ps_namuna_23
                WHERE year = ?
            `;
		return runQuery(pool, query, [year]);
	},

	// Fetch record by ID
	fetchNamuna23DetailsById: (pool, id) => {
		const query = `
            SELECT *,
                IFNULL(DATE_FORMAT(completion_date, '%d-%m-%Y'), 'Invalid Date') AS _completion_date
             FROM ps_namuna_23
            WHERE id = ?
        `;
		return runQuery(pool, query, [id]);
	},

	// Delete record by ID
	deleteNamuna23DetailsById: (pool, id) => {
		const query = `DELETE FROM ps_namuna_23 WHERE id = ?`;
		return runQuery(pool, query, [id]);
	}
};

module.exports = namuna23Model;
