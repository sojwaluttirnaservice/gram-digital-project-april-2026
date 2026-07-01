const { runQuery } = require('../../utils/runQuery');
const namuna19EmployeeModel = {
	saveNamuna19EmployeeEntry: (pool, data) => {
		const q = `
                INSERT INTO ps_namuna_19_employee_list 
                (
                    name,
                    post_name,
                    post_id,
                    mobile,
                    address,
                    gender,
                    monthly_salary,
                    remarks,
                    state_share,
                    pf_cutting_percentage,
                    grampanchayat_share
                )
                VALUES (?)
            `;
		const insertData = [
			data.name,
			data.post_name,
			data.post_id,
			data.mobile,
			data.address,
			data.gender,
			data.monthly_salary,
			data.remarks,
			data.state_share,
			data.pf_cutting_percentage,
			data.grampanchayat_share
		];
		return runQuery(pool, q, [insertData]);
	},

	updateNamuna19EmployeeEntry: (pool, data) => {
		const q = `
                UPDATE ps_namuna_19_employee_list 
                SET 
                    name = ?,
                    post_name = ?,
                    post_id = ?,
                    mobile = ?,
                    address = ?,
                    gender = ?,
                    monthly_salary = ?,
                    remarks = ?,
                    state_share =?,
                    pf_cutting_percentage =?,
                    grampanchayat_share =?
                WHERE id = ?
            `;
		return runQuery(pool, q, [
			data.name,
			data.post_name,
			data.post_id,
			data.mobile,
			data.address,
			data.gender,
			data.monthly_salary,
			data.remarks,
			data.state_share,
			data.pf_cutting_percentage,
			data.grampanchayat_share,
			data.id,
			data.id
		]);
	},

	deleteNamuna19EmployeeEntry: (pool, id) => {
		const q = `
                DELETE FROM ps_namuna_19_employee_list 
                WHERE id = ?
            `;
		return runQuery(pool, q, [id]);
	},

	fetchNamuna19EmployeeById: (pool, id) => {
		const q = `
                SELECT * 
                FROM ps_namuna_19_employee_list 
                WHERE id = ?
            `;
		return runQuery(pool, q, [id]);
	},

	fetchNamuna19EmployeeByPost: (pool, post_id) => {
		const q = `
                SELECT * 
                FROM ps_namuna_19_employee_list 
                WHERE post_id = ?
            `;
		return runQuery(pool, q, [post_id]);
	},

	fetchAllNamuna19Employees: (pool) => {
		const q = `
                SELECT * 
                FROM ps_namuna_19_employee_list
            `;
		return runQuery(pool, q);
	}
};

module.exports = namuna19EmployeeModel;
