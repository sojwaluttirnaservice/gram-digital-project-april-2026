const namuna17Model = {
    saveNamuna17Entry: (pool, data) => {
        return new Promise((resolve, reject) => {
            const q = `
                INSERT INTO ps_namuna_17 
                (
                    person_name, 
                    company_name, 
                    order_number, 
                    work_description, 
                    payment_amount, 
                    date,
                    remarks
                )
                VALUES (?, ?, ?, ?, ?, ?, ?)`;

            pool.query(
                q,
                [
                    data.person_name,
                    data.company_name,
                    data.order_number,
                    data.work_description,
                    data.payment_amount,
                    data.date,
                    data.remarks,
                ],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },

    updateNamuna17Entry: (pool, data) => {
        return new Promise((resolve, reject) => {
            const q = `
                UPDATE ps_namuna_17 
                SET 
                    person_name = ?, 
                    company_name = ?, 
                    order_number = ?, 
                    work_description = ?, 
                    payment_amount = ?, 
                    date = ?,
                    remarks = ?
                WHERE id = ?
            `;
            pool.query(
                q,
                [
                    data.person_name,
                    data.company_name,
                    data.order_number,
                    data.work_description,
                    data.payment_amount,
                    data.date,
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

    deleteNamuna17Entry: (pool, id) => {
        return new Promise((resolve, reject) => {
            const q = `
                DELETE FROM ps_namuna_17 
                WHERE id = ?
            `;
            pool.query(q, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchNamuna17ById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const q = `
                SELECT *, 
                    CASE 
                        WHEN STR_TO_DATE(date, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(date, '%Y-%m-%d'), '%d-%m-%y')
                        ELSE '' 
                    END AS _date FROM ps_namuna_17 
                WHERE id = ?
            `;
            pool.query(q, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    /**
     * 
    
    fetchNamuna17ByMonthAndYear: (pool, month, year) => {
        return new Promise((resolve, reject) => {
            const q = `
                SELECT *, 
                CASE 
                        WHEN STR_TO_DATE(date, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(date, '%Y-%m-%d'), '%d-%m-%y')
                        ELSE '' 
                END AS _date FROM ps_namuna_17 
                WHERE MONTH(date) = ? AND YEAR(date) = ?
            `;
            pool.query(q, [month, year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchNamuna17ByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const q = `
                SELECT *, 
                    CASE 
                        WHEN STR_TO_DATE(date, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(date, '%Y-%m-%d'), '%d-%m-%y')
                        ELSE '' 
                    END AS _date FROM ps_namuna_17 
                WHERE YEAR(date) = ?
                `;
                pool.query(q, [year], (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        },
        
        fetchNamuna17ByYearRange: (pool, fromYear, toYear) => {
            return new Promise((resolve, reject) => {
                const q = `
                SELECT * FROM ps_namuna_17 
                WHERE YEAR(date) BETWEEN ? AND ?
                `;
                pool.query(q, [fromYear, toYear], (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        },
        
        */
    fetchAllNamuna17: (pool) => {
        return new Promise((resolve, reject) => {
            const q = `
                SELECT *, 
                CASE 
                        WHEN STR_TO_DATE(date, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(date, '%Y-%m-%d'), '%d-%m-%y')
                        ELSE '' 
                END AS _date FROM ps_namuna_17 
            `;
            pool.query(q, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
};

module.exports = namuna17Model;
