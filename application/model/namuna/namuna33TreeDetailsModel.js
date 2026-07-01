const { runQuery } = require('../../utils/runQuery');
const namuna33TreeDetailsModel = {
	saveNamuna33TreeDetails: (pool, data) => {
		const q = `
                INSERT INTO ps_namuna_33_tree_details 
                (
                    month, 
                    year, 
                    land_or_road_details, 
                    tree_type, 
                    tree_additional_info, 
                    tree_count, 
                    expected_annual_income, 
                    actual_income_received, 
                    tree_cut_or_destroyed_details
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
		return runQuery(pool, q, [
			data.month,
			data.year,
			data.land_or_road_details,
			data.tree_type,
			data.tree_additional_info,
			data.tree_count,
			data.expected_annual_income,
			data.actual_income_received,
			data.tree_cut_or_destroyed_details
		]);
	},

	updateNamuna33TreeDetails: (pool, data) => {
		const q = `
                UPDATE ps_namuna_33_tree_details 
                SET 
                    month = ?, 
                    year = ?, 
                    land_or_road_details = ?, 
                    tree_type = ?, 
                    tree_additional_info = ?, 
                    tree_count = ?, 
                    expected_annual_income = ?, 
                    actual_income_received = ?, 
                    tree_cut_or_destroyed_details = ?
                WHERE id = ?
            `;
		return runQuery(pool, q, [
			data.month,
			data.year,
			data.land_or_road_details,
			data.tree_type,
			data.tree_additional_info,
			data.tree_count,
			data.expected_annual_income,
			data.actual_income_received,
			data.tree_cut_or_destroyed_details,
			data.id
		]);
	},

	deleteNamuna33TreeDetails: (pool, id) => {
		const q = `
                DELETE FROM ps_namuna_33_tree_details 
                WHERE id = ?
            `;
		return runQuery(pool, q, [id]);
	},

	fetchNamuna33TreeDetailsById: (pool, id) => {
		const q = `
                SELECT *, 
                    CASE 
                        WHEN STR_TO_DATE(createdAt, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(createdAt, '%Y-%m-%d'), '%d-%m-%Y') 
                        ELSE '' 
                    END AS _createdAt 
                FROM ps_namuna_33_tree_details 
                WHERE id = ?
            `;
		return runQuery(pool, q, [id]);
	},

	fetchNamuna33TreeDetailsByMonthAndYear: (pool, month, year) => {
		/**
                DONT USE THIS QUERY FOR NOW
            const q = `
                SELECT 
                    year,
                    month,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', id,
                            'month', month,
                            'year', year,
                            'land_or_road_details', land_or_road_details,
                            'tree_type', tree_type,
                            'tree_additional_info', tree_additional_info,
                            'tree_count', tree_count,
                            'expected_annual_income', expected_annual_income,
                            'actual_income_received', actual_income_received,
                            'tree_cut_or_destroyed_details', tree_cut_or_destroyed_details
                        )
                    ) AS corresponding_entries
                FROM ps_namuna_33_tree_details
                WHERE month = ? AND year = ?
                GROUP BY year, month
                ORDER BY year ASC, month ASC;
            `;

             * 
             */

		let q = `SELECT 
                *
            FROM ps_namuna_33_tree_details
            ${month || year ? 'WHERE' : ''} 
            ${month ? ` month = ?` : ''}
            ${year ? `${month ? 'AND' : ''} year = ?` : ''}`;

		return runQuery(pool, q, [month, year]);
	},

	fetchNamuna33TreeDetailsByYear: (pool, year) => {
		const q = `
                SELECT *, 
                    CASE 
                        WHEN STR_TO_DATE(createdAt, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(createdAt, '%Y-%m-%d'), '%d-%m-%Y') 
                        ELSE '' 
                    END AS _createdAt 
                FROM ps_namuna_33_tree_details 
                WHERE year = ?
            `;
		return runQuery(pool, q, [year]);
	},

	fetchNamuna33TreeDetailsByFinancialYear: (pool, fromYear, toYear) => {
		const q = `
                SELECT *
                FROM ps_namuna_33_tree_details 
                WHERE 
                    (year = ? AND month BETWEEN 4 AND 12)
                    OR
                    (year = ? AND month BETWEEN 1 AND 3)
            `;
		return runQuery(pool, q, [fromYear, toYear]);
	},

	fetchAllNamuna33TreeDetails: (pool) => {
		const q = `
                SELECT *, 
                    CASE 
                        WHEN STR_TO_DATE(createdAt, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(createdAt, '%Y-%m-%d'), '%d-%m-%Y') 
                        ELSE '' 
                    END AS _createdAt 
                FROM ps_namuna_33_tree_details
            `;
		return runQuery(pool, q);
	}
};

module.exports = namuna33TreeDetailsModel;
