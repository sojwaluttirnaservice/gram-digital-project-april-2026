const { runQuery } = require("../../utils/runQuery");

const aanganwadiModel = {
    // 
    // Add new center
    addCenter: (pool, centerData) => {
        const q = `
      INSERT INTO ps_aanganwadi_centers (center_name, center_number, village_name, has_toilet, has_kitchen_shed, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `;
        const values = [
            centerData.center_name,
            centerData.center_number,
            centerData.village_name,
            centerData.has_toilet,
            centerData.has_kitchen_shed,
        ];
        return runQuery(pool, q, values);
    },

    // Update center
    updateCenter: (pool, data) => {
        const q = `
      UPDATE ps_aanganwadi_centers 
      SET center_name = ?, center_number = ?, village_name = ?, has_toilet = ?, has_kitchen_shed = ?, updatedAt = NOW()
      WHERE id = ?
    `;
        const values = [
            data.center_name,
            data.center_number,
            data.village_name,
            data.has_toilet,
            data.has_kitchen_shed,
            data.id
        ];
        return runQuery(pool, q, values);
    },

    // Delete center
    deleteCenter: (pool, id) => {
        const q = `DELETE FROM ps_aanganwadi_centers WHERE id = ?`;
        return runQuery(pool, q, [id]);
    },

    // Get all centers
    getAllCenters: (pool) => {
        const q = `SELECT * FROM ps_aanganwadi_centers ORDER BY createdAt ASC`;
        return runQuery(pool, q);
    },

    // Get single center by ID
    getCenterById: (pool, id) => {
        const q = `SELECT * FROM ps_aanganwadi_centers WHERE id = ?`;
        return runQuery(pool, q, [id]);
    },

    // WORKERS ================ 
    // Add worker
    addWorker: (pool, data) => {
        const q = `
      INSERT INTO ps_aanganwadi_workers (center_id_fk, name, role)
      VALUES (?, ?, ?)
    `;
        const values = [data.center_id_fk, data.name, data.role];
        return runQuery(pool, q, values);
    },

    // Update worker
    updateWorker: (pool, data) => {
        const q = `
      UPDATE ps_aanganwadi_workers 
      SET name = ?, role = ?
      WHERE id = ?
    `;
        const values = [data.name, data.role, data.id];
        return runQuery(pool, q, values);
    },

    // Delete worker
    deleteWorker: (pool, id) => {
        const q = `DELETE FROM ps_aanganwadi_workers WHERE id = ?`;
        return runQuery(pool, q, [id]);
    },

    // Get all workers for a center
    getWorkersByCenterId: (pool, centerId) => {
        const q = `SELECT * FROM ps_aanganwadi_workers WHERE center_id_fk = ?`;
        return runQuery(pool, q, [centerId]);
    },

    getWorkerById: (pool, centerId) => {
        const q = `SELECT * FROM ps_aanganwadi_workers WHERE id = ?`;
        return runQuery(pool, q, [centerId]);
    },

    //---------------------------------------------------

    // Add year_rangely stat
    addYearlyStat: (pool, data) => {
        const q = `
      INSERT INTO ps_aanganwadi_yearly_stats (center_id_fk, year_range)
      VALUES (?, ?)
    `;
        const values = [data.center_id_fk, data.year_range];
        return runQuery(pool, q, values);
    },

    // Update stat year_range
    updateYearlyStat: (pool, data) => {
        const q = `UPDATE ps_aanganwadi_yearly_stats SET year_range = ? WHERE id = ?`;
        return runQuery(pool, q, [data.year_range, data.id]);
    },

    // Delete stat year_range
    deleteYearlyStat: (pool, id) => {
        const q = `DELETE FROM ps_aanganwadi_yearly_stats WHERE id = ?`;
        return runQuery(pool, q, [id]);
    },

    // Get year_rangely stats by center
    getYearlyStatsByCenter: (pool, centerId) => {
        const q = `SELECT * FROM ps_aanganwadi_yearly_stats WHERE center_id_fk = ?`;
        return runQuery(pool, q, [centerId]);
    },

    getYearlyStatsByCenterWithAgeWiseCount: (pool, centerId) => {
        let q = `
            SELECT 
                pys.id AS yearly_stat_id,
                pys.year_range,
                (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'agewise_children_id', ordered_pac.id,
                            'min_age', ordered_pac.min_age,
                            'max_age', ordered_pac.max_age,
                            'child_count', ordered_pac.child_count
                        )
                    )
                    FROM (
                        SELECT *
                        FROM ps_aanganwadi_agewise_children
                        WHERE yearly_stat_id_fk = pys.id
                        ORDER BY id
                    ) AS ordered_pac
                ) AS agewise_children
            FROM 
                ps_aanganwadi_yearly_stats AS pys
            WHERE 
                pys.center_id_fk = ?
            GROUP BY 
                pys.id, pys.year_range;
        `
        return runQuery(pool, q, [centerId])
    },


    //---------------------------------------------------
    // Add age group children count
    addChildren: (pool, data) => {
        const q = `
      INSERT INTO ps_aanganwadi_agewise_children (yearly_stat_id_fk, min_age, max_age, child_count)
      VALUES (?, ?, ?, ?)
    `;
        const values = [data.yearly_stat_id_fk, data.min_age, data.max_age, data.child_count];
        return runQuery(pool, q, values);
    },

    // Update age group children count
    updateChildren: (pool, data) => {
        const q = `
      UPDATE ps_aanganwadi_agewise_children
      SET min_age = ?, max_age = ?, child_count = ?
      WHERE id = ?
    `;
        const values = [data.min_age, data.max_age, data.child_count, data.id];
        return runQuery(pool, q, values);
    },

    // Delete age group entry
    deleteChildren: (pool, id) => {
        console.log(id)
        const q = `DELETE FROM ps_aanganwadi_agewise_children WHERE id = ?`;
        return runQuery(pool, q, [id]);
    },

    // Get children agewise data for a year_rangely_stat
    getChildrenByYearlyStatId: (pool, year_rangelyStatId) => {
        const q = `
          SELECT * FROM ps_aanganwadi_agewise_children 
          WHERE yearly_stat_id_fk = ?
    `;
        return runQuery(pool, q, [year_rangelyStatId]);
    },

    getAanganwadiCentersWithWorkersAndYearlyStats: (pool) => {
        let q = `
                            
                    SELECT 
                        c.id AS center_id,
                        c.center_name,
                        c.village_name,
                        c.has_toilet,
                        c.has_kitchen_shed,

                        -- Workers as JSON array
                        (
                            SELECT JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'id', w.id,
                                    'name', w.name,
                                    'role', w.role
                                )
                            )
                            FROM ps_aanganwadi_workers w
                            WHERE w.center_id_fk = c.id
                        ) AS workers,

                        -- Last two yearly stats with nested agewise children
                        (
                            SELECT JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'stat_id', ys.id,
                                    'year_range', ys.year_range,
                                    'agewise_children', (
                                        SELECT JSON_ARRAYAGG(
                                            JSON_OBJECT(
                                                'id', ac.id,
                                                'min_age', ac.min_age,
                                                'max_age', ac.max_age,
                                                'child_count', ac.child_count
                                            )
                                        )
                                        FROM ps_aanganwadi_agewise_children ac
                                        WHERE ac.yearly_stat_id_fk = ys.id
                                    )
                                )
                            )
                            FROM (
                                SELECT * FROM ps_aanganwadi_yearly_stats
                                WHERE center_id_fk = c.id
                                ORDER BY ps_aanganwadi_yearly_stats.id
                                LIMIT 2
                            ) AS ys
                        ) AS yearly_stats

                    FROM ps_aanganwadi_centers c;
        `
        return runQuery(pool, q)
    }
}

module.exports = aanganwadiModel