const fmtDateField = require("../../utils/fmtDateField");
const { runQuery } = require("../../utils/runQuery");
const { fmtDateToTimestamp } = require("../../utils/sqlDates");

/**
 * occupationNocModel
 * -------------------
 * Handles all database operations for Occupation NOC applications
 * stored in the "ps_occupation_noc" table.
 *
 * Functions:
 * 1. list() - list applications by status
 * 2. getById() - fetch single application
 * 3. getByMobile() - fetch by applicant mobile
 * 4. save() - insert new NOC application
 * 5. acceptApplication() - approve application
 * 6. rejectApplication() - reject application
 * 7. revokeApplication() - reset to PENDING
 */

const occupationNocModel = {
  // ============================================
  // LIST OCCUPATION NOC APPLICATIONS BY STATUS
  // ============================================
  list: (pool, { status = "pending", sort = "desc", subject = "" } = {}) => {
    const q = `
      SELECT
        *,
        ${fmtDateField("dob")},
        TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS age,
        ${fmtDateField("print_date")},
        ${fmtDateField("sabha_date")},
        ${fmtDateField("date_of_acceptance")},
        ${fmtDateField("date_of_rejection")},
        ${fmtDateField("createdAt")},
        ${fmtDateField("updatedAt")}
      FROM ps_occupation_noc
      WHERE application_status = ?
      ${subject ? " AND subject_code = ? " : ""}
      ORDER BY id ${sort === "asc" ? "ASC" : "DESC"}
    `;
    let params = [status.toUpperCase()];
    if (subject) params.push(subject);
    return runQuery(pool, q, params);
  },

  // ============================================
  // GET APPLICATION BY ID
  // ============================================
  getById: (pool, id) => {
    const q = `
      SELECT
        *,
        ${fmtDateField("dob")},
        TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS age,
        ${fmtDateField("print_date")},
        ${fmtDateField("sabha_date")},
        ${fmtDateField("date_of_acceptance")},
        ${fmtDateField("date_of_rejection")},
        ${fmtDateField("createdAt")},
        ${fmtDateField("updatedAt")}
      FROM ps_occupation_noc
      WHERE id = ?
      LIMIT 1
    `;
    return runQuery(pool, q, [id]);
  },

  // ============================================
  // GET APPLICATION BY MOBILE
  // ============================================
  getByMobile: (pool, mobile) => {
    const q = `
      SELECT *
      FROM ps_occupation_noc
      WHERE applicant_mobile = ?
      ORDER BY id DESC
    `;
    return runQuery(pool, q, [mobile]);
  },

  // ============================================
  // SAVE NEW NOC APPLICATION
  // ============================================
  save: (pool, saveData) => {
    const q = `
    INSERT INTO ps_occupation_noc (
        applicant_name,
        applicant_mobile,
        applicant_email,
        applicant_aadhaar,
        applicant_address,
        applicant_village,
        applicant_taluka,
        applicant_district,
        print_date,
        sabha_date,
        resolution_no,
        malmatta_no,
        application_status,
        subject_code,
        application_subject,
        documents,
        dob,
        medical_council_number,
        tree_type,
        tree_count,
        createdAt,
        updatedAt
    ) VALUES (?)
    `;

    const now = new Date();

    const values = [
      saveData.applicant_name,
      saveData.applicant_mobile,
      saveData.applicant_email,
      saveData.applicant_aadhaar,
      saveData.applicant_address,
      saveData.applicant_village,
      saveData.applicant_taluka,
      saveData.applicant_district,
      saveData.print_date || null,
      saveData.sabha_date || null,
      saveData.resolution_no || null,
      saveData.malmatta_no || null,
      "PENDING",
      saveData.subject_code,
      saveData.application_subject,
      JSON.stringify(saveData.documents),
      saveData.dob,
      saveData.medical_council_number,
      saveData.tree_type,
      saveData.tree_count,
      
      saveData.createdAt || now,
      saveData.createdAt || now
    ];

    return runQuery(pool, q, [values]);
  },

  // ============================================
  // ACCEPT APPLICATION
  // ============================================
  acceptApplication: (pool, acceptData) => {
    const q = `
      UPDATE ps_occupation_noc
      SET
        application_status = 'ACCEPTED',
        acceptance_remark = ?,
        print_date = ?,
        sabha_date = ?,
        malmatta_no = ?,
        resolution_no = ?,
        survey_no = ?,
        date_of_acceptance = NOW(),
        updatedAt = NOW()
      WHERE id = ?
    `;
    return runQuery(pool, q, [
      acceptData.acceptance_remark || null,
      acceptData.print_date || null,
      acceptData.sabha_date,
      acceptData.malmatta_no,
      acceptData.resolution_no,
      acceptData.survey_no,
      acceptData.id,
    ]);
  },

  // ============================================
  // REJECT APPLICATION
  // ============================================
  rejectApplication: (pool, rejectData) => {
    const q = `
      UPDATE ps_occupation_noc
      SET
        application_status = 'REJECTED',
        rejection_remark = ?,
        date_of_rejection = NOW(),
        updatedAt = NOW()
      WHERE id = ?
    `;
    return runQuery(pool, q, [rejectData.rejection_remark, rejectData.id]);
  },

  // ============================================
  // REVOKE APPLICATION (RESET TO PENDING)
  // ============================================
  revokeApplication: (pool, id) => {
    const q = `
      UPDATE ps_occupation_noc
      SET
        application_status = 'PENDING',
        acceptance_remark = NULL,
        rejection_remark = NULL,
        date_of_acceptance = NULL,
        date_of_rejection = NULL,
        sabha_date = NULL,
        resolution_no = "",
        malmatta_no = "",
        survey_no = "",
        print_date = NULL,
        updatedAt = NOW()
      WHERE id = ?
    `;
    return runQuery(pool, q, [id]);
  },

  listByMonthAndYear: (pool, month, year, subject = "") => {
    const q = `
    SELECT
      *,
      ${fmtDateField("dob")},
      TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS age,
      ${fmtDateField("print_date")},
      ${fmtDateField("sabha_date")},
      ${fmtDateField("date_of_acceptance")},
      ${fmtDateField("date_of_rejection")},
      ${fmtDateField("createdAt")},
      ${fmtDateField("updatedAt")}
    FROM ps_occupation_noc
    WHERE application_status = ?
      ${subject ? "AND subject_code = ?" : ""}
      AND YEAR(createdAt) = ?
      AND MONTH(createdAt) = ?
    ORDER BY createdAt ASC
  `;

    let params = ["ACCEPTED"];

    if (subject) params.push(subject);

    params.push(year);
    params.push(month);

    return runQuery(pool, q, params);
  },

  listByYearRange: (pool, fromYear, toYear, subject = "", {} = {}) => {
    const q = `
        SELECT
        *,
        ${fmtDateField("dob")},
        TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS age,
        ${fmtDateField("print_date")},
        ${fmtDateField("sabha_date")},
        ${fmtDateField("date_of_acceptance")},
        ${fmtDateField("date_of_rejection")},
        ${fmtDateField("createdAt")},
        ${fmtDateField("updatedAt")}
        FROM ps_occupation_noc
        WHERE application_status = ?
        ${subject ? "AND subject_code = ?" : ""}
        AND (
            (YEAR(createdAt) = ? AND MONTH(createdAt) >= 4)
            OR
            (YEAR(createdAt) = ? AND MONTH(createdAt) <= 3)
        )
        ORDER BY createdAt ASC
    `;
    let params = ["ACCEPTED"];
    if (subject) params.push(subject);
    params.push(fromYear);
    params.push(toYear);
    return runQuery(pool, q, params);
  },
};

module.exports = occupationNocModel;
