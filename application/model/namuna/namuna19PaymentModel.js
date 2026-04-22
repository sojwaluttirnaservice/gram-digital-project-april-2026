const namuna19PaymentModel = {
    fetchNamuna19PaymentHistory: function (
        pool,
        queryData = { month: '', year: '', employeeId: '' }
    ) {
        const { month, year, employeeId } = queryData;

        return new Promise((resolve, reject) => {
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

            pool.query(q, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },

    fetchNamuna19PaymentHistoryWithEmployee: function (pool, queryData) {
        const { month, year, employeeId } = queryData;

        console.log(queryData);

        return new Promise((resolve, reject) => {
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
            pool.query(q, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },

    saveNamuna19PaymentRecord: (pool, data) => {
        return new Promise((resolve, reject) => {
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
                data.calculated_grampanchayat_salary,
            ];

            // Execute the query
            pool.query(q, [insertArray], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },

    deleteNamuna19PaymentRecord: (pool, paymentId) => {
        return new Promise((resolve, reject) => {
            const q = `DELETE FROM ps_namuna_19 WHERE id = ?`;
            pool.query(q, [paymentId], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
};

module.exports = namuna19PaymentModel;
