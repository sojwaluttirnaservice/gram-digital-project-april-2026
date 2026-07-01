const { runQuery } = require('../../../utils/runQuery');
const recieptBookReportModel = {
	// Create a new record using raw SQL query
	create: (pool, createData) => {
		const q = `
            INSERT INTO ps_n_3_reciept_book_details (
                year,
                data_list,
                
                reciept_books,
                namuna_10,
                namuna_7,
                kondwada_number,

                gp_fund,
                gp_water_fund,
                s_g_r_y,
                b_v_a,
                d_v_s_y
            ) VALUES (?);
            `;

		const insertArray = [
			createData.year,
			JSON.stringify(createData.data_list), // Ensure the data_list is stored as a JSON string
			createData.reciept_books,
			createData.namuna_10,
			createData.namuna_7,
			createData.kondwada_number,
			createData.gp_fund,
			createData.gp_water_fund,
			createData.s_g_r_y,
			createData.b_v_a,
			createData.d_v_s_y
		];

		return runQuery(pool, q, [insertArray]);
	},

	// Update an existing record using raw SQL query
	update: (pool, updateData) => {
		const q = `
            UPDATE ps_n_3_reciept_book_details
            SET
                year = ?,
                data_list = ?,

                reciept_books = ?,
                namuna_10 = ?,
                namuna_7 = ?,

                kondwada_number = ?,
                gp_fund =?,
                gp_water_fund =?,
                s_g_r_y =?,
                b_v_a =?,
                d_v_s_y =?
                
            WHERE id = ?;
            `;

		const updateArray = [
			updateData.year,
			JSON.stringify(updateData.data_list), // Ensure the data_list is updated as a JSON string
			updateData.reciept_books,
			updateData.namuna_10,
			updateData.namuna_7,
			updateData.kondwada_number,
			updateData.gp_fund,
			updateData.gp_water_fund,
			updateData.s_g_r_y,
			updateData.b_v_a,
			updateData.d_v_s_y,
			updateData.id
		];

		return runQuery(pool, q, updateArray);
	},

	// Get records by year using raw SQL query
	getByYear: (pool, year) => {
		const q = `
            SELECT 
                * 
            FROM ps_n_3_reciept_book_details
            WHERE year = ?;
            `;

		return runQuery(pool, q, [year]);
	}
};

module.exports = recieptBookReportModel;
