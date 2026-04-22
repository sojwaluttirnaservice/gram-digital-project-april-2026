const patrakJPublicInfra2Model = {
    create: (pool, createData) => {
        return new Promise((resolve, reject) => {
            const q = `
            INSERT INTO ps_n_3_patrak_j_public_infra_2 (
                year,
                gram_panchayat_name,
                existing_houses_at_year_start,
                constructed_houses_in_year,
                repaired_houses_in_year,

                fields_at_year_start,
                fields_separated_in_year,
                pastures_at_year_start,
                pastures_separated_in_year,
                at_year_start,

                additional_created_in_year,
                existing_barns_at_start_of_year,
                barns_constructed_during_year,
                existing_works_at_start_of_year,
                works_done_during_year,

                existing_schools_at_start_of_year,
                schools_established_during_year,
                students_in_primary_schools,
                student_percentage_in_58_col
            ) VALUES (?);
            `;

            const insertArray = [
                createData.year,
                createData.gram_panchayat_name,
                createData.existing_houses_at_year_start,
                createData.constructed_houses_in_year,
                createData.repaired_houses_in_year,

                createData.fields_at_year_start,
                createData.fields_separated_in_year,
                createData.pastures_at_year_start,
                createData.pastures_separated_in_year,
                createData.at_year_start,

                createData.additional_created_in_year,
                createData.existing_barns_at_start_of_year,
                createData.barns_constructed_during_year,
                createData.existing_works_at_start_of_year,
                createData.works_done_during_year,

                createData.existing_schools_at_start_of_year,
                createData.schools_established_during_year,
                createData.students_in_primary_schools,
                createData.student_percentage_in_58_col,
            ];

            pool.query(q, [insertArray], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    update: (pool, updateData) => {
        return new Promise((resolve, reject) => {
            const q = `
            UPDATE ps_n_3_patrak_j_public_infra_2
            SET
                gram_panchayat_name = ?,
                existing_houses_at_year_start = ?,
                constructed_houses_in_year = ?,
                repaired_houses_in_year = ?,
                fields_at_year_start = ?,

                fields_separated_in_year = ?,
                pastures_at_year_start = ?,
                pastures_separated_in_year = ?,
                at_year_start = ?,
                additional_created_in_year = ?,

                existing_barns_at_start_of_year = ?,
                barns_constructed_during_year = ?,
                existing_works_at_start_of_year = ?,
                works_done_during_year = ?,
                existing_schools_at_start_of_year = ?,

                schools_established_during_year = ?,
                students_in_primary_schools = ?,
                student_percentage_in_58_col = ?,
                year = ?
            WHERE id = ?;
            `;

            const updateArray = [
                updateData.gram_panchayat_name,
                updateData.existing_houses_at_year_start,
                updateData.constructed_houses_in_year,
                updateData.repaired_houses_in_year,
                updateData.fields_at_year_start,

                updateData.fields_separated_in_year,
                updateData.pastures_at_year_start,
                updateData.pastures_separated_in_year,
                updateData.at_year_start,
                updateData.additional_created_in_year,

                updateData.existing_barns_at_start_of_year,
                updateData.barns_constructed_during_year,
                updateData.existing_works_at_start_of_year,
                updateData.works_done_during_year,
                updateData.existing_schools_at_start_of_year,

                updateData.schools_established_during_year,
                updateData.students_in_primary_schools,
                updateData.student_percentage_in_58_col,
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
            FROM ps_n_3_patrak_j_public_infra_2
            WHERE year = ?;
            `;

            pool.query(q, [year], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
};

module.exports = patrakJPublicInfra2Model;
