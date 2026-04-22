const fmtDateField = require("../../utils/fmtDateField");
const { runQuery } = require("../../utils/runQuery");
const { fmtDateToTimestamp } = require("../../utils/sqlDates");

const constructionApplicationsModel = {
  // ============================================
  // LIST APPLICATIONS BY STATUS
  // ============================================
  list: (pool, { sort = "asc", status = "pending" }) => {
    const q = `
    SELECT
        id,
        malmatta_dharak_name,
        applicant_mobile,
        applicant_adhar,
        applicant_address,
        gp_name,
        application_subject,
     
        survey_no,
        group_no,
        plot_no,
        total_area_sq_m,
        total_area_sq_ft,
        upper_floor_area_sq_m,
        approved_construction_area_sq_m,
        attached_documents,

        east_landmark_image_name,
        east_landmark_image_longitude,
        east_landmark_image_latitude,
        west_landmark_image_name,
        west_landmark_image_longitude,
        west_landmark_image_latitude,
        north_landmark_image_name,
        north_landmark_image_longitude,
        north_landmark_image_latitude,
        south_landmark_image_name,
        south_landmark_image_longitude,
        south_landmark_image_latitude,

        acceptance_remark,
        date_of_acceptance,
        ${fmtDateField("date_of_acceptance")},

        rejection_remark,
        date_of_rejection,
        ${fmtDateField("date_of_rejection")},

        resolution_remark,
        date_of_resolution,
        ${fmtDateField("date_of_resolution")},

        masik_sabha_date,
        ${fmtDateField("masik_sabha_date")},

        masik_tharav_number,
        resolution_malmatta_number,

        construction_certificate_date,
        ${fmtDateField("construction_certificate_date")},

        construction_certification_doc_name,

        application_date,
        ${fmtDateField("application_date")},

        application_status,

        createdAt,
        ${fmtDateField("createdAt")},
        updatedAt,
        ${fmtDateField("updatedAt")}
    FROM ps_construction_applications
    WHERE application_status = ?
    ORDER BY id ${sort === "desc" ? "DESC" : "ASC"}
  `;
    return runQuery(pool, q, [status.toUpperCase()]);
  },

  // ============================================
  // GET APPLICATION BY ID
  // ============================================
  getConstructionApplicationById: (pool, applicationId) => {
    const q = `
    SELECT
        id,
        malmatta_dharak_name,
        applicant_mobile,
        applicant_adhar,
        applicant_address,
        gp_name,
        application_subject,
     
        survey_no,
        group_no,
        plot_no,
        total_area_sq_m,
        total_area_sq_ft,
        upper_floor_area_sq_m,
        approved_construction_area_sq_m,
        attached_documents,

        east_landmark_image_name,
        east_landmark_image_longitude,
        east_landmark_image_latitude,
        west_landmark_image_name,
        west_landmark_image_longitude,
        west_landmark_image_latitude,
        north_landmark_image_name,
        north_landmark_image_longitude,
        north_landmark_image_latitude,
        south_landmark_image_name,
        south_landmark_image_longitude,
        south_landmark_image_latitude,

        acceptance_remark,
        date_of_acceptance,
        ${fmtDateField("date_of_acceptance")},

        rejection_remark,
        date_of_rejection,
        ${fmtDateField("date_of_rejection")},

        resolution_remark,
        date_of_resolution,
        ${fmtDateField("date_of_resolution")},

        masik_sabha_date,
        ${fmtDateField("masik_sabha_date")},

        masik_tharav_number,
        resolution_malmatta_number,

        construction_certificate_date,
        ${fmtDateField("construction_certificate_date")},

        construction_certification_doc_name,

        application_date,
        ${fmtDateField("application_date")},

        application_status,

        createdAt,
        ${fmtDateField("createdAt")},
        updatedAt,
        ${fmtDateField("updatedAt")}
    FROM ps_construction_applications
    WHERE id = ?
    LIMIT 1
  `;
    return runQuery(pool, q, [applicationId]);
  },

  // ============================================
  // GET APPLICATIONS BY FINANCIAL YEAR
  // (1 April → 31 March)
  // ============================================
  getConstructionApplicationByYearRange: (pool, fromYear, toYear) => {
    const q = `
    SELECT
        id,
        malmatta_dharak_name,
        applicant_mobile,
        applicant_adhar,
        applicant_address,
        gp_name,
        application_subject,
     
        survey_no,
        group_no,
        plot_no,
        total_area_sq_m,
        total_area_sq_ft,
        upper_floor_area_sq_m,
        approved_construction_area_sq_m,
        attached_documents,

        east_landmark_image_name,
        east_landmark_image_longitude,
        east_landmark_image_latitude,
        west_landmark_image_name,
        west_landmark_image_longitude,
        west_landmark_image_latitude,
        north_landmark_image_name,
        north_landmark_image_longitude,
        north_landmark_image_latitude,
        south_landmark_image_name,
        south_landmark_image_longitude,
        south_landmark_image_latitude,

        acceptance_remark,
        date_of_acceptance,
        ${fmtDateField("date_of_acceptance")},

        rejection_remark,
        date_of_rejection,
        ${fmtDateField("date_of_rejection")},

        resolution_remark,
        date_of_resolution,
        ${fmtDateField("date_of_resolution")},

        masik_sabha_date,
        ${fmtDateField("masik_sabha_date")},

        masik_tharav_number,
        resolution_malmatta_number,

        construction_certificate_date,
        ${fmtDateField("construction_certificate_date")},

        construction_certification_doc_name,

        application_date,
        ${fmtDateField("application_date")},

        application_status,

        createdAt,
        ${fmtDateField("createdAt")},
        updatedAt,
        ${fmtDateField("updatedAt")}
    FROM ps_construction_applications
    WHERE application_date BETWEEN
        STR_TO_DATE(CONCAT(?, '-04-01'), '%Y-%m-%d')
    AND
        STR_TO_DATE(CONCAT(?, '-03-31'), '%Y-%m-%d')
    ORDER BY application_date ASC 
  `;
    return runQuery(pool, q, [fromYear, toYear]);
  },

  // ============================================
  // GET APPLICATIONS BY MONTH & YEAR
  // ============================================
  getConstructionApplicationByMonthAndYear: (pool, month, year) => {
    const q = `
    SELECT
        id,
        malmatta_dharak_name,
        applicant_mobile,
        applicant_adhar,
        applicant_address,
        gp_name,
        application_subject,
     
        survey_no,
        group_no,
        plot_no,
        total_area_sq_m,
        total_area_sq_ft,
        upper_floor_area_sq_m,
        approved_construction_area_sq_m,
        attached_documents,

        east_landmark_image_name,
        east_landmark_image_longitude,
        east_landmark_image_latitude,
        west_landmark_image_name,
        west_landmark_image_longitude,
        west_landmark_image_latitude,
        north_landmark_image_name,
        north_landmark_image_longitude,
        north_landmark_image_latitude,
        south_landmark_image_name,
        south_landmark_image_longitude,
        south_landmark_image_latitude,

        acceptance_remark,
        date_of_acceptance,
        ${fmtDateField("date_of_acceptance")},

        rejection_remark,
        date_of_rejection,
        ${fmtDateField("date_of_rejection")},

        resolution_remark,
        date_of_resolution,
        ${fmtDateField("date_of_resolution")},

        masik_sabha_date,
        ${fmtDateField("masik_sabha_date")},

        masik_tharav_number,
        resolution_malmatta_number,

        construction_certificate_date,
        ${fmtDateField("construction_certificate_date")},

        construction_certification_doc_name,

        application_date,
        ${fmtDateField("application_date")},

        application_status,

        createdAt,
        ${fmtDateField("createdAt")},
        updatedAt,
        ${fmtDateField("updatedAt")}
    FROM ps_construction_applications
    WHERE MONTH(application_date) = ?
      AND YEAR(application_date) = ?
    ORDER BY application_date ASC
  `;
    return runQuery(pool, q, [month, year]);
  },

  // ============================================
  // SAVE NEW APPLICATION
  // ============================================
  saveConstructionApplication: (pool, saveData) => {
    const q = `
            INSERT INTO ps_construction_applications (
                malmatta_dharak_name,
                applicant_mobile,
                applicant_adhar,
                applicant_address,
                gp_name,
                application_subject,

                malmatta_no,
             
                attached_documents,

                east_landmark_image_name,
                east_landmark_image_longitude,
                east_landmark_image_latitude,
                west_landmark_image_name,
                west_landmark_image_longitude,
                west_landmark_image_latitude,
                north_landmark_image_name,
                north_landmark_image_longitude,
                north_landmark_image_latitude,
                south_landmark_image_name,
                south_landmark_image_longitude,
                south_landmark_image_latitude,

                application_status,
                application_date,
                createdAt,
                updatedAt
            ) VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?,
                ?, ?, ?,
                ?, ?, ?,
                ?, ?, ?,
                ?, ?, ?,
                'PENDING',
                ?,
                NOW(),
                NOW()
            )
        `;
    return runQuery(pool, q, [
      saveData.malmatta_dharak_name,
      saveData.applicant_mobile,
      saveData.applicant_adhar,
      saveData.applicant_address,
      saveData.gp_name,
      saveData.application_subject,

      saveData.malmatta_no,
      JSON.stringify(saveData.attached_documents || []),

      saveData.east_landmark_image_name,
      saveData.east_landmark_image_longitude,
      saveData.east_landmark_image_latitude,
      saveData.west_landmark_image_name,
      saveData.west_landmark_image_longitude,
      saveData.west_landmark_image_latitude,
      saveData.north_landmark_image_name,
      saveData.north_landmark_image_longitude,
      saveData.north_landmark_image_latitude,
      saveData.south_landmark_image_name,
      saveData.south_landmark_image_longitude,
      saveData.south_landmark_image_latitude,

      saveData.application_date || new Date()
      
    ]);
  },

  // ============================================
  // ACCEPT APPLICATION
  // ============================================
  acceptConstructionApplication: (pool, acceptData) => {
    const q = `
            UPDATE ps_construction_applications
            SET
                acceptance_remark = ?,
                date_of_acceptance = NOW(),
                application_status = 'ACCEPTED',
                updatedAt = NOW()
            WHERE id = ?
        `;
    return runQuery(pool, q, [acceptData.acceptance_remark, acceptData.id]);
  },

  // ============================================
  // REJECT APPLICATION
  // ============================================
  rejectConstructionApplication: (pool, rejectData) => {
    const q = `
            UPDATE ps_construction_applications
            SET
                rejection_remark = ?,
                date_of_rejection = NOW(),
                application_status = 'REJECTED',
                updatedAt = NOW()
            WHERE id = ?
        `;
    return runQuery(pool, q, [rejectData.rejection_remark, rejectData.id]);
  },

  revokeConstructionApplication: (pool, applicationId) => {
    console.log(applicationId);

    const q = `
            UPDATE ps_construction_applications
            SET
                acceptance_remark = ?,
                date_of_acceptance = ?,

                rejection_remark = ?,
                date_of_rejection = ?,

                application_status = 'PENDING',
                updatedAt = NOW()
            WHERE id = ?
        `;
    return runQuery(pool, q, ["", null, "", null, applicationId]);
  },

  // ============================================
  // RESOLVE APPLICATION
  // ============================================
  resolveConstructionApplication: (pool, resolveData) => {
    const q = `
                UPDATE ps_construction_applications
                SET
                    resolution_remark = ?,
                    date_of_resolution = NOW(),
                    masik_sabha_date = ?,
                    masik_tharav_number = ?,
                    resolution_malmatta_number = ?,
                    construction_certificate_date = ?,
                    construction_certification_doc_name = ?,

                    -- NEWLY ADDED FIELDS
                    survey_no = ?,
                    group_no = ?,
                    plot_no = ?,
                    total_area_sq_m = ?,
                    total_area_sq_ft = ?,
                    upper_floor_area_sq_m = ?,
                    approved_construction_area_sq_m = ?,

                    application_status = 'resolved',
                    updatedAt = NOW()
                WHERE id = ?
            `;

    return runQuery(pool, q, [
      resolveData.resolution_remark,
      resolveData.masik_sabha_date,
      resolveData.masik_tharav_number,
      resolveData.resolution_malmatta_number,
      resolveData.construction_certificate_date,
      resolveData.construction_certification_doc_name,

      // NEW VALUES
      resolveData.survey_no,
      resolveData.group_no,
      resolveData.plot_no,
      resolveData.total_area_sq_m,
      resolveData.total_area_sq_ft,
      resolveData.upper_floor_area_sq_m,
      resolveData.approved_construction_area_sq_m,

      resolveData.id,
    ]);
  },
};

module.exports = constructionApplicationsModel;
