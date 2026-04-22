const { runQuery } = require("../../utils/runQuery");

const ashaWorkersModel = {
    // Add ASHA worker
    add: (pool, data) => {
        const q = `
            INSERT INTO ps_asha_workers (name, village, mobile, createdAt, updatedAt)
            VALUES (?, ?, ?, NOW(), NOW())
        `;
        const values = [data.name, data.village || null, data.mobile];
        return runQuery(pool, q, values);
    },

    // Update ASHA worker
    update: (pool, data) => {
        const q = `
            UPDATE ps_asha_workers
            SET name = ?, village = ?, mobile = ?, updatedAt = NOW()
            WHERE id = ?
        `;
        const values = [data.name, data.village || null, data.mobile, data.id];
        return runQuery(pool, q, values);
    },

    // Delete ASHA worker
    delete: (pool, id) => {
        const q = `DELETE FROM ps_asha_workers WHERE id = ?`;
        return runQuery(pool, q, [id]);
    },

    // Get all ASHA workers
    getAll: (pool) => {
        const q = `SELECT * FROM ps_asha_workers ORDER BY createdAt DESC`;
        return runQuery(pool, q);
    },

    // Get by ID
    getById: (pool, id) => {
        const q = `SELECT * FROM ps_asha_workers WHERE id = ?`;
        return runQuery(pool, q, [id]);
    }
};

module.exports = ashaWorkersModel;
