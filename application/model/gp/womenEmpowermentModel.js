const { runQuery } = require("../../utils/runQuery");

const womenEmpowermentModel = {
    // Add a new point
    add: (pool, pointData) => {
        const q = `
            INSERT INTO ps_women_empowerment (point_desc, createdAt, updatedAt)
            VALUES (?, NOW(), NOW())
        `;
        const values = [pointData.point_desc];
        return runQuery(pool, q, values);
    },

    // Update existing point
    update: (pool, updatedPointData) => {
        const q = `
            UPDATE ps_women_empowerment
            SET point_desc = ?, updatedAt = NOW()
            WHERE id = ?
        `;
        const values = [updatedPointData.point_desc, updatedPointData.id];
        return runQuery(pool, q, values);
    },

    // Delete by ID
    delete: (pool, deleteId) => {
        const q = `DELETE FROM ps_women_empowerment WHERE id = ?`;
        return runQuery(pool, q, [deleteId]);
    },

    // Get all
    getAll: (pool) => {
        const q = `SELECT * FROM ps_women_empowerment ORDER BY createdAt DESC`;
        return runQuery(pool, q);
    },

    // Get one by ID
    getById: (pool, id) => {
        const q = `SELECT * FROM ps_women_empowerment WHERE id = ?`;
        return runQuery(pool, q, [id]);
    }
};

module.exports = womenEmpowermentModel;
