const { runQuery } = require("../../utils/runQuery");

const birthCertificateModel = {
  saveBirthCertificate: (pool, data) => {
    return new Promise((resolve, reject) => {
      const q = `INSERT INTO ps_birth_certificates
                        (
                            name,
                            name_m,

                            gender,
                            gender_m,

                            date_of_birth,
                            date_of_birth_m,
                            date_of_birth_in_words,

                            place_of_birth,
                            place_of_birth_m,
						
                            name_of_mother,
                            name_of_mother_m,
                            aadhar_number_of_mother,
                            aadhar_number_of_mother_m,

							              name_of_father,
                            name_of_father_m,
                            aadhar_number_of_father,
                            aadhar_number_of_father_m,


                            address_of_parents_at_birth_time_of_baby,
                            address_of_parents_at_birth_time_of_baby_m,
                            permanent_address_of_parents,
                            permanent_address_of_parents_m,

                            remarks,

                            date_of_registration,
                            date_of_registration_m,

                            date_of_issue,
                            gp_registration_number,
                            official_present_at_birth,
                            official_present_at_birth_m,
                            weight_of_baby,
                            gp_registration_birth_report_file_name

                        ) VALUES (?)`;

      const insertData = [
        data.name,
        data.name_m,

        data.gender,
        data.gender_m,

        data.date_of_birth,
        data.date_of_birth_m,
        data.date_of_birth_in_words,

        data.place_of_birth,
        data.place_of_birth_m,

        data.name_of_mother,
        data.name_of_mother_m,
        data.aadhar_number_of_mother,
        data.aadhar_number_of_mother_m,

        data.name_of_father,
        data.name_of_father_m,
        data.aadhar_number_of_father,
        data.aadhar_number_of_father_m,

        data.address_of_parents_at_birth_time_of_baby,
        data.address_of_parents_at_birth_time_of_baby_m,

        data.permanent_address_of_parents,
        data.permanent_address_of_parents_m,

        data.remarks,

        data.date_of_registration,
        data.date_of_registration_m,

        data.date_of_issue,
        data.gp_registration_number,
        data.official_present_at_birth,
        data.official_present_at_birth_m,
        data.weight_of_baby,

        data.gp_registration_birth_report_file_name
      ];

      pool.query(q, [insertData], (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  updateBirthCertificate: (pool, data) => {
    return new Promise((resolve, reject) => {
      const q = `UPDATE ps_birth_certificates SET
                        name = ?,
                        name_m = ?,

                        gender = ?,
                        gender_m = ?,

                        date_of_birth = ?,
                        date_of_birth_m = ?,
                        date_of_birth_in_words = ?,

                        place_of_birth = ?,
                        place_of_birth_m = ?,
        
                        name_of_mother = ?,
                        name_of_mother_m = ?,
                        aadhar_number_of_mother = ?,
                        aadhar_number_of_mother_m = ?,

						name_of_father = ?,
                        name_of_father_m = ?,
                        aadhar_number_of_father = ?,
                        aadhar_number_of_father_m = ?,
					
					
                        address_of_parents_at_birth_time_of_baby = ?,
                        address_of_parents_at_birth_time_of_baby_m = ?,

                        permanent_address_of_parents = ?,
                        permanent_address_of_parents_m = ?,

                        remarks = ?,
						
                        date_of_registration = ?,
                        date_of_registration_m = ?,

                        date_of_issue = ?,
                        gp_registration_number = ?,

						updated_on = CURRENT_TIMESTAMP,

                        official_present_at_birth = ?,
                        official_present_at_birth_m = ?,
                        weight_of_baby = ?,
                        gp_registration_birth_report_file_name = ?

                        WHERE id = ?`;

      const updateData = [
        data.name,
        data.name_m,

        data.gender,
        data.gender_m,

        data.date_of_birth,
        data.date_of_birth_m,
        data.date_of_birth_in_words,

        data.place_of_birth,
        data.place_of_birth_m,

        data.name_of_mother,
        data.name_of_mother_m,
        data.aadhar_number_of_mother,
        data.aadhar_number_of_mother_m,

        data.name_of_father,
        data.name_of_father_m,
        data.aadhar_number_of_father,
        data.aadhar_number_of_father_m,

        data.address_of_parents_at_birth_time_of_baby,
        data.address_of_parents_at_birth_time_of_baby_m,

        data.permanent_address_of_parents,
        data.permanent_address_of_parents_m,

        data.remarks,
        data.date_of_registration,
        data.date_of_registration_m,

        data.date_of_issue,
        data.gp_registration_number,

        data.official_present_at_birth,
        data.official_present_at_birth_m,
        data.weight_of_baby,

        data.gp_registration_birth_report_file_name,

        data.id,
      ];

      pool.query(q, updateData, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  deleteBirthCertificate: (pool, id) => {
    return new Promise((resolve, reject) => {
      const q = `DELETE FROM ps_birth_certificates WHERE id = ?`;

      pool.query(q, [id], (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  fetchAllBirthCertificates: (pool, year = null) => {
    return new Promise((resolve, reject) => {
      const q = `SELECT *,
							IFNULL(DATE_FORMAT(date_of_registration, '%d-%m-%Y'), "") AS _date_of_registration,
							IFNULL(DATE_FORMAT(date_of_issue, '%d-%m-%Y'), "") AS _date_of_issue,
							IFNULL(DATE_FORMAT(date_of_birth, '%d-%m-%Y'), "") AS _date_of_birth,
							IFNULL(DATE_FORMAT(updated_on, '%d-%m-%Y'), "") AS _updated_on
			 FROM ps_birth_certificates ${year ? `WHERE YEAR(date_of_registration) = ? ` : ""} ORDER BY date_of_birth`;

      const params = [];
      if (year) params.push(year);

      pool.query(q, params, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  fetchBirthCertificatesByMonthYear: (pool, month, year) => {
    return new Promise((resolve, reject) => {
      const q = `SELECT *,
							IFNULL(DATE_FORMAT(date_of_registration, '%d-%m-%Y'), "") AS _date_of_registration,
							IFNULL(DATE_FORMAT(date_of_issue, '%d-%m-%Y'), "") AS _date_of_issue,
							IFNULL(DATE_FORMAT(date_of_birth, '%d-%m-%Y'), "") AS _date_of_birth,
							IFNULL(DATE_FORMAT(updated_on, '%d-%m-%Y'), "") AS _updated_on
			 FROM ps_birth_certificates WHERE MONTH(date_of_birth) = ? AND YEAR(date_of_birth) = ?`;

      pool.query(q, [month, year], (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  fetchBirthCertificateById: (pool, id) => {
    return new Promise((resolve, reject) => {
      const q = `SELECT *,
							IFNULL(DATE_FORMAT(date_of_registration, '%d-%m-%Y'), "") AS _date_of_registration,
							IFNULL(DATE_FORMAT(date_of_issue, '%d-%m-%Y'), "") AS _date_of_issue,
							IFNULL(DATE_FORMAT(date_of_birth, '%d-%m-%Y'), "") AS _date_of_birth,
							IFNULL(DATE_FORMAT(updated_on, '%d-%m-%Y'), "") AS _updated_on
			 FROM ps_birth_certificates WHERE id = ?`;

      pool.query(q, [id], (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  fetchBirthCertificatesByName: (pool, name) => {
    return new Promise((resolve, reject) => {
      const q = `SELECT *,
							IFNULL(DATE_FORMAT(date_of_registration, '%d-%m-%Y'), "") AS _date_of_registration,
							IFNULL(DATE_FORMAT(date_of_issue, '%d-%m-%Y'), "") AS _date_of_issue,
							IFNULL(DATE_FORMAT(date_of_birth, '%d-%m-%Y'), "") AS _date_of_birth,
							IFNULL(DATE_FORMAT(updated_on, '%d-%m-%Y'), "") AS _updated_on
			FROM ps_birth_certificates WHERE name = ? OR name_m = ?`;

      pool.query(q, [name, name], (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  // fetchBirthCertificateByAdhar: (pool, adharNumber) => {
  //   const q = `SELECT * FROM ps_birth_certificates WHERE aadhar_of_deceased = ?`
  //   return runQuery(pool, q, [adharNumber])
  // }
};

module.exports = birthCertificateModel;
