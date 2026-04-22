const namuna21Model = {
    // Save a new record
    saveNamuna21Details: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO ps_namuna_21 (
                    employee_id_fk,
                    employee_name,
                    employee_post,
                    pay_grade,
                    salary,
                    leave_salary,
                    placement_salary,
                    allowances,
                    future_contribution_reserved,
                    collections_and_penalties,
                    state_pf_contribution,
                    state_other_deductions,
                    gp_pf_contribution,
                    gp_other_deductions,
                    remarks,
                    month,
                    year
                ) VALUES (?)
            `;
            const insertArray = [
                data.employee_id_fk,
                data.employee_name,
                data.employee_post,
                data.pay_grade,
                data.salary,
                data.leave_salary,
                data.placement_salary,
                data.allowances,
                data.future_contribution_reserved,
                data.collections_and_penalties,
                data.state_pf_contribution,
                data.state_other_deductions,
                data.gp_pf_contribution,
                data.gp_other_deductions,
                data.remarks,
                data.month,
                data.year,
            ];

            pool.query(query, [insertArray], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Update an existing record by ID
    updateNamuna21Details: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE ps_namuna_21
                SET 
                    employee_id_fk = ?,
                    employee_name = ?,
                    employee_post = ?,
                    pay_grade = ?,
                    salary = ?,
                    leave_salary = ?,
                    placement_salary = ?,
                    allowances = ?,
                    future_contribution_reserved = ?,
                    collections_and_penalties = ?,
                    state_pf_contribution = ?,
                    state_other_deductions = ?,
                    gp_pf_contribution = ?,
                    gp_other_deductions = ?,
                    remarks = ?,
                    month = ?,
                    year = ?
                WHERE id = ?
            `;
            const updateArray = [
                data.employee_id_fk,
                data.employee_name,
                data.employee_post,
                data.pay_grade,
                data.salary,
                data.leave_salary,
                data.placement_salary,
                data.allowances,
                data.future_contribution_reserved,
                data.collections_and_penalties,
                data.state_pf_contribution,
                data.state_other_deductions,
                data.gp_pf_contribution,
                data.gp_other_deductions,
                data.remarks,
                data.month,
                data.year,
                data.id,
            ];

            pool.query(query, updateArray, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch all records
    fetchAllNamuna21Details: (pool) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM ps_namuna_21
            `;
            pool.query(query, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch records by employee ID
    fetchNamuna21DetailsByEmployeeId: (pool, employee_id_fk) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM ps_namuna_21
                WHERE employee_id_fk = ?
            `;
            pool.query(query, [employee_id_fk], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch record by ID
    fetchNamuna21DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM ps_namuna_21
                WHERE id = ?
            `;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch records for specific month and year
    fetchNamuna21DetailsByMonthAndYear: (pool, month, year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM ps_namuna_21
                WHERE month = ? AND year = ?
            `;
            pool.query(query, [month, year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch records for a specific year
    fetchNamuna21DetailsByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM ps_namuna_21
                WHERE year = ?
            `;
            pool.query(query, [year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Delete record by ID
    deleteNamuna21DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM ps_namuna_21 WHERE id = ?
            `;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
};

module.exports = namuna21Model;
