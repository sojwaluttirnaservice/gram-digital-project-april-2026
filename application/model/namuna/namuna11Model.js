const namuna11Model = {
    // Save a new record
    saveNamuna11Details: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO ps_namuna_11 (
                    month,
                    year,
                    name_of_person,
                    address_of_person,
                    nature_of_demand,
                    authority_for_demand,
                    demand_installment,
                    demand_amount,
                    demand_total_amount,
                    bill_number,
                    bill_date,
                    receipt_number,
                    receipt_date,
                    recovered_amount,
                    order_number,
                    order_date,
                    exemption_amount,
                    remaining_amount,
                    remarks
                ) VALUES (?)
            `;
            const insertArray = [
                data.month,
                data.year,
                data.name_of_person,
                data.address_of_person,
                data.nature_of_demand,
                data.authority_for_demand,
                data.demand_installment,
                data.demand_amount,
                data.demand_total_amount,
                data.bill_number,
                data.bill_date,
                data.receipt_number,
                data.receipt_date,
                data.recovered_amount,
                data.order_number,
                data.order_date,
                data.exemption_amount,
                data.remaining_amount,
                data.remarks,
            ];

            pool.query(query, [insertArray], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Update an existing record by ID
    updateNamuna11Details: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE ps_namuna_11
                SET 
                    month = ?,
                    year = ?,
                    name_of_person = ?,
                    address_of_person = ?,
                    nature_of_demand = ?,
                    authority_for_demand = ?,
                    demand_installment = ?,
                    demand_amount = ?,
                    demand_total_amount = ?,
                    bill_number = ?,
                    bill_date = ?,
                    receipt_number = ?,
                    receipt_date = ?,
                    recovered_amount = ?,
                    order_number = ?,
                    order_date = ?,
                    exemption_amount = ?,
                    remaining_amount = ?,
                    remarks = ?
                WHERE id = ?
            `;
            const updateArray = [
                data.month,
                data.year,
                data.name_of_person,
                data.address_of_person,
                data.nature_of_demand,
                data.authority_for_demand,
                data.demand_installment,
                data.demand_amount,
                data.demand_total_amount,
                data.bill_number,
                data.bill_date,
                data.receipt_number,
                data.receipt_date,
                data.recovered_amount,
                data.order_number,
                data.order_date,
                data.exemption_amount,
                data.remaining_amount,
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
    fetchAllNamuna11Details: (pool) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(bill_date, '%d-%m-%Y'), 'Invalid Date') AS _bill_date,
                    IFNULL(DATE_FORMAT(receipt_date, '%d-%m-%Y'), 'Invalid Date') AS _receipt_date,
                    IFNULL(DATE_FORMAT(order_date, '%d-%m-%Y'), 'Invalid Date') AS _order_date
                FROM ps_namuna_11
            `;
            pool.query(query, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch record by ID
    fetchNamuna11DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(bill_date, '%d-%m-%Y'), 'Invalid Date') AS _bill_date,
                    IFNULL(DATE_FORMAT(receipt_date, '%d-%m-%Y'), 'Invalid Date') AS _receipt_date,
                    IFNULL(DATE_FORMAT(order_date, '%d-%m-%Y'), 'Invalid Date') AS _order_date
                FROM ps_namuna_11 
                WHERE id = ?
            `;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch records by Month and Year
    fetchByMonthAndYear: (pool, month, year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(bill_date, '%d-%m-%Y'), 'Invalid Date') AS _bill_date,
                    IFNULL(DATE_FORMAT(receipt_date, '%d-%m-%Y'), 'Invalid Date') AS _receipt_date,
                    IFNULL(DATE_FORMAT(order_date, '%d-%m-%Y'), 'Invalid Date') AS _order_date
                FROM ps_namuna_11 
                WHERE month = ? AND year = ?
            `;
            pool.query(query, [month, year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch records by Year
    fetchByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                    IFNULL(DATE_FORMAT(bill_date, '%d-%m-%Y'), 'Invalid Date') AS _bill_date,
                    IFNULL(DATE_FORMAT(receipt_date, '%d-%m-%Y'), 'Invalid Date') AS _receipt_date,
                    IFNULL(DATE_FORMAT(order_date, '%d-%m-%Y'), 'Invalid Date') AS _order_date
                FROM ps_namuna_11 
                WHERE year = ?
            `;
            pool.query(query, [year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Delete record by ID
    deleteNamuna11DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ps_namuna_11 WHERE id = ?`;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
};

module.exports = namuna11Model;
