const { runQuery } = require("../../utils/runQuery");

const divyangaModel = {
  checkIfDivyangaUserAlreadyExists: (pool, data) => {
    let q = `
            SELECT * FROM ps_divyanga_registration
              WHERE
                aadhar_number = ?
                AND
                application_number = ?`;
    return runQuery(pool, q, [data.aadhar_number, data.application_number]);
  },

  getById: (pool, applicationId) => {
    const q = `SELECT * FROM ps_divyanga_registration WHERE id = ?`;
    return runQuery(pool, q, [applicationId]);
  },

  registerNewDivyangaUser: (pool, data) => {
    let query = `
            INSERT INTO ps_divyanga_registration (
                full_name,
                address,
                education,
                demand,

                mobile,
                type_of_disability,
                percentage_of_disability,
                age,

                shera,
                aadhar_number,
                bank_name,
                bank_ifsc_code,

                bank_account_number,
                application_number
              ) 
              VALUES (?)
        `;

    const insertArray = [
      data.full_name,
      data.address,
      data.education,
      data.demand,

      data.mobile,
      data.type_of_disability,
      data.percentage_of_disability,
      data.age,

      data.shera,
      data.aadhar_number,
      data.bank_name,
      data.bank_ifsc_code,

      data.bank_account_number,
      data.application_number,
    ];

    return runQuery(pool, query, [insertArray]);
  },

  updateDivyangaUser: (pool, updatedData) => {
    const q = `
        UPDATE ps_divyanga_registration
        SET
            full_name = ?,
            address = ?,
            education = ?,
            demand = ?,
            mobile = ?,
            type_of_disability = ?,
            percentage_of_disability = ?,
            age = ?,
            shera = ?,
            aadhar_number = ?,
            bank_name = ?,
            bank_ifsc_code = ?,
            bank_account_number = ?,
            user_image_pathurl = ?,
            certificate_file_name = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;

    return runQuery(pool, q, [
      updatedData.full_name,
      updatedData.address,
      updatedData.education,
      updatedData.demand,
      updatedData.mobile,
      updatedData.type_of_disability,
      updatedData.percentage_of_disability,
      updatedData.age,
      updatedData.shera,
      updatedData.aadhar_number,
      updatedData.bank_name,
      updatedData.bank_ifsc_code,
      updatedData.bank_account_number,
      updatedData.user_image_pathurl,
      updatedData.certificate_file_name,
      updatedData.id,
    ]);
  },

  addFileUrl: (pool, imagePath, certificateName, id) => {
    let query = `
            UPDATE 
                ps_divyanga_registration
            SET
                user_image_pathurl = ?,
                certificate_file_name = ?
            WHERE id = ?;
        `;
    return runQuery(pool, query, [imagePath, certificateName, id]);
  },

  getDivyangaApplicationsList: (pool, applicationStatus) => {
    let query = `
            SELECT
                id,

                full_name,
                address,
                education,
                demand,

                mobile,
                type_of_disability,
                percentage_of_disability,
                age,

                shera,
                aadhar_number,
                user_image_pathurl,
                application_status,
                
                application_number,
                certificate_file_name,
                
                bank_name,
                bank_ifsc_code,
                bank_account_number,
                
                created_at,
                updated_at
            FROM
                ps_divyanga_registration
            WHERE application_status = ?
        `;
    return runQuery(pool, query, [applicationStatus]);
  },

  approveDivyangaUserApplication: (pool, id) => {
    let query = `
            UPDATE 
                ps_divyanga_registration
            SET
                application_status = ?
            WHERE id = ?;
        `;
    return runQuery(pool, query, [1, id]);
  },

  rejectDivyangaUserApplication: (pool, id) => {
    let query = `
            UPDATE 
                ps_divyanga_registration
            SET
                application_status = ?
            WHERE id = ?;
        `;
    return runQuery(pool, query, [-1, id]);
  },
};

module.exports = divyangaModel;
