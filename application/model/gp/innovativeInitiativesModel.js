const { runQuery } = require("../../utils/runQuery");

const innovativeInitiativesModel = {
    // Add a new initiative
    add: (pool, initiativeData) => {
        const q = `
            INSERT INTO ps_innovative_initiatives (initiative_name, createdAt, updatedAt)
            VALUES (?, NOW(), NOW())
        `;
        const dataArr = [initiativeData.initiative_name];

        return runQuery(pool, q, dataArr);
    },

    // Update initiative by ID
    update: (pool, updatedData) => {
        const q = `
            UPDATE ps_innovative_initiatives
            SET initiative_name = ?, updatedAt = NOW()
            WHERE id = ?
        `;
        const dataArr = [updatedData.initiative_name, updatedData.id];

        return runQuery(pool, q, dataArr);
    },

    // Delete initiative by ID
    delete: (pool, id) => {
        const q = `DELETE FROM ps_innovative_initiatives WHERE id = ?`;
        return runQuery(pool, q, [id]);
    },

    // Get all initiatives
    getAll: (pool) => {
        const q = `SELECT * FROM ps_innovative_initiatives ORDER BY createdAt DESC`;
        return runQuery(pool, q);
    },

    // Get initiative by ID
    getById: (pool, id) => {
        const q = `SELECT * FROM ps_innovative_initiatives WHERE id = ?`;
        return runQuery(pool, q, [id]);
    }
};

module.exports = innovativeInitiativesModel;
