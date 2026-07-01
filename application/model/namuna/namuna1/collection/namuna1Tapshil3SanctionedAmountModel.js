const { runQuery } = require('../../../../utils/runQuery');
const namuna1Tapshil3SanctionedAmountModel = {
	// 1
	saveNamuna1Tapshil3SanctionedAmountHeaders: (pool, data) => {
		const q = `
                INSERT INTO ps_namuna_1_tapshil_3_sanctioned_amount_headers (
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

	// 2
	updateNamuna1Tapshil3SanctionedAmountHeaders: (pool, data) => {
		const updateQuery = `
                UPDATE ps_namuna_1_tapshil_3_sanctioned_amount_headers
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

	// 3
	updateSingleNamuna1Tapshil3SanctionedAmountHeaderEntry: (
		pool,
		updateEntry
	) => {
		const q = `
                UPDATE ps_namuna_1_tapshil_3_sanctioned_amount_headers
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

	// 4
	updateNamuna1Tapshil3SanctionedAmountEntry: (pool, updateEntry) => {
		const q = `
                UPDATE ps_namuna_1_tapshil_3_sanctioned_amount
                SET
                    year = ?,
                    item_in_budget = ?,
                    estimated_income_of_panchayat = ?,
                    approved_estimated_amount = ?,
                    actual_amount_previous_year = ?,
                    actual_amount_year_before_last = ?,
                    namuna_1_tapshil_3_sanctioned_amount_headers_id_fk = ?
                WHERE id = ?;
            `;
		let updateArray = [
			updateEntry.year,
			updateEntry.item_in_budget,
			updateEntry.estimated_income_of_panchayat,
			updateEntry.approved_estimated_amount,
			updateEntry.actual_amount_previous_year,
			updateEntry.actual_amount_year_before_last,
			updateEntry.namuna_1_tapshil_3_sanctioned_amount_headers_id_fk,
			updateEntry.id
		];

		return runQuery(pool, q, updateArray);
	},

	// 5
	saveNamuna1Tapshil3SanctionedAmountEntries: (pool, data) => {
		const q = `
                INSERT INTO ps_namuna_1_tapshil_3_sanctioned_amount (
                    year,
                    item_in_budget,
                    estimated_income_of_panchayat,
                    approved_estimated_amount,
                    actual_amount_previous_year,
                    actual_amount_year_before_last,
                    namuna_1_tapshil_3_sanctioned_amount_headers_id_fk
                ) VALUES ?;
            `;
		return runQuery(pool, q, [data]);
	},

	// 6
	saveSingleNamuna1Tapshil3SanctionedAmountEntry: (pool, singleFundEntry) => {
		const q = `
                INSERT INTO ps_namuna_1_tapshil_3_sanctioned_amount (
                    year,
                    item_in_budget,
                    estimated_income_of_panchayat,
                    approved_estimated_amount,
                    actual_amount_previous_year,
                    actual_amount_year_before_last,
                    namuna_1_tapshil_3_sanctioned_amount_headers_id_fk
                ) VALUES (?, ?, ?, ?, ?, ?, ?);
            `;
		return runQuery(pool, q, [
			singleFundEntry.year,
			singleFundEntry.item_in_budget,
			singleFundEntry.estimated_income_of_panchayat,
			singleFundEntry.approved_estimated_amount,
			singleFundEntry.actual_amount_previous_year,
			singleFundEntry.actual_amount_year_before_last,
			singleFundEntry.namuna_1_tapshil_3_sanctioned_amount_headers_id_fk
		]);
	},

	// 7
	deleteNamuna1Tapshil3SanctionedAmountEntry: (pool, id) => {
		const deleteQuery = `DELETE FROM ps_namuna_1_tapshil_3_sanctioned_amount WHERE id =?;`;
		return runQuery(pool, deleteQuery, [id]);
	},

	// 8
	updateSingleNamuna1Tapshil3SanctionedAmountEntry: (
		pool,
		singleFundEntry
	) => {
		const q = `
                UPDATE ps_namuna_1_tapshil_3_sanctioned_amount
                SET
                    year = ?, 
                    item_in_budget = ?, 
                    estimated_income_of_panchayat = ?, 
                    approved_estimated_amount = ?, 
                    actual_amount_previous_year = ?, 
                    actual_amount_year_before_last = ?, 
                    namuna_1_tapshil_3_sanctioned_amount_headers_id_fk = ?
                WHERE id = ?;
            `;
		return runQuery(pool, q, [
			singleFundEntry.year,
			singleFundEntry.item_in_budget,
			singleFundEntry.estimated_income_of_panchayat,
			singleFundEntry.approved_estimated_amount,
			singleFundEntry.actual_amount_previous_year,
			singleFundEntry.actual_amount_year_before_last,
			singleFundEntry.namuna_1_tapshil_3_sanctioned_amount_headers_id_fk,
			singleFundEntry.id
		]);
	},

	// 9
	fetchNamuna1Tapshil3SanctionedAmountHeadersByYear: (pool, year) => {
		const q = `
                SELECT * FROM ps_namuna_1_tapshil_3_sanctioned_amount_headers 
                WHERE year = ?;
            `;
		return runQuery(pool, q, [year]);
	},

	// 10
	fetchNamuna1Tapshil3SanctionedAmountByHeaderId: (pool, otherIncomeIdFk) => {
		const q = `
                SELECT * FROM ps_namuna_1_tapshil_3_sanctioned_amount 
                WHERE 
                    namuna_1_tapshil_3_sanctioned_amount_headers_id_fk = ? 
                ORDER BY id;
            `;
		return runQuery(pool, q, [otherIncomeIdFk]);
	}
};

module.exports = namuna1Tapshil3SanctionedAmountModel;
