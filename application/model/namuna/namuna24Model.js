const namuna24Model = {
    // Save a new record
    saveNamuna24Details: (pool, data) => {
        return new Promise((resolve, reject) => {
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
                data.remarks,
            ];

            pool.query(query, [insertArray], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
    // Update an existing record by ID
    updateNamuna24Details: (pool, data) => {
        return new Promise((resolve, reject) => {
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
                data.id,
            ];

            pool.query(query, updateArray, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
    // Fetch all records
    fetchAllNamuna24Details: (pool) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(transaction_date, '%d-%m-%Y'), 'Invalid Date') AS _transaction_date,
                    IFNULL(DATE_FORMAT(certificate_date, '%d-%m-%Y'), 'Invalid Date') AS _certificate_date,
                    IFNULL(DATE_FORMAT(resolution_date, '%d-%m-%Y'), 'Invalid Date') AS _resolution_date,
                    IFNULL(DATE_FORMAT(authority_order_date, '%d-%m-%Y'), 'Invalid Date') AS _authority_order_date
                FROM ps_namuna_24
            `;
            pool.query(query, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
    // Fetch records for specific month and year
    fetchNamuna24DetailsByMonthAndYear: (pool, month, year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(transaction_date, '%d-%m-%Y'), 'Invalid Date') AS _transaction_date,
                    IFNULL(DATE_FORMAT(certificate_date, '%d-%m-%Y'), 'Invalid Date') AS _certificate_date,
                    IFNULL(DATE_FORMAT(resolution_date, '%d-%m-%Y'), 'Invalid Date') AS _resolution_date,
                    IFNULL(DATE_FORMAT(authority_order_date, '%d-%m-%Y'), 'Invalid Date') AS _authority_order_date
                FROM ps_namuna_24
                WHERE month = ? AND year = ?
            `;
            pool.query(query, [month, year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
    // Fetch records for a specific year
    fetchNamuna24DetailsByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(transaction_date, '%d-%m-%Y'), 'Invalid Date') AS _transaction_date,
                    IFNULL(DATE_FORMAT(certificate_date, '%d-%m-%Y'), 'Invalid Date') AS _certificate_date,
                    IFNULL(DATE_FORMAT(resolution_date, '%d-%m-%Y'), 'Invalid Date') AS _resolution_date,
                    IFNULL(DATE_FORMAT(authority_order_date, '%d-%m-%Y'), 'Invalid Date') AS _authority_order_date
                FROM ps_namuna_24
                WHERE year = ?
            `;
            pool.query(query, [year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
    // Fetch record by ID
    fetchNamuna24DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(transaction_date, '%d-%m-%Y'), 'Invalid Date') AS _transaction_date,
                    IFNULL(DATE_FORMAT(certificate_date, '%d-%m-%Y'), 'Invalid Date') AS _certificate_date,
                    IFNULL(DATE_FORMAT(resolution_date, '%d-%m-%Y'), 'Invalid Date') AS _resolution_date,
                    IFNULL(DATE_FORMAT(authority_order_date, '%d-%m-%Y'), 'Invalid Date') AS _authority_order_date
                FROM ps_namuna_24
                WHERE id = ?
            `;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
    // Delete record by ID
    deleteNamuna24DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ps_namuna_24 WHERE id = ?`;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
};

module.exports = namuna24Model;
