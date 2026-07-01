const { runQuery } = require('../../../utils/runQuery');
const jPatrakMasikSabhaModel = {
	// Create a new record using raw SQL query
	create: (pool, createData) => {
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

		return runQuery(pool, q, [insertArray]);
	},

	// Update an existing record using raw SQL query
	update: (pool, updateData) => {
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

		return runQuery(pool, q, updateArray);
	},

	// Get records by year using raw SQL query
	getByYear: (pool, year) => {
		const q = `
            SELECT 
                * 
            FROM ps_n_3_j_patrak_masik_sabha
            WHERE year = ?;
            `;

		return runQuery(pool, q, [year]);
	},

	// Get all records
	getAll: (pool) => {
		const q = `
            SELECT 
                * 
            FROM ps_n_3_j_patrak_masik_sabha;
            `;

		return runQuery(pool, q);
	},

	// // Get records by specific criteria (Example: Minimum Meetings)
	// getByMinMeetings: (pool, minMeetings) => {
	//         const q = `
	//         SELECT
	//             *
	//         FROM ps_n_3_j_patrak_masik_sabha
	//         WHERE minimum_meetings_in_year >= ?;
	//         `;

	//         return runQuery(pool, q, [minMeetings]);;
	//     },

	// Delete a record by ID
	delete: (pool, id) => {
		const q = `
            DELETE FROM ps_n_3_j_patrak_masik_sabha
            WHERE id = ?;
            `;

		return runQuery(pool, q, [id]);
	}
};

module.exports = jPatrakMasikSabhaModel;
