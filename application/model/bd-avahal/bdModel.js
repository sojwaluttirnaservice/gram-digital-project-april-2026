const bdModel = {
    getFilledYears: function (pool) {
        return new Promise((resolve, reject) => {
            let query = `SELECT distinct year FROM ps_bd_avahal`;
            pool.query(query, function (err, result) {
                err ? reject(err) : resolve(result);
            });
        });
    },

    checkAlreadyFilled: function (pool, month, year) {
        return new Promise((resolve, reject) => {
            let query = `SELECT month, year FROM ps_bd_avahal WHERE month = ? AND year = ?`;

            pool.query(query, [month, year], function (err, result) {
                err ? reject(err) : resolve(result);
            });
        });
    },

    getBDAvahalData: function (pool, month, year) {
        return new Promise((resolve, reject) => {
            let query = `SELECT *, IFNULL(DATE_FORMAT(date, '%d/%m/%Y'), "") AS _date FROM ps_bd_avahal WHERE month = ? AND year = ?`;
            pool.query(query, [month, year], function (err, result) {
                err ? reject(err) : resolve(result);
            });
        });
    },

    postBDAvahal: function (pool, data, isUpdate = false, id = -1) {
        return new Promise((resolve, reject) => {
            // prettier-ignore
            console.log("data = ", data)
            let query;
            if (isUpdate) {
                query = `
                UPDATE ps_bd_avahal
                  SET
                    district_name = ?,
                    village_name = ?,
                    registration_center_name = ?,
                    census_code_number = ?,
                    birth_live_birth_recorded_in_a_year_male = ?,
                    birth_live_birth_recorded_in_a_year_female = ?,
                    birth_live_birth_recorded_in_a_year_total = ?,
                    birth_live_birth_recorded_after_a_year_male = ?,
                    birth_live_birth_recorded_after_a_year_female = ?,
                    birth_live_birth_recorded_after_a_year_total = ?,
                    birth_live_birth_recorded_total_male = ?,
                    birth_live_birth_recorded_total_female = ?,
                    birth_live_birth_recorded_total_total = ?,
                    death_recorded_in_a_year_male = ?,
                    death_recorded_in_a_year_female = ?,
                    death_recorded_in_a_year_other = ?,
                    death_recorded_in_a_year_total = ?,
                    death_recorded_after_a_year_male = ?,
                    death_recorded_after_a_year_female = ?,
                    death_recorded_after_a_year_other = ?,
                    death_recorded_after_a_year_total = ?,
                    death_recorded_total_male = ?,
                    death_recorded_total_female = ?,
                    death_recorded_total_other = ?,
                    death_recorded_total_total = ?,
                    infant_mortality_count_out_of_total_deaths_male = ?,
                    infant_mortality_count_out_of_total_deaths_female = ?,
                    infant_mortality_count_out_of_total_deaths_other = ?,
                    infant_mortality_count_out_of_total_deaths_total = ?,
                    mother_death_count = ?,
                    fetal_death_count_male = ?,
                    fetal_death_count_female = ?,
                    fetal_death_count_total = ?,
                    date = ?
                  WHERE
                    month = ? AND
                    year = ? AND
                    id = ?`;
            } else {
                query = `INSERT INTO ps_bd_avahal
                        (
                          month,
                          year,
                          district_name,
                          village_name,
                          registration_center_name,
                          census_code_number,

                          birth_live_birth_recorded_in_a_year_male,
                          birth_live_birth_recorded_in_a_year_female,
                          birth_live_birth_recorded_in_a_year_total,
                          birth_live_birth_recorded_after_a_year_male,
                          birth_live_birth_recorded_after_a_year_female,
                          birth_live_birth_recorded_after_a_year_total,
                          birth_live_birth_recorded_total_male,
                          birth_live_birth_recorded_total_female,
                          birth_live_birth_recorded_total_total,

                          death_recorded_in_a_year_male,
                          death_recorded_in_a_year_female,
                          death_recorded_in_a_year_other,
                          death_recorded_in_a_year_total,
                          death_recorded_after_a_year_male,
                          death_recorded_after_a_year_female,
                          death_recorded_after_a_year_other,
                          death_recorded_after_a_year_total,
                          death_recorded_total_male,
                          death_recorded_total_female,
                          death_recorded_total_other,
                          death_recorded_total_total,

                          infant_mortality_count_out_of_total_deaths_male,
                          infant_mortality_count_out_of_total_deaths_female,
                          infant_mortality_count_out_of_total_deaths_other,
                          infant_mortality_count_out_of_total_deaths_total,
                          
                          mother_death_count,

                          fetal_death_count_male,
                          fetal_death_count_female,
                          fetal_death_count_total,
                          
                          date
                        )
                        VALUES (?)`;
            }

            const insertArray = [
                data.month,
                data.year,
                data.district_name,
                data.village_name,
                data.registration_center_name,
                data.census_code_number,
                data.birth_live_birth_recorded_in_a_year_male,
                data.birth_live_birth_recorded_in_a_year_female,
                data.birth_live_birth_recorded_in_a_year_total,
                data.birth_live_birth_recorded_after_a_year_male,
                data.birth_live_birth_recorded_after_a_year_female,
                data.birth_live_birth_recorded_after_a_year_total,
                data.birth_live_birth_recorded_total_male,
                data.birth_live_birth_recorded_total_female,
                data.birth_live_birth_recorded_total_total,
                data.death_recorded_in_a_year_male,
                data.death_recorded_in_a_year_female,
                data.death_recorded_in_a_year_other,
                data.death_recorded_in_a_year_total,
                data.death_recorded_after_a_year_male,
                data.death_recorded_after_a_year_female,
                data.death_recorded_after_a_year_other,
                data.death_recorded_after_a_year_total,
                data.death_recorded_total_male,
                data.death_recorded_total_female,
                data.death_recorded_total_other,
                data.death_recorded_total_total,
                data.infant_mortality_count_out_of_total_deaths_male,
                data.infant_mortality_count_out_of_total_deaths_female,
                data.infant_mortality_count_out_of_total_deaths_other,
                data.infant_mortality_count_out_of_total_deaths_total,
                data.mother_death_count,
                data.fetal_death_count_male,
                data.fetal_death_count_female,
                data.fetal_death_count_total,
                data.date,
            ];

            const updateArray = [
                data.district_name,
                data.village_name,
                data.registration_center_name,
                data.census_code_number,
                data.birth_live_birth_recorded_in_a_year_male,
                data.birth_live_birth_recorded_in_a_year_female,
                data.birth_live_birth_recorded_in_a_year_total,
                data.birth_live_birth_recorded_after_a_year_male,
                data.birth_live_birth_recorded_after_a_year_female,
                data.birth_live_birth_recorded_after_a_year_total,
                data.birth_live_birth_recorded_total_male,
                data.birth_live_birth_recorded_total_female,
                data.birth_live_birth_recorded_total_total,
                data.death_recorded_in_a_year_male,
                data.death_recorded_in_a_year_female,
                data.death_recorded_in_a_year_other,
                data.death_recorded_in_a_year_total,
                data.death_recorded_after_a_year_male,
                data.death_recorded_after_a_year_female,
                data.death_recorded_after_a_year_other,
                data.death_recorded_after_a_year_total,
                data.death_recorded_total_male,
                data.death_recorded_total_female,
                data.death_recorded_total_other,
                data.death_recorded_total_total,
                data.infant_mortality_count_out_of_total_deaths_male,
                data.infant_mortality_count_out_of_total_deaths_female,
                data.infant_mortality_count_out_of_total_deaths_other,
                data.infant_mortality_count_out_of_total_deaths_total,
                data.mother_death_count,
                data.fetal_death_count_male,
                data.fetal_death_count_female,
                data.fetal_death_count_total,
                data.date,
                data.month,
                data.year,
                id,
            ];
            // console.log('insert aray', insertArray);
            // console.log('udated aray', updateArray);
            pool.query(query, isUpdate ? updateArray : [insertArray], function (err, result) {
                err ? reject(err) : resolve(result);
            });
        });
    },

    yearWiseList: function (pool, year) {
        return new Promise((resolve, reject) => {
            let query = `SELECT *,  IFNULL(DATE_FORMAT(date, '%d/%m/%Y'), "") AS _date FROM ps_bd_avahal WHERE year = ?`;
            pool.query(query, [year], function (err, result) {
                err ? reject(err) : resolve(result);
            });
        });
    },

    deleteBDAvahal: function (pool, month, year) {
        let query = `DELETE FROM ps_bd_avahal WHERE month = ? AND year = ?`;

        return new Promise((resolve, reject) => {
            pool.query(query, [month, year], function (err, result) {
                err ? reject(err) : resolve(result);
            });
        });
    },
};

module.exports = bdModel;
