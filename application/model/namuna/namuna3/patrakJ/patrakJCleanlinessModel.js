const patrakJCleanlinessModel = {
    create: (pool, createData) => {
        return new Promise((resolve, reject) => {
            const q = `
            INSERT INTO ps_n_3_patrak_j_cleanliness (
                year,
                gram_panchayat_name,
                existing_wells_at_year_start,
                wells_constructed_in_year,
                wells_repaired_in_year,

                existing_at_start_year_2,
                newly_constructed_in_year_2,
                repaired_in_year_2,
                existing_at_start_year_3,
                mentioned_in_year_3,

                existing_public_toilets_at_year_start,
                public_toilets_constructed_in_year,
                public_toilets_repaired_in_year,
                existing_maternity_homes_at_year_start,
                allocated_beds_in_year,

                existing_child_welfare_centers_at_year_start,
                new_centers_allocated_in_year,
                existing_hospitals_at_year_start,
                new_hospitals_allocated_in_year,
                other_works_done_in_year

            ) VALUES (?);
            `;

            const insertArray = [
                createData.year,
                createData.gram_panchayat_name,
                createData.existing_wells_at_year_start,
                createData.wells_constructed_in_year,
                createData.wells_repaired_in_year,

                createData.existing_at_start_year_2,
                createData.newly_constructed_in_year_2,
                createData.repaired_in_year_2,
                createData.existing_at_start_year_3,
                createData.mentioned_in_year_3,

                createData.existing_public_toilets_at_year_start,
                createData.public_toilets_constructed_in_year,
                createData.public_toilets_repaired_in_year,
                createData.existing_maternity_homes_at_year_start,
                createData.allocated_beds_in_year,

                createData.existing_child_welfare_centers_at_year_start,
                createData.new_centers_allocated_in_year,
                createData.existing_hospitals_at_year_start,
                createData.new_hospitals_allocated_in_year,
                createData.other_works_done_in_year,
            ];

            pool.query(q, [insertArray], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    update: (pool, updateData) => {
        return new Promise((resolve, reject) => {
            const q = `
            UPDATE ps_n_3_patrak_j_cleanliness
            SET
                gram_panchayat_name = ?,
                existing_wells_at_year_start = ?,
                wells_constructed_in_year = ?,
                wells_repaired_in_year = ?,
                existing_at_start_year_2 = ?,

                newly_constructed_in_year_2 = ?,
                repaired_in_year_2 = ?,
                existing_at_start_year_3 = ?,
                mentioned_in_year_3 = ?,
                existing_public_toilets_at_year_start = ?,

                public_toilets_constructed_in_year = ?,
                public_toilets_repaired_in_year = ?,
                existing_maternity_homes_at_year_start = ?,
                allocated_beds_in_year = ?,
                existing_child_welfare_centers_at_year_start = ?,

                new_centers_allocated_in_year = ?,
                existing_hospitals_at_year_start = ?,
                new_hospitals_allocated_in_year = ?,
                other_works_done_in_year = ?,
                year = ?
            WHERE id = ?;
            `;

            const updateArray = [
                updateData.gram_panchayat_name,
                updateData.existing_wells_at_year_start,
                updateData.wells_constructed_in_year,
                updateData.wells_repaired_in_year,
                updateData.existing_at_start_year_2,

                updateData.newly_constructed_in_year_2,
                updateData.repaired_in_year_2,
                updateData.existing_at_start_year_3,
                updateData.mentioned_in_year_3,
                updateData.existing_public_toilets_at_year_start,

                updateData.public_toilets_constructed_in_year,
                updateData.public_toilets_repaired_in_year,
                updateData.existing_maternity_homes_at_year_start,
                updateData.allocated_beds_in_year,
                updateData.existing_child_welfare_centers_at_year_start,

                updateData.new_centers_allocated_in_year,
                updateData.existing_hospitals_at_year_start,
                updateData.new_hospitals_allocated_in_year,
                updateData.other_works_done_in_year,
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
                * 
            FROM ps_n_3_patrak_j_cleanliness
            WHERE year = ?;
            `;

            pool.query(q, [year], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
};

module.exports = patrakJCleanlinessModel;
