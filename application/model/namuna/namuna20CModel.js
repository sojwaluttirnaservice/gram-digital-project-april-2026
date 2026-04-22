const pool = require('../../config/db-connect-migration');

const namuna20CModel = {
    // Save a new record
    saveNamuna20cMeasurementDetails: (pool, data) => {
        console.log(data);
        return new Promise((resolve, reject) => {
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
                data.remarks,
            ];

            pool.query(query, [insertArray], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
    // Update an existing record by ID
    updateNamuna20cMeasurementDetails: (pool, data) => {
        return new Promise((resolve, reject) => {
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

            pool.query(
                query,
                [
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
    fetchAllNamuna20cMeasurementDetails: (pool) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM ps_namuna_20c_measurement_register
            `;
            pool.query(query, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch a record by ID
    fetchNamuna20cMeasurementDetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM ps_namuna_20c_measurement_register
                WHERE id = ?
            `;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch records by month and year
    fetchNamuna20cMeasurementDetailsByMonthAndYear: (pool, month, year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM ps_namuna_20c_measurement_register
                WHERE month = ? AND year = ?
            `;
            pool.query(query, [month, year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch records by year
    fetchNamuna20cMeasurementDetailsByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM ps_namuna_20c_measurement_register
                WHERE year = ?
            `;
            pool.query(query, [year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Delete a record by ID
    deleteNamuna20cMeasurementDetails: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM ps_namuna_20c_measurement_register
                WHERE id = ?
            `;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
};

module.exports = namuna20CModel;
