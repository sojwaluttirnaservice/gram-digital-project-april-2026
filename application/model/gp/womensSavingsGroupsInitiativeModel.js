const { runQuery } = require("../../utils/runQuery");

const womensSavingsGroupsInitiativeModel = {
    // Add a new point
    add: (pool, pointData) => {
        const q = `
            INSERT INTO womens_savings_groups_initiative (point_desc, createdAt, updatedAt)
            VALUES (?, NOW(), NOW())
        `;
        const values = [pointData.point_desc];

        return runQuery(pool, q, values);
    },

    // Update an existing point by ID
    update: (pool, updatedPointData) => {
        const q = `
            UPDATE womens_savings_groups_initiative
            SET point_desc = ?, updatedAt = NOW()
            WHERE id = ?
        `;
        const values = [updatedPointData.point_desc, updatedPointData.id];

        return runQuery(pool, q, values);
    },

    // Delete a point by ID
    delete: (pool, deleteId) => {
        const q = `DELETE FROM womens_savings_groups_initiative WHERE id = ?`;
        const values = [deleteId];

        return runQuery(pool, q, values);
    },

    // Get all points
    getAll: (pool) => {
        const q = `SELECT * FROM womens_savings_groups_initiative ORDER BY createdAt DESC`;
        return runQuery(pool, q);
    },

    getById: (pool, initiativeGroupPointId) => {
        const q = `SELECT * FROM womens_savings_groups_initiative WHERE id = ?`;
        return runQuery(pool, q, [initiativeGroupPointId])
    }
};

module.exports = womensSavingsGroupsInitiativeModel;
