const namuna31Model = {
    // Save a new record
    saveNamuna31Details: (pool, data) => {
        return new Promise((resolve, reject) => {
            console.log(data);
            const query = `
                INSERT INTO ps_namuna_31 (
                    month,
                    year,
                    name_of_person,
                    office_location,
                    departure_place,
                    departure_date,
                    departure_time,
                    arrival_place,
                    arrival_date,
                    arrival_time,
                    means_of_travel,
                    rail_boat_name_class,
                    ticket_count,
                    ticket_amount,
                    road_distance_km,
                    road_rate_per_km,
                    road_amount,
                    daily_allowance_days,
                    daily_allowance_rate,
                    daily_allowance_amount,
                    travel_reason,
                    total_travel_amount,
                    remarks
                ) VALUES (?)
            `;
            const insertArray = [
                data.month,
                data.year,
                data.name_of_person,
                data.office_location,
                data.departure_place,
                data.departure_date,
                data.departure_time,
                data.arrival_place,
                data.arrival_date,
                data.arrival_time,
                data.means_of_travel,
                data.rail_boat_name_class,
                data.ticket_count,
                data.ticket_amount,
                data.road_distance_km,
                data.road_rate_per_km,
                data.road_amount,
                data.daily_allowance_days,
                data.daily_allowance_rate,
                data.daily_allowance_amount,
                data.travel_reason,
                data.total_travel_amount,
                data.remarks,
            ];

            pool.query(query, [insertArray], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Update an existing record by ID
    updateNamuna31Details: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE ps_namuna_31
                SET 
                    month = ?,
                    year = ?,
                    name_of_person = ?,
                    office_location = ?,
                    departure_place = ?,
                    departure_date = ?,
                    departure_time = ?,
                    arrival_place = ?,
                    arrival_date = ?,
                    arrival_time = ?,
                    means_of_travel = ?,
                    rail_boat_name_class = ?,
                    ticket_count = ?,
                    ticket_amount = ?,
                    road_distance_km = ?,
                    road_rate_per_km = ?,
                    road_amount = ?,
                    daily_allowance_days = ?,
                    daily_allowance_rate = ?,
                    daily_allowance_amount = ?,
                    travel_reason = ?,
                    total_travel_amount = ?,
                    remarks = ?
                WHERE id = ?
            `;
            const updateArray = [
                data.month,
                data.year,
                data.name_of_person,
                data.office_location,
                data.departure_place,
                data.departure_date,
                data.departure_time,
                data.arrival_place,
                data.arrival_date,
                data.arrival_time,
                data.means_of_travel,
                data.rail_boat_name_class,
                data.ticket_count,
                data.ticket_amount,
                data.road_distance_km,
                data.road_rate_per_km,
                data.road_amount,
                data.daily_allowance_days,
                data.daily_allowance_rate,
                data.daily_allowance_amount,
                data.travel_reason,
                data.total_travel_amount,
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
    fetchAllNamuna31Details: (pool) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(departure_date, '%d-%m-%Y'), 'Invalid Date') AS _departure_date,
                    IFNULL(DATE_FORMAT(arrival_date, '%d-%m-%Y'), 'Invalid Date') AS _arrival_date,
                    IFNULL(DATE_FORMAT(STR_TO_DATE(departure_time, '%H:%i:%s'), '%h:%i %p'), 'Invalid Time') AS _departure_time,
                    IFNULL(DATE_FORMAT(STR_TO_DATE(arrival_time, '%H:%i:%s'), '%h:%i %p'), 'Invalid Time') AS _arrival_time
                FROM ps_namuna_31
            `;
            pool.query(query, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch records for specific month and year
    fetchNamuna31DetailsByMonthAndYear: (pool, month, year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(departure_date, '%d-%m-%Y'), 'Invalid Date') AS _departure_date,
                    IFNULL(DATE_FORMAT(arrival_date, '%d-%m-%Y'), 'Invalid Date') AS _arrival_date,
                    IFNULL(DATE_FORMAT(STR_TO_DATE(departure_time, '%H:%i:%s'), '%h:%i %p'), 'Invalid Time') AS _departure_time,
                    IFNULL(DATE_FORMAT(STR_TO_DATE(arrival_time, '%H:%i:%s'), '%h:%i %p'), 'Invalid Time') AS _arrival_time
                FROM ps_namuna_31
                WHERE month = ? AND year = ?
            `;
            pool.query(query, [month, year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch records for a specific year
    fetchNamuna31DetailsByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(departure_date, '%d-%m-%Y'), 'Invalid Date') AS _departure_date,
                    IFNULL(DATE_FORMAT(arrival_date, '%d-%m-%Y'), 'Invalid Date') AS _arrival_date,
                    IFNULL(DATE_FORMAT(STR_TO_DATE(departure_time, '%H:%i:%s'), '%h:%i %p'), 'Invalid Time') AS _departure_time,
                    IFNULL(DATE_FORMAT(STR_TO_DATE(arrival_time, '%H:%i:%s'), '%h:%i %p'), 'Invalid Time') AS _arrival_time
                FROM ps_namuna_31
                WHERE year = ?
            `;
            pool.query(query, [year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch record by ID
    fetchNamuna31DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(departure_date, '%d-%m-%Y'), 'Invalid Date') AS _departure_date,
                    IFNULL(DATE_FORMAT(arrival_date, '%d-%m-%Y'), 'Invalid Date') AS _arrival_date,
                    IFNULL(DATE_FORMAT(STR_TO_DATE(departure_time, '%H:%i:%s'), '%h:%i %p'), 'Invalid Time') AS _departure_time,
                    IFNULL(DATE_FORMAT(STR_TO_DATE(arrival_time, '%H:%i:%s'), '%h:%i %p'), 'Invalid Time') AS _arrival_time
                FROM ps_namuna_31
                WHERE id = ?
            `;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Delete record by ID
    deleteNamuna31DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ps_namuna_31 WHERE id = ?`;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
};

module.exports = namuna31Model;
