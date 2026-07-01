const { runQuery } = require('../../../../utils/runQuery');

const namuna1Tapshil1VillageFundCollectionModel = {
	saveVillageCollectionFundsHeaders: (pool, data) => {
		const q = `
                INSERT INTO ps_namuna_1_tapshil_1_collection_of_village_funds_headers (
                    year,
                    item_in_budget_header_name,
                    year_of_estimated_income_of_panchayat,
                    year_of_approved_estimated_amount,
                    year_of_actual_amount_previous_year,
                    year_of_actual_amount_year_before_last
                ) VALUES ?
            `;

		return runQuery(pool, q, [data]);
	},

	updateVillageCollectionFundsHeaders: (pool, data) => {
		const updateQuery = `
                UPDATE ps_namuna_1_tapshil_1_collection_of_village_funds_headers
                SET
                    year = ?, 
                    item_in_budget_header_name = ?,
                    year_of_estimated_income_of_panchayat = ?,
                    year_of_approved_estimated_amount = ?,
                    year_of_actual_amount_previous_year = ?,
                    year_of_actual_amount_year_before_last = ?
                WHERE id = ?;
            `;

		console.log(data);

		return runQuery(pool, updateQuery, [
			data.year, // year
			data.item_in_budget_header_name, // item_in_budget_header_name
			data.year_of_estimated_income_of_panchayat, // year_of_estimated_income_of_panchayat
			data.year_of_approved_estimated_amount, // year_of_approved_estimated_amount
			data.year_of_actual_amount_previous_year, // year_of_actual_amount_previous_year
			data.year_of_actual_amount_year_before_last, // year_of_actual_amount_year_before_last
			data.id // id for WHERE clause (unique identifier)
		]);
	},

	updateSingleVillageFundHeaderEntry: (pool, updateEntry) => {
		console.log('here');
		const q = `
            UPDATE ps_namuna_1_tapshil_1_collection_of_village_funds_headers
            SET
                year = ?,
                item_in_budget_header_name = ?,
                year_of_estimated_income_of_panchayat = ?,
                year_of_approved_estimated_amount = ?,
                year_of_actual_amount_previous_year = ?,
                year_of_actual_amount_year_before_last = ?
            WHERE id = ?`;

		let updateArray = [
			updateEntry.year, // year
			updateEntry.item_in_budget_header_name, // item_in_budget
			updateEntry.year_of_estimated_income_of_panchayat, // estimated_income_of_panchayat
			updateEntry.year_of_approved_estimated_amount, // approved_estimated_amount
			updateEntry.year_of_actual_amount_previous_year, // actual_amount_previous_year
			updateEntry.year_of_actual_amount_year_before_last, // actual_amount_year_before_last
			updateEntry.id // id (for WHERE clause)
		];

		return runQuery(pool, q, updateArray);
	},
	updateNamuna1VillageCollectionFundEntry: (pool, updateEntry) => {
		const q = `
                UPDATE ps_namuna_1_tapshil_1_collection_of_village_funds
                SET
                    year = ?,
                    item_in_budget = ?,
                    estimated_income_of_panchayat = ?,
                    approved_estimated_amount = ?,
                    actual_amount_previous_year = ?,
                    actual_amount_year_before_last = ?,
                    namuna_1_tapshil_1_collection_of_village_funds_headers_id_fk = ?
                WHERE id = ?`;

		let updateArray = [
			updateEntry.year, // year
			updateEntry.item_in_budget, // item_in_budget
			updateEntry.estimated_income_of_panchayat, // estimated_income_of_panchayat
			updateEntry.approved_estimated_amount, // approved_estimated_amount
			updateEntry.actual_amount_previous_year, // actual_amount_previous_year
			updateEntry.actual_amount_year_before_last, // actual_amount_year_before_last
			updateEntry.namuna_1_tapshil_1_collection_of_village_funds_headers_id_fk, // namuna_1_tapshil_1_collection_of_village_funds_headers_id_fk
			updateEntry.id // id (for WHERE clause)
		];

		return runQuery(pool, q, updateArray);
	},

	// Save a new record for Namuna 1 Entries for tapshil 1
	saveVillageCollectionFundsEntries: (pool, data) => {
		const q = `
                  INSERT INTO ps_namuna_1_tapshil_1_collection_of_village_funds (
                    year,
                    item_in_budget,
                    estimated_income_of_panchayat,
                    approved_estimated_amount,
                    actual_amount_previous_year,
                    actual_amount_year_before_last,
                    namuna_1_tapshil_1_collection_of_village_funds_headers_id_fk
                ) VALUES ?;`;

		return runQuery(pool, q, [data]);
	},

	saveSingleVillageFundEntry: (pool, singleFundEntry) => {
		const q = `
                INSERT INTO ps_namuna_1_tapshil_1_collection_of_village_funds (
                    year,
                    item_in_budget,
                    estimated_income_of_panchayat,
                    approved_estimated_amount,
                    actual_amount_previous_year,
                    actual_amount_year_before_last,
                    namuna_1_tapshil_1_collection_of_village_funds_headers_id_fk
                ) VALUES (?, ?, ?, ?, ?, ?, ?);`;

		return runQuery(pool, q, [
			singleFundEntry.year,
			singleFundEntry.item_in_budget,
			singleFundEntry.estimated_income_of_panchayat,
			singleFundEntry.approved_estimated_amount,
			singleFundEntry.actual_amount_previous_year,
			singleFundEntry.actual_amount_year_before_last,
			singleFundEntry.namuna_1_tapshil_1_collection_of_village_funds_headers_id_fk
		]);
	},

	deleteNamuna1VillageCollectionFundEntry: (pool, id) => {
		const deleteQuery = `DELETE FROM ps_namuna_1_tapshil_1_collection_of_village_funds WHERE id =?;`;
		return runQuery(pool, deleteQuery, [id]);
	},

	updateSingleVillageFundEntry: (pool, singleFundEntry) => {
		const q = `
                UPDATE ps_namuna_1_tapshil_1_collection_of_village_funds
                SET
                    year = ?, 
                    item_in_budget = ?, 
                    estimated_income_of_panchayat = ?, 
                    approved_estimated_amount = ?, 
                    actual_amount_previous_year = ?, 
                    actual_amount_year_before_last = ?, 
                    namuna_1_tapshil_1_collection_of_village_funds_headers_id_fk = ?
                WHERE id = ?;`;

		return runQuery(pool, q, [
			singleFundEntry.year,
			singleFundEntry.item_in_budget,
			singleFundEntry.estimated_income_of_panchayat,
			singleFundEntry.approved_estimated_amount,
			singleFundEntry.actual_amount_previous_year,
			singleFundEntry.actual_amount_year_before_last,
			singleFundEntry.namuna_1_tapshil_1_collection_of_village_funds_headers_id_fk,
			singleFundEntry.id // Assuming 'id' is the unique identifier for the record
		]);
	},
	// updateVillageCollectionFundsEntries: (pool, data) => {
	//         const q = `
	//             INSERT INTO ps_namuna_1_tapshil_1_collection_of_village_funds (
	//                 id,
	//                 year,
	//                 item_in_budget,
	//                 estimated_income_of_panchayat,
	//                 approved_estimated_amount,
	//                 actual_amount_previous_year,
	//                 actual_amount_year_before_last,
	//                 namuna_1_tapshil_1_collection_of_village_funds_headers_id_fk
	//             ) VALUES ?
	//             ON DUPLICATE KEY UPDATE
	//                 year = VALUES(year),
	//                 item_in_budget = VALUES(item_in_budget),
	//                 estimated_income_of_panchayat = VALUES(estimated_income_of_panchayat),
	//                 approved_estimated_amount = VALUES(approved_estimated_amount),
	//                 actual_amount_previous_year = VALUES(actual_amount_previous_year),
	//                 actual_amount_year_before_last = VALUES(actual_amount_year_before_last),
	//                 namuna_1_tapshil_1_collection_of_village_funds_headers_id_fk = VALUES(namuna_1_tapshil_1_collection_of_village_funds_headers_id_fk)
	//         `;

	//         // Prepare the data for bulk insert
	//         const values = data.map((entry) => [
	//             entry.id, // Use the id for both insert and update operations
	//             entry.year,
	//             entry.item_in_budget,
	//             entry.estimated_income_of_panchayat,
	//             entry.approved_estimated_amount,
	//             entry.actual_amount_previous_year,
	//             entry.actual_amount_year_before_last,
	//             entry.namuna_1_tapshil_1_collection_of_village_funds_headers_id_fk,
	//         ]);

	//         return runQuery(pool, q, [values]);;
	//     },

	// FETCH HEADERS AND ENTRIES BY YEAR FOR FOLLOWING BOTH FUNCTIONS RESPECTIVEY
	fetchNamuna1Tapshil1VillageFundHeadersByYear: (pool, year) => {
		const q = `SELECT * FROM ps_namuna_1_tapshil_1_collection_of_village_funds_headers 
                        WHERE year = ?`;

		return runQuery(pool, q, [year]);
	},

	fetchNamuna1Tapshil1VillageFundsByHeaderId: (
		pool,
		villageFundHeaderIdFk
	) => {
		const q = `SELECT * FROM ps_namuna_1_tapshil_1_collection_of_village_funds 
                            WHERE 
                                namuna_1_tapshil_1_collection_of_village_funds_headers_id_fk = ?
                            ORDER BY id`;

		return runQuery(pool, q, [villageFundHeaderIdFk]);
	}
};

module.exports = namuna1Tapshil1VillageFundCollectionModel;
