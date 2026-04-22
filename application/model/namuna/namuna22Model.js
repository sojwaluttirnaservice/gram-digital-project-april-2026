const pool = require('../../config/db-connect-migration');

const namuna22Model = {
    // Save a new record
    saveNamuna22Details: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO ps_namuna_22 (
                    month,
                    year,
                    acquisition_date,
                    order_number,

                    order_date,
                    resolution_number,
                    resolution_date,
                    survey_number,

                    property_description,
                    usage_reason,
                    construction_or_editing_expense,
                    repairs_expenditure_date,
                    ongoing_repairs,

                    special_repairs,
                    original_construction,
                    original_construction_type,
                    year_end_depreciation,

                    disposal_resolution_number,
                    disposal_order_number,
                    disposal_order_date,
                    remarks
                ) VALUES (?,?,?,?,
                 ?,?,?,?,
                 ?,?,?,?,?,
                 ?,?,?,?,
                 ?,?,?, ?)
            `;

            const insertArray = [
                data.month,
                data.year,
                data.acquisition_date,
                data.order_number,

                data.order_date,
                data.resolution_number,
                data.resolution_date,
                data.survey_number,

                data.property_description,
                data.usage_reason,
                data.construction_or_editing_expense,
                data.repairs_expenditure_date,
                data.ongoing_repairs,

                data.special_repairs,
                data.original_construction,
                data.original_construction_type,
                data.year_end_depreciation,

                data.disposal_resolution_number,
                data.disposal_order_number,
                data.disposal_order_date,
                data.remarks,
            ];

            pool.query(query, insertArray, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Update an existing record by ID
    updateNamuna22Details: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE ps_namuna_22
                SET 
                    month = ?,
                    year = ?,
                    acquisition_date = ?,
                    order_number = ?,

                    order_date = ?,
                    resolution_number = ?,
                    resolution_date = ?,
                    survey_number = ?,

                    property_description = ?,
                    usage_reason = ?,
                    construction_or_editing_expense = ?,
                    repairs_expenditure_date = ?,
                    ongoing_repairs = ?,

                    special_repairs = ?,
                    original_construction = ?,
                    original_construction_type = ?,
                    year_end_depreciation = ?,

                    disposal_resolution_number = ?,
                    disposal_order_number = ?,
                    disposal_order_date = ?,
                    remarks = ?
                WHERE id = ?
            `;

            pool.query(
                query,
                [
                    data.month,
                    data.year,
                    data.acquisition_date,
                    data.order_number,

                    data.order_date,
                    data.resolution_number,
                    data.resolution_date,
                    data.survey_number,

                    data.property_description,
                    data.usage_reason,
                    data.construction_or_editing_expense,
                    data.repairs_expenditure_date,
                    data.ongoing_repairs,

                    data.special_repairs,
                    data.original_construction,
                    data.original_construction_type,
                    data.year_end_depreciation,

                    data.disposal_resolution_number,
                    data.disposal_order_number,
                    data.disposal_order_date,
                    data.remarks,

                    data.id,
                ],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },

    // Fetch all records
    fetchAllNamuna22Details: (pool) => {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT 
                *,
                IFNULL(DATE_FORMAT(acquisition_date, '%d-%m-%Y'), 'Invalid Date') AS _acquisition_date,
                IFNULL(DATE_FORMAT(order_date, '%d-%m-%Y'), 'Invalid Date') AS _order_date,
                IFNULL(DATE_FORMAT(resolution_date, '%d-%m-%Y'), 'Invalid Date') AS _resolution_date,
                IFNULL(DATE_FORMAT(repairs_expenditure_date, '%d-%m-%Y'), 'Invalid Date') AS _repairs_expenditure_date,
                IFNULL(DATE_FORMAT(disposal_order_date, '%d-%m-%Y'), 'Invalid Date') AS _disposal_order_date,
                IFNULL(DATE_FORMAT(createdAt, '%d-%m-%Y'), 'Invalid Date') AS _createdAt,
                IFNULL(DATE_FORMAT(updatedAt, '%d-%m-%Y'), 'Invalid Date') AS _updatedAt
            FROM ps_namuna_22
        `;
            pool.query(query, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch all records for a specific month and year
    fetchAllNamuna22DetailsByMonthAndYear: (pool, month, year) => {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT 
                *,
                IFNULL(DATE_FORMAT(acquisition_date, '%d-%m-%Y'), 'Invalid Date') AS _acquisition_date,
                IFNULL(DATE_FORMAT(order_date, '%d-%m-%Y'), 'Invalid Date') AS _order_date,
                IFNULL(DATE_FORMAT(resolution_date, '%d-%m-%Y'), 'Invalid Date') AS _resolution_date,
                IFNULL(DATE_FORMAT(repairs_expenditure_date, '%d-%m-%Y'), 'Invalid Date') AS _repairs_expenditure_date,
                IFNULL(DATE_FORMAT(disposal_order_date, '%d-%m-%Y'), 'Invalid Date') AS _disposal_order_date,
                IFNULL(DATE_FORMAT(createdAt, '%d-%m-%Y'), 'Invalid Date') AS _createdAt,
                IFNULL(DATE_FORMAT(updatedAt, '%d-%m-%Y'), 'Invalid Date') AS _updatedAt
            FROM ps_namuna_22
            WHERE month = ? AND year = ?
        `;
            pool.query(query, [month, year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch a record by ID
    fetchNamuna22DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT 
                *,
                IFNULL(DATE_FORMAT(acquisition_date, '%d-%m-%Y'), 'Invalid Date') AS _acquisition_date,
                IFNULL(DATE_FORMAT(order_date, '%d-%m-%Y'), 'Invalid Date') AS _order_date,
                IFNULL(DATE_FORMAT(resolution_date, '%d-%m-%Y'), 'Invalid Date') AS _resolution_date,
                IFNULL(DATE_FORMAT(repairs_expenditure_date, '%d-%m-%Y'), 'Invalid Date') AS _repairs_expenditure_date,
                IFNULL(DATE_FORMAT(disposal_order_date, '%d-%m-%Y'), 'Invalid Date') AS _disposal_order_date,
                IFNULL(DATE_FORMAT(createdAt, '%d-%m-%Y'), 'Invalid Date') AS _createdAt,
                IFNULL(DATE_FORMAT(updatedAt, '%d-%m-%Y'), 'Invalid Date') AS _updatedAt
            FROM ps_namuna_22
            WHERE id = ?
        `;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Delete a record by ID
    deleteNamuna22Details: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ps_namuna_22 WHERE id = ?`;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
};

module.exports = namuna22Model;
