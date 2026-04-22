const stateAuxiliaryGrantsModel = {
    create: (pool, createData) => {
        return new Promise((resolve, reject) => {
            const q = `
            INSERT INTO ps_n_3_state_auxiliary_grants (
                year,
                toilet_fund,
                dalit_vasti_improvement_fund,
                water_supply_tcl_fund,
                construction_fund,
                education_school_fund,
                minimum_wage_and_meeting_allowance_fund,
                health_fund,
                other_fund,
                total_2a_1_to_8,
                received_fund,
                total_2_ab
            ) VALUES (
                ?
            )
            `;

            const insertArray = [
                createData.year,
                createData.toilet_fund,
                createData.dalit_vasti_improvement_fund,
                createData.water_supply_tcl_fund,
                createData.construction_fund,
                createData.education_school_fund,
                createData.minimum_wage_and_meeting_allowance_fund,
                createData.health_fund,
                createData.other_fund,
                createData.total_2a_1_to_8,
                createData.received_fund,
                createData.total_2_ab,
            ];

            pool.query(q, [insertArray], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    update: (pool, updateData) => {
        return new Promise((resolve, reject) => {
            const q = `
            UPDATE ps_n_3_state_auxiliary_grants
            SET
                toilet_fund = ?,
                dalit_vasti_improvement_fund = ?,
                water_supply_tcl_fund = ?,
                construction_fund = ?,
                education_school_fund = ?,
                minimum_wage_and_meeting_allowance_fund = ?,
                health_fund = ?,
                other_fund = ?,
                total_2a_1_to_8 = ?,
                received_fund = ?,
                total_2_ab = ?
            WHERE year = ?;
            `;

            const updateArray = [
                updateData.toilet_fund,
                updateData.dalit_vasti_improvement_fund,
                updateData.water_supply_tcl_fund,
                updateData.construction_fund,
                updateData.education_school_fund,
                updateData.minimum_wage_and_meeting_allowance_fund,
                updateData.health_fund,
                updateData.other_fund,
                updateData.total_2a_1_to_8,
                updateData.received_fund,
                updateData.total_2_ab,
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
            FROM ps_n_3_state_auxiliary_grants
            WHERE year = ?;
            `;

            pool.query(q, [year], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
};

module.exports = stateAuxiliaryGrantsModel;
