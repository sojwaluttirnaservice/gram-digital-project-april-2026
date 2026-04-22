const namuna1Tapshil2ExpenditureWaterFundModel = {
    saveNamuna1Tapshil2ExpenditureWaterFundHeaders: (pool, data) => {
        return new Promise((resolve, reject) => {
            const q = `
                INSERT INTO ps_namuna_1_tapshil_2_expenditure_water_funds_headers (
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
    // In namuna1Tapshil2ExpenditureWaterFundModel.js

    uupdateExpenditureWaterFundEntry: (pool, updateEntry) => {
        return new Promise((resolve, reject) => {
            const q = `
                UPDATE ps_namuna_1_tapshil_2_expenditure_of_water_funds
                SET
                    year = ?,
                    item_in_budget = ?,
                    year_of_estimated_expenditure_of_panchayat = ?,
                    year_of_approved_estimated_expenditure_amount = ?,
                    year_of_actual_expenditure_amount_previous_year = ?,
                    year_of_actual_expenditure_amount_year_before_last = ?,
                    namuna_1_tapshil_2_expenditure_of_water_funds_headers_id_fk = ?
                WHERE id = ?;
            `;
            const updateArray = [
                updateEntry.year,
                updateEntry.item_in_budget,
                updateEntry.year_of_estimated_expenditure_of_panchayat,
                updateEntry.year_of_approved_estimated_expenditure_amount,
                updateEntry.year_of_actual_expenditure_amount_previous_year,
                updateEntry.year_of_actual_expenditure_amount_year_before_last,
                updateEntry.namuna_1_tapshil_2_expenditure_of_water_funds_headers_id_fk,
                updateEntry.id,
            ];

            pool.query(q, updateArray, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    updateNamuna1Tapshil2ExpenditureWaterFundHeaders: (pool, data) => {
        return new Promise((resolve, reject) => {
            const updateQuery = `
                UPDATE ps_namuna_1_tapshil_2_expenditure_water_funds_headers
                SET
                    year = ?, 
                    item_in_budget_header_name = ?,
                    year_of_estimated_expenditure_of_panchayat = ?,
                    year_of_approved_estimated_expenditure_amount = ?,
                    year_of_actual_expenditure_amount_previous_year = ?,
                    year_of_actual_expenditure_amount_year_before_last = ?
                WHERE id = ?;
            `;
            pool.query(
                updateQuery,
                [
                    data.year,
                    data.item_in_budget_header_name,
                    data.year_of_estimated_expenditure_of_panchayat,
                    data.year_of_approved_estimated_expenditure_amount,
                    data.year_of_actual_expenditure_amount_previous_year,
                    data.year_of_actual_expenditure_amount_year_before_last,
                    data.id,
                ],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },

    updateSingleNamuna1Tapshil2ExpenditureWaterFundHeader: (pool, updateEntry) => {
        return new Promise((resolve, reject) => {
            const q = `
                UPDATE ps_namuna_1_tapshil_2_expenditure_water_funds_headers
                SET
                    year = ?,
                    item_in_budget_header_name = ?,
                    year_of_estimated_expenditure_of_panchayat = ?,
                    year_of_approved_estimated_expenditure_amount = ?,
                    year_of_actual_expenditure_amount_previous_year = ?,
                    year_of_actual_expenditure_amount_year_before_last = ?
                WHERE id = ?;
            `;
            let updateArray = [
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

    updateNamuna1Tapshil2ExpenditureWaterFundEntry: (pool, updateEntry) => {
        return new Promise((resolve, reject) => {
            const q = `
                UPDATE ps_namuna_1_tapshil_2_expenditure_water_funds
                SET
                    year = ?,
                    item_in_budget = ?,
                    estimated_expenditure_of_panchayat = ?,
                    approved_estimated_expenditure_amount = ?,
                    actual_expenditure_amount_previous_year = ?,
                    actual_expenditure_amount_year_before_last = ?,
                    namuna_1_tapshil_2_expenditure_water_funds_headers_id_fk = ?
                WHERE id = ?;
            `;
            let updateArray = [
                updateEntry.year,
                updateEntry.item_in_budget,
                updateEntry.estimated_expenditure_of_panchayat,
                updateEntry.approved_estimated_expenditure_amount,
                updateEntry.actual_expenditure_amount_previous_year,
                updateEntry.actual_expenditure_amount_year_before_last,
                updateEntry.namuna_1_tapshil_2_expenditure_water_funds_headers_id_fk,
                updateEntry.id,
            ];

            pool.query(q, updateArray, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    saveNamuna1Tapshil2ExpenditureWaterFundEntries: (pool, data) => {
        return new Promise((resolve, reject) => {
            const q = `
                INSERT INTO ps_namuna_1_tapshil_2_expenditure_water_funds (
                    year,
                    item_in_budget,
                    estimated_expenditure_of_panchayat,
                    approved_estimated_expenditure_amount,
                    actual_expenditure_amount_previous_year,
                    actual_expenditure_amount_year_before_last,
                    namuna_1_tapshil_2_expenditure_water_funds_headers_id_fk
                ) VALUES ?;
            `;
            pool.query(q, [data], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    saveSingleNamuna1Tapshil2ExpenditureWaterFundEntry: (pool, singleFundEntry) => {
        return new Promise((resolve, reject) => {
            const q = `
                INSERT INTO ps_namuna_1_tapshil_2_expenditure_water_funds (
                    year,
                    item_in_budget,
                    estimated_expenditure_of_panchayat,
                    approved_estimated_expenditure_amount,
                    actual_expenditure_amount_previous_year,
                    actual_expenditure_amount_year_before_last,
                    namuna_1_tapshil_2_expenditure_water_funds_headers_id_fk
                ) VALUES (?, ?, ?, ?, ?, ?, ?);
            `;
            pool.query(
                q,
                [
                    singleFundEntry.year,
                    singleFundEntry.item_in_budget,
                    singleFundEntry.estimated_expenditure_of_panchayat,
                    singleFundEntry.approved_estimated_expenditure_amount,
                    singleFundEntry.actual_expenditure_amount_previous_year,
                    singleFundEntry.actual_expenditure_amount_year_before_last,
                    singleFundEntry.namuna_1_tapshil_2_expenditure_water_funds_headers_id_fk,
                ],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },

    deleteNamuna1Tapshil2ExpenditureWaterFundEntry: (pool, id) => {
        return new Promise((resolve, reject) => {
            const deleteQuery = `DELETE FROM ps_namuna_1_tapshil_2_expenditure_water_funds WHERE id =?;`;
            pool.query(deleteQuery, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    updateSingleNamuna1Tapshil2ExpenditureWaterFundEntry: (pool, singleFundEntry) => {
        return new Promise((resolve, reject) => {
            const q = `
                UPDATE ps_namuna_1_tapshil_2_expenditure_water_funds
                SET
                    year = ?, 
                    item_in_budget = ?, 
                    estimated_expenditure_of_panchayat = ?, 
                    approved_estimated_expenditure_amount = ?, 
                    actual_expenditure_amount_previous_year = ?, 
                    actual_expenditure_amount_year_before_last = ?, 
                    namuna_1_tapshil_2_expenditure_water_funds_headers_id_fk = ?
                WHERE id = ?;
            `;
            pool.query(
                q,
                [
                    singleFundEntry.year,
                    singleFundEntry.item_in_budget,
                    singleFundEntry.estimated_expenditure_of_panchayat,
                    singleFundEntry.approved_estimated_expenditure_amount,
                    singleFundEntry.actual_expenditure_amount_previous_year,
                    singleFundEntry.actual_expenditure_amount_year_before_last,
                    singleFundEntry.namuna_1_tapshil_2_expenditure_water_funds_headers_id_fk,
                    singleFundEntry.id,
                ],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },

    fetchNamuna1Tapshil2ExpenditureWaterFundHeadersByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const q = `
                SELECT * FROM ps_namuna_1_tapshil_2_expenditure_water_funds_headers 
                WHERE year = ?;
            `;
            pool.query(q, [year], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    fetchNamuna1Tapshil2ExpenditureWaterFundByHeaderId: (pool, headerId) => {
        return new Promise((resolve, reject) => {
            const q = `
                SELECT * FROM ps_namuna_1_tapshil_2_expenditure_water_funds 
                WHERE 
                    namuna_1_tapshil_2_expenditure_water_funds_headers_id_fk = ? 
                ORDER BY id;
            `;
            pool.query(q, [headerId], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
};

module.exports = namuna1Tapshil2ExpenditureWaterFundModel;
