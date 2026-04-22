const pool = require('../../config/db-connect-migration'); // Using the connection pool

const namuna23Model = {
    // Save a new record
    saveNamuna23Details: (pool, data) => {
        return new Promise((resolve, reject) => {
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
                data.remarks,
            ];

            pool.query(query, insertArray, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Update an existing record by ID
    updateNamuna23Details: (pool, data) => {
        return new Promise((resolve, reject) => {
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
                data.id,
            ];

            pool.query(query, updateArray, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch all records
    fetchAllNamuna23Details: (pool) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT *,
                IFNULL(DATE_FORMAT(completion_date, '%d-%m-%Y'), 'Invalid Date') AS _completion_date
                 FROM ps_namuna_23`;
            pool.query(query, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch records for specific month and year
    fetchNamuna23DetailsByMonthAndYear: (pool, month, year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                IFNULL(DATE_FORMAT(completion_date, '%d-%m-%Y'), 'Invalid Date') AS _completion_date FROM ps_namuna_23
                WHERE month = ? AND year = ?
            `;
            pool.query(query, [month, year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch records for a specific year
    fetchNamuna23DetailsByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                IFNULL(DATE_FORMAT(completion_date, '%d-%m-%Y'), 'Invalid Date') AS _completion_date FROM ps_namuna_23
                WHERE year = ?
            `;
            pool.query(query, [year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch record by ID
    fetchNamuna23DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT *,
                IFNULL(DATE_FORMAT(completion_date, '%d-%m-%Y'), 'Invalid Date') AS _completion_date
             FROM ps_namuna_23
            WHERE id = ?
        `;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Delete record by ID
    deleteNamuna23DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ps_namuna_23 WHERE id = ?`;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
};

module.exports = namuna23Model;
