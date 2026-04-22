const { runQuery } = require("../../utils/runQuery");

const waterConservationModel = {
    // Add a new structure
    add: (pool, data) => {
        const q = `
            INSERT INTO ps_water_conservation (
                structure_name, village_name, taluka_name, structure_length_m,
                storage_capacity_cubic_m, description, contact_mobile,
                geo_latitude, geo_longitude, createdAt, updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;
        const values = [
            data.structure_name,
            data.village_name || null,
            data.taluka_name || null,
            data.structure_length_m || null,
            data.storage_capacity_cubic_m || null,
            data.description || null,
            data.contact_mobile,
            data.geo_latitude || null,
            data.geo_longitude || null
        ];

        return runQuery(pool, q, values);
    },

    // Update an existing structure
    update: (pool, data) => {
        const q = `
            UPDATE ps_water_conservation
            SET structure_name = ?, village_name = ?, taluka_name = ?, structure_length_m = ?,
                storage_capacity_cubic_m = ?, description = ?, contact_mobile = ?,
                geo_latitude = ?, geo_longitude = ?, updatedAt = NOW()
            WHERE id = ?
        `;
        const values = [
            data.structure_name,
            data.village_name || null,
            data.taluka_name || null,
            data.structure_length_m || null,
            data.storage_capacity_cubic_m || null,
            data.description || null,
            data.contact_mobile,
            data.geo_latitude || null,
            data.geo_longitude || null,
            data.id
        ];

        return runQuery(pool, q, values);
    },

    // Delete structure by ID
    delete: (pool, id) => {
        const q = `DELETE FROM ps_water_conservation WHERE id = ?`;
        return runQuery(pool, q, [id]);
    },

    // Get all structures
    getAll: (pool) => {
        const q = `SELECT * FROM ps_water_conservation ORDER BY createdAt DESC`;
        return runQuery(pool, q);
    },

    // Get by ID
    getById: (pool, id) => {
        const q = `SELECT * FROM ps_water_conservation WHERE id = ?`;
        return runQuery(pool, q, [id]);
    }
};

module.exports = waterConservationModel;
