const { runQuery } = require("../../utils/runQuery");

const nagrikModel = {
  getNagrikList: (pool, filters = {}) => {
    let { month, year, fromYear, toYear } = filters;

    let q = `
        SELECT n.*, 
        DATE_FORMAT(n.fDob, "%d/%m/%Y") as dob
        FROM ps_gp_member_list n
    `;

    let conditions = [];
    let params = [];

    // Month filter (based on createdAt)
    if (month) {
      conditions.push(`MONTH(n.createdAt) = ?`);
      params.push(month);
    }

    // Year filter (based on createdAt)
    if (year) {
      conditions.push(`YEAR(n.createdAt) = ?`);
      params.push(year);
    }

    // Financial year filter (April - March)
    if (fromYear && toYear) {
      conditions.push(`n.createdAt BETWEEN ? AND ?`);
      params.push(`${fromYear}-04-01 00:00:00`);
      params.push(`${toYear}-03-31 23:59:59`);
    }

    if (conditions.length > 0) {
      q += ` WHERE ` + conditions.join(" AND ");
    }

    return runQuery(pool, q, params);
  },

  getById: (pool, id) => {
    const q = `
            SELECT 
                n.*, 
                DATE_FORMAT(n.fDob, "%d/%m/%Y") as dob,
                DATE_FORMAT(n.createdAt, "%d/%m/%Y") as _createdAt
            FROM ps_gp_member_list n
                WHERE n.id = ?`;
    return runQuery(pool, q, [+id]);
  },

  update: (pool, data) => {
    let q = `UPDATE ps_gp_member_list SET
                fName = ?, 
                fAadhar = ?, 
                fMobile = ?,
                fAltMobile = ?, 
                fOccupation = ?,
                fEmail = ?,
                fVillage = ?,
                fBloodGroup = ?,
                fDob = ?,
                fPassword = ?,
                fImage = ?,

                has_aabha_card = ?,
                aabha_card_number = ?,

                has_ayushman_card = ?,
                ayushman_card_number = ?,   
                ayushman_bharat_yojana_name = ?,

                has_downloaded_meri_gram_panchayat_app = ?,
                has_downloaded_panchayat_decision_app = ?,
                has_downloaded_gram_samvad_app = ?,

                createdAt = ?,
                updatedAt = ?

            WHERE id = ?`;

    const now = new Date();

    let updateData = [
      data.fName,
      data.fAadhar,
      data.fMobile,
      data.fAltMobile,
      data.fOccupation,
      data.fEmail,
      data.fVillage,
      data.fBloodGroup,
      data.fDob,
      data.fPassword,
      data.image,

      data.has_aabha_card,
      data.aabha_card_number,

      data.has_ayushman_card,
      data.ayushman_card_number,
      data.ayushman_bharat_yojana_name,

      data.has_downloaded_meri_gram_panchayat_app,
      data.has_downloaded_panchayat_decision_app,
      data.has_downloaded_gram_samvad_app,

      data.createdAt || now,
      now, // updatedAt हमेशा current time

      data.id, // 👉 WHERE id = ?
    ];

    return runQuery(pool, q, updateData);
  },
};

module.exports = nagrikModel;
