const { runQuery } = require("../../utils/runQuery");

const namuna13Model = {
    saveNamuna13Entry: (pool, data) => {
        return new Promise((resolve, reject) => {
            const q = `
                INSERT INTO ps_namuna_13 
                (
                    post_id, 
                    order_number, 
                    employment_type, 
                    
                    salary_grade, 
                    employee_name, 
                    appointment_date
                )
                VALUES (?, ?, ?,
                         ?, ?, ?)
            `;
            pool.query(
                q,
                [
                    data.post_id,
                    data.order_number,
                    data.employment_type,

                    data.salary_grade,
                    data.employee_name,
                    data.appointment_date,
                ],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },

    updateNamuna13Entry: (pool, data) => {
        console.log(data);
        return new Promise((resolve, reject) => {
            const q = `
                    UPDATE ps_namuna_13 
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

    fetchNamuna13ById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT *,
                        CASE 
                            WHEN appointment_date IS NULL OR appointment_date = '0000-00-00' 
                            THEN '' 
                            ELSE DATE_FORMAT(appointment_date, "%d-%m-%Y") 
                        END AS _appointment_date,
                        CASE 
                            WHEN retirement_date IS NULL OR retirement_date = '0000-00-00' 
                            THEN '' 
                            ELSE DATE_FORMAT(retirement_date, "%d-%m-%Y") 
                        END AS _retirement_date
                    FROM ps_namuna_13 
                    WHERE id = ?`;

            pool.query(q, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchAllNamuna13: (pool) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT *, 
                            CASE 
                                WHEN order_date IS NULL OR order_date = '0000-00-00' 
                                THEN '' 
                                ELSE DATE_FORMAT(order_date, "%d-%m-%Y") 
                            END AS _order_date,
                            CASE 
                                WHEN appointment_date IS NULL OR appointment_date = '0000-00-00' 
                                THEN '' 
                                ELSE DATE_FORMAT(appointment_date, "%d-%m-%Y") 
                            END AS _appointment_date
                    FROM ps_namuna_13 
                    ORDER BY year ASC, month ASC`;

            pool.query(q, [], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchNamuna13ByYearRange: (pool, fromYear, toYear) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT *, 
                            CASE 
                                WHEN order_date IS NULL OR order_date = '0000-00-00' 
                                THEN '' 
                                ELSE DATE_FORMAT(order_date, "%d-%m-%Y") 
                            END AS _order_date,
                            CASE 
                                WHEN appointment_date IS NULL OR appointment_date = '0000-00-00' 
                                THEN '' 
                                ELSE DATE_FORMAT(appointment_date, "%d-%m-%Y") 
                            END AS _appointment_date
                    FROM ps_namuna_13 
                    WHERE 
                        (year = ? AND month >= 4) 
                        OR 
                        (year > ? AND year < ?)           
                        OR 
                        (year = ? AND month <= 3)  
                    ORDER BY year ASC, month ASC`;

            const q2 = `SELECT 
                    n13.*, 
                    n13_post.*,  
                    CASE 
                        WHEN n13_post.order_date IS NULL OR n13_post.order_date = '0000-00-00' 
                        THEN '' 
                        ELSE DATE_FORMAT(n13_post.order_date, "%d-%m-%Y") 
                    END AS _order_date,
                    CASE 
                        WHEN n13.appointment_date IS NULL OR n13.appointment_date = '0000-00-00' 
                        THEN '' 
                        ELSE DATE_FORMAT(n13.appointment_date, "%d-%m-%Y") 
                    END AS _appointment_date,
                    CASE 
                        WHEN n13.retirement_date IS NULL OR n13.retirement_date = '0000-00-00' 
                        THEN '' 
                        ELSE DATE_FORMAT(n13.retirement_date, "%d-%m-%Y") 
                    END AS _retirement_date

                FROM 
                    ps_namuna_13 AS n13
                INNER JOIN 
                    ps_namuna_13_post_list AS n13_post
                ON 
                    n13.post_id = n13_post.id
                WHERE 
                    (n13_post.year = ? AND n13_post.month >= 4) 
                    OR 
                    (n13_post.year > ? AND n13_post.year < ?)           
                    OR 
                    (n13_post.year = ? AND n13_post.month <= 3)  
                GROUP BY 
                    n13_post.id
                ORDER BY 
                    n13_post.year ASC, 
                    n13_post.month ASC`;

            pool.query(q2, [fromYear, fromYear, toYear, toYear], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchNamuna13ByMonthAndYear: (pool, month, year) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT n13.*, n13_post.*,  
                            CASE 
                                WHEN n13_post.order_date IS NULL OR n13_post.order_date = '0000-00-00' 
                                THEN '' 
                                ELSE DATE_FORMAT(n13_post.order_date, "%d-%m-%Y") 
                            END AS _order_date,
                            CASE 
                                WHEN n13.appointment_date IS NULL OR n13.appointment_date = '0000-00-00' 
                                THEN '' 
                                ELSE DATE_FORMAT(n13.appointment_date, "%d-%m-%Y") 
                            END AS _appointment_date
                    FROM ps_namuna_13 AS n13 
                    WHERE n13_post.month = ? AND n13_post.year = ? 
                    ORDER BY year ASC, month ASC`;

            const q2 = `SELECT 
                    n13.*, 
                    n13_post.*,  
                    CASE 
                        WHEN n13_post.order_date IS NULL OR n13_post.order_date = '0000-00-00' 
                        THEN '' 
                        ELSE DATE_FORMAT(n13_post.order_date, "%d-%m-%Y") 
                    END AS _order_date,
                    CASE 
                        WHEN n13.appointment_date IS NULL OR n13.appointment_date = '0000-00-00' 
                        THEN '' 
                        ELSE DATE_FORMAT(n13.appointment_date, "%d-%m-%Y") 
                    END AS _appointment_date,
                    CASE 
                        WHEN n13.retirement_date IS NULL OR n13.retirement_date = '0000-00-00' 
                        THEN '' 
                        ELSE DATE_FORMAT(n13.retirement_date, "%d-%m-%Y") 
                    END AS _retirement_date
                FROM 
                    ps_namuna_13 AS n13
                INNER JOIN 
                    ps_namuna_13_post_list AS n13_post
                ON 
                    n13.post_id = n13_post.id
                WHERE 
                    n13_post.month = ? AND n13_post.year = ?
                ORDER BY 
                    n13_post.year ASC, 
                    n13_post.month ASC`;

            pool.query(q2, [month, year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchNamuna13ByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT *, 
                            CASE 
                                WHEN order_date IS NULL OR order_date = '0000-00-00' 
                                THEN '' 
                                ELSE DATE_FORMAT(order_date, "%d-%m-%Y") 
                            END AS _order_date,
                            CASE 
                                WHEN appointment_date IS NULL OR appointment_date = '0000-00-00' 
                                THEN '' 
                                ELSE DATE_FORMAT(appointment_date, "%d-%m-%Y") 
                            END AS _appointment_date
                    FROM ps_namuna_13 
                    WHERE year = ?
                    ORDER BY year ASC, month ASC`;

            pool.query(q, [year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // copying above 3 functins named fetchNamuna13ByYearRange, fetchNamuna13ByMonthAndYear, fetchNamuna13ByYear
    // belwo abut the criteerai for filteration will be order date

    fetchNamuna13ByYearRangeUseOrderDate: (pool, fromYear, toYear) => {

        const q = `SELECT 
                    n13.*, 
                    n13_post.*,  
                    CASE 
                        WHEN n13_post.order_date IS NULL OR n13_post.order_date = '0000-00-00' 
                        THEN '' 
                        ELSE DATE_FORMAT(n13_post.order_date, "%d-%m-%Y") 
                    END AS _order_date,
                    CASE 
                        WHEN n13.appointment_date IS NULL OR n13.appointment_date = '0000-00-00' 
                        THEN '' 
                        ELSE DATE_FORMAT(n13.appointment_date, "%d-%m-%Y") 
                    END AS _appointment_date,
                    CASE 
                        WHEN n13.retirement_date IS NULL OR n13.retirement_date = '0000-00-00' 
                        THEN '' 
                        ELSE DATE_FORMAT(n13.retirement_date, "%d-%m-%Y") 
                    END AS _retirement_date

                FROM 
                    ps_namuna_13 AS n13
                INNER JOIN 
                    ps_namuna_13_post_list AS n13_post
                ON 
                    n13.post_id = n13_post.id
                WHERE 
                    (
                        (YEAR(n13_post.order_date) = ? AND MONTH(n13_post.order_date) >= 4)
                        OR 
                        (YEAR(n13_post.order_date) > ? AND YEAR(n13_post.order_date) < ?)
                        OR 
                        (YEAR(n13_post.order_date) = ? AND MONTH(n13_post.order_date) <= 3)
                    )
                GROUP BY 
                    n13_post.id
                ORDER BY 
                    n13_post.year ASC, 
                    n13_post.month ASC`;

        return runQuery(pool, q, [fromYear, fromYear, toYear, toYear])
    },

    fetchNamuna13ByMonthAndYearUseOrderDate: (pool, month, year) => {
        const q = `
            SELECT 
                n13.*, 
                n13_post.*,  
                CASE 
                    WHEN n13_post.order_date IS NULL OR n13_post.order_date = '0000-00-00' 
                    THEN '' 
                    ELSE DATE_FORMAT(n13_post.order_date, "%d-%m-%Y") 
                END AS _order_date,
                CASE 
                    WHEN n13.appointment_date IS NULL OR n13.appointment_date = '0000-00-00' 
                    THEN '' 
                    ELSE DATE_FORMAT(n13.appointment_date, "%d-%m-%Y") 
                END AS _appointment_date,
                CASE 
                    WHEN n13.retirement_date IS NULL OR n13.retirement_date = '0000-00-00' 
                    THEN '' 
                    ELSE DATE_FORMAT(n13.retirement_date, "%d-%m-%Y") 
                END AS _retirement_date
            FROM 
                ps_namuna_13 AS n13
            INNER JOIN 
                ps_namuna_13_post_list AS n13_post
            ON 
                n13.post_id = n13_post.id
            WHERE 
                MONTH(n13_post.order_date) = ? AND YEAR(n13_post.order_date) = ?
            ORDER BY 
                YEAR(n13_post.order_date) ASC, 
                MONTH(n13_post.order_date) ASC
        `;
        return runQuery(pool, q, [month, year])
    },

    fetchNamuna13ByYearUseOrderDate: (pool, year) => {
        const q = `
            SELECT *, 
                CASE 
                    WHEN order_date IS NULL OR order_date = '0000-00-00' 
                    THEN '' 
                    ELSE DATE_FORMAT(order_date, "%d-%m-%Y") 
                END AS _order_date,
                CASE 
                    WHEN appointment_date IS NULL OR appointment_date = '0000-00-00' 
                    THEN '' 
                    ELSE DATE_FORMAT(appointment_date, "%d-%m-%Y") 
                END AS _appointment_date
            FROM ps_namuna_13 
            WHERE YEAR(order_date) = ?
            ORDER BY YEAR(order_date) ASC, MONTH(order_date) ASC
        `;
        return runQuery(pool, q, [year])
    },

    deleteNamuna13Entry: (pool, id) => {
        return new Promise((resolve, reject) => {
            const q = `DELETE FROM ps_namuna_13 WHERE id = ?`;
            pool.query(q, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    createPost: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO ps_namuna_13_post_list 
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
                UPDATE ps_namuna_13_post_list 
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
                DELETE FROM ps_namuna_13_post_list 
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
                FROM ps_namuna_13_post_list
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
                    FROM ps_namuna_13_post_list`;

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
                        
                    FROM ps_namuna_13`;

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

module.exports = namuna13Model;
