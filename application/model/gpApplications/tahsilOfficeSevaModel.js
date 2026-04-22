const fmtDateField = require("../../utils/fmtDateField");
const { runQuery } = require("../../utils/runQuery");
const { fmtDateToTimestamp } = require("../../utils/sqlDates");

/**
 * tahsilOfficeSevaModel
 * ---------------------
 * Handles all database operations for Tahsil Office Seva applications
 * stored in the "ps_tahsil_office_seva" table.
 *
 * Functions:
 * 1. list() - list applications by status
 * 2. getById() - fetch single application by ID
 * 3. getByMobile() - fetch by applicant mobile
 * 4. save() - insert new application
 * 5. update() - update application details
 * 6. acceptApplication() - approve application
 * 7. rejectApplication() - reject application
 * 8. revokeApplication() - reset status to PENDING
 * 9. getByMonthAndYear() - filter by month & year
 * 10. getByYearRange() - filter by financial year
 */

const tahsilOfficeSevaModel = {
  // ============================================
  // LIST APPLICATIONS BY STATUS
  // ============================================
  list: (pool, { sort = "asc", status = "pending", subject } = {}) => {
    const q = `
      SELECT
        *,
        ${fmtDateField("date_of_acceptance")},
        ${fmtDateField("date_of_rejection")},
        ${fmtDateField("createdAt")},
        ${fmtDateField("updatedAt")}
      FROM ps_tahsil_office_seva
      WHERE registration_status = ? 
      ${subject ? `AND subject = ?` : ""}
      ORDER BY id ${sort === "desc" ? "DESC" : "ASC"}
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
        ${fmtDateField("date_of_acceptance")},
        ${fmtDateField("date_of_rejection")},
        ${fmtDateField("createdAt")},
        ${fmtDateField("updatedAt")}
      FROM ps_tahsil_office_seva
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
      FROM ps_tahsil_office_seva 
      WHERE applicant_mobile = ?
    `;
    return runQuery(pool, q, [mobile]);
  },

  // ============================================
  // SAVE NEW APPLICATION
  // ============================================
  save: (pool, saveData) => {
    const q = `
      INSERT INTO ps_tahsil_office_seva (
        applicant_name,
        applicant_mobile,
        applicant_aadhaar,
        applicant_address,
        subject_id,
        subject,
        uploaded_documents_list,
        registration_status,
        createdAt,
        updatedAt
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, 'PENDING', ?, ?
      )
    `;

    const now = new Date();

    const values = [
      saveData.applicant_name,
      saveData.applicant_mobile,
      saveData.applicant_aadhaar,
      saveData.applicant_address,
      saveData.subject_id,
      saveData.subject,
      JSON.stringify(saveData.uploaded_documents_list || []),
      saveData.createdAt || now,
      saveData.createdAt || now
    ];

    return runQuery(pool, q, values);
  },

  // ============================================
  // UPDATE APPLICATION
  // ============================================
  update: (pool, applicationId, updatedData) => {
    const q = `
      UPDATE ps_tahsil_office_seva SET
        applicant_name = ?,
        applicant_mobile = ?,
        applicant_aadhaar = ?,
        applicant_address = ?,
        subject_id = ?,
        subject = ?,
        uploaded_documents_list = ?,
        updatedAt = NOW()
      WHERE id = ?
    `;

    const values = [
      updatedData.applicant_name,
      updatedData.applicant_mobile,
      updatedData.applicant_aadhaar,
      updatedData.applicant_address,
      updatedData.subject_id,
      updatedData.subject,
      JSON.stringify(updatedData.uploaded_documents_list || []),
      applicationId,
    ];

    return runQuery(pool, q, values);
  },

  // ============================================
  // ACCEPT APPLICATION
  // ============================================
  acceptApplication: (pool, acceptData) => {
    const q = `
      UPDATE ps_tahsil_office_seva
      SET
        registration_status = 'ACCEPTED',
        acceptance_remark = ?,
        date_of_acceptance = NOW(),
        updatedAt = NOW()
      WHERE id = ?
    `;
    return runQuery(pool, q, [acceptData.acceptance_remark, acceptData.id]);
  },

  // ============================================
  // REJECT APPLICATION
  // ============================================
  rejectApplication: (pool, rejectData) => {
    const q = `
      UPDATE ps_tahsil_office_seva
      SET
        registration_status = 'REJECTED',
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
      UPDATE ps_tahsil_office_seva
      SET
        registration_status = 'PENDING',
        acceptance_remark = NULL,
        rejection_remark = NULL,
        date_of_acceptance = NULL,
        date_of_rejection = NULL,
        updatedAt = NOW()
      WHERE id = ?
    `;
    return runQuery(pool, q, [id]);
  },

  // ============================================
  // GET APPLICATIONS BY MONTH & YEAR
  // ============================================
  getByMonthAndYear: (
    pool,
    month,
    year,
    { sort = "asc", status, subject } = {},
  ) => {
    const q = `
            SELECT
            *,
            ${fmtDateField("date_of_acceptance")},
            ${fmtDateField("date_of_rejection")},
            ${fmtDateField("createdAt")},
            ${fmtDateField("updatedAt")}
            FROM ps_tahsil_office_seva
            WHERE MONTH(createdAt) = ?
            AND YEAR(createdAt) = ?
            ${status ? `AND registration_status = ?` : ""}
            ${subject ? `AND subject = ?` : ""}
            ORDER BY createdAt ${sort === "asc" ? "ASC" : "DESC"}
        `;

    const params = [month, year];
    if (status) params.push(status.toUpperCase());
    if (subject) params.push(subject);

    return runQuery(pool, q, params);
  },

  // ============================================
  // GET APPLICATIONS BY FINANCIAL YEAR
  // (1 April → 31 March)
  // ============================================
  getByYearRange: (
    pool,
    fromYear,
    toYear,
    { sort = "asc", status, subject } = {},
  ) => {
    const q = `
        SELECT
        *,
        ${fmtDateField("date_of_acceptance")},
        ${fmtDateField("date_of_rejection")},
        ${fmtDateField("createdAt")},
        ${fmtDateField("updatedAt")}
        FROM ps_tahsil_office_seva
        WHERE createdAt BETWEEN
        STR_TO_DATE(CONCAT(?, '-04-01'), '%Y-%m-%d')
        AND
        STR_TO_DATE(CONCAT(?, '-03-31'), '%Y-%m-%d')
        ${status ? `AND registration_status = ?` : ""}
        ${subject ? `AND subject = ?` : ""}
        ORDER BY createdAt ${sort === "asc" ? "ASC" : "DESC"}
    `;

    const params = [fromYear, toYear];
    if (status) params.push(status.toUpperCase());
    if (subject) params.push(subject);

    return runQuery(pool, q, params);
  },
};

module.exports = tahsilOfficeSevaModel;
