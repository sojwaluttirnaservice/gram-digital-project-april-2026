const { runQuery } = require("../../utils/runQuery");

const womensSavingsGroupNamesModel = {
    // Add a new group name
    add: (pool, groupData) => {
        const q = `
            INSERT INTO womens_savings_group_names (group_name, village_name, createdAt, updatedAt)
            VALUES (?, ?, NOW(), NOW())
        `;
        const values = [
            groupData.group_name,
            groupData.village_name || ''
        ];

        return runQuery(pool, q, values);
    },

    // Update an existing group by ID
    update: (pool, updatedGroupData) => {
        const q = `
            UPDATE womens_savings_group_names
            SET group_name = ?, village_name = ?, updatedAt = NOW()
            WHERE id = ?
        `;
        const values = [
            updatedGroupData.group_name,
            updatedGroupData.village_name || '',
            updatedGroupData.id
        ];

        return runQuery(pool, q, values);
    },

    // Delete a group by ID
    delete: (pool, deleteId) => {
        const q = `DELETE FROM womens_savings_group_names WHERE id = ?`;
        const values = [deleteId];

        return runQuery(pool, q, values);
    },

    // Get all groups
    getAll: (pool) => {
        const q = `SELECT * FROM womens_savings_group_names ORDER BY createdAt DESC`;
        return runQuery(pool, q);
    },

    getById: (pool, initiativeGroupNameId) => {
        const q = `SELECT * FROM womens_savings_group_names WHERE id = ?`;
        return runQuery(pool, q, [initiativeGroupNameId])
    }
};

module.exports = womensSavingsGroupNamesModel;
