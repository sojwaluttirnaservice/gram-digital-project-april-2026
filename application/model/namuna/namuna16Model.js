const namuna16Model = {
    saveNamuna16Entry: (pool, data) => {
        return new Promise((resolve, reject) => {
            const q = `
                INSERT INTO 
                    ps_namuna_16 
                    
                    (
                        item_description, 
                        purchase_authority, 
                        purchase_date, 

                        quantity, cost, 
                        disposal_details, 
                        authorization_certificate, 

                        recovered_amount, 
                        treasury_date, 
                        stock_balance, 

                        remarks,
                        month,
                        year,
                        
                        disposal_count
                    )
                VALUES (?)
            `;

            const insertArray = [
                data.item_description,
                data.purchase_authority,
                data.purchase_date,
                data.quantity,
                data.cost,
                data.disposal_details,
                data.authorization_certificate,
                data.recovered_amount,
                data.treasury_date,
                data.stock_balance,
                data.remarks,
                data.month,
                data.year,
                data.disposal_count,
            ];
            pool.query(q, [insertArray], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    updateNamuna16Entry: (pool, data) => {
        return new Promise((resolve, reject) => {
            const q = `
                UPDATE ps_namuna_16 
                SET 
                    item_description = ?, 
                    purchase_authority = ?, 
                    purchase_date = ?, 
                    quantity = ?, 
                    cost = ?, 
                    disposal_details = ?, 
                    authorization_certificate = ?, 
                    recovered_amount = ?, 
                    treasury_date = ?, 
                    stock_balance = ?, 
                    remarks = ?,
                    month = ?,
                    year = ?,
                    disposal_count =?
                WHERE 
                    id = ?
            `;
            pool.query(
                q,
                [
                    data.item_description,
                    data.purchase_authority,
                    data.purchase_date,
                    data.quantity,
                    data.cost,
                    data.disposal_details,
                    data.authorization_certificate,
                    data.recovered_amount,
                    data.treasury_date,
                    data.stock_balance,
                    data.remarks,

                    data.month,
                    data.year,
                    data.disposal_count,

                    data.id,
                ],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },

    fetchNamuna16ByYearRange: (pool, year1, year2) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT *, 
                            CASE 
                                WHEN purchase_date IS NULL OR purchase_date = '0000-00-00' 
                                THEN ''
                                ELSE DATE_FORMAT(purchase_date, "%d-%m-%Y") 
                            END AS _purchase_date,
                            CASE
                                WHEN treasury_date IS NULL OR treasury_date = '0000-00-00' 
                                THEN '' 
                                ELSE DATE_FORMAT(treasury_date, "%d-%m-%Y") 
                            END AS _treasury_date
                    FROM ps_namuna_16 
                    WHERE 
                        (YEAR(purchase_date) = ? AND MONTH(purchase_date) >= 4) 
                        OR 
                        (YEAR(purchase_date) > ? AND YEAR(purchase_date) < ?) 
                        OR 
                        (YEAR(purchase_date) = ? AND MONTH(purchase_date) <= 3)`;
    
            pool.query(q, [year1, year1, year2, year2], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
    

    fetchNamuna16ById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT *, 
                            CASE 
                                WHEN purchase_date IS NULL OR purchase_date = '0000-00-00' 
                                THEN ''
                                ELSE DATE_FORMAT(purchase_date, "%d-%m-%Y") 
                            END AS _purchase_date,
                            CASE
                                WHEN treasury_date IS NULL OR treasury_date = '0000-00-00' 
                                THEN '' 
                                ELSE DATE_FORMAT(treasury_date, "%d-%m-%Y") 
                            END AS _treasury_date
                    FROM ps_namuna_16 
                    WHERE id = ?`;

            pool.query(q, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchAllNamuna16: (pool) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT *, 
                            CASE 
                                WHEN purchase_date IS NULL OR purchase_date = '0000-00-00' 
                                THEN '' 
                                ELSE DATE_FORMAT(purchase_date, "%d-%m-%Y") 
                            END AS _purchase_date,
                            CASE 
                                WHEN treasury_date IS NULL OR treasury_date = '0000-00-00' 
                                THEN '' 
                                ELSE DATE_FORMAT(treasury_date, "%d-%m-%Y") 
                            END AS _treasury_date
                    FROM ps_namuna_16 
                    ORDER BY purchase_date ASC`;

            pool.query(q, [], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchNamuna16ByDateRange: (pool, fromDate, toDate) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT *, 
                            CASE 
                                WHEN purchase_date IS NULL OR purchase_date = '0000-00-00' 
                                THEN '' 
                                ELSE DATE_FORMAT(purchase_date, "%d-%m-%Y") 
                            END AS _purchase_date,
                            CASE 
                                WHEN treasury_date IS NULL OR treasury_date = '0000-00-00' 
                                THEN '' 
                                ELSE DATE_FORMAT(treasury_date, "%d-%m-%Y") 
                            END AS _treasury_date
                    FROM ps_namuna_16 
                    WHERE purchase_date BETWEEN ? AND ? 
                    ORDER BY purchase_date ASC`;

            pool.query(q, [fromDate, toDate], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchNamuna16ByDescription: (pool, description) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT *, 
                            CASE 
                                WHEN purchase_date IS NULL OR purchase_date = '0000-00-00' 
                                THEN '' 
                                ELSE DATE_FORMAT(purchase_date, "%d-%m-%Y") 
                            END AS _purchase_date,
                            CASE 
                                WHEN treasury_date IS NULL OR treasury_date = '0000-00-00' 
                                THEN '' 
                                ELSE DATE_FORMAT(treasury_date, "%d-%m-%Y") 
                            END AS _treasury_date
                    FROM ps_namuna_16 
                    WHERE item_description LIKE ?
                    ORDER BY purchase_date ASC`;

            pool.query(q, [`%${description}%`], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    deleteNamuna16Entry: (pool, id) => {
        return new Promise((resolve, reject) => {
            const q = `DELETE FROM ps_namuna_16 WHERE id = ?`;
            pool.query(q, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
};

module.exports = namuna16Model;
