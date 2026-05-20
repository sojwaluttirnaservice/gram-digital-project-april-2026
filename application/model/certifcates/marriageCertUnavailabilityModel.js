const fmtDateField = require("../../utils/fmtDateField");
const { runQuery } = require("../../utils/runQuery");

const marriageCertUnavailabilityModel = {

      getList: (pool, filters = {}) => {

        const {
            month,
            year,
            fromYear,
            toYear,
        } = filters

        let conditions = []
        let params = []


        /* =====================================================
            MONTH + YEAR FILTER (INDEX FRIENDLY)
        ===================================================== */

        if (month && year) {

            let startDate =
                new Date(year, month - 1, 1)

            let endDate =
                new Date(year, month, 0)

            conditions.push(`
                date_of_issue >= ?
                AND date_of_issue <= ?
            `)

            params.push(
                startDate.toISOString().split("T")[0],
                endDate.toISOString().split("T")[0]
            )
        }


        /* =====================================================
            FINANCIAL YEAR FILTER
        ===================================================== */

        else if (fromYear && toYear) {

            conditions.push(`
                date_of_issue >= ?
                AND date_of_issue <= ?
            `)

            params.push(
                `${fromYear}-04-01`,
                `${toYear}-03-31`
            )
        }


        /* =====================================================
            WHERE CLAUSE
        ===================================================== */

        const whereClause =
            conditions.length
                ? `WHERE ${conditions.join(" AND ")}`
                : ""


        /* =====================================================
            QUERY
        ===================================================== */

        const q = `
            SELECT
                *,

                ${fmtDateField("date_of_registration")},
                ${fmtDateField("date_of_checking")},
                ${fmtDateField("date_of_issue")},
                ${fmtDateField("createdAt")},
                ${fmtDateField("updatedAt")}

            FROM ps_marriage_cert_unavailability_certificates

            ${whereClause}

            ORDER BY
                date_of_issue DESC,
                id ASC
        `

        return runQuery(pool, q, params)
    },

  getCertificate: (pool, id) => {

    const q = `
      SELECT *,
        ${fmtDateField("date_of_registration")},
        ${fmtDateField("date_of_issue")},
        ${fmtDateField("date_of_checking")},
        ${fmtDateField("createdAt")},
        ${fmtDateField("updatedAt")}
      FROM ps_marriage_cert_unavailability_certificates
      WHERE id = ?
    `;

    return runQuery(pool, q, [+id]);
  },

  addCertificate: (pool, data) => {

    const q = `
      INSERT INTO ps_marriage_cert_unavailability_certificates (

        outgoing_no,

        name,
        name_m,

        adhar,
        adhar_m,

        mobile,
        mobile_m,

        address,
        address_m,

        taluka,
        taluka_m,

        dist,
        dist_m,

        gender,
        gender_m,

        date_of_checking,
        date_of_checking_m,

        remarks,
        remarks_m,

        date_of_registration,
        date_of_registration_m,

        date_of_issue

      )
      VALUES (?)
    `;

    const insertData = [

      data.outgoing_no || "",

      data.name || "",
      data.name_m || "",

      data.adhar || "",
      data.adhar_m || "",

      data.mobile || "",
      data.mobile_m || "",

      data.address || "",
      data.address_m || "",

      data.taluka || "",
      data.taluka_m || "",

      data.dist || "",
      data.dist_m || "",

      data.gender || "",
      data.gender_m || "",

      data.date_of_checking || "",
      data.date_of_checking_m || "",

      data.remarks || "",
      data.remarks_m || "",

      data.date_of_registration || "",
      data.date_of_registration_m || "",

      data.date_of_issue || "",

    ];

    return runQuery(pool, q, [insertData]);
  },

  updateCertificate: (pool, data) => {

    const q = `
      UPDATE ps_marriage_cert_unavailability_certificates
      SET

        outgoing_no = ?,

        name = ?,
        name_m = ?,

        adhar = ?,
        adhar_m = ?,

        mobile = ?,
        mobile_m = ?,

        address = ?,
        address_m = ?,

        taluka = ?,
        taluka_m = ?,

        dist = ?,
        dist_m = ?,

        gender = ?,
        gender_m = ?,

        date_of_checking = ?,
        date_of_checking_m = ?,

        remarks = ?,
        remarks_m = ?,

        date_of_registration = ?,
        date_of_registration_m = ?,

        date_of_issue = ?,

        updatedAt = CURRENT_TIMESTAMP

      WHERE id = ?
    `;

    const updateData = [

      data.outgoing_no || "",

      data.name || "",
      data.name_m || "",

      data.adhar || "",
      data.adhar_m || "",

      data.mobile || "",
      data.mobile_m || "",

      data.address || "",
      data.address_m || "",

      data.taluka || "",
      data.taluka_m || "",

      data.dist || "",
      data.dist_m || "",

      data.gender || "",
      data.gender_m || "",

      data.date_of_checking || "",
      data.date_of_checking_m || "",

      data.remarks || "",
      data.remarks_m || "",

      data.date_of_registration || "",
      data.date_of_registration_m || "",

      data.date_of_issue || "",

      data.id

    ];

    return runQuery(pool, q, updateData);
  },

  deleteCertificate: (pool, id) => {

    const q = `
      DELETE FROM ps_marriage_cert_unavailability_certificates
      WHERE id = ?
    `;

    return runQuery(pool, q, [+id]);
  },

};

module.exports = marriageCertUnavailabilityModel;