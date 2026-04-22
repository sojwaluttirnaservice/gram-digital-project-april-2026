const { runQuery } = require("../../../utils/runQuery");


const namuna5PaniReasonsModel = {
  // =========================================================
  // LIST - SAMANYA FIRST, THEN PANI
  // =========================================================
  list: (pool, filters = {}) => {
        let { tax_category } = filters;

        let params = [];

        let q = `
            SELECT 
                id,
                simple_id,
                simple_id AS payment_for,
                reason_in_words,
                tax_category,
                certificate_category,
                createdAt
            FROM ps_n_5_pani_reasons
            WHERE 1=1
        `;

        // =====================================================
        // FILTER: tax_category
        // =====================================================
        if (tax_category) {
        q += ` AND tax_category = ? `;
        params.push(tax_category);
        }

        // =====================================================
        // SORTING (SAMANYA FIRST, THEN PANI)
        // =====================================================
        q += `
            ORDER BY 
                CASE 
                    WHEN tax_category = 'SAMANYA' THEN 1
                    WHEN tax_category = 'PANI' THEN 2
                    ELSE 3
                END,
                simple_id ASC
        `;

    return runQuery(pool, q, params);
  },


  dropdownList: (pool) =>{
    const q = `
    SELECT 
        tax_category,
        JSON_OBJECTAGG(simple_id, reason_in_words) AS payment_reason
    FROM ps_n_5_pani_reasons
    GROUP BY tax_category
    ORDER BY 
        CASE 
            WHEN tax_category = 'SAMANYA' THEN 1
            WHEN tax_category = 'PANI' THEN 2
            ELSE 3
        END;`

    return runQuery(pool, q);
  },

  // =========================================================
  // SAVE (single insert)
  // =========================================================
  save: (pool, saveData) => {
    let q = `
            INSERT INTO ps_n_5_pani_reasons
            (simple_id, reason_in_words, tax_category, certificate_category)
            VALUES (?, ?, ?, ?)
        `;

    const insertArr = [
      saveData.simple_id || -1, // -2 means it is for other reason
      saveData.reason_in_words,
      saveData.tax_category,
      saveData.certificate_category || "CERTIFICATE",
    ];

    return runQuery(pool, q, insertArr);
  },

  // =========================================================
  // UPDATE (safe + partial)
  // =========================================================
  update: (pool, updateData) => {
    let q = `
            UPDATE ps_n_5_pani_reasons
            SET 
                reason_in_words = ?,
                tax_category = ?,
                certificate_category = ?,
                updatedAt = CURRENT_TIMESTAMP
            WHERE id = ?
        `;

    const params = [
      updateData.reason_in_words,
      updateData.tax_category,
      updateData.certificate_category,
      updateData.id,
    ];

    return runQuery(pool, q, params);
  },
};

module.exports = namuna5PaniReasonsModel;
