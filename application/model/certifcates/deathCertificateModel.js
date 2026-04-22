const { runQuery } = require("../../utils/runQuery");

const deathCertificateModel = {
  saveDeathCertificate: (pool, data) => {
    const q = `INSERT INTO ps_death_certificates
                        (
                            name_of_deceased,
                            name_of_deceased_m,
                            aadhar_of_deceased,
                            aadhar_of_deceased_m,
                            gender,
                            gender_m,
                            date_of_death,
                            date_of_death_m,
                            date_of_death_in_words,
                            place_of_death,
                            place_of_death_m,
                            age_of_deceased,
                            age_of_deceased_m,
                            name_of_husband_or_wife,
                            name_of_husband_or_wife_m,
                            name_of_mother,
                            name_of_mother_m,
                            aadhar_number_of_mother,
                            aadhar_number_of_mother_m,
							name_of_father,
                            name_of_father_m,
                            aadhar_number_of_father,
                            aadhar_number_of_father_m,
                            aadhar_number_of_husband_or_wife,
                            aadhar_number_of_husband_or_wife_m,
                            address_of_deceased_at_death_time,
                            address_of_deceased_at_death_time_m,
                            permanent_address_of_deceased,
                            permanent_address_of_deceased_m,
                            remarks,
                            date_of_registration,
                            date_of_registration_m,
                            date_of_issue,
                            informer_name,
                            informer_name_m,
                            informer_address,
                            informer_address_m,
                            reason_of_death,
                            reason_of_death_m,
                            gp_registration_number,
                            gp_registration_death_report_file_name,
                            created_on,
                            updated_on
                        ) VALUES (?)`;


    const now = new Date();

    const insertData = [
      data.name_of_deceased,
      data.name_of_deceased_m,
      data.aadhar_of_deceased,
      data.aadhar_of_deceased_m,
      data.gender,
      data.gender_m,
      data.date_of_death,
      data.date_of_death_m,
      data.date_of_death_in_words,
      data.place_of_death,
      data.place_of_death_m,
      data.age_of_deceased,
      data.age_of_deceased_m,
      data.name_of_husband_or_wife,
      data.name_of_husband_or_wife_m,
      data.name_of_mother,
      data.name_of_mother_m,
      data.aadhar_number_of_mother,
      data.aadhar_number_of_mother_m,
      data.name_of_father,
      data.name_of_father_m,
      data.aadhar_number_of_father,
      data.aadhar_number_of_father_m,
      data.aadhar_number_of_husband_or_wife,
      data.aadhar_number_of_husband_or_wife_m,
      data.address_of_deceased_at_death_time,
      data.address_of_deceased_at_death_time_m,
      data.permanent_address_of_deceased,
      data.permanent_address_of_deceased_m,
      data.remarks,
      data.date_of_registration,
      data.date_of_registration_m,
      data.date_of_issue,
      data.informer_name,
      data.informer_name_m,
      data.informer_address,
      data.informer_address_m,
      data.reason_of_death,
      data.reason_of_death_m,
      data.gp_registration_number,
      data.gp_registration_death_report_file_name,
      data.created_on || now,
      data.created_on || now
    ];

    return runQuery(pool, q, [insertData]);
  },

  updateDeathCertificate: (pool, data) => {
    const q = `UPDATE ps_death_certificates SET
                        name_of_deceased = ?,
                        name_of_deceased_m = ?,

                        aadhar_of_deceased = ?,
                        aadhar_of_deceased_m = ?,
                        gender = ?,
                        gender_m = ?,
                        date_of_death = ?,
                        date_of_death_m = ?,
                        date_of_death_in_words = ?,
                        place_of_death = ?,
                        place_of_death_m = ?,
                        age_of_deceased = ?,
                        age_of_deceased_m = ?,
                        name_of_husband_or_wife = ?,
                        name_of_husband_or_wife_m = ?,
                        name_of_mother = ?,
                        name_of_mother_m = ?,
                        aadhar_number_of_mother = ?,
                        aadhar_number_of_mother_m = ?,
						name_of_father = ?,
                        name_of_father_m = ?,
                        aadhar_number_of_father = ?,
                        aadhar_number_of_father_m = ?,
                        aadhar_number_of_husband_or_wife = ?,
                        aadhar_number_of_husband_or_wife_m = ?,
                        address_of_deceased_at_death_time = ?,
                        address_of_deceased_at_death_time_m = ?,
                        permanent_address_of_deceased = ?,
                        permanent_address_of_deceased_m = ?,
                        remarks = ?,
                        date_of_registration = ?,
                        date_of_registration_m = ?,
                        date_of_issue = ?,
                        updated_on = CURRENT_TIMESTAMP,
                        informer_name = ?,
                        informer_name_m = ?,
                        informer_address = ?,
                        informer_address_m = ?,
                        reason_of_death = ?,
                        reason_of_death_m = ?,
                        gp_registration_number = ?,
                        gp_registration_death_report_file_name = ?

                        WHERE id = ?`;

    const updateData = [
      data.name_of_deceased,
      data.name_of_deceased_m,
      data.aadhar_of_deceased,
      data.aadhar_of_deceased_m,
      data.gender,
      data.gender_m,
      data.date_of_death,
      data.date_of_death_m,
      data.date_of_death_in_words,
      data.place_of_death,
      data.place_of_death_m,
      data.age_of_deceased,
      data.age_of_deceased_m,
      data.name_of_husband_or_wife,
      data.name_of_husband_or_wife_m,
      data.name_of_mother,
      data.name_of_mother_m,
      data.aadhar_number_of_mother,
      data.aadhar_number_of_mother_m,
      data.name_of_father,
      data.name_of_father_m,
      data.aadhar_number_of_father,
      data.aadhar_number_of_father_m,
      data.aadhar_number_of_husband_or_wife,
      data.aadhar_number_of_husband_or_wife_m,
      data.address_of_deceased_at_death_time,
      data.address_of_deceased_at_death_time_m,
      data.permanent_address_of_deceased,
      data.permanent_address_of_deceased_m,
      data.remarks,
      data.date_of_registration,
      data.date_of_registration_m,
      data.date_of_issue,
      data.informer_name,
      data.informer_name_m,
      data.informer_address,
      data.informer_address_m,
      data.reason_of_death,
      data.reason_of_death_m,
      data.gp_registration_number,
      data.gp_registration_death_report_file_name,

      data.id,
    ];

    return runQuery(pool, q, updateData);
  },

  deleteDeathCertificate: (pool, id) => {
    const q = `DELETE FROM ps_death_certificates WHERE id = ?`;

    return runQuery(pool, q, [id]);
  },

  fetchAllDeathCertificates: (pool, year = null) => {
    const q = `SELECT *,
							IFNULL(DATE_FORMAT(date_of_registration, '%d-%m-%Y'), "") AS _date_of_registration,
							IFNULL(DATE_FORMAT(date_of_issue, '%d-%m-%Y'), "") AS _date_of_issue,
							IFNULL(DATE_FORMAT(date_of_death, '%d-%m-%Y'), "") AS _date_of_death,
							IFNULL(DATE_FORMAT(updated_on, '%d-%m-%Y'), "") AS _updated_on
			 FROM ps_death_certificates ${year ? `WHERE YEAR(date_of_registration) = ?` : ""} ORDER BY date_of_death`;

    const params = [];

    if (year) params.push(year);

    return runQuery(pool, q, params);
  },

  fetchDeathCertificatesByMonthYear: (pool, month, year) => {
    const q = `SELECT *,
							IFNULL(DATE_FORMAT(date_of_registration, '%d-%m-%Y'), "") AS _date_of_registration,
							IFNULL(DATE_FORMAT(date_of_issue, '%d-%m-%Y'), "") AS _date_of_issue,
							IFNULL(DATE_FORMAT(date_of_death, '%d-%m-%Y'), "") AS _date_of_death,
							IFNULL(DATE_FORMAT(updated_on, '%d-%m-%Y'), "") AS _updated_on
			 FROM ps_death_certificates WHERE MONTH(date_of_death) = ? AND YEAR(date_of_death) = ?`;

    return runQuery(pool, q, [month, year]);
  },

  fetchDeathCertificateById: (pool, id) => {
    const q = `SELECT *,
							IFNULL(DATE_FORMAT(date_of_registration, '%d-%m-%Y'), "") AS _date_of_registration,
							IFNULL(DATE_FORMAT(date_of_issue, '%d-%m-%Y'), "") AS _date_of_issue,
							IFNULL(DATE_FORMAT(date_of_death, '%d-%m-%Y'), "") AS _date_of_death,
							IFNULL(DATE_FORMAT(updated_on, '%d-%m-%Y'), "") AS _updated_on
			 FROM ps_death_certificates WHERE id = ?`;
    return runQuery(pool, q, [id]);
  },

  fetchDeathCertificatesByName: (pool, name) => {
    const q = `SELECT *,
							IFNULL(DATE_FORMAT(date_of_registration, '%d-%m-%Y'), "") AS _date_of_registration,
							IFNULL(DATE_FORMAT(date_of_issue, '%d-%m-%Y'), "") AS _date_of_issue,
							IFNULL(DATE_FORMAT(date_of_death, '%d-%m-%Y'), "") AS _date_of_death,
							IFNULL(DATE_FORMAT(updated_on, '%d-%m-%Y'), "") AS _updated_on
			FROM ps_death_certificates WHERE name_of_deceased = ? OR name_of_deceased_m = ?`;
    return runQuery(pool, q, [name]);
  },

  fetchDeathCertificateByAdhar: (pool, adharNumber) => {
    const q = `SELECT * FROM ps_death_certificates WHERE aadhar_of_deceased = ?`;
    return runQuery(pool, q, [adharNumber]);
  },
};

module.exports = deathCertificateModel;
