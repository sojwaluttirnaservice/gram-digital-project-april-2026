const { runQuery } = require("../../utils/runQuery");

const marriageRegistrationModel = {
    //add a single entry

    newMarriageRegistration: function (pool, data) {
        let q = `INSERT INTO ps_marriage_registration_avahal 
                        (
                            date_of_reciept_of_marriage_info,
                            date_of_marriage,
                            place_of_marriage,
                            full_name_of_groom,
                            age_of_groom,
                            place_of_groom,
                            full_name_of_bride,
                            age_of_bride,
                            place_of_bride,
                            religion_of_groom,
                            religion_of_bride,
                            nationality_of_groom,
                            nationality_of_bride,
                            full_name_of_father_or_parent_of_groom,
                            full_name_of_father_or_parent_of_bride,
                            bride_father_address,
                            name_of_informant,
                            shera,
                            month,
                            year
                        )
                        VALUES (?)`;

        let insertArr = [
            data.date_of_reciept_of_marriage_info,
            data.date_of_marriage,
            data.place_of_marriage,
            data.full_name_of_groom,
            data.age_of_groom,
            data.place_of_groom,
            data.full_name_of_bride,
            data.age_of_bride,
            data.place_of_bride,
            data.religion_of_groom,
            data.religion_of_bride,
            data.nationality_of_groom,
            data.nationality_of_bride,
            data.full_name_of_father_or_parent_of_groom,
            data.full_name_of_father_or_parent_of_bride,
            data.bride_father_address,
            data.name_of_informant,
            data.shera,
            Number(data.month),
            Number(data.year),
        ];

        return runQuery(pool, q, [insertArr]);
    },

    updateSingleMarriageRegistrationEntry: function (pool, data, id, isUnder18) {
        return new Promise((resolve, reject) => {
            let q;
            if (isUnder18) {
                q = `
                UPDATE ps_under_18_marriages_avahal 
                SET 
                    name_of_under_18_married_girl = ?,
                    address_of_under_18_married_girl = ?,
                    name_of_father_or_guardian_of_girl = ?,
                    address_of_father_or_guardian_of_girl = ?,
                    birthdate_of_girl = ?,
                    age_of_girl_at_marriage = ?,
                    education_of_girl = ?,
                    date_of_marriage = ?,
                    place_of_marriage = ?,
                    name_of_groom = ?,
                    name_of_father_or_guardian_of_groom = ?,
                    address_of_groom = ?,
                    address_of_father_or_guardian_of_groom = ?,
                    birthdate_of_groom = ?,
                    age_of_groom_at_marriage = ?,
                    name_of_bhataji = ?,
                    address_of_bhataji = ?,
                    name_of_office_manager = ?,
                    address_of_office = ?,
                    name_of_wedding_card_printing_house = ?,
                    name_of_owner_of_wedding_card_printing_house = ?,
                    address_of_wedding_card_printing_house = ?,
                    shera = ?,
                    month = ?,
                    year = ?
                WHERE id = ?;
                
                `;
            } else {
                q = `
                
                UPDATE ps_marriage_registration_avahal 
                SET 
                    date_of_reciept_of_marriage_info = ?,
                    date_of_marriage = ?,
                    place_of_marriage = ?,
                    full_name_of_groom = ?,
                    age_of_groom = ?,
                    place_of_groom = ?,
                    full_name_of_bride = ?,
                    age_of_bride = ?,
                    place_of_bride = ?,
                    religion_of_groom = ?,
                    religion_of_bride = ?,
                    nationality_of_groom = ?,
                    nationality_of_bride = ?,
                    full_name_of_father_or_parent_of_groom = ?,
                    full_name_of_father_or_parent_of_bride = ?,
                    bride_father_address = ?,
                    name_of_informant = ?,
                    shera = ?,
                    month = ?,
                    year = ?
                WHERE id = ?;
                
                `;
            }

            let updateArray = [];

            if (isUnder18) {
                updateArray = [
                    data.name_of_under_18_married_girl,
                    data.address_of_under_18_married_girl,
                    data.name_of_father_or_guardian_of_girl,
                    data.address_of_father_or_guardian_of_girl,
                    data.birthdate_of_girl,
                    data.age_of_girl_at_marriage,
                    data.education_of_girl,
                    data.date_of_marriage,
                    data.place_of_marriage,
                    data.name_of_groom,
                    data.name_of_father_or_guardian_of_groom,
                    data.address_of_groom,
                    data.address_of_father_or_guardian_of_groom,
                    data.birthdate_of_groom,
                    data.age_of_groom_at_marriage,
                    data.name_of_bhataji,
                    data.address_of_bhataji,
                    data.name_of_office_manager,
                    data.address_of_office,
                    data.name_of_wedding_card_printing_house,
                    data.name_of_owner_of_wedding_card_printing_house,
                    data.address_of_wedding_card_printing_house,
                    data.shera,
                    Number(data.month),
                    Number(data.year),
                    id,
                ];
            } else {
                updateArray = [
                    data.date_of_reciept_of_marriage_info,
                    data.date_of_marriage,
                    data.place_of_marriage,
                    data.full_name_of_groom,
                    data.age_of_groom,
                    data.place_of_groom,
                    data.full_name_of_bride,
                    data.age_of_bride,
                    data.place_of_bride,
                    data.religion_of_groom,
                    data.religion_of_bride,
                    data.nationality_of_groom,
                    data.nationality_of_bride,
                    data.full_name_of_father_or_parent_of_groom,
                    data.full_name_of_father_or_parent_of_bride,
                    data.bride_father_address,
                    data.name_of_informant,
                    data.shera,
                    Number(data.month),
                    Number(data.year),
                    id,
                ];
            }

            pool.query(q, updateArray, (err, result) => {
                return err ? reject(err) : resolve(result);
            });
        });
    },

    getSingleEntryDetails: function (pool, id, isUnder18) {
        return new Promise((resolve, reject) => {
            const q = `SELECT * FROM ${
                isUnder18 ? 'ps_under_18_marriages_avahal' : 'ps_marriage_registration_avahal'
            } WHERE id = ?`;

            pool.query(q, [id], (err, result) => {
                return err ? reject(err) : resolve(result);
            });
        });
    },

    under18MarriageRegistration: function (pool, data) {
        console.log(data);
        // console.log('data tiem', data.time_of_marriage_of_girl);
        return new Promise((resolve, reject) => {
            /*
            let query = `INSERT INTO 
                        ps_under_18_marriages_avahal (
                          name_of_under_18_married_girl,
                          address_of_under_18_married_girl,
                          name_of_father_or_guardian_of_girl,
                          address_of_father_or_guardian_of_girl,
                          birthdate_of_girl,
                          time_of_marriage_of_girl,
                          age_of_girl_at_marriage,
                          education_of_girl,
                          date_of_marriage,
                          place_of_marriage,
                          name_of_groom,
                          name_of_father_or_guardian_of_groom,
                          address_of_groom,
                          address_of_father_or_guardian_of_groom,
                          birthdate_of_groom,
                          age_of_groom_at_marriage,
                          name_of_bhataji,
                          address_of_bhataji,
                          name_of_office_manager,
                          address_of_office,
                          name_of_wedding_card_printing_house,
                          name_of_owner_of_wedding_card_printing_house,
                          address_of_wedding_card_printing_house,
                          shera,
                          month,
                          year
                            
                    ) VALUES (?)`;

                    */

            let query2 = `INSERT INTO 
                    ps_under_18_marriages_avahal (
                      name_of_under_18_married_girl,
                      address_of_under_18_married_girl,
                      name_of_father_or_guardian_of_girl,
                      address_of_father_or_guardian_of_girl,
                      birthdate_of_girl,
                      age_of_girl_at_marriage,
                      education_of_girl,
                      date_of_marriage,
                      place_of_marriage,
                      name_of_groom,
                      name_of_father_or_guardian_of_groom,
                      address_of_groom,
                      address_of_father_or_guardian_of_groom,
                      birthdate_of_groom,
                      age_of_groom_at_marriage,
                      name_of_bhataji,
                      address_of_bhataji,
                      name_of_office_manager,
                      address_of_office,
                      name_of_wedding_card_printing_house,
                      name_of_owner_of_wedding_card_printing_house,
                      address_of_wedding_card_printing_house,
                      shera,
                      month,
                      year
                        
                ) VALUES (?)`;
            let insertArray = [
                data.name_of_under_18_married_girl,
                data.address_of_under_18_married_girl,
                data.name_of_father_or_guardian_of_girl,
                data.address_of_father_or_guardian_of_girl,
                data.birthdate_of_girl,
                // data.time_of_marriage_of_girl,
                data.age_of_girl_at_marriage,
                data.education_of_girl,
                data.date_of_marriage,
                data.place_of_marriage,
                data.name_of_groom,
                data.name_of_father_or_guardian_of_groom,
                data.address_of_groom,
                data.address_of_father_or_guardian_of_groom,
                data.birthdate_of_groom,
                data.age_of_groom_at_marriage,
                data.name_of_bhataji,
                data.address_of_bhataji,
                data.name_of_office_manager,
                data.address_of_office,
                data.name_of_wedding_card_printing_house,
                data.name_of_owner_of_wedding_card_printing_house,
                data.address_of_wedding_card_printing_house,
                data.shera,
                Number(data.month),
                Number(data.year),
            ];

            pool.query(query2, [insertArray], function (err, result) {
                err ? reject(err) : resolve(result);
            });
        });
    },

    getDistinctYears: function (pool, type) {
        return new Promise((resolve, reject) => {
            let query;
            if (type === 'marriage') {
                query = `SELECT DISTINCT year FROM ps_marriage_registration_avahal`;
            } else {
                query = `SELECT DISTINCT year FROM ps_under_18_marriages_avahal`;
            }
            pool.query(query, function (err, result) {
                handleResult(err, result, resolve, reject);
            });
        });
    },

    getDistinctMonths: function (pool, year, type) {
        return new Promise((resolve, reject) => {
            let query;
            if (type === 'marriage') {
                query = `SELECT DISTINCT month FROM ps_marriage_registration_avahal WHERE year = ? ORDER BY month`;
            } else {
                query = `SELECT DISTINCT month FROM ps_under_18_marriages_avahal WHERE year = ? ORDER BY month`;
            }
            pool.query(query, [year], function (err, result) {
                handleResult(err, result, resolve, reject);
            });
        });
    },

    getAvahalData: function (pool, type, year, month) {
        return new Promise((resolve, reject) => {
            let query;
            if (type === 'marriage') {
                query =
                    'SELECT * FROM ps_marriage_registration_avahal WHERE month = ? AND year = ?';
            } else {
                query = 'SELECT * FROM ps_under_18_marriages_avahal WHERE month = ? AND year = ?';
            }
            pool.query(query, [month, year], function (err, result) {
                handleResult(err, result, resolve, reject);
            });
        });
    },

    deleteEntry: function (pool, id, type) {
        console.log(type, id);
        return new Promise((resolve, reject) => {
            let query;

            if (type == 'marriage') {
                query = 'DELETE FROM ps_marriage_registration_avahal WHERE id = ?';
            }
            if (type == 'under18Marriage') {
                query = 'DELETE FROM ps_under_18_marriages_avahal WHERE id = ?';
            }

            pool.query(query, [id], function (err, result) {
                handleResult(err, result, resolve, reject);
            });
        });
    },
};

function handleResult(err, result, resolve, reject) {
    return err ? reject(err) : resolve(result);
}

module.exports = marriageRegistrationModel;
