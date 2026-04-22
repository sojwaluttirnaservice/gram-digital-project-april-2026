const namuna1Tapshil1ExpenditureVillageFundsModel = {
    // 1. Save headers for the expenditure of village funds
    saveExpenditureVillageFundsHeaders: (pool, data) => {

        console.log(data)
        return new Promise((resolve, reject) => {
            const q = `
                INSERT INTO ps_namuna_1_tapshil_1_expenditure_of_village_funds_headers (
                    year,
                    item_in_budget_header_name,
                    year_of_estimated_expenditure_of_panchayat,
                    year_of_approved_estimated_expenditure_amount,
                    year_of_actual_expenditure_amount_previous_year,
                    year_of_actual_expenditure_amount_year_before_last
                ) VALUES ?;
            `;
            pool.query(q, [data], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // 2. Update headers for the expenditure of village funds
    updateExpenditureVillageFundsHeaders: (pool, data) => {
        return new Promise((resolve, reject) => {
            const q = `
                UPDATE ps_namuna_1_tapshil_1_expenditure_of_village_funds_headers
                SET
                    year = ?, 
                    item_in_budget_header_name = ?,
                    year_of_estimated_expenditure_of_panchayat = ?,
                    year_of_approved_estimated_expenditure_amount = ?,
                    year_of_actual_expenditure_amount_previous_year = ?,
                    year_of_actual_expenditure_amount_year_before_last = ?
                WHERE id = ?;
            `;
            const params = [
                data.year,
                data.item_in_budget_header_name,
                data.year_of_estimated_expenditure_of_panchayat,
                data.year_of_approved_estimated_expenditure_amount,
                data.year_of_actual_expenditure_amount_previous_year,
                data.year_of_actual_expenditure_amount_year_before_last,
                data.id,
            ];
            pool.query(q, params, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // 3. Update a single header entry for the expenditure of village funds
    updateSingleExpenditureVillageFundsHeader: (pool, updateEntry) => {
        return new Promise((resolve, reject) => {
            const q = `
                UPDATE ps_namuna_1_tapshil_1_expenditure_of_village_funds_headers
                SET
                    year = ?,
                    item_in_budget_header_name = ?,
                    year_of_estimated_expenditure_of_panchayat = ?,
                    year_of_approved_estimated_expenditure_amount = ?,
                    year_of_actual_expenditure_amount_previous_year = ?,
                    year_of_actual_expenditure_amount_year_before_last = ?
                WHERE id = ?;
            `;
            const updateArray = [
                updateEntry.year,
                updateEntry.item_in_budget_header_name,
                updateEntry.year_of_estimated_expenditure_of_panchayat,
                updateEntry.year_of_approved_estimated_expenditure_amount,
                updateEntry.year_of_actual_expenditure_amount_previous_year,
                updateEntry.year_of_actual_expenditure_amount_year_before_last,
                updateEntry.id,
            ];

            pool.query(q, updateArray, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // 4. Save entries for the expenditure of village funds
    saveExpenditureVillageFundsEntries: (pool, data) => {
        return new Promise((resolve, reject) => {
            const q = `
                INSERT INTO ps_namuna_1_tapshil_1_expenditure_of_village_funds (
                    year,
                    item_in_budget,
                    estimated_expenditure_of_panchayat,
                    approved_estimated_expenditure_amount,
                    actual_expenditure_amount_previous_year,
                    actual_expenditure_amount_year_before_last,
                    namuna_1_tapshil_1_expenditure_of_village_funds_headers_id_fk
                ) VALUES ?;
            `;
            pool.query(q, [data], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // 5. Update a single entry in the expenditure of village funds
    updateExpenditureVillageFundsEntry: (pool, updateEntry) => {
        return new Promise((resolve, reject) => {
            const q = `
                UPDATE ps_namuna_1_tapshil_1_expenditure_of_village_funds
                SET
                    year = ?,
                    item_in_budget = ?,
                    estimated_expenditure_of_panchayat = ?,
                    approved_estimated_expenditure_amount = ?,
                    actual_expenditure_amount_previous_year = ?,
                    actual_expenditure_amount_year_before_last = ?,
                    namuna_1_tapshil_1_expenditure_of_village_funds_headers_id_fk = ?
                WHERE id = ?;
            `;
            const updateArray = [
                updateEntry.year,
                updateEntry.item_in_budget,
                updateEntry.estimated_expenditure_of_panchayat,
                updateEntry.approved_estimated_expenditure_amount,
                updateEntry.actual_expenditure_amount_previous_year,
                updateEntry.actual_expenditure_amount_year_before_last,
                updateEntry.namuna_1_tapshil_1_expenditure_of_village_funds_headers_id_fk,
                updateEntry.id,
            ];

            pool.query(q, updateArray, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // 6. Fetch headers based on year
    fetchExpenditureVillageFundsHeadersByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const q = `
                SELECT * FROM ps_namuna_1_tapshil_1_expenditure_of_village_funds_headers
                WHERE year = ?;
            `;
            pool.query(q, [year], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // 7. Fetch entries by header ID
    fetchExpenditureVillageFundsByHeaderId: (pool, headerId) => {
        return new Promise((resolve, reject) => {
            const q = `
                SELECT * FROM ps_namuna_1_tapshil_1_expenditure_of_village_funds
                WHERE namuna_1_tapshil_1_expenditure_of_village_funds_headers_id_fk = ?;
            `;
            pool.query(q, [headerId], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // 8. Delete an entry
    deleteExpenditureVillageFundsEntry: (pool, id) => {
        return new Promise((resolve, reject) => {
            const deleteQuery = `DELETE FROM ps_namuna_1_tapshil_1_expenditure_of_village_funds WHERE id = ?;`;
            pool.query(deleteQuery, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // 9. Save a single entry in the expenditure of village funds
    saveSingleExpenditureVillageFundsEntry: (pool, singleEntry) => {
        return new Promise((resolve, reject) => {
            const q = `
                INSERT INTO ps_namuna_1_tapshil_1_expenditure_of_village_funds (
                    year,
                    item_in_budget,
                    estimated_expenditure_of_panchayat,
                    approved_estimated_expenditure_amount,
                    actual_expenditure_amount_previous_year,
                    actual_expenditure_amount_year_before_last,
                    namuna_1_tapshil_1_expenditure_of_village_funds_headers_id_fk
                ) VALUES (?, ?, ?, ?, ?, ?, ?);
            `;
            pool.query(
                q,
                [
                    singleEntry.year,
                    singleEntry.item_in_budget,
                    singleEntry.estimated_expenditure_of_panchayat,
                    singleEntry.approved_estimated_expenditure_amount,
                    singleEntry.actual_expenditure_amount_previous_year,
                    singleEntry.actual_expenditure_amount_year_before_last,
                    singleEntry.namuna_1_tapshil_1_expenditure_of_village_funds_headers_id_fk,
                ],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },

    // 10. Update a single entry in the expenditure of village funds
    updateSingleExpenditureVillageFundsEntry: (pool, singleEntry) => {
        return new Promise((resolve, reject) => {
            const q = `
                UPDATE ps_namuna_1_tapshil_1_expenditure_of_village_funds
                SET
                    year = ?, 
                    item_in_budget = ?, 
                    estimated_expenditure_of_panchayat = ?, 
                    approved_estimated_expenditure_amount = ?, 
                    actual_expenditure_amount_previous_year = ?, 
                    actual_expenditure_amount_year_before_last = ?, 
                    namuna_1_tapshil_1_expenditure_of_village_funds_headers_id_fk = ?
                WHERE id = ?;
            `;
            pool.query(
                q,
                [
                    singleEntry.year,
                    singleEntry.item_in_budget,
                    singleEntry.estimated_expenditure_of_panchayat,
                    singleEntry.approved_estimated_expenditure_amount,
                    singleEntry.actual_expenditure_amount_previous_year,
                    singleEntry.actual_expenditure_amount_year_before_last,
                    singleEntry.namuna_1_tapshil_1_expenditure_of_village_funds_headers_id_fk,
                    singleEntry.id,
                ],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    }
};

module.exports = namuna1Tapshil1ExpenditureVillageFundsModel;
