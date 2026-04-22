const prapatraECurrentPageModel = {
    create: (pool, createData) => {
        return new Promise((resolve, reject) => {
            const q = `
            INSERT INTO ps_n_3_prapatra_e_current_page (
                year,
                sarpanch_honorarium,
                member_meeting_allowance,
                member_sarpanch_travel_allowance,

                employee_salary,
                employee_travel_allowance,
                office_expenses,
                repair_and_maintenance,

                cleanliness_expenses,
                water_supply_expenses,
                electricity_water_supply_bill,
                road_lighting_expenses,

                total_expenses_a_b,
                literature_and_miscellaneous,
                education_expenses,
                healthcare_expenses,
                road_and_drainage_construction,

                other_construction,
                reading_room,
                water_purification_tcl,
                gardens_and_playgrounds,

                social_welfare_tribal_welfare,
                dvdf_contribution,
                women_and_child_welfare,
                social_cultural_programs,

                kondwada,
                literature_and_purchases,
                agriculture_expenses,
                other_expenses,

                total_gram_nidhi_expenses
            ) VALUES (?)
            `;

            const insertArray = [
                createData.year,
                createData.sarpanch_honorarium,
                createData.member_meeting_allowance,
                createData.member_sarpanch_travel_allowance,

                createData.employee_salary,
                createData.employee_travel_allowance,
                createData.office_expenses,
                createData.repair_and_maintenance,

                createData.cleanliness_expenses,
                createData.water_supply_expenses,
                createData.electricity_water_supply_bill,
                createData.road_lighting_expenses,

                createData.total_expenses_a_b,
                createData.literature_and_miscellaneous,
                createData.education_expenses,
                createData.healthcare_expenses,
                createData.road_and_drainage_construction,

                createData.other_construction,
                createData.reading_room,
                createData.water_purification_tcl,
                createData.gardens_and_playgrounds,

                createData.social_welfare_tribal_welfare,
                createData.dvdf_contribution,
                createData.women_and_child_welfare,
                createData.social_cultural_programs,

                createData.kondwada,
                createData.literature_and_purchases,
                createData.agriculture_expenses,
                createData.other_expenses,

                createData.total_gram_nidhi_expenses,
            ];

            pool.query(q, [insertArray], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    update: (pool, updateData) => {
        return new Promise((resolve, reject) => {
            const q = `
            UPDATE ps_n_3_prapatra_e_current_page
            SET
                sarpanch_honorarium = ?,
                member_meeting_allowance = ?,
                member_sarpanch_travel_allowance = ?,
                employee_salary = ?,

                employee_travel_allowance = ?,
                office_expenses = ?,
                repair_and_maintenance = ?,
                cleanliness_expenses = ?,

                water_supply_expenses = ?,
                electricity_water_supply_bill = ?,
                road_lighting_expenses = ?,
                total_expenses_a_b = ?,

                literature_and_miscellaneous = ?,
                education_expenses = ?,
                healthcare_expenses = ?,
                road_and_drainage_construction = ?,
                other_construction = ?,

                reading_room = ?,
                water_purification_tcl = ?,
                gardens_and_playgrounds = ?,
                social_welfare_tribal_welfare = ?,

                dvdf_contribution = ?,
                women_and_child_welfare = ?,
                social_cultural_programs = ?,
                kondwada = ?,

                literature_and_purchases = ?,
                agriculture_expenses = ?,
                other_expenses = ?,
                total_gram_nidhi_expenses = ?,

                year = ?
            WHERE id = ?;
            `;

            const updateArray = [
                updateData.sarpanch_honorarium,
                updateData.member_meeting_allowance,
                updateData.member_sarpanch_travel_allowance,
                updateData.employee_salary,

                updateData.employee_travel_allowance,
                updateData.office_expenses,
                updateData.repair_and_maintenance,
                updateData.cleanliness_expenses,

                updateData.water_supply_expenses,
                updateData.electricity_water_supply_bill,
                updateData.road_lighting_expenses,
                updateData.total_expenses_a_b,

                updateData.literature_and_miscellaneous,
                updateData.education_expenses,
                updateData.healthcare_expenses,
                updateData.road_and_drainage_construction,
                updateData.other_construction,

                updateData.reading_room,
                updateData.water_purification_tcl,
                updateData.gardens_and_playgrounds,
                updateData.social_welfare_tribal_welfare,

                updateData.dvdf_contribution,
                updateData.women_and_child_welfare,
                updateData.social_cultural_programs,
                updateData.kondwada,

                updateData.literature_and_purchases,
                updateData.agriculture_expenses,
                updateData.other_expenses,
                updateData.total_gram_nidhi_expenses,

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
            FROM ps_n_3_prapatra_e_current_page
            WHERE year = ?;
            `;

            pool.query(q, [year], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
};

module.exports = prapatraECurrentPageModel;
