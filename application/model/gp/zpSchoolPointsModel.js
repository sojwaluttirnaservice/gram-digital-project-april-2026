const { runQuery } = require("../../utils/runQuery");

const zpSchoolPointsModel = {
    // Add a new entry
    add: (pool, pointData) => {
        const q = `
            INSERT INTO ps_zp_school_points (point_desc, createdAt, updatedAt)
            VALUES (?, NOW(), NOW())
        `;
        const values = [pointData.point_desc];
        return runQuery(pool, q, values);
    },

    // Update existing entry
    update: (pool, updatedPointData) => {
        const q = `
            UPDATE ps_zp_school_points 
            SET point_desc = ?, updatedAt = NOW()
            WHERE id = ?
        `;
        const values = [updatedPointData.point_desc, updatedPointData.id];
        return runQuery(pool, q, values);
    },

    // Delete entry by ID
    delete: (pool, deleteId) => {
        const q = `DELETE FROM ps_zp_school_points WHERE id = ?`;
        return runQuery(pool, q, [deleteId]);
    },

    // Get all entries
    getAll: (pool) => {
        const q = `SELECT * FROM ps_zp_school_points ORDER BY createdAt DESC`;
        return runQuery(pool, q);
    },

    // Get one entry by ID
    getById: (pool, id) => {
        const q = `SELECT * FROM ps_zp_school_points WHERE id = ?`;
        return runQuery(pool, q, [id]);
    }
};

module.exports = zpSchoolPointsModel;
