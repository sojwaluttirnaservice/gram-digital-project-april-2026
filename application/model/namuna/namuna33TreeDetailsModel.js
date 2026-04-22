const namuna33TreeDetailsModel = {
    saveNamuna33TreeDetails: (pool, data) => {
        return new Promise((resolve, reject) => {
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
            pool.query(
                q,
                [
                    data.month,
                    data.year,
                    data.land_or_road_details,
                    data.tree_type,
                    data.tree_additional_info,
                    data.tree_count,
                    data.expected_annual_income,
                    data.actual_income_received,
                    data.tree_cut_or_destroyed_details,
                ],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },

    updateNamuna33TreeDetails: (pool, data) => {
        return new Promise((resolve, reject) => {
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
            pool.query(
                q,
                [
                    data.month,
                    data.year,
                    data.land_or_road_details,
                    data.tree_type,
                    data.tree_additional_info,
                    data.tree_count,
                    data.expected_annual_income,
                    data.actual_income_received,
                    data.tree_cut_or_destroyed_details,
                    data.id,
                ],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },

    deleteNamuna33TreeDetails: (pool, id) => {
        return new Promise((resolve, reject) => {
            const q = `
                DELETE FROM ps_namuna_33_tree_details 
                WHERE id = ?
            `;
            pool.query(q, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchNamuna33TreeDetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const q = `
                SELECT *, 
                    CASE 
                        WHEN STR_TO_DATE(createdAt, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(createdAt, '%Y-%m-%d'), '%d-%m-%Y') 
                        ELSE '' 
                    END AS _createdAt 
                FROM ps_namuna_33_tree_details 
                WHERE id = ?
            `;
            pool.query(q, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchNamuna33TreeDetailsByMonthAndYear: (pool, month, year) => {
        return new Promise((resolve, reject) => {
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

            pool.query(q, [month, year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchNamuna33TreeDetailsByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const q = `
                SELECT *, 
                    CASE 
                        WHEN STR_TO_DATE(createdAt, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(createdAt, '%Y-%m-%d'), '%d-%m-%Y') 
                        ELSE '' 
                    END AS _createdAt 
                FROM ps_namuna_33_tree_details 
                WHERE year = ?
            `;
            pool.query(q, [year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchAllNamuna33TreeDetails: (pool) => {
        return new Promise((resolve, reject) => {
            const q = `
                SELECT *, 
                    CASE 
                        WHEN STR_TO_DATE(createdAt, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(createdAt, '%Y-%m-%d'), '%d-%m-%Y') 
                        ELSE '' 
                    END AS _createdAt 
                FROM ps_namuna_33_tree_details
            `;
            pool.query(q, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
};

module.exports = namuna33TreeDetailsModel;
