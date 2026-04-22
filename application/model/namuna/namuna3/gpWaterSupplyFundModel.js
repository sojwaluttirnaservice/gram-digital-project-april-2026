const gpWaterSupplyFundModel = {
    // Create a new record using raw SQL query
    create: (pool, createData) => {
        console.log(createData);

        return new Promise((resolve, reject) => {
            const q = `
            INSERT INTO ps_n_3_gp_water_supply_fund (
                year,
                initial_balance,
                general_water_tax,
                special_water_tax,
                tap_connection_application_fee,
                donation,
                deposit,
                tap_fitting_expenses,
                revenue_grant_35_percent,
                electricity_bill_50_percent_grant,
                water_supply_grant,
                loan,
                others,
                total_income_year,
                total_income_with_initial_balance,
                employee_salary,
                employee_travel_allowance,
                uniform,
                advance,
                bonus,
                total_salary_and_benefits,
                office_stationery,
                electricity_expenses,
                water_supply_well,
                water_supply_handpump_powerpump,
                repair_work_stand_post_pipeline,
                repair_work_others,
                total_repair_works,
                new_water_supply_works_pipeline_well,
                water_purification,
                other_expenses,
                total_expenses,
                final_balance
            ) VALUES (?);
            `;

            const insertArray = [
                createData.year,
                createData.initial_balance,
                createData.general_water_tax,
                createData.special_water_tax,
                createData.tap_connection_application_fee,
                createData.donation,
                createData.deposit,
                createData.tap_fitting_expenses,
                createData.revenue_grant_35_percent,
                createData.electricity_bill_50_percent_grant,
                createData.water_supply_grant,
                createData.loan,
                createData.others,
                createData.total_income_year,
                createData.total_income_with_initial_balance,
                createData.employee_salary,
                createData.employee_travel_allowance,
                createData.uniform,
                createData.advance,
                createData.bonus,
                createData.total_salary_and_benefits,
                createData.office_stationery,
                createData.electricity_expenses,
                createData.water_supply_well,
                createData.water_supply_handpump_powerpump,
                createData.repair_work_stand_post_pipeline,
                createData.repair_work_others,
                createData.total_repair_works,
                createData.new_water_supply_works_pipeline_well,
                createData.water_purification,
                createData.other_expenses,
                createData.total_expenses,
                createData.final_balance,
            ];

            pool.query(q, [insertArray], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // Update an existing record using raw SQL query
    update: (pool, updateData) => {
        return new Promise((resolve, reject) => {
            const q = `
            UPDATE ps_n_3_gp_water_supply_fund
            SET
                year = ?,
                initial_balance = ?,
                general_water_tax = ?,
                special_water_tax = ?,
                tap_connection_application_fee = ?,
                donation = ?,
                deposit = ?,
                tap_fitting_expenses = ?,
                revenue_grant_35_percent = ?,
                electricity_bill_50_percent_grant = ?,
                water_supply_grant = ?,
                loan = ?,
                others = ?,
                total_income_year = ?,
                total_income_with_initial_balance = ?,
                employee_salary = ?,
                employee_travel_allowance = ?,
                uniform = ?,
                advance = ?,
                bonus = ?,
                total_salary_and_benefits = ?,
                office_stationery = ?,
                electricity_expenses = ?,
                water_supply_well = ?,
                water_supply_handpump_powerpump = ?,
                repair_work_stand_post_pipeline = ?,
                repair_work_others = ?,
                total_repair_works = ?,
                new_water_supply_works_pipeline_well = ?,
                water_purification = ?,
                other_expenses = ?,
                total_expenses = ?,
                final_balance = ?
            WHERE id = ?;
            `;

            const updateArray = [
                updateData.year,
                updateData.initial_balance,
                updateData.general_water_tax,
                updateData.special_water_tax,
                updateData.tap_connection_application_fee,
                updateData.donation,
                updateData.deposit,
                updateData.tap_fitting_expenses,
                updateData.revenue_grant_35_percent,
                updateData.electricity_bill_50_percent_grant,
                updateData.water_supply_grant,
                updateData.loan,
                updateData.others,
                updateData.total_income_year,
                updateData.total_income_with_initial_balance,
                updateData.employee_salary,
                updateData.employee_travel_allowance,
                updateData.uniform,
                updateData.advance,
                updateData.bonus,
                updateData.total_salary_and_benefits,
                updateData.office_stationery,
                updateData.electricity_expenses,
                updateData.water_supply_well,
                updateData.water_supply_handpump_powerpump,
                updateData.repair_work_stand_post_pipeline,
                updateData.repair_work_others,
                updateData.total_repair_works,
                updateData.new_water_supply_works_pipeline_well,
                updateData.water_purification,
                updateData.other_expenses,
                updateData.total_expenses,
                updateData.final_balance,
                updateData.id,
            ];

            pool.query(q, updateArray, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // Get records by year using raw SQL query
    getByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const q = `
            SELECT 
                * 
            FROM ps_n_3_gp_water_supply_fund
            WHERE year = ?;
            `;

            pool.query(q, [year], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
};

module.exports = gpWaterSupplyFundModel;
