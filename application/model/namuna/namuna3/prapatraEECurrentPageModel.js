const prapatraEECurrentPageModel = {
    create: (pool, createData) => {
        return new Promise((resolve, reject) => {
            const q = `
            INSERT INTO ps_n_3_prapatra_ee_current_page (
                year,
                toilet_expenses,
                dalit_welfare,
                water_supply_tcl,
                construction_expenses,

                education_schools,
                honorarium_min_wage_allowance,
                health_expenses,
                other_expenses,
                total_government_grants_2,

                golden_jubilee_village_self_employment_scheme,
                jawahar_village_prosperity_scheme,
                other_schemes,
                total_schemes_1_to_3,
                restricted_advance_security,

                restricted_deposits,
                restricted_loan_repayment_and_interest,
                restricted_other_loan_expenses,
                restricted_total_expenses_4,
                final_balance_advance_security,

                final_balance_deposits,
                final_balance_loan,
                final_balance_other,
                final_balance_total_expenses_5,
                jawahar_village_prosperity_expenses,

                panchayat_fund_account,
                village_water_supply_fund,
                other_funds,
                total_6
            ) VALUES (?);`;

            const insertArray = [
                createData.year,
                createData.toilet_expenses,
                createData.dalit_welfare,
                createData.water_supply_tcl,
                createData.construction_expenses,

                createData.education_schools,
                createData.honorarium_min_wage_allowance,
                createData.health_expenses,
                createData.other_expenses,
                createData.total_government_grants_2,

                createData.golden_jubilee_village_self_employment_scheme,
                createData.jawahar_village_prosperity_scheme,
                createData.other_schemes,
                createData.total_schemes_1_to_3,
                createData.restricted_advance_security,
                
                createData.restricted_deposits,
                createData.restricted_loan_repayment_and_interest,
                createData.restricted_other_loan_expenses,
                createData.restricted_total_expenses_4,
                createData.final_balance_advance_security,

                createData.final_balance_deposits,
                createData.final_balance_loan,
                createData.final_balance_other,
                createData.final_balance_total_expenses_5,
                createData.jawahar_village_prosperity_expenses,

                createData.panchayat_fund_account,
                createData.village_water_supply_fund,
                createData.other_funds,
                createData.total_6,
            ];

            pool.query(q, [insertArray], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    update: (pool, updateData) => {
        console.log(updateData);
        return new Promise((resolve, reject) => {
            const q = `
            UPDATE ps_n_3_prapatra_ee_current_page
            SET
                toilet_expenses = ?,
                dalit_welfare = ?,
                water_supply_tcl = ?,
                construction_expenses = ?,
                education_schools = ?,

                honorarium_min_wage_allowance = ?,
                health_expenses = ?,
                other_expenses = ?,
                total_government_grants_2 = ?,
                golden_jubilee_village_self_employment_scheme = ?,
                
                jawahar_village_prosperity_scheme = ?,
                other_schemes = ?,
                total_schemes_1_to_3 = ?,
                restricted_advance_security = ?,
                restricted_deposits = ?,

                restricted_loan_repayment_and_interest = ?,
                restricted_other_loan_expenses = ?,
                restricted_total_expenses_4 = ?,
                final_balance_advance_security = ?,
                final_balance_deposits = ?,

                final_balance_loan = ?,
                final_balance_other = ?,
                final_balance_total_expenses_5 = ?,
                jawahar_village_prosperity_expenses = ?,
                panchayat_fund_account = ?,
                
                village_water_supply_fund = ?,
                other_funds = ?,
                total_6 = ?,
                year = ?
            WHERE id = ?;`;

            const updateArray = [
                updateData.toilet_expenses,
                updateData.dalit_welfare,
                updateData.water_supply_tcl,
                updateData.construction_expenses,
                updateData.education_schools,

                updateData.honorarium_min_wage_allowance,
                updateData.health_expenses,
                updateData.other_expenses,
                updateData.total_government_grants_2,
                updateData.golden_jubilee_village_self_employment_scheme,

                updateData.jawahar_village_prosperity_scheme,
                updateData.other_schemes,
                updateData.total_schemes_1_to_3,
                updateData.restricted_advance_security,
                updateData.restricted_deposits,

                updateData.restricted_loan_repayment_and_interest,
                updateData.restricted_other_loan_expenses,
                updateData.restricted_total_expenses_4,
                updateData.final_balance_advance_security,
                updateData.final_balance_deposits,

                updateData.final_balance_loan,
                updateData.final_balance_other,
                updateData.final_balance_total_expenses_5,
                updateData.jawahar_village_prosperity_expenses,
                updateData.panchayat_fund_account,

                updateData.village_water_supply_fund,
                updateData.other_funds,
                updateData.total_6,
                updateData.year,
                updateData.id,
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
            FROM ps_n_3_prapatra_ee_current_page
            WHERE year = ?;
            `;

            pool.query(q, [year], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
};

module.exports = prapatraEECurrentPageModel;
