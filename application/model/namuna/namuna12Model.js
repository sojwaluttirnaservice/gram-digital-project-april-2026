const { runQuery } = require("../../utils/runQuery");

const namuna12Model = {
    saveNamuna12MainEntry: (pool, data) => {

                    const q = `
                INSERT INTO ps_namuna_12_main 
                (
                    month,
                    year,
                    bill_number, 
                    
                    bill_date, 
                    name_of_person_accepting_bill, 
                    
                    total_spending, 
                    certificate_number, 
                    page_number_in_cash_book,
                    remarks,

                    ps_bank_details_id_fk
                )
                VALUES (?)
            `;
            const insertArray = [
                data.month,
                data.year,
                data.bill_number,
                data.bill_date,
                data.name_of_person_accepting_bill,

                data.total_spending,
                data.certificate_number,
                data.page_number_in_cash_book,
                data.remarks,

                data.ps_bank_details_id_fk
            ];
        return runQuery(pool, q, [insertArray])
    },


    updateNamuna12MainEntry: (pool, data) => {

        const q = `
                UPDATE ps_namuna_12_main SET
                    month = ?,
                    year = ?,
                    bill_number = ?,
                    bill_date = ?,
                    name_of_person_accepting_bill = ?,
                    total_spending = ?,
                    certificate_number = ?,
                    page_number_in_cash_book = ?,
                    remarks = ?
                WHERE id = ?
            `;

        const updateArray = [
            +data.month,
            +data.year,
            data.bill_number,
            data.bill_date,
            data.name_of_person_accepting_bill,
            data.total_spending,
            data.certificate_number,
            data.page_number_in_cash_book,
            data.remarks,
            data.id // Make sure this exists in your data
        ];

        return runQuery(pool, q, updateArray)

    },


    saveNamuna12SpendingEntry: (pool, data) => {
        return new Promise((resolve, reject) => {
            const q = `INSERT INTO ps_namuna_12_spending
                        (
                            item_name_or_goods_name,
                            approval_number,
                            approval_date,
                            quantity_or_weight,
                            rate,

                            unit,
                            total_amount,
                            total_amount_previous_expense,
                            main_namuna_12_id_fk
                        ) VALUES (?)`;

            const insertArray = [
                data.item_name_or_goods_name,
                data.approval_number,
                data.approval_date,
                data.quantity_or_weight,
                data.rate,

                data.unit,
                data.total_amount,
                data.total_amount_previous_expense,
                data.main_namuna_12_id_fk,
            ];

            pool.query(q, [insertArray], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    saveNamuna12SpendingEntryBulk: (pool, data) => {
        return new Promise((resolve, reject) => {
            const q = `INSERT INTO ps_namuna_12_spending
                        (
                            item_name_or_goods_name,
                            approval_number,
                            approval_date,
                            quantity_or_weight,
                            rate,

                            unit,
                            total_amount,
                            total_amount_previous_expense,
                            main_namuna_12_id_fk
                        ) VALUES ?`;

            pool.query(q, [data], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },


    saveSpendingEntry: (pool, newSpendingData) => {
        let q = `
                INSERT INTO ps_namuna_12_spending (
                    item_name_or_goods_name,
                    approval_number,
                    approval_date,
                    quantity_or_weight,
                    rate,
                    unit,
                    total_amount,
                    total_amount_previous_expense,
                    main_namuna_12_id_fk,
                    createdAt,
                    updatedAt
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
            `;

        let insertArr = [
            newSpendingData.item_name_or_goods_name,
            newSpendingData.approval_number,
            newSpendingData.approval_date,
            newSpendingData.quantity_or_weight,
            newSpendingData.rate,
            newSpendingData.unit,
            newSpendingData.total_amount,
            newSpendingData.total_amount_previous_expense,
            newSpendingData.main_namuna_12_id_fk,
        ];

        return runQuery(pool, q, insertArr);
    },

    /**
   
    updateNamuna12MainEntry: (pool, data) => {
        console.log(data);
        return new Promise((resolve, reject) => {
            const q = `
                    UPDATE ps_namuna_12_main 
                    SET  
 

                        order_number = ?, 
                        employment_type = ?, 

                        salary_grade = ?, 
                        employee_name = ?, 
                        appointment_date = ?,

                        retirement_date = ?,
                        is_retired = ?
                    WHERE 
                        id = ?
                `;

            pool.query(
                q,
                [
                    data.order_number,

                    data.employment_type,

                    data.salary_grade,
                    data.employee_name,
                    data.appointment_date,

                    data.retirement_date || '',
                    data.is_retired || 0,

                    data.id,
                ],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },
    */

    updateSpendingEntry: (pool, updatedSpendingData) => {
        let q = `
            UPDATE ps_namuna_12_spending SET
                item_name_or_goods_name = ?,
                approval_number = ?,
                approval_date = ?,
                quantity_or_weight = ?,
                rate = ?,
                unit = ?,
                total_amount = ?,
                total_amount_previous_expense = ?,
                main_namuna_12_id_fk = ?,
                updatedAt = NOW()
            WHERE id = ?
        `;

        let updateArr = [
            updatedSpendingData.item_name_or_goods_name,
            updatedSpendingData.approval_number,
            updatedSpendingData.approval_date,
            updatedSpendingData.quantity_or_weight,
            updatedSpendingData.rate,
            updatedSpendingData.unit,
            updatedSpendingData.total_amount,
            updatedSpendingData.total_amount_previous_expense,
            updatedSpendingData.main_namuna_12_id_fk,
            updatedSpendingData.id, // <- WHERE clause
        ];

        return runQuery(pool, q, updateArr);
    },


    deleteSpendingEntry: (pool, id) => {
        let q = `DELETE FROM ps_namuna_12_spending WHERE id = ?`
        return runQuery(pool, q, [id])
    },


    //done
    fetchNamuna12MainById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const q = `
                SELECT 
                    n12Main.*,
                    IFNULL(DATE_FORMAT(n12Main.bill_date, '%d-%m-%Y'), "") AS _bill_date,
                    CASE 
                        WHEN COUNT(n12Spending.id) > 0 THEN
                            JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'id', n12Spending.id,
                                    'item_name_or_goods_name', n12Spending.item_name_or_goods_name,
                                    'approval_number', n12Spending.approval_number,
                                    'approval_date', n12Spending.approval_date,
                                    '_approval_date', IFNULL(DATE_FORMAT(n12Spending.approval_date, '%d-%m-%Y'), ""),
                                    'quantity_or_weight', n12Spending.quantity_or_weight,
                                    'rate', n12Spending.rate,
                                    'unit', n12Spending.unit,
                                    'main_namuna_12_id_fk', n12Spending.main_namuna_12_id_fk,
                                    'total_amount', n12Spending.total_amount,
                                    'total_amount_previous_expense', n12Spending.total_amount_previous_expense
                                )
                            )
                        ELSE NULL
                    END AS spendingData
                FROM 
                    ps_namuna_12_main AS n12Main
                LEFT JOIN 
                    ps_namuna_12_spending AS n12Spending
                    ON n12Main.id = n12Spending.main_namuna_12_id_fk
                WHERE 
                    n12Main.id = ?
                GROUP BY 
                    n12Main.id;`;

            return pool.query(q, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    //done
    fetchAllNamuna12Main: (pool) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT 
                        n12Main.*,
                        IFNULL(DATE_FORMAT(n12Main.bill_date, '%d-%m-%Y'), "") AS _bill_date,
                        CASE 
                            WHEN COUNT(n12Spending.id) > 0 THEN
                                JSON_ARRAYAGG(
                                    JSON_OBJECT(
                                        'id', n12Spending.id,
                                        'item_name_or_goods_name', n12Spending.item_name_or_goods_name,
                                        'approval_number', n12Spending.approval_number,
                                        'approval_date', n12Spending.approval_date,
                                        '_approval_date', IFNULL(DATE_FORMAT(n12Spending.approval_date, '%d-%m-%Y'), ""),
                                        'quantity_or_weight', n12Spending.quantity_or_weight,
                                        'rate', n12Spending.rate,
                                        'unit', n12Spending.unit,
                                        'main_namuna_12_id_fk', n12Spending.main_namuna_12_id_fk,
                                        'total_amount', n12Spending.total_amount,
                                        'total_amount_previous_expense', n12Spending.total_amount_previous_expense
                                    )
                                )
                            ELSE NULL
                        END AS spendingData
                    FROM 
                        ps_namuna_12_main AS n12Main
                    LEFT JOIN 
                        ps_namuna_12_spending AS n12Spending
                    ON 
                        n12Main.id = n12Spending.main_namuna_12_id_fk
                    GROUP BY 
                        n12Main.id`;

            pool.query(q, [], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    //done
    fetchNamuna12MainByYearRange: (pool, fromYear, toYear) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT 
                        n12Main.*,
                        IFNULL(DATE_FORMAT(n12Main.bill_date, '%d-%m-%Y'), "") AS _bill_date,
                        CASE 
                            WHEN COUNT(n12Spending.id) > 0 THEN
                                JSON_ARRAYAGG(
                                    JSON_OBJECT(
                                        'id', n12Spending.id,
                                        'item_name_or_goods_name', n12Spending.item_name_or_goods_name,
                                        'approval_number', n12Spending.approval_number,
                                        'approval_date', n12Spending.approval_date,
                                        '_approval_date', IFNULL(DATE_FORMAT(n12Spending.approval_date, '%d-%m-%Y'), ""),
                                        'quantity_or_weight', n12Spending.quantity_or_weight,
                                        'rate', n12Spending.rate,
                                        'unit', n12Spending.unit,
                                        'main_namuna_12_id_fk', n12Spending.main_namuna_12_id_fk,
                                        'total_amount', n12Spending.total_amount,
                                        'total_amount_previous_expense', n12Spending.total_amount_previous_expense
                                    )
                                )
                            ELSE NULL
                        END AS spendingData
                    FROM 
                        ps_namuna_12_main AS n12Main
                        LEFT JOIN 
                        ps_namuna_12_spending AS n12Spending
                    ON 
                        n12Main.id = n12Spending.main_namuna_12_id_fk

                    WHERE (n12Main.year = ? AND n12Main.month >= 4) 
                            OR 
                            (n12Main.year > ? AND n12Main.year < ?)           
                            OR 
                            (n12Main.year = ? AND n12Main.month <= 3)  
                    GROUP BY 
                        n12Main.id`;

            pool.query(q, [fromYear, fromYear, toYear, toYear], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // done
    fetchNamuna12MainByMonthAndYear: (pool, month, year) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT 
                        n12Main.*,
                        IFNULL(DATE_FORMAT(n12Main.bill_date, '%d-%m-%Y'), "") AS _bill_date,
                        CASE 
                            WHEN COUNT(n12Spending.id) > 0 THEN
                                JSON_ARRAYAGG(
                                    JSON_OBJECT(
                                        'id', n12Spending.id,
                                        'item_name_or_goods_name', n12Spending.item_name_or_goods_name,
                                        'approval_number', n12Spending.approval_number,
                                        'approval_date', n12Spending.approval_date,
                                        '_approval_date', IFNULL(DATE_FORMAT(n12Spending.approval_date, '%d-%m-%Y'), ""),
                                        'quantity_or_weight', n12Spending.quantity_or_weight,
                                        'rate', n12Spending.rate,
                                        'unit', n12Spending.unit,
                                        'main_namuna_12_id_fk', n12Spending.main_namuna_12_id_fk,
                                        'total_amount', n12Spending.total_amount,
                                        'total_amount_previous_expense', n12Spending.total_amount_previous_expense
                                    )
                                )
                            ELSE NULL
                        END AS spendingData
                    FROM 
                        ps_namuna_12_main AS n12Main
                        LEFT JOIN 
                        ps_namuna_12_spending AS n12Spending
                    ON 
                        n12Main.id = n12Spending.main_namuna_12_id_fk

                    WHERE month = ? AND year = ?
                    GROUP BY 
                        n12Main.id`;

            pool.query(q, [month, year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    //done
    fetchNamuna12MainByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT 
                        n12Main.*,
                        IFNULL(DATE_FORMAT(n12Main.bill_date, '%d-%m-%Y'), "") AS _bill_date,
                        CASE 
                            WHEN COUNT(n12Spending.id) > 0 THEN
                                JSON_ARRAYAGG(
                                    JSON_OBJECT(
                                        'id', n12Spending.id,
                                        'item_name_or_goods_name', n12Spending.item_name_or_goods_name,
                                        'approval_number', n12Spending.approval_number,
                                        'approval_date', n12Spending.approval_date,
                                        '_approval_date', IFNULL(DATE_FORMAT(n12Spending.approval_date, '%d-%m-%Y'), ""),
                                        'quantity_or_weight', n12Spending.quantity_or_weight,
                                        'rate', n12Spending.rate,
                                        'unit', n12Spending.unit,
                                        'main_namuna_12_id_fk', n12Spending.main_namuna_12_id_fk,
                                        'total_amount', n12Spending.total_amount,
                                        'total_amount_previous_expense', n12Spending.total_amount_previous_expense
                                    )
                                )
                            ELSE NULL
                        END AS spendingData
                    FROM 
                        ps_namuna_12_main AS n12Main
                    LEFT JOIN 
                        ps_namuna_12_spending AS n12Spending
                    ON 
                        n12Main.id = n12Spending.main_namuna_12_id_fk

                    WHERE year = ?
                    GROUP BY 
                        n12Main.id`;

            pool.query(q, [year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    deleteNamuna12MainEntry: (pool, id) => {
        return new Promise((resolve, reject) => {
            const q = `DELETE FROM ps_namuna_12_main WHERE id = ?`;
            pool.query(q, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    deleteNamuna12SpendingEntries: (pool, mainNamuna12IdFk) => {
        return new Promise((resolve, reject) => {
            const q = `DELETE FROM ps_namuna_12_spending WHERE main_namuna_12_id_fk = ?`;
            pool.query(q, [mainNamuna12IdFk], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    createPost: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO ps_namuna_12_main_post_list 
                (
                month, 
                year, 
                post_name, 
                post_count, 
                approved_post, 

                order_date
                ) 
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            const values = [
                data.month,
                data.year,
                data.post_name,
                data.post_count,
                data.approved_post,
                data.order_date,
            ];

            pool.query(query, values, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Update an existing post entry by ID
    updatePost: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE ps_namuna_12_main_post_list 
                SET 
                    month = ?,
                    year = ?, 
                    post_name = ?, 

                    post_count = ?, 
                    approved_post = ?, 
                    order_date = ?

                WHERE id = ?
            `;
            const values = [
                data.month,
                data.year,
                data.post_name,

                data.post_count,
                data.approved_post,
                data.order_date,

                data.id,
            ];

            pool.query(query, values, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Delete a post entry by ID
    deletePost: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM ps_namuna_12_main_post_list 
                WHERE id = ?
            `;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    getSinglePostEntry: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *,
                    CASE 
                        WHEN order_date IS NULL OR order_date = '0000-00-00' 
                        THEN '' 
                        ELSE DATE_FORMAT(order_date, "%d-%m-%Y") 
                    END AS _order_date
                FROM ps_namuna_12_main_post_list
                WHERE id = ?
            `;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result[0]);
            });
        });
    },

    // List all posts with optional filter by month and year
    list: (pool, filters = {}) => {
        return new Promise((resolve, reject) => {
            let query = `
                    SELECT *,
                        CASE 
                            WHEN order_date IS NULL OR order_date = '0000-00-00' 
                            THEN '' 
                            ELSE DATE_FORMAT(order_date, "%d-%m-%Y") 
                        END AS _order_date
                    FROM ps_namuna_12_main_post_list`;

            const values = [];

            if (filters.month || filters.year) {
                query += ` WHERE`;
                if (filters.month) {
                    query += ` month = ?`;
                    values.push(filters.month);
                }
                if (filters.year) {
                    query += values.length ? ` AND year = ?` : ` year = ?`;
                    values.push(filters.year);
                }
            }

            pool.query(query, values, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getEmployeeList: (pool, filters = {}) => {
        return new Promise((resolve, reject) => {
            let query = `
                    SELECT *
                        
                    FROM ps_namuna_12_main`;

            const values = [];

            if (filters || filters.post_id) {
                query += ` WHERE`;
                if (filters.post_id) {
                    query += values.length ? ` AND post_id = ?` : ` post_id = ?`;
                    values.push(filters.post_id);
                }
            }

            pool.query(query, values, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },
};

module.exports = namuna12Model;
