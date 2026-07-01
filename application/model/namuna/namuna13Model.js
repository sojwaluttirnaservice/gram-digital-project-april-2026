const { runQuery } = require('../../utils/runQuery');

const namuna13Model = {
	saveNamuna13Entry: (pool, data) => {
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
		return runQuery(pool, q, [
			data.post_id,
			data.order_number,
			data.employment_type,

			data.salary_grade,
			data.employee_name,
			data.appointment_date
		]);
	},

	updateNamuna13Entry: (pool, data) => {
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

		return runQuery(pool, q, [
			data.order_number,

			data.employment_type,

			data.salary_grade,
			data.employee_name,
			data.appointment_date,

			data.retirement_date || '',
			data.is_retired || 0,

			data.id
		]);
	},

	fetchNamuna13ById: (pool, id) => {
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

		return runQuery(pool, q, [id]);
	},

	fetchAllNamuna13: (pool) => {
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

		return runQuery(pool, q);
	},

	fetchNamuna13ByYearRange: (pool, fromYear, toYear) => {
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

		return runQuery(pool, q2, [fromYear, fromYear, toYear, toYear]);
	},

	fetchNamuna13ByMonthAndYear: (pool, month, year) => {
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

		return runQuery(pool, q2, [month, year]);
	},

	fetchNamuna13ByYear: (pool, year) => {
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

		return runQuery(pool, q, [year]);
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

		return runQuery(pool, q, [fromYear, fromYear, toYear, toYear]);
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
		return runQuery(pool, q, [month, year]);
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
		return runQuery(pool, q, [year]);
	},

	deleteNamuna13Entry: (pool, id) => {
		const q = `DELETE FROM ps_namuna_13 WHERE id = ?`;
		return runQuery(pool, q, [id]);
	},

	createPost: (pool, data) => {
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
			data.order_date
		];

		return runQuery(pool, query, values);
	},

	// Update an existing post entry by ID
	updatePost: (pool, data) => {
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

			data.id
		];

		return runQuery(pool, query, values);
	},

	// Delete a post entry by ID
	deletePost: (pool, id) => {
		const query = `
                DELETE FROM ps_namuna_13_post_list 
                WHERE id = ?
            `;
		return runQuery(pool, query, [id]);
	},

	getSinglePostEntry: (pool, id) => {
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
		return runQuery(pool, query, [id]);
	},

	// List all posts with optional filter by month and year
	list: (pool, filters = {}) => {
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

		return runQuery(pool, query, values);
	},

	getEmployeeList: (pool, filters = {}) => {
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

		return runQuery(pool, query, values);
	}
};

module.exports = namuna13Model;
