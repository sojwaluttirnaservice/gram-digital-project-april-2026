const patrakJPublicInfra1Model = {
    create: (pool, createData) => {
        return new Promise((resolve, reject) => {
            const q = `
            INSERT INTO ps_n_3_patrak_j_public_infra_1 (
                year,
                gram_panchayat_name,
                encroachments_start_year,
                encroachments_detected,
                encroachments_removed,

                roads_start_year_length,
                roads_constructed_year_length,
                roads_repaired_year_length,
                dams_repaired_year_count,
                dams_new_constructed_year_count,

                dams_total_repaired_year_count,
                sewers_existing_start_year_length,
                sewers_built_this_year_length,
                sewers_repaired_this_year_length,
                bridge_count_existing_at_start_of_year,

                bridge_count_built_this_year,
                bridge_count_repaired_this_year,
                pole_count_existing_at_start_of_year,
                pole_count_extra_lights_installed_this_year,
                trees_existing_at_start_of_year,

                trees_planted_and_nurtured_this_year,
                existing_religious_halls_at_year_start,
                constructed_religious_halls_in_year,
                repaired_religious_halls_in_year,
                existing_ghats_at_year_start,

                constructed_ghats_in_year,
                repaired_ghats_in_year
            ) VALUES (?);
            `;

            const insertArray = [
                createData.year,
                createData.gram_panchayat_name,
                createData.encroachments_start_year,
                createData.encroachments_detected,
                createData.encroachments_removed,

                createData.roads_start_year_length,
                createData.roads_constructed_year_length,
                createData.roads_repaired_year_length,
                createData.dams_repaired_year_count,
                createData.dams_new_constructed_year_count,

                createData.dams_total_repaired_year_count,
                createData.sewers_existing_start_year_length,
                createData.sewers_built_this_year_length,
                createData.sewers_repaired_this_year_length,
                createData.bridge_count_existing_at_start_of_year,

                createData.bridge_count_built_this_year,
                createData.bridge_count_repaired_this_year,
                createData.pole_count_existing_at_start_of_year,
                createData.pole_count_extra_lights_installed_this_year,
                createData.trees_existing_at_start_of_year,

                createData.trees_planted_and_nurtured_this_year,
                createData.existing_religious_halls_at_year_start,
                createData.constructed_religious_halls_in_year,
                createData.repaired_religious_halls_in_year,
                createData.existing_ghats_at_year_start,
                createData.constructed_ghats_in_year,
                createData.repaired_ghats_in_year,
            ];

            pool.query(q, [insertArray], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    update: (pool, updateData) => {
        return new Promise((resolve, reject) => {
            const q = `
            UPDATE ps_n_3_patrak_j_public_infra_1
            SET
                gram_panchayat_name = ?,
                encroachments_start_year = ?,
                encroachments_detected = ?,
                encroachments_removed = ?,
                roads_start_year_length = ?,
                roads_constructed_year_length = ?,
                roads_repaired_year_length = ?,
                dams_repaired_year_count = ?,
                dams_new_constructed_year_count = ?,
                dams_total_repaired_year_count = ?,
                sewers_existing_start_year_length = ?,
                sewers_built_this_year_length = ?,
                sewers_repaired_this_year_length = ?,
                bridge_count_existing_at_start_of_year = ?,
                bridge_count_built_this_year = ?,
                bridge_count_repaired_this_year = ?,
                pole_count_existing_at_start_of_year = ?,
                pole_count_extra_lights_installed_this_year = ?,
                trees_existing_at_start_of_year = ?,
                trees_planted_and_nurtured_this_year = ?,
                existing_religious_halls_at_year_start = ?,
                constructed_religious_halls_in_year = ?,
                repaired_religious_halls_in_year = ?,
                existing_ghats_at_year_start = ?,
                constructed_ghats_in_year = ?,
                repaired_ghats_in_year = ?,
                year = ?
            WHERE id = ?;
            `;

            const updateArray = [
                updateData.gram_panchayat_name,
                updateData.encroachments_start_year,
                updateData.encroachments_detected,
                updateData.encroachments_removed,
                updateData.roads_start_year_length,

                updateData.roads_constructed_year_length,
                updateData.roads_repaired_year_length,
                updateData.dams_repaired_year_count,
                updateData.dams_new_constructed_year_count,
                updateData.dams_total_repaired_year_count,

                updateData.sewers_existing_start_year_length,
                updateData.sewers_built_this_year_length,
                updateData.sewers_repaired_this_year_length,
                updateData.bridge_count_existing_at_start_of_year,
                updateData.bridge_count_built_this_year,

                updateData.bridge_count_repaired_this_year,
                updateData.pole_count_existing_at_start_of_year,
                updateData.pole_count_extra_lights_installed_this_year,
                updateData.trees_existing_at_start_of_year,
                updateData.trees_planted_and_nurtured_this_year,

                updateData.existing_religious_halls_at_year_start,
                updateData.constructed_religious_halls_in_year,
                updateData.repaired_religious_halls_in_year,
                updateData.existing_ghats_at_year_start,
                updateData.constructed_ghats_in_year,

                updateData.repaired_ghats_in_year,
                updateData.year,
                updateData.id,
            ];

            pool.query(q, updateArray, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    getByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const q = `
            SELECT 
                *,
                IFNULL(DATE_FORMAT(createdAt, '%d-%m-%Y'), '') AS _createdAt,
                IFNULL(DATE_FORMAT(updatedAt, '%d-%m-%Y'), '') AS _updatedAt
            FROM ps_n_3_patrak_j_public_infra_1
            WHERE year = ?;
            `;

            pool.query(q, [year], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
};

module.exports = patrakJPublicInfra1Model;
