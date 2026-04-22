const fmtDateField = require("../../utils/fmtDateField");
const { runQuery } = require("../../utils/runQuery");
const { fmtDateToTimestamp } = require("../../utils/sqlDates");
/**
 * jobCardModel
 * --------------
 * Handles all database operations for MGNREGA Job Card applications
 * stored in the "ps_job_cards" table.
 *
 * Functions:
 * 1. list() - list applications by status
 * 2. getById() - fetch single application by ID
 * 3. save() - insert a new job card application
 * 4. acceptApplication() - approve application
 * 5. rejectApplication() - reject application
 * 6. revokeApplication() - reset status to PENDING
 * 7. getByMonthAndYear() - filter by month & year
 * 8. getByYearRange() - filter by financial year
 * 9. getByJobCardNumber() : based on job card number
 */

const jobCardModel = {
  // ============================================
  // LIST JOB CARD APPLICATIONS BY STATUS
  // ============================================
  list: (pool, { sort = "asc", status = "pending"}) => {
    const q = `
      SELECT
        *,
        ${fmtDateField("date_of_acceptance")},
        ${fmtDateField("date_of_rejection")},
        ${fmtDateField("job_card_issue_date")},
        ${fmtDateField("createdAt")},
        ${fmtDateField("updatedAt")}
      FROM ps_job_cards
      WHERE registration_status = ? 
      ORDER BY createdAt ${sort === "desc" ? "DESC" : "ASC"}
    `;
    return runQuery(pool, q, [status.toUpperCase()]);
  },

  // ============================================
  // GET APPLICATION BY ID
  // ============================================
  getJobCardById: (pool, id) => {
    const q = `
      SELECT
        *,
        ${fmtDateField("date_of_acceptance")},
        ${fmtDateField("date_of_rejection")},
        ${fmtDateField("job_card_issue_date")},
        ${fmtDateField("createdAt")},
        ${fmtDateField("updatedAt")}
      FROM ps_job_cards
      WHERE id = ?
      LIMIT 1
    `;
    return runQuery(pool, q, [id]);
  },

  getFamilyMembersByApplicationId: (pool, applicationId) => {
    const q = `
    SELECT family_members_list 
    FROM ps_job_cards 
    WHERE id = ?
    LIMIT 1
  `;
    return runQuery(pool, q, [applicationId]);
  },

  getJobCardByMobile: (pool, mobile) => {
    return runQuery(
      pool,
      `SELECT * FROM ps_job_cards WHERE applicant_mobile = ?`,
      [mobile]
    );
  },

  // ============================================
  // SAVE NEW APPLICATION
  // ============================================
  saveJobCardApplication: (pool, saveData) => {
    const q = `
      INSERT INTO ps_job_cards (
        family_head_name,
        applicant_name,
        applicant_address,
        applicant_mobile,
        caste_category,
        minority,
        small_farmer,
        general_farmer,
        land_reform_beneficiary,
        indira_awaas_beneficiary,
        aab_yojana_beneficiary,
        rashtriya_swasthya_bima_beneficiary,
        rashtriya_swasthya_bima_no,
        bpl_family,
        bpl_family_no,
        forest_rights_act_2006,
        family_photo_image_name,
        family_head_ration_card_pdf,
        family_members_list,
        registration_status,
        createdAt,
        updatedAt
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING', ?, ?
      )
    `;

    const now = new Date();
    const values = [
      saveData.family_head_name,
      saveData.applicant_name,
      saveData.applicant_address,
      saveData.applicant_mobile,
      saveData.caste_category,
      saveData.minority,
      saveData.small_farmer,
      saveData.general_farmer,
      saveData.land_reform_beneficiary,
      saveData.indira_awaas_beneficiary,
      saveData.aab_yojana_beneficiary,
      saveData.rashtriya_swasthya_bima_beneficiary,
      saveData.rashtriya_swasthya_bima_no,
      saveData.bpl_family,
      saveData.bpl_family_no,
      saveData.forest_rights_act_2006,
      saveData.family_photo_image_name,
      saveData.family_head_ration_card_pdf,
      JSON.stringify(saveData.family_members_list || []),

      saveData.createdAt || now,
      saveData.createdAt || now
    ];
    return runQuery(pool, q, values);
  },

  updateJobCardApplication: (pool, applicationId, updatedData) => {
    const q = `
    UPDATE ps_job_cards SET
      family_head_name = ?,
      applicant_name = ?,
      applicant_address = ?,
      applicant_mobile = ?,
      caste_category = ?,
      minority = ?,
      small_farmer = ?,
      general_farmer = ?,
      land_reform_beneficiary = ?,
      indira_awaas_beneficiary = ?,
      aab_yojana_beneficiary = ?,
      rashtriya_swasthya_bima_beneficiary = ?,
      rashtriya_swasthya_bima_no = ?,
      bpl_family = ?,
      bpl_family_no = ?,
      forest_rights_act_2006 = ?,
      family_photo_image_name = ?,
      family_head_ration_card_pdf = ?,
      family_members_list = ?,
      updatedAt = NOW()
    WHERE id = ?
  `;

    const values = [
      updatedData.family_head_name,
      updatedData.applicant_name,
      updatedData.applicant_address,
      updatedData.applicant_mobile,
      updatedData.caste_category,
      updatedData.minority,
      updatedData.small_farmer,
      updatedData.general_farmer,
      updatedData.land_reform_beneficiary,
      updatedData.indira_awaas_beneficiary,
      updatedData.aab_yojana_beneficiary,
      updatedData.rashtriya_swasthya_bima_beneficiary,
      updatedData.rashtriya_swasthya_bima_no,
      updatedData.bpl_family,
      updatedData.bpl_family_no,
      updatedData.forest_rights_act_2006,
      updatedData.family_photo_image_name,
      updatedData.family_head_ration_card_pdf,
      JSON.stringify(updatedData.family_members_list || []),
      applicationId,
    ];

    return runQuery(pool, q, values);
  },

  // ============================================
  // ACCEPT APPLICATION
  // ============================================
  acceptJobCardApplication: (pool, acceptData) => {
    const q = `
      UPDATE ps_job_cards
      SET
        registration_status = 'ACCEPTED',
        acceptance_remark = ?,
        job_card_number = ?,
        date_of_acceptance = NOW(),
        updatedAt = NOW()
      WHERE id = ?
    `;
    return runQuery(pool, q, [
      acceptData.acceptance_remark,
      acceptData.job_card_number,
      acceptData.id,
    ]);
  },

  // ============================================
  // REJECT APPLICATION
  // ============================================
  rejectJobCardApplication: (pool, rejectData) => {
    const q = `
      UPDATE ps_job_cards
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
  revokeJobCardApplication: (pool, id) => {
    const q = `
      UPDATE ps_job_cards
      SET
        registration_status = 'PENDING',
        job_card_number = NULL,
        acceptance_remark = NULL,
        date_of_acceptance = NULL,
        rejection_remark = NULL,
        date_of_rejection = NULL,
        updatedAt = NOW()
      WHERE id = ?
    `;
    return runQuery(pool, q, [id]);
  },

  // ============================================
  // GET APPLICATIONS BY MONTH & YEAR
  // ============================================
  getByMonthAndYear: (pool, month, year, status = "ACCEPTED") => {
    const q = `
      SELECT
        *,
        ${fmtDateField("date_of_acceptance")},
        ${fmtDateField("date_of_rejection")},
        ${fmtDateField("job_card_issue_date")},
        ${fmtDateField("createdAt")},
        ${fmtDateField("updatedAt")}
      FROM ps_job_cards
      WHERE MONTH(createdAt) = ? AND YEAR(createdAt) = ? AND registration_status = ?
      ORDER BY createdAt ASC 
    `;
    return runQuery(pool, q, [month, year, status]);
  },

  // ============================================
  // GET APPLICATIONS BY FINANCIAL YEAR
  // (1 April → 31 March)
  // ============================================
  getByYearRange: (pool, fromYear, toYear, status = "ACCEPTED") => {
    const q = `
      SELECT
        *,
        ${fmtDateField("date_of_acceptance")},
        ${fmtDateField("date_of_rejection")},
        ${fmtDateField("job_card_issue_date")},
        ${fmtDateField("createdAt")},
        ${fmtDateField("updatedAt")}
      FROM ps_job_cards
      WHERE createdAt BETWEEN
        STR_TO_DATE(CONCAT(?, '-04-01'), '%Y-%m-%d')
      AND
        STR_TO_DATE(CONCAT(?, '-03-31'), '%Y-%m-%d')
    AND registration_status = ?
      ORDER BY createdAt ASC
    `;
    return runQuery(pool, q, [fromYear, toYear, status]);
  },


  getByJobCardNumber: (pool, jobCardNumber) =>{
    return runQuery(pool, `SELECT * FROM ps_job_cards WHERE job_card_number = ?`, [jobCardNumber])
  },

  namuna5EmpDemandList: (pool, empDemandId) =>{
    const q = ``;
    return runQuery(pool, q, [empDemandId])
  }
};

module.exports = jobCardModel;
