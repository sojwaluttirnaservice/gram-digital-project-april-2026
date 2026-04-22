const unavailabilityCertificateModel = {
  getList: (pool) => {
    return new Promise((resolve, reject) => {
      const q = `SELECT *,
                  IFNULL(DATE_FORMAT(date_of_registration, '%d-%m-%Y'), "") AS _date_of_registration,
                  IFNULL(DATE_FORMAT(date_of_issue, '%d-%m-%Y'), "") AS _date_of_issue,
                  IFNULL(DATE_FORMAT(created_on, '%d-%m-%Y'), "") AS _created_on,
                  IFNULL(DATE_FORMAT(updated_on, '%d-%m-%Y'), "") AS _updated_on
            FROM ps_birth_death_certificate_unavailability_certificates`;

      pool.query(q, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  getCertificate: (pool, id) => {
    return new Promise((resolve, reject) => {
      const q = `SELECT *,
                  IFNULL(DATE_FORMAT(date_of_registration, '%d-%m-%Y'), "") AS _date_of_registration,
                  IFNULL(DATE_FORMAT(date_of_issue, '%d-%m-%Y'), "") AS _date_of_issue,
                  IFNULL(DATE_FORMAT(created_on, '%d-%m-%Y'), "") AS _created_on,
                  IFNULL(DATE_FORMAT(updated_on, '%d-%m-%Y'), "") AS _updated_on
            FROM ps_birth_death_certificate_unavailability_certificates WHERE id = ${id}`;

      pool.query(q, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },
  addCertificate: (pool, data) => {
    return new Promise((resolve, reject) => {
      const q = `
      INSERT INTO ps_birth_death_certificate_unavailability_certificates (
        name, 
        name_m, 
        gender, 
        gender_m,

        name_of_parent_or_spouse, 
        name_of_parent_or_spouse_m,
        year_range, 
        year_range_m,

        relation_to_parent_or_spouse, 
        relation_to_parent_or_spouse_m,
        certificate_not_found_for, 
        certificate_not_found_for_m,
        date_of_registration, 
        date_of_registration_m,

        remarks, 
        date_of_issue
      ) 
      VALUES (?)
    `;

      console.log(data);

      const insertData = [
        data.name || "",
        data.name_m || "",
        data.gender || "",
        data.gender_m || "",

        data.name_of_parent_or_spouse || "",
        data.name_of_parent_or_spouse_m || "",
        data.year_range || "",
        data.year_range_m || "",

        data.relation_to_parent_or_spouse || "",
        data.relation_to_parent_or_spouse_m || "",
        data.certificate_not_found_for || "",
        data.certificate_not_found_for_m || "",

        data.date_of_registration || "",
        data.date_of_registration_m || "",
        data.remarks || "",
        data.date_of_issue || "",
      ];

      pool.query(q, [insertData], (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  updateCertificate: (pool, data) => {
    return new Promise((resolve, reject) => {
      const q = `
        UPDATE ps_birth_death_certificate_unavailability_certificates
        SET
          name = ?,
          name_m = ?,
          gender = ?,
          gender_m = ?,
          name_of_parent_or_spouse = ?,
          name_of_parent_or_spouse_m = ?,
          year_range = ?,
          year_range_m = ?,
          relation_to_parent_or_spouse = ?,
          relation_to_parent_or_spouse_m = ?,
          certificate_not_found_for = ?,
          certificate_not_found_for_m = ?,
          date_of_registration = ?,
          date_of_registration_m = ?,
          remarks = ?,
          date_of_issue = ?,
          updated_on = CURRENT_TIMESTAMP
        WHERE id = ?
      `;

      const updateData = [
        data.name || "",
        data.name_m || "",
        data.gender || "",
        data.gender_m || "",

        data.name_of_parent_or_spouse || "",
        data.name_of_parent_or_spouse_m || "",
        data.year_range || "",
        data.year_range_m || "",

        data.relation_to_parent_or_spouse || "",
        data.relation_to_parent_or_spouse_m || "",
        data.certificate_not_found_for || "",
        data.certificate_not_found_for_m || "",

        data.date_of_registration || "",
        data.date_of_registration_m || "",
        data.remarks || "",
        data.date_of_issue || "",

        data.id, // Assuming `data.id` contains the ID of the record to be updated
      ];

      pool.query(q, updateData, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  deleteCertificate: (pool, id) => {
    return new Promise((resolve, reject) => {
      const q = `DELETE FROM ps_birth_death_certificate_unavailability_certificates WHERE id = ${id}`;
      pool.query(q, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },
};

module.exports = unavailabilityCertificateModel;
