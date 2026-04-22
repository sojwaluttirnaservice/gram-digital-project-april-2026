const fmtDateField = require("../../utils/fmtDateField");
const { runQuery } = require("../../utils/runQuery");
const { fmtDateToTimestamp } = require("../../utils/sqlDates");

const ferfarApplicationsModel = {
  /* ----------------------------------------
       LIST ALL FERFAR APPLICATIONS
       (latest first – GP dashboard friendly)
    ---------------------------------------- */
  list: (pool, { sort = "DESC", status = "pending" }) => {
    const q = `
            SELECT
                id,
                applicant_name,
                applicant_mobile,
                applicant_adhar,
                applicant_address,
                applicant_village,
                malmatta_no,
                original_owner_name,
                ferfar_document,
                ferfar_document_saved_name,
                east_landmark,
                west_landmark,
                north_landmark,
                south_landmark,
                i_agree_statement,
                i_agree_statement_status,
                application_status,
                application_date,
                masik_sabha_date,
                ${fmtDateField("masik_sabha_date")},
                masik_tharav_number,
                resolution_malmatta_number,
                resolution_remark,
                ${fmtDateField("application_date")},
                masik_sabha_date,
                ${fmtDateField("masik_sabha_date")},
                date_of_resolution,
                ${fmtDateField("date_of_resolution")},
                createdAt,
                ${fmtDateField("createdAt")},
                updatedAt,
                ${fmtDateField("updatedAt")}
            FROM ps_ferfar_applications
            WHERE 
                application_status = ?
            ORDER BY id ${sort == "desc" ? "DESC" : "ASC"}
            
        `;

    return runQuery(pool, q, [status.toUpperCase()]);
  },

  getFerfarApplicationsByYearRange: (pool, fromYear, toYear) => {
    const q = `
            SELECT
                id,
                applicant_name,
                applicant_mobile,
                applicant_adhar,
                applicant_address,
                applicant_village,
                malmatta_no,
                original_owner_name,
                ferfar_document,
                ferfar_document_saved_name,
                east_landmark,
                west_landmark,
                north_landmark,
                south_landmark,
                i_agree_statement,
                i_agree_statement_status,
                application_status,
                application_date,
                masik_sabha_date,
                ${fmtDateField("masik_sabha_date")},
                masik_tharav_number,
                resolution_malmatta_number,
                resolution_remark,
                ${fmtDateField("application_date")},
                masik_sabha_date,
                ${fmtDateField("masik_sabha_date")},
                date_of_resolution,
                ${fmtDateField("date_of_resolution")},
                createdAt,
                ${fmtDateField("createdAt")},
                updatedAt,
                ${fmtDateField("updatedAt")}
            FROM ps_ferfar_applications
            WHERE 
                application_status = ?
            AND
                (
                    (YEAR(application_date) = ? AND MONTH(application_date) >= 4)
                        OR
                    (YEAR(application_date) = ? AND MONTH(application_date) <= 3)
                )
            ORDER BY application_date ASC 
            
        `;

    return runQuery(pool, q, ["RESOLVED", fromYear, toYear]);
  },
  getFerfarApplicationsByMonthAndYear: (pool, month, year) => {
    const q = `
            SELECT
                id,
                applicant_name,
                applicant_mobile,
                applicant_adhar,
                applicant_address,
                applicant_village,
                malmatta_no,
                original_owner_name,
                ferfar_document,
                ferfar_document_saved_name,
                east_landmark,
                west_landmark,
                north_landmark,
                south_landmark,
                i_agree_statement,
                i_agree_statement_status,
                application_status,
                application_date,
                masik_sabha_date,
                ${fmtDateField("masik_sabha_date")},
                masik_tharav_number,
                resolution_malmatta_number,
                resolution_remark,
                ${fmtDateField("application_date")},
                date_of_resolution,
                ${fmtDateField("date_of_resolution")},
                masik_sabha_date,
                ${fmtDateField("masik_sabha_date")},
                createdAt,
                ${fmtDateField("createdAt")},
                updatedAt,
                ${fmtDateField("updatedAt")}
            FROM ps_ferfar_applications
            WHERE 
                application_status = ?
            AND
                MONTH(application_date) = ? AND YEAR(application_date) = ?
            ORDER BY application_date ASC
            
        `;
    return runQuery(pool, q, ["RESOLVED", month, year]);
  },

  getFerfarApplicationById: (pool, id) => {
    const q = `
            SELECT
                id,
                applicant_name,
                applicant_mobile,
                applicant_adhar,
                applicant_address,
                applicant_village,
                malmatta_no,
                original_owner_name,
                ferfar_document,
                ferfar_document_saved_name,
                east_landmark,
                west_landmark,
                north_landmark,
                south_landmark,
                i_agree_statement,
                i_agree_statement_status,
                application_status,
                application_date,
                ${fmtDateField("application_date")},
                masik_tharav_number,
                resolution_malmatta_number,
                resolution_remark,
                masik_sabha_date,
                ${fmtDateField("masik_sabha_date")},
                date_of_resolution,
                ${fmtDateField("date_of_resolution")},
                createdAt,
                ${fmtDateField("createdAt")},
                updatedAt,
                ${fmtDateField("updatedAt")}
            FROM ps_ferfar_applications
            WHERE id = ?
        `;

    return runQuery(pool, q, [id]);
  },

  /* ----------------------------------------
       SAVE NEW FERFAR APPLICATION
    ---------------------------------------- */
  saveFerfarApplication: (pool, data) => {
    const q = `
            INSERT INTO ps_ferfar_applications (
                applicant_name,
                applicant_mobile,
                applicant_adhar,
                applicant_address,
                applicant_village,
                malmatta_no,
                original_owner_name,
                ferfar_document,
                east_landmark,
                west_landmark,
                north_landmark,
                south_landmark,
                i_agree_statement,
                i_agree_statement_status,
                application_date,
                application_status,
                ferfar_document_saved_name
            ) VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
        `;

    const now = new Date();

    const insertArr = [
      data.applicant_name,
      data.applicant_mobile,
      data.applicant_adhar,
      data.applicant_address,
      data.applicant_village,
      data.malmatta_no,
      data.original_owner_name,
      data.ferfar_document || null,
      data.east_landmark || null,
      data.west_landmark || null,
      data.north_landmark || null,
      data.south_landmark || null,
      data.i_agree_statement || null,
      data.i_agree_statement_status || "AGREE",
      data.application_date || now,
      data.application_status || "PENDING",
      data.ferfar_document_saved_name
    ];

    return runQuery(pool, q, insertArr);
  },

  revokeFerfarApplication: (pool, ferfarApplicationId) => {
    const q = `UPDATE ps_ferfar_applications 
                    
                    SET 
                        application_status = "PENDING",
                        acceptance_remark = ?,
                        date_of_acceptance = ?,
                        
                        rejection_remark = ?,
                        date_of_rejection = ?
                    WHERE 
                        id = ?`;

    let revokeDataArr = ["", null, "", null, ferfarApplicationId];
    return runQuery(pool, q, revokeDataArr);
  },

  acceptFerfarApplication: (pool, acceptanceData) => {
    const q = `UPDATE ps_ferfar_applications 
                    
                    SET 
                        application_status = "ACCEPTED",
                        acceptance_remark = ?,
                        date_of_acceptance = ?
                    WHERE 
                        id = ?`;

    let acceptanceDataArr = [
      acceptanceData.acceptance_remark,
      new Date(),
      acceptanceData.id,
    ];
    return runQuery(pool, q, acceptanceDataArr);
  },

  rejectFerfarApplication: (pool, rejectionData) => {
    const q = `UPDATE ps_ferfar_applications 
                    
                    SET
                        application_status = "REJECTED",
                        rejection_remark = ?,
                        date_of_rejection = ?
                    WHERE 
                        id = ?`;

    let rejectionDataArr = [
      rejectionData.rejection_remark,
      new Date(),
      rejectionData.id,
    ];
    return runQuery(pool, q, rejectionDataArr);
  },

  resolveFerfarApplication: (pool, resolutionData) => {
    const q = `UPDATE ps_ferfar_applications 
                    
                    SET
                        application_status = "RESOLVED",
                        
                        masik_sabha_date = ?,
                        masik_tharav_number = ?,
                        resolution_malmatta_number = ?,
                        resolution_remark = ?,
                        
                        date_of_resolution = ?

                    WHERE 
                        id = ?`;

    return runQuery(pool, q, [
      resolutionData.masik_sabha_date,
      resolutionData.masik_tharav_number,
      resolutionData.resolution_malmatta_number,
      resolutionData.resolution_remark,

      new Date(),

      resolutionData.id,
    ]);
  },
};

module.exports = ferfarApplicationsModel;
