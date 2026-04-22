const namuna19EmployeeModel = {
    saveNamuna19EmployeeEntry: (pool, data) => {
        return new Promise((resolve, reject) => {
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
                data.grampanchayat_share,
            ];
            pool.query(q, [insertData], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    updateNamuna19EmployeeEntry: (pool, data) => {
        console.log(data);
        return new Promise((resolve, reject) => {
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
            pool.query(
                q,
                [
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
                    data.id,
                ],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },

    deleteNamuna19EmployeeEntry: (pool, id) => {
        return new Promise((resolve, reject) => {
            const q = `
                DELETE FROM ps_namuna_19_employee_list 
                WHERE id = ?
            `;
            pool.query(q, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchNamuna19EmployeeById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const q = `
                SELECT * 
                FROM ps_namuna_19_employee_list 
                WHERE id = ?
            `;
            pool.query(q, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchNamuna19EmployeeByPost: (pool, post_id) => {
        return new Promise((resolve, reject) => {
            const q = `
                SELECT * 
                FROM ps_namuna_19_employee_list 
                WHERE post_id = ?
            `;
            pool.query(q, [post_id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchAllNamuna19Employees: (pool) => {
        return new Promise((resolve, reject) => {
            const q = `
                SELECT * 
                FROM ps_namuna_19_employee_list
            `;
            pool.query(q, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
};

module.exports = namuna19EmployeeModel;
