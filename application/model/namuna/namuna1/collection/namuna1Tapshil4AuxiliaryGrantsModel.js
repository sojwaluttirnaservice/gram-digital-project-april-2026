const { runQuery } = require('../../../../utils/runQuery');
const namuna1Tapshil4AuxiliaryGrantsModel = {
	saveNamuna1Tapshil4AuxiliaryGrantsHeaders: (pool, data) => {
		const q = `
                INSERT INTO ps_namuna_1_tapshil_4_deposit_of_auxiliary_grants_headers (
                    year,
                    item_in_budget_header_name,
                    year_of_estimated_income_of_panchayat,
                    year_of_approved_estimated_amount,
                    year_of_actual_amount_previous_year,
                    year_of_actual_amount_year_before_last
                ) VALUES ?;
            `;
		return runQuery(pool, q, [data]);
	},

	updateNamuna1Tapshil4AuxiliaryGrantsHeaders: (pool, data) => {
		const updateQuery = `
                UPDATE ps_namuna_1_tapshil_4_deposit_of_auxiliary_grants_headers
                SET
                    year = ?, 
                    item_in_budget_header_name = ?,
                    year_of_estimated_income_of_panchayat = ?,
                    year_of_approved_estimated_amount = ?,
                    year_of_actual_amount_previous_year = ?,
                    year_of_actual_amount_year_before_last = ?
                WHERE id = ?;
            `;
		return runQuery(pool, updateQuery, [
			data.year,
			data.item_in_budget_header_name,
			data.year_of_estimated_income_of_panchayat,
			data.year_of_approved_estimated_amount,
			data.year_of_actual_amount_previous_year,
			data.year_of_actual_amount_year_before_last,
			data.id
		]);
	},

	updateSingleNamuna1Tapshil4AuxiliaryGrantsHeaderEntry: (
		pool,
		updateEntry
	) => {
		const q = `
                UPDATE ps_namuna_1_tapshil_4_deposit_of_auxiliary_grants_headers
                SET
                    year = ?,
                    item_in_budget_header_name = ?,
                    year_of_estimated_income_of_panchayat = ?,
                    year_of_approved_estimated_amount = ?,
                    year_of_actual_amount_previous_year = ?,
                    year_of_actual_amount_year_before_last = ?
                WHERE id = ?;
            `;
		let updateArray = [
			updateEntry.year,
			updateEntry.item_in_budget_header_name,
			updateEntry.year_of_estimated_income_of_panchayat,
			updateEntry.year_of_approved_estimated_amount,
			updateEntry.year_of_actual_amount_previous_year,
			updateEntry.year_of_actual_amount_year_before_last,
			updateEntry.id
		];

		return runQuery(pool, q, updateArray);
	},

	updateNamuna1Tapshil4AuxiliaryGrantsEntry: (pool, updateEntry) => {
		const q = `
                UPDATE ps_namuna_1_tapshil_4_deposit_of_auxiliary_grants
                SET
                    year = ?,
                    item_in_budget = ?,
                    estimated_income_of_panchayat = ?,
                    approved_estimated_amount = ?,
                    actual_amount_previous_year = ?,
                    actual_amount_year_before_last = ?,
                    namuna_1_tapshil_4_deposit_of_auxiliary_grants_headers_id_fk = ?
                WHERE id = ?;
            `;
		let updateArray = [
			updateEntry.year,
			updateEntry.item_in_budget,
			updateEntry.estimated_income_of_panchayat,
			updateEntry.approved_estimated_amount,
			updateEntry.actual_amount_previous_year,
			updateEntry.actual_amount_year_before_last,
			updateEntry.namuna_1_tapshil_4_deposit_of_auxiliary_grants_headers_id_fk,
			updateEntry.id
		];

		return runQuery(pool, q, updateArray);
	},

	saveNamuna1Tapshil4AuxiliaryGrantsEntries: (pool, data) => {
		const q = `
                INSERT INTO ps_namuna_1_tapshil_4_deposit_of_auxiliary_grants (
                    year,
                    item_in_budget,
                    estimated_income_of_panchayat,
                    approved_estimated_amount,
                    actual_amount_previous_year,
                    actual_amount_year_before_last,
                    namuna_1_tapshil_4_deposit_of_auxiliary_grants_headers_id_fk
                ) VALUES ?;
            `;
		return runQuery(pool, q, [data]);
	},

	saveSingleNamuna1Tapshil4AuxiliaryGrantsEntry: (pool, singleFundEntry) => {
		const q = `
                INSERT INTO ps_namuna_1_tapshil_4_deposit_of_auxiliary_grants (
                    year,
                    item_in_budget,
                    estimated_income_of_panchayat,
                    approved_estimated_amount,
                    actual_amount_previous_year,
                    actual_amount_year_before_last,
                    namuna_1_tapshil_4_deposit_of_auxiliary_grants_headers_id_fk
                ) VALUES (?, ?, ?, ?, ?, ?, ?);
            `;
		return runQuery(pool, q, [
			singleFundEntry.year,
			singleFundEntry.item_in_budget,
			singleFundEntry.estimated_income_of_panchayat,
			singleFundEntry.approved_estimated_amount,
			singleFundEntry.actual_amount_previous_year,
			singleFundEntry.actual_amount_year_before_last,
			singleFundEntry.namuna_1_tapshil_4_deposit_of_auxiliary_grants_headers_id_fk
		]);
	},

	deleteNamuna1Tapshil4AuxiliaryGrantsEntry: (pool, id) => {
		const deleteQuery = `DELETE FROM ps_namuna_1_tapshil_4_deposit_of_auxiliary_grants WHERE id =?;`;
		return runQuery(pool, deleteQuery, [id]);
	},

	updateSingleNamuna1Tapshil4AuxiliaryGrantsEntry: (
		pool,
		singleFundEntry
	) => {
		const q = `
                UPDATE ps_namuna_1_tapshil_4_deposit_of_auxiliary_grants
                SET
                    year = ?, 
                    item_in_budget = ?, 
                    estimated_income_of_panchayat = ?, 
                    approved_estimated_amount = ?, 
                    actual_amount_previous_year = ?, 
                    actual_amount_year_before_last = ?, 
                    namuna_1_tapshil_4_deposit_of_auxiliary_grants_headers_id_fk = ?
                WHERE id = ?;
            `;
		return runQuery(pool, q, [
			singleFundEntry.year,
			singleFundEntry.item_in_budget,
			singleFundEntry.estimated_income_of_panchayat,
			singleFundEntry.approved_estimated_amount,
			singleFundEntry.actual_amount_previous_year,
			singleFundEntry.actual_amount_year_before_last,
			singleFundEntry.namuna_1_tapshil_4_deposit_of_auxiliary_grants_headers_id_fk,
			singleFundEntry.id
		]);
	},

	fetchNamuna1Tapshil4AuxiliaryGrantsHeadersByYear: (pool, year) => {
		const q = `
                SELECT * FROM ps_namuna_1_tapshil_4_deposit_of_auxiliary_grants_headers 
                WHERE year = ?;
            `;
		return runQuery(pool, q, [year]);
	},

	fetchNamuna1Tapshil4AuxiliaryGrantsByHeaderId: (
		pool,
		auxiliaryGrantIdFk
	) => {
		const q = `
                SELECT * FROM ps_namuna_1_tapshil_4_deposit_of_auxiliary_grants 
                WHERE 
                    namuna_1_tapshil_4_deposit_of_auxiliary_grants_headers_id_fk = ? 
                ORDER BY id;
            `;
		return runQuery(pool, q, [auxiliaryGrantIdFk]);
	}
};

module.exports = namuna1Tapshil4AuxiliaryGrantsModel;
