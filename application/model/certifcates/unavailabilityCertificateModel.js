const fmtDateField = require("../../utils/fmtDateField");
const { runQuery } = require("../../utils/runQuery");

const unavailabilityCertificateModel = {
  getList: (pool) => {
    const q = `SELECT *,
                  ${fmtDateField("date_of_registration")},
                  ${fmtDateField("date_of_issue")},
                  ${fmtDateField("created_on")},
                  ${fmtDateField("updated_on")}
            FROM ps_birth_death_certificate_unavailability_certificates`;
    return runQuery(pool, q);
  },

  getCertificate: (pool, id) => {
    const q = `SELECT *,
                  ${fmtDateField("date_of_registration")},
                  ${fmtDateField("date_of_issue")},
                  ${fmtDateField("created_on")},
                  ${fmtDateField("updated_on")}
            FROM ps_birth_death_certificate_unavailability_certificates WHERE id = ?`;

    return runQuery(pool, q, [+id]);
  },
  addCertificate: (pool, data) => {
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

    return runQuery(pool, q, [insertData]);
  },

  updateCertificate: (pool, data) => {
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
    return runQuery(pool, q, updateData);
  },

  deleteCertificate: (pool, id) => {
    const q = `DELETE FROM ps_birth_death_certificate_unavailability_certificates WHERE id = ?`;
    return runQuery(pool, q, [+id]);
  },
};

module.exports = unavailabilityCertificateModel;
