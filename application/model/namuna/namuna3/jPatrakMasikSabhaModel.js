const jPatrakMasikSabhaModel = {
    // Create a new record using raw SQL query
    create: (pool, createData) => {
        console.log(createData);
        return new Promise((resolve, reject) => {
            const q = `
            INSERT INTO ps_n_3_j_patrak_masik_sabha (
                year,
                gram_panchayat_name,
                total_members,
                minimum_meetings_in_year,
                actual_monthly_meetings,
                postponed_due_to_quorum,
                postponed_meetings_again,
                no_meeting_month_and_reason,
                voter_count,
                first_gram_sabha_attendance,
                second_gram_sabha_attendance,
                third_gram_sabha_attendance,
                quorum_check_and_reheld,
                remarks
            ) VALUES (?);
            `;

            const insertArray = [
                createData.year,
                createData.gram_panchayat_name,
                createData.total_members,
                createData.minimum_meetings_in_year,
                createData.actual_monthly_meetings,
                createData.postponed_due_to_quorum,
                createData.postponed_meetings_again,
                createData.no_meeting_month_and_reason,
                createData.voter_count,
                createData.first_gram_sabha_attendance,
                createData.second_gram_sabha_attendance,
                createData.third_gram_sabha_attendance,
                createData.quorum_check_and_reheld,
                createData.remarks
            ];

            pool.query(q, [insertArray], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // Update an existing record using raw SQL query
    update: (pool, updateData) => {
        return new Promise((resolve, reject) => {
            const q = `
            UPDATE ps_n_3_j_patrak_masik_sabha
            SET
                year = ?,
                gram_panchayat_name = ?,
                total_members = ?,
                minimum_meetings_in_year = ?,
                actual_monthly_meetings = ?,
                postponed_due_to_quorum = ?,
                postponed_meetings_again = ?,
                no_meeting_month_and_reason = ?,
                voter_count = ?,
                first_gram_sabha_attendance = ?,
                second_gram_sabha_attendance = ?,
                third_gram_sabha_attendance = ?,
                quorum_check_and_reheld = ?,
                remarks = ?
            WHERE id = ?;
            `;

            const updateArray = [
                updateData.year,
                updateData.gram_panchayat_name,
                updateData.total_members,
                updateData.minimum_meetings_in_year,
                updateData.actual_monthly_meetings,
                updateData.postponed_due_to_quorum,
                updateData.postponed_meetings_again,
                updateData.no_meeting_month_and_reason,
                updateData.voter_count,
                updateData.first_gram_sabha_attendance,
                updateData.second_gram_sabha_attendance,
                updateData.third_gram_sabha_attendance,
                updateData.quorum_check_and_reheld,
                updateData.remarks,
                updateData.id
            ];

            pool.query(q, updateArray, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // Get records by year using raw SQL query
    getByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const q = `
            SELECT 
                * 
            FROM ps_n_3_j_patrak_masik_sabha
            WHERE year = ?;
            `;

            pool.query(q, [year], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // Get all records
    getAll: (pool) => {
        return new Promise((resolve, reject) => {
            const q = `
            SELECT 
                * 
            FROM ps_n_3_j_patrak_masik_sabha;
            `;

            pool.query(q, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // // Get records by specific criteria (Example: Minimum Meetings)
    // getByMinMeetings: (pool, minMeetings) => {
    //     return new Promise((resolve, reject) => {
    //         const q = `
    //         SELECT 
    //             * 
    //         FROM ps_n_3_j_patrak_masik_sabha
    //         WHERE minimum_meetings_in_year >= ?;
    //         `;

    //         pool.query(q, [minMeetings], (err, result) => {
    //             err ? reject(err) : resolve(result);
    //         });
    //     });
    // },

    // Delete a record by ID
    delete: (pool, id) => {
        return new Promise((resolve, reject) => {
            const q = `
            DELETE FROM ps_n_3_j_patrak_masik_sabha
            WHERE id = ?;
            `;

            pool.query(q, [id], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    }
};

module.exports = jPatrakMasikSabhaModel;
