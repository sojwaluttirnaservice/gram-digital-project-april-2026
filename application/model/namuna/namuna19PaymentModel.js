const { runQuery } = require('../../utils/runQuery');
const namuna19PaymentModel = {
	fetchNamuna19PaymentHistory: (
		pool,
		queryData = { month: '', year: '', employeeId: '' }
	) => {
		let q = `SELECT * FROM ps_namuna_19`;

		// Array to hold conditions
		const conditions = [];

		// Add conditions dynamically
		if (employeeId) {
			conditions.push(`employee_id_fk = ${employeeId}`);
		}
		if (month) {
			conditions.push(`month = ${month}`);
		}
		if (year) {
			conditions.push(`year = ${year}`);
		}

		// Append WHERE clause if conditions exist
		if (conditions.length > 0) {
			q += ` WHERE ${conditions.join(' AND ')}`;
		}

		// Add ORDER BY clause
		q += ` ORDER BY year DESC, month DESC`;

		return runQuery(pool, q);
	},

	fetchNamuna19PaymentHistoryWithEmployee: (pool, queryData) => {
		// Base query with join
		let q = `
                SELECT 
                    n19.*,
                    emp.*
                FROM 
                    ps_namuna_19 AS n19
                JOIN 
                    ps_namuna_19_employee_list AS emp
                ON 
                    n19.employee_id_fk = emp.id
            `;

		// Array to hold conditions
		const conditions = [];

		// Add conditions dynamically
		if (employeeId) {
			conditions.push(`n19.employee_id_fk = ${employeeId}`);
		}
		if (month) {
			conditions.push(`n19.month = ${month}`);
		}
		if (year) {
			conditions.push(`n19.year = ${year}`);
		}

		// Append WHERE clause if conditions exist
		if (conditions.length > 0) {
			q += ` WHERE ${conditions.join(' AND ')}`;
		}

		// Add ORDER BY clause
		q += ` ORDER BY n19.year DESC, n19.month DESC`;

		// Execute the query
		return runQuery(pool, q);
	},

	saveNamuna19PaymentRecord: (pool, data) => {
		// SQL query to insert the payment record
		const q = `
                INSERT INTO ps_namuna_19 (
                    employee_id_fk, 
                    month, 
                    year, 
                    payment_date, 
                    working_days, 
                    present_days, 
                    monthly_salary, 
                 
                    remarks,
                    state_share,
                    pf_cutting_percentage,
                    grampanchayat_share,
                    calculated_state_salary,
                    calculated_grampanchayat_salary
                ) VALUES (?)
            `;

		// Array of values to insert, directly using data fields
		const insertArray = [
			data.employee_id_fk,
			data.month,
			data.year,
			data.payment_date,
			data.working_days,
			data.present_days,
			data.monthly_salary,

			data.remarks,
			data.state_share,
			data.pf_cutting_percentage,
			data.grampanchayat_share,
			data.calculated_state_salary,
			data.calculated_grampanchayat_salary
		];

		// Execute the query
		return runQuery(pool, q, [insertArray]);
	},

	deleteNamuna19PaymentRecord: (pool, paymentId) => {
		const q = `DELETE FROM ps_namuna_19 WHERE id = ?`;
		return runQuery(pool, q, [paymentId]);
	}
};

module.exports = namuna19PaymentModel;
