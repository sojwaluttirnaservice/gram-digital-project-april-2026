const patrakJEducationCultureModel = {
    create: (pool, createData) => {
        return new Promise((resolve, reject) => {
            const q = `
            INSERT INTO ps_n_3_patrak_j_education_culture (
                year,
                gram_panchayat_name,
                rooms_at_year_start,
                rooms_constructed_in_year,
                rooms_repaired_in_year,

                students_in_schools,
                students_in_col_61a,
                change_from_last_year,
                arenas_at_year_start,
                arenas_constructed_in_year,

                clubs_at_year_start,
                clubs_established_in_year,
                theatres_at_year_start,
                theatres_constructed_in_year,
                libraries_at_year_start,

                libraries_established_in_year,
                clerks_count,
                inspectors_count,
                sweepers_count,
                scavengers_count,

                patta_workers_count,
                kondawada_workers_count,
                watchmen_count,
                other_water_supply_workers_count
            ) VALUES (?);
            `;

            const insertArray = [
                createData.year,
                createData.gram_panchayat_name,
                createData.rooms_at_year_start,
                createData.rooms_constructed_in_year,
                createData.rooms_repaired_in_year,

                createData.students_in_schools,
                createData.students_in_col_61a,
                createData.change_from_last_year,
                createData.arenas_at_year_start,
                createData.arenas_constructed_in_year,

                createData.clubs_at_year_start,
                createData.clubs_established_in_year,
                createData.theatres_at_year_start,
                createData.theatres_constructed_in_year,
                createData.libraries_at_year_start,

                createData.libraries_established_in_year,
                createData.clerks_count,
                createData.inspectors_count,
                createData.sweepers_count,
                createData.scavengers_count,

                createData.patta_workers_count,
                createData.kondawada_workers_count,
                createData.watchmen_count,
                createData.other_water_supply_workers_count,
            ];

            pool.query(q, [insertArray], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    update: (pool, updateData) => {
        return new Promise((resolve, reject) => {
            const q = `
            UPDATE ps_n_3_patrak_j_education_culture
            SET
                gram_panchayat_name = ?,
                rooms_at_year_start = ?,
                rooms_constructed_in_year = ?,
                rooms_repaired_in_year = ?,
                students_in_schools = ?,

                students_in_col_61a = ?,
                change_from_last_year = ?,
                arenas_at_year_start = ?,
                arenas_constructed_in_year = ?,
                clubs_at_year_start = ?,

                clubs_established_in_year = ?,
                theatres_at_year_start = ?,
                theatres_constructed_in_year = ?,
                libraries_at_year_start = ?,
                libraries_established_in_year = ?,

                clerks_count = ?,
                inspectors_count = ?,
                sweepers_count = ?,
                scavengers_count = ?,
                patta_workers_count = ?,

                kondawada_workers_count = ?,
                watchmen_count = ?,
                other_water_supply_workers_count = ?,
                year = ?
            WHERE id = ?;

            `;

            const updateArray = [
                updateData.gram_panchayat_name,
                updateData.rooms_at_year_start,
                updateData.rooms_constructed_in_year,
                updateData.rooms_repaired_in_year,
                updateData.students_in_schools,

                updateData.students_in_col_61a,
                updateData.change_from_last_year,
                updateData.arenas_at_year_start,
                updateData.arenas_constructed_in_year,
                updateData.clubs_at_year_start,

                updateData.clubs_established_in_year,
                updateData.theatres_at_year_start,
                updateData.theatres_constructed_in_year,
                updateData.libraries_at_year_start,
                updateData.libraries_established_in_year,

                updateData.clerks_count,
                updateData.inspectors_count,
                updateData.sweepers_count,
                updateData.scavengers_count,
                updateData.patta_workers_count,

                updateData.kondawada_workers_count,
                updateData.watchmen_count,
                updateData.other_water_supply_workers_count,
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
            FROM ps_n_3_patrak_j_education_culture
            WHERE year = ?;
            `;

            pool.query(q, [year], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
};

module.exports = patrakJEducationCultureModel;
