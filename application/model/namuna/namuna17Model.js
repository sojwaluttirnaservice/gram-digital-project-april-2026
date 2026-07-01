const { runQuery } = require('../../utils/runQuery');
const namuna17Model = {
	saveNamuna17Entry: (pool, data) => {
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

		return runQuery(pool, q, [
			data.person_name,
			data.company_name,
			data.order_number,
			data.work_description,
			data.payment_amount,
			data.date,
			data.remarks
		]);
	},

	updateNamuna17Entry: (pool, data) => {
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
		return runQuery(pool, q, [
			data.person_name,
			data.company_name,
			data.order_number,
			data.work_description,
			data.payment_amount,
			data.date,
			data.remarks,
			data.id
		]);
	},

	deleteNamuna17Entry: (pool, id) => {
		const q = `
                DELETE FROM ps_namuna_17 
                WHERE id = ?
            `;
		return runQuery(pool, q, [id]);
	},

	fetchNamuna17ById: (pool, id) => {
		const q = `
                SELECT *, 
                    CASE 
                        WHEN STR_TO_DATE(date, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(date, '%Y-%m-%d'), '%d-%m-%y')
                        ELSE '' 
                    END AS _date FROM ps_namuna_17 
                WHERE id = ?
            `;
		return runQuery(pool, q, [id]);
	},

	/**
     * 
    
    fetchNamuna17ByMonthAndYear: (pool, month, year) => {
            const q = `
                SELECT *, 
                CASE 
                        WHEN STR_TO_DATE(date, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(date, '%Y-%m-%d'), '%d-%m-%y')
                        ELSE '' 
                END AS _date FROM ps_namuna_17 
                WHERE MONTH(date) = ? AND YEAR(date) = ?
            `;
            return runQuery(pool, q, [month, year]);
        },

    fetchNamuna17ByYear: (pool, year) => {
            const q = `
                SELECT *, 
                    CASE 
                        WHEN STR_TO_DATE(date, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(date, '%Y-%m-%d'), '%d-%m-%y')
                        ELSE '' 
                    END AS _date FROM ps_namuna_17 
                WHERE YEAR(date) = ?
                `;
                return runQuery(pool, q, [year]);
            },
        
        fetchNamuna17ByYearRange: (pool, fromYear, toYear) => {
                const q = `
                SELECT * FROM ps_namuna_17 
                WHERE YEAR(date) BETWEEN ? AND ?
                `;
                return runQuery(pool, q, [fromYear, toYear]);
            },
        
        */
	fetchAllNamuna17: (pool) => {
		const q = `
                SELECT *, 
                CASE 
                        WHEN STR_TO_DATE(date, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(date, '%Y-%m-%d'), '%d-%m-%y')
                        ELSE '' 
                END AS _date FROM ps_namuna_17 
            `;
		return runQuery(pool, q);
	}
};

module.exports = namuna17Model;
