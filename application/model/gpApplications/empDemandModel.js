const fmtDateField = require("../../utils/fmtDateField");
const { runQuery } = require("../../utils/runQuery");
const { fmtDateToTimestamp } = require("../../utils/sqlDates");

const empDemandModel = {
  list: (pool, { sort = "asc", status = "pending" }) => {
    const q = `
                SELECT
                igeda.*,
                ${fmtDateField("from_date")} ,
                ${fmtDateField("to_date")} ,
                ${fmtDateField("igeda.createdAt", "_createdAt")},
                ${fmtDateField("igeda.date_of_acceptance", "_date_of_acceptance")},
                ${fmtDateField("igeda.date_of_rejection", "_date_of_rejection")},
            

                jc.family_head_name,
                jc.applicant_name,
                jc.applicant_mobile,
                jc.caste_category,
                jc.job_card_number,
                ${fmtDateField("job_card_issue_date")}

                FROM ps_individual_group_employment_demand_application igeda
                INNER JOIN ps_job_cards jc
                ON igeda.job_card_number_fk = jc.job_card_number

                WHERE igeda.registration_status = ?
                ORDER BY igeda.id ${sort === "desc" ? "DESC" : "ASC"}
            `;

    return runQuery(pool, q, [status.toUpperCase()]);
  },

  empDemandById: (pool, empDemandId) => {
    const q = `
                SELECT
                igeda.*,
                ${fmtDateField("from_date")} ,
                ${fmtDateField("to_date")} ,
                ${fmtDateField("igeda.createdAt", "_createdAt")},
                ${fmtDateField("igeda.date_of_acceptance", "_date_of_acceptance")},
                ${fmtDateField("igeda.date_of_rejection", "_date_of_rejection")},
            

                jc.family_head_name,
                jc.applicant_name,
                jc.applicant_mobile,
                jc.caste_category,
                jc.job_card_number,
                ${fmtDateField("job_card_issue_date")}

                FROM ps_individual_group_employment_demand_application igeda
                INNER JOIN ps_job_cards jc
                ON igeda.job_card_number_fk = jc.job_card_number

                WHERE igeda.id = ?
                ORDER BY igeda.id 
            `;

    return runQuery(pool, q, [empDemandId]);
  },

  checkIfAlreadyApplied: (pool, job_card_number) => {
    const q = `SELECT 
        id,
        job_card_number_fk,
        from_date,
        to_date
      FROM ps_individual_group_employment_demand_application
      WHERE job_card_number_fk = ?
      ORDER BY id DESC
      LIMIT 1;`;

    return runQuery(pool, q, [job_card_number]);
  },

  saveEmpDemandApplication: (pool, data) => {
    const q = `
                INSERT INTO ps_individual_group_employment_demand_application (
                job_card_number_fk,
                from_date,
                to_date,
                family_members_list,
                registration_status,
                createdAt,
                updatedAt
                )
                VALUES (
                ?,
                ?,
                ?,
                ?,
                'PENDING',
                NOW(),
                NOW()
                )
            `;

    const values = [
      data.job_card_number_fk,
      data.from_date, // YYYY-MM-DD (DATEONLY)
      data.to_date, // YYYY-MM-DD (DATEONLY)
      data.family_members_list,
    ];

    return runQuery(pool, q, values);
  },
  acceptEmpDemandApplication: (pool, acceptData) => {
    const q = `
        UPDATE ps_individual_group_employment_demand_application
        SET
        registration_status = 'ACCEPTED',
        acceptance_remark = ?,
        date_of_acceptance = NOW(),
        updatedAt = NOW()
        WHERE id = ?
    `;
    return runQuery(pool, q, [acceptData.acceptance_remark, acceptData.id]);
  },

  rejectEmpDemandApplication: (pool, rejectData) => {
    const q = `
        UPDATE ps_individual_group_employment_demand_application
        SET
        registration_status = 'REJECTED',
        rejection_remark = ?,
        date_of_rejection = NOW(),
        updatedAt = NOW()
        WHERE id = ?
    `;
    return runQuery(pool, q, [rejectData.rejection_remark, rejectData.id]);
  },

  revokeEmpDemandApplication: (pool, id) => {
    const q = `
        UPDATE ps_individual_group_employment_demand_application
        SET
        registration_status = 'PENDING',
        acceptance_remark = NULL,
        date_of_acceptance = NULL,
        rejection_remark = NULL,
        date_of_rejection = NULL,
        updatedAt = NOW()
        WHERE id = ?
    `;
    return runQuery(pool, q, [id]);
  },

  //   namuna5EmpDemandList: (pool, empDemandId) =>{
  //     const q = `SELECT * FROM ps_employment_demand_application_namuna_5
  //             WHERE
  //         ps_individual_group_employment_demand_application_id_fk = ?
  //             ORDER BY id DESC`
  //     return runQuery(pool, q, [empDemandId])
  //   } ,
  namuna5EmpDemandList: (pool, empDemandId) => {
    const q = `
    SELECT
      n5.id,
      n5.ps_individual_group_employment_demand_application_id_fk,

      n5.n5_from_date,
      n5.n5_to_date,
    ${fmtDateField("n5.n5_from_date", "_n5_from_date")} ,
    ${fmtDateField("n5.n5_to_date", "_n5_to_date")},
    ${fmtDateField("n5.print_date", "_print_date")},

      n5.total_days,
      IFNULL(DATE_FORMAT(n5.createdAt, '%d-%m-%Y %h:%i:%s %p'), '') AS _createdAt,

      jc.applicant_name,
      jc.applicant_mobile,
      igeda.job_card_number_fk,

      jc.family_head_name

    FROM ps_employment_demand_application_namuna_5 n5

    INNER JOIN ps_individual_group_employment_demand_application igeda
      ON igeda.id = n5.ps_individual_group_employment_demand_application_id_fk

    LEFT JOIN ps_job_cards jc
      ON jc.job_card_number = igeda.job_card_number_fk

    WHERE n5.ps_individual_group_employment_demand_application_id_fk = ?

    ORDER BY n5.id DESC
  `;

    return runQuery(pool, q, [empDemandId]);
  },

  getEmpDemandN5ById: (pool, n5EmpDemandId) => {
    const q = `
    SELECT
      n5.id,
      n5.ps_individual_group_employment_demand_application_id_fk,

      n5.n5_from_date,
      n5.n5_to_date,
      ${fmtDateField("n5.n5_from_date", "_n5_from_date")} ,
      ${fmtDateField("n5.n5_to_date", "_n5_to_date")} ,

      n5.total_days,
      IFNULL(DATE_FORMAT(n5.createdAt, '%d-%m-%Y %h:%i:%s %p'), '') AS _createdAt,

      jc.applicant_name,
      jc.applicant_mobile,
      jc.family_head_name,

      igeda.job_card_number_fk,
      igeda.from_date,
      igeda.to_date

    FROM ps_employment_demand_application_namuna_5 n5

    INNER JOIN ps_individual_group_employment_demand_application igeda
      ON igeda.id = n5.ps_individual_group_employment_demand_application_id_fk

    LEFT JOIN ps_job_cards jc
      ON jc.job_card_number = igeda.job_card_number_fk

    WHERE n5.id = ?

    LIMIT 1
  `;

    return runQuery(pool, q, [n5EmpDemandId]);
  },

  updateEmpDemandN5PrintDate: (pool, empDemandN5Id) => {
    let q = `UPDATE ps_employment_demand_application_namuna_5 SET print_date = NOW() WHERE id = ?`;
    return runQuery(pool, q, [empDemandN5Id]);
  },

  // ============================================
  // SAVE EMP DEMAND NAMUNA 5
  // ============================================
  saveEmpDemandN5Form: (pool, data) => {
    const q = `
    INSERT INTO ps_employment_demand_application_namuna_5
    (
      ps_individual_group_employment_demand_application_id_fk,
      n5_from_date,
      n5_to_date,
      total_days,
      createdAt,
      updatedAt
    )
    VALUES (?, ?, ?, ?, NOW(), NOW())
  `;

    return runQuery(pool, q, [
      data.ps_individual_group_employment_demand_application_id_fk,
      data.n5_from_date,
      data.n5_to_date,
      data.total_days,
    ]);
  },

  getEmploymentApplicationsByYearRange: (pool, fromYear) => {
    // Financial year: 1 April of fromYear to 31 March of fromYear + 1
    const q = `
    SELECT
      id,
      job_card_number_fk,
      from_date,
      ${fmtDateField('from_date')},
      ${fmtDateField('to_date')},
      to_date,
      family_members_list,

      registration_status,
      acceptance_remark,
      date_of_acceptance,
      rejection_remark,
      date_of_rejection,

      ${fmtDateField("createdAt")},
      ${fmtDateField("updatedAt")},
      createdAt,
      updatedAt

    FROM ps_individual_group_employment_demand_application

    WHERE 
      registration_status = ? AND

      ((YEAR(createdAt) = ? AND MONTH(createdAt) >= 4)
      OR
      (YEAR(createdAt) = ? AND MONTH(createdAt) <= 3))

    ORDER BY createdAt ASC
  `;

    return runQuery(pool, q, ["ACCEPTED", +fromYear, +fromYear + 1]);
  },

  getEmploymentApplicationsByMonthAndYear: (pool, month, year) => {
    const q = `
    SELECT
      id,
      job_card_number_fk,
      from_date,
      to_date,
      ${fmtDateField('from_date')},
      ${fmtDateField('to_date')},
      family_members_list,

      registration_status,
      acceptance_remark,
      date_of_acceptance,
      rejection_remark,
      date_of_rejection,

      ${fmtDateField("createdAt")},
      ${fmtDateField("updatedAt")},
      createdAt,
      updatedAt

    FROM ps_individual_group_employment_demand_application

    WHERE 
      registration_status = ? AND
      MONTH(createdAt) = ? AND YEAR(createdAt) = ?

    ORDER BY createdAt ASC
  `;

    return runQuery(pool, q, ["ACCEPTED", month, year]);
  },
};

module.exports = empDemandModel;
