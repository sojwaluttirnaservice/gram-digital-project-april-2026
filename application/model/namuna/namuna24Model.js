const { runQuery } = require('../../utils/runQuery');
const namuna24Model = {
	// Save a new record
	saveNamuna24Details: (pool, data) => {
		const query = `
                INSERT INTO ps_namuna_24 (
                    month,
                    year,
                    transaction_date,
                    transaction_reason,
                    from_party,
                    agreement_reference,
                    land_area,
                    survey_number,
                    land_valuation,
                    land_boundaries,
                    land_and_building_purchase,
                    disposal_of_land_and_building,
                    transaction_amount_from_sale,
                    certificate_number,
                    certificate_date,
                    resolution_number,
                    resolution_date,
                    authority_order_number,
                    authority_order_date,
                    remarks
                ) VALUES (?)
            `;
		const insertArray = [
			data.month,
			data.year,
			data.transaction_date,
			data.transaction_reason,
			data.from_party,
			data.agreement_reference,
			data.land_area,
			data.survey_number,
			data.land_valuation,
			data.land_boundaries,
			data.land_and_building_purchase,
			data.disposal_of_land_and_building,
			data.transaction_amount_from_sale,
			data.certificate_number,
			data.certificate_date,
			data.resolution_number,
			data.resolution_date,
			data.authority_order_number,
			data.authority_order_date,
			data.remarks
		];

		return runQuery(pool, query, [insertArray]);
	},
	// Update an existing record by ID
	updateNamuna24Details: (pool, data) => {
		const query = `
                UPDATE ps_namuna_24
                SET 
                    month = ?,
                    year = ?,
                    transaction_date = ?,
                    transaction_reason = ?,
                    from_party = ?,
                    agreement_reference = ?,
                    land_area = ?,
                    survey_number = ?,
                    land_valuation = ?,
                    land_boundaries = ?,
                    land_and_building_purchase = ?,
                    disposal_of_land_and_building = ?,
                    transaction_amount_from_sale = ?,
                    certificate_number = ?,
                    certificate_date = ?,
                    resolution_number = ?,
                    resolution_date = ?,
                    authority_order_number = ?,
                    authority_order_date = ?,
                    remarks = ?
                WHERE id = ?
            `;
		const updateArray = [
			data.month,
			data.year,
			data.transaction_date,
			data.transaction_reason,
			data.from_party,
			data.agreement_reference,
			data.land_area,
			data.survey_number,
			data.land_valuation,
			data.land_boundaries,
			data.land_and_building_purchase,
			data.disposal_of_land_and_building,
			data.transaction_amount_from_sale,
			data.certificate_number,
			data.certificate_date,
			data.resolution_number,
			data.resolution_date,
			data.authority_order_number,
			data.authority_order_date,
			data.remarks,
			data.id
		];

		return runQuery(pool, query, updateArray);
	},
	// Fetch all records
	fetchAllNamuna24Details: (pool) => {
		const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(transaction_date, '%d-%m-%Y'), 'Invalid Date') AS _transaction_date,
                    IFNULL(DATE_FORMAT(certificate_date, '%d-%m-%Y'), 'Invalid Date') AS _certificate_date,
                    IFNULL(DATE_FORMAT(resolution_date, '%d-%m-%Y'), 'Invalid Date') AS _resolution_date,
                    IFNULL(DATE_FORMAT(authority_order_date, '%d-%m-%Y'), 'Invalid Date') AS _authority_order_date
                FROM ps_namuna_24
            `;
		return runQuery(pool, query);
	},

	fetchNamuna24DetailsByYearRange: (pool, fromYear, toYear) => {
		const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(transaction_date, '%d-%m-%Y'), 'Invalid Date') AS _transaction_date,
                    IFNULL(DATE_FORMAT(certificate_date, '%d-%m-%Y'), 'Invalid Date') AS _certificate_date,
                    IFNULL(DATE_FORMAT(resolution_date, '%d-%m-%Y'), 'Invalid Date') AS _resolution_date,
                    IFNULL(DATE_FORMAT(authority_order_date, '%d-%m-%Y'), 'Invalid Date') AS _authority_order_date
                FROM ps_namuna_24
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
	fetchNamuna24DetailsByMonthAndYear: (pool, month, year) => {
		const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(transaction_date, '%d-%m-%Y'), 'Invalid Date') AS _transaction_date,
                    IFNULL(DATE_FORMAT(certificate_date, '%d-%m-%Y'), 'Invalid Date') AS _certificate_date,
                    IFNULL(DATE_FORMAT(resolution_date, '%d-%m-%Y'), 'Invalid Date') AS _resolution_date,
                    IFNULL(DATE_FORMAT(authority_order_date, '%d-%m-%Y'), 'Invalid Date') AS _authority_order_date
                FROM ps_namuna_24
                WHERE month = ? AND year = ?
            `;
		return runQuery(pool, query, [month, year]);
	},
	// Fetch records for a specific year
	fetchNamuna24DetailsByYear: (pool, year) => {
		const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(transaction_date, '%d-%m-%Y'), 'Invalid Date') AS _transaction_date,
                    IFNULL(DATE_FORMAT(certificate_date, '%d-%m-%Y'), 'Invalid Date') AS _certificate_date,
                    IFNULL(DATE_FORMAT(resolution_date, '%d-%m-%Y'), 'Invalid Date') AS _resolution_date,
                    IFNULL(DATE_FORMAT(authority_order_date, '%d-%m-%Y'), 'Invalid Date') AS _authority_order_date
                FROM ps_namuna_24
                WHERE year = ?
            `;
		return runQuery(pool, query, [year]);
	},
	// Fetch record by ID
	fetchNamuna24DetailsById: (pool, id) => {
		const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(transaction_date, '%d-%m-%Y'), 'Invalid Date') AS _transaction_date,
                    IFNULL(DATE_FORMAT(certificate_date, '%d-%m-%Y'), 'Invalid Date') AS _certificate_date,
                    IFNULL(DATE_FORMAT(resolution_date, '%d-%m-%Y'), 'Invalid Date') AS _resolution_date,
                    IFNULL(DATE_FORMAT(authority_order_date, '%d-%m-%Y'), 'Invalid Date') AS _authority_order_date
                FROM ps_namuna_24
                WHERE id = ?
            `;
		return runQuery(pool, query, [id]);
	},
	// Delete record by ID
	deleteNamuna24DetailsById: (pool, id) => {
		const query = `DELETE FROM ps_namuna_24 WHERE id = ?`;
		return runQuery(pool, query, [id]);
	}
};

module.exports = namuna24Model;
