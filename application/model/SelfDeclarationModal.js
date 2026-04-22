var responderSet = require("../config/_responderSet");
const fmtDateField = require("../utils/fmtDateField");
const { runQuery } = require("../utils/runQuery");
let myDates = responderSet.myDate;

module.exports = {
  getMainList: (pool, cert = "") => {
    const q = `
      SELECT *,
      ${fmtDateField("familySeparationDate")},
      ${fmtDateField("husbandDeathDate")},
      ${fmtDateField("desertedSinceDate")}
      
      
      FROM ps_self_diclaration
      
      ${cert ? "WHERE certificateType = ?" : ""}
      ORDER BY id DESC
    `;
    let params = [];
    if (cert) {
      params.push(cert);
    }
    return runQuery(pool, q, params);
  },

  getMainListByCertificates: (pool, fromYear, toYear) => {
    let q = `SELECT
        create_date AS date,
        ${fmtDateField("create_date")},

        REPLACE(
            IFNULL(NULLIF(certificateType, ''), 'रहिवासी_प्रमाणपत्र'),
            '_',
            ' '
        ) AS serviceName,

        'Online' AS serviceMode,

        COUNT(*) AS totalApplications

    FROM ps_self_diclaration

    WHERE
        (
            (MONTH(create_date) >= 4 AND YEAR(create_date) = ?)
            OR
            (MONTH(create_date) <= 3 AND YEAR(create_date) = ?)
        )

    GROUP BY
        create_date,
        IFNULL(NULLIF(certificateType, ''), 'रहिवासी_प्रमाणपत्र')

    ORDER BY
        create_date ASC,
        serviceName ASC;
    `;

    return runQuery(pool, q, [fromYear, toYear]);
  },
  getMainListByCertificatesByMonthYear: (pool, month, year) => {
    let q = `
    SELECT
        create_date AS date,
        ${fmtDateField("create_date")},

        MONTH(create_date) AS month,
        YEAR(create_date) AS year,

        REPLACE(
            IFNULL(NULLIF(certificateType, ''), 'रहिवासी_प्रमाणपत्र'),
            '_',
            ' '
        ) AS serviceName,

        'Online' AS serviceMode,

        COUNT(*) AS totalApplications

    FROM ps_self_diclaration

    WHERE
        MONTH(create_date) = ?
        AND YEAR(create_date) = ?

    GROUP BY
        YEAR(create_date),
        MONTH(create_date),
        create_date,
        IFNULL(NULLIF(certificateType, ''), 'रहिवासी_प्रमाणपत्र')

    ORDER BY
        create_date ASC,
        serviceName ASC;
  `;

    return runQuery(pool, q, [month, year]);
  },

  getById: (pool, id) => {
    const q = `
      SELECT *,
       ${fmtDateField("familySeparationDate")},
       ${fmtDateField("husbandDeathDate")},
       ${fmtDateField("desertedSinceDate")}
      FROM ps_self_diclaration
      WHERE id = ?
    `;
    return runQuery(pool, q, [Number(id)]);
  },

  addNewSelfDeclaration: (pool, data) => {
    const q = `
      INSERT INTO ps_self_diclaration (
        sd_applicantFullSelfNameE,
        sd_applicantFullSelfNameM,
        sd_applicantFullParentNameE,
        sd_applicantFullParentNameM,
        sd_applicantRelation,
        sd_applicantAadharE,
        sd_applicantAadharM,
        sd_applicantAgeE,
        sd_applicantAgeM,
        sd_applicantGender,
        sd_applicantOccupationE,
        sd_applicantOccupationM,
        sd_applicantResidency,
        sd_applicantAddressE,
        sd_applicantAddressM,
        sd_applicantVillage,
        sd_applicantTaluka,
        sd_applicantState,
        sd_user_image,
        create_date,
        create_time
      ) VALUES (?)
    `;

    const insert = [
      data.applicantFullSelfNameE,
      data.applicantFullSelfNameM,
      data.applicantFullParentNameE,
      data.applicantFullParentNameM,
      data.applicantRelation,
      data.applicantAadharE,
      data.applicantAadharM,
      data.applicantAgeE,
      data.applicantAgeM,
      data.applicantGender,
      data.applicantOccupationE,
      data.applicantOccupationM,
      data.applicantResidency,
      data.applicantAddressE,
      data.applicantAddressM,
      data.applicantVillage,
      data.applicantTaluka,
      data.applicantState,
      data.file_name,
      myDates.getDate(),
      myDates.getTime(),
    ];

    return runQuery(pool, q, [insert]);
  },

  //   saveResidentialSelfDeclaration: (pool, data) => {
  //     return insertSelfDeclaration(pool, data);
  //   },

  //   saveUnemploymentSelfDeclaration: (pool, data) => {
  //     console.log(data)
  //     return insertSelfDeclaration(pool, data);
  //   },

  insertSelfDeclaration: (pool, data) => {
    const q = `
    INSERT INTO ps_self_diclaration (
      certificateType,

      sd_applicantFullSelfNameE,
      sd_applicantFullSelfNameM,

      sd_applicantFullParentNameE,
      sd_applicantFullParentNameM,

      sd_applicantRelation,

      sd_applicantAadharE,
      sd_applicantAadharM,

      sd_applicantAgeE,
      sd_applicantAgeM,

      sd_applicantGender,

      sd_applicantOccupationE,
      sd_applicantOccupationM,

      sd_applicantResidency,

      sd_applicantAddressE,
      sd_applicantAddressM,

      sd_applicantVillage,
      sd_applicantTaluka,
      sd_applicantState,

      sd_user_image,

      mobile,

      applicationSubject,
      certificateReason,
      applicantSignature,

      documents,

      residingFromYear,
      yearsOfResidence,

      electricityHomeType,
      familySeparationDate,

      occupationPlaceOwnership,
      occupationName,
      occupationType,

      ppoNumber,

      misspelledNameM,
      misspelledNameE,

      correctNameM,
      correctNameE,

      husbandNameM,
      husbandNameE,

      husbandDeathDate,

      desertedSinceDate,
      



      create_date,
      create_time
    ) VALUES ?
  `;

    const insertData = [
      // ==== COMMON ====
      data.certificateType ?? null,

      // ==== NAME ====
      data.applicantFullSelfNameE ?? null,
      data.applicantFullSelfNameM ?? null,

      data.applicantFullParentNameE ?? null,
      data.applicantFullParentNameM ?? null,

      data.applicantRelation ?? null,

      // ==== AADHAR ====
      data.applicantAadharE ?? null,
      data.applicantAadharM ?? null,

      // ==== AGE ====
      data.applicantAgeE ?? null,
      data.applicantAgeM ?? null,

      // ==== GENDER ====
      data.applicantGender ?? null,

      // ==== OCCUPATION ====
      data.applicantOccupationE ?? null,
      data.applicantOccupationM ?? null,

      // ==== RESIDENCY TEXT ====
      data.applicantResidency ?? null,

      // ==== ADDRESS ====
      data.applicantAddressE ?? null,
      data.applicantAddressM ?? null,

      data.applicantVillage ?? null,
      data.applicantTaluka ?? null,
      data.applicantState ?? null,

      // ==== IMAGE ====
      data.file_name ?? null, // legacy key → sd_user_image

      // ==== CONTACT ====
      data.mobile ?? null,

      // ==== CERTIFICATE COMMON ====
      data.applicationSubject ?? null,
      data.certificateReason ?? null,
      data.applicantSignature ?? null,

      // ==== DOCUMENTS ====
      JSON.stringify(data.documents ?? []),

      // ==== RESIDENTIAL / COMMON ====
      data.residingFromYear ?? null,
      data.yearsOfResidence ?? null,

      // ==== ELECTRICITY NOC ====
      data.electricityHomeType ?? null,

      // ==== NUCLEAR FAMILY ====
      data.familySeparationDate ?? null,

      // ==== OCCUPATION NOC ====
      data.occupationPlaceOwnership ?? null,
      data.occupationName ?? null,
      data.occupationType ?? null,

      // ==== LIFE CERTIFICATE ====
      data.ppoNumber ?? null,

      data.misspelledNameM,
      data.misspelledNameE,

      data.correctNameM,
      data.correctNameE,

      data.husbandNameM,
      data.husbandNameE,

      data.husbandDeathDate,

      data.desertedSinceDate,
      // ==== META ====
      myDates.getDate(),
      myDates.getTime(),
    ];

    return runQuery(pool, q, [[insertData]]);
  },

  deleteSelfDeclaration: (pool, id) => {
    const q = `
      DELETE FROM ps_self_diclaration
      WHERE id = ?
    `;
    return runQuery(pool, q, [Number(id.id)]);
  },
};
