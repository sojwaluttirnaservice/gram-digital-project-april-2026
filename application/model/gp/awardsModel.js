const { runQuery } = require("../../utils/runQuery");

const awardsModel = {
    // Add a new award
    add: (pool, awardData) => {
        console.log(awardData)
        const q = `
            INSERT INTO ps_awards (award_name, award_desc, award_year, createdAt, updatedAt)
            VALUES (?, ?, ?, NOW(), NOW())
        `;
        const awardDataArr = [
            awardData.award_name,
            awardData.award_desc || null,
            awardData.award_year
        ];

        return runQuery(pool, q, awardDataArr);
    },

    // Update an existing award by ID
    update: (pool, updatedAwardData) => {
        const q = `
            UPDATE ps_awards
            SET award_name = ?, award_desc = ?, award_year = ?, updatedAt = NOW()
            WHERE id = ?
        `;
        const awardDataArr = [
            updatedAwardData.award_name,
            updatedAwardData.award_desc || null,
            updatedAwardData.award_year,
            updatedAwardData.id
        ];

        return runQuery(pool, q, awardDataArr);
    },

    // Delete an award by ID
    delete: (pool, deleteId) => {
        const q = `DELETE FROM ps_awards WHERE id = ?`;
        const awardDataArr = [deleteId];

        return runQuery(pool, q, awardDataArr);
    },

    // Get all awards
    getAll: (pool) => {
        const q = `SELECT * FROM ps_awards ORDER BY createdAt DESC`;
        return runQuery(pool, q);
    },

    getById: (pool, awardId) => {
        const q = `SELECT * FROM ps_awards WHERE id = ?`;
        return runQuery(pool, q, [awardId]);
    }
};

module.exports = awardsModel;
