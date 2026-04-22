const centralAuxiliaryGrantsModel = {
    create: (pool, createData) => {
        return new Promise((resolve, reject) => {
            const q = `
            INSERT INTO ps_n_3_central_government_grants (
                year,
                golden_jubilee_self_employment_scheme,
                jawahar_gram_samruddhi_scheme,
                other_central_grants,
                total_central_grants_1_to_3,
                deposit_security,
                deposit,
                loans,
                other_narrow_grants,
                total_narrow_grants_1_to_4,
                deposit_security_5,
                deposit_5,
                loans_5,
                other_initial_balance,
                total_initial_balance_1_to_4
            ) VALUES (?)
            `;

            const insertArray = [
                createData.year,
                createData.golden_jubilee_self_employment_scheme,
                createData.jawahar_gram_samruddhi_scheme,
                createData.other_central_grants,
                createData.total_central_grants_1_to_3,
                createData.deposit_security,
                createData.deposit,
                createData.loans,
                createData.other_narrow_grants,
                createData.total_narrow_grants_1_to_4,
                createData.deposit_security_5,
                createData.deposit_5,
                createData.loans_5,
                createData.other_initial_balance,
                createData.total_initial_balance_1_to_4
            ];

            pool.query(q, [insertArray], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    update: (pool, updateData) => {
        return new Promise((resolve, reject) => {
            const q = `
            UPDATE ps_n_3_central_government_grants
            SET
                golden_jubilee_self_employment_scheme = ?,
                jawahar_gram_samruddhi_scheme = ?,
                other_central_grants = ?,
                total_central_grants_1_to_3 = ?,
                deposit_security = ?,
                deposit = ?,
                loans = ?,
                other_narrow_grants = ?,
                total_narrow_grants_1_to_4 = ?,
                deposit_security_5 = ?,
                deposit_5 = ?,
                loans_5 = ?,
                other_initial_balance = ?,
                total_initial_balance_1_to_4 = ?
            WHERE year = ?;
            `;

            const updateArray = [
                updateData.golden_jubilee_self_employment_scheme,
                updateData.jawahar_gram_samruddhi_scheme,
                updateData.other_central_grants,
                updateData.total_central_grants_1_to_3,
                updateData.deposit_security,
                updateData.deposit,
                updateData.loans,
                updateData.other_narrow_grants,
                updateData.total_narrow_grants_1_to_4,
                updateData.deposit_security_5,
                updateData.deposit_5,
                updateData.loans_5,
                updateData.other_initial_balance,
                updateData.total_initial_balance_1_to_4,
                updateData.year
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
                *,
                IFNULL(DATE_FORMAT(createdAt, '%d-%m-%Y'), '') AS _createdAt,
                IFNULL(DATE_FORMAT(updatedAt, '%d-%m-%Y'), '') AS _updatedAt
            FROM ps_n_3_central_government_grants
            WHERE year = ?;
            `;

            pool.query(q, [year], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
};

module.exports = centralAuxiliaryGrantsModel;
