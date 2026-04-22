const initialBalanceModel = {
    create: (pool, createData) => {
        return new Promise((resolve, reject) => {
            const q = `
            INSERT INTO ps_n_3_initial_balance (
                year,
                jawahar_gram_samruddhi_scheme,
                village_fund_supply_account,
                gram_panchayat_fund_account,
                other,
                total_6_1_to_4,
                total_with_initial_balance,
                total_in_year,
                eligible_income_for_gra_viv_fund,
                previous_year_income,
                increase_or_decrease
            ) VALUES (
                ?
            )
            `;

            const insertArray = [
                createData.year,
                createData.jawahar_gram_samruddhi_scheme,
                createData.village_fund_supply_account,
                createData.gram_panchayat_fund_account,
                createData.other,
                createData.total_6_1_to_4,
                createData.total_with_initial_balance,
                createData.total_in_year,
                createData.eligible_income_for_gra_viv_fund,
                createData.previous_year_income,
                createData.increase_or_decrease,
            ];

            pool.query(q, [insertArray], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    update: (pool, updateData) => {
        return new Promise((resolve, reject) => {
            const q = `
            UPDATE ps_n_3_initial_balance
            SET
                jawahar_gram_samruddhi_scheme = ?,
                village_fund_supply_account = ?,
                gram_panchayat_fund_account = ?,
                other = ?,
                total_6_1_to_4 = ?,
                total_with_initial_balance = ?,
                total_in_year = ?,
                eligible_income_for_gra_viv_fund = ?,
                previous_year_income = ?,
                increase_or_decrease = ?
            WHERE year = ?;
            `;

            const updateArray = [
                updateData.jawahar_gram_samruddhi_scheme,
                updateData.village_fund_supply_account,
                updateData.gram_panchayat_fund_account,
                updateData.other,
                updateData.total_6_1_to_4,
                updateData.total_with_initial_balance,
                updateData.total_in_year,
                updateData.eligible_income_for_gra_viv_fund,
                updateData.previous_year_income,
                updateData.increase_or_decrease,
                updateData.year,
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
            FROM ps_n_3_initial_balance
            WHERE year = ?;
            `;

            pool.query(q, [year], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
};

module.exports = initialBalanceModel;
