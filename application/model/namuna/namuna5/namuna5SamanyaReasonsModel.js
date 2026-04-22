const fmtDateField = require("../../../utils/fmtDateField");
const { runQuery } = require("../../../utils/runQuery");

const namuna5SamanyaReasonsModel = {
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
                main_reason,
                reason_in_words,
                tax_category,
                certificate_category,
                createdAt,
                ${fmtDateField("createdAt")}
            FROM ps_n_5_samanya_reasons
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
                CASE 
                    WHEN tax_category IN ('SAMANYA', 'PANI') THEN main_reason
                    ELSE NULL
                END ASC,
                simple_id ASC
        `;

    return runQuery(pool, q, params);
  },

  getMainReasons: (pool) => {
    let q = `SELECT DISTINCT(main_reason) FROM ps_n_5_samanya_reasons;`;
    return runQuery(pool, q);
  },

  dropdownList: (pool) => {
    let q = `
            SELECT 
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'label', tax_category,
                        'value', tax_category,
                        'mainReasons', main_reasons
                    )
                ) AS data

            FROM (

                SELECT 
                    tax_category,

                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'label', main_reason,
                            'subreasons', subreasons
                        )
                    ) AS main_reasons

                FROM (

                    SELECT 
                        tax_category,
                        main_reason,

                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'value', simple_id,
                                'label', reason_in_words
                            )
                        ) AS subreasons

                    FROM ps_n_5_samanya_reasons
                    GROUP BY tax_category, main_reason

                ) t1

                GROUP BY tax_category

            ) t2;    
                `;
    return runQuery(pool, q);
  },

  // =========================================================
  // SAVE (single insert)
  // =========================================================
  save: (pool, saveData) => {
    let q = `
            INSERT INTO ps_n_5_samanya_reasons
            (simple_id, main_reason, reason_in_words, tax_category, certificate_category)
            VALUES (?, ?, ?, ?, ?)
        `;

    const insertArr = [
      saveData.simple_id || -1, // -2 means it is for other reason
      saveData.main_reason,
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
            UPDATE ps_n_5_samanya_reasons
            SET 
                main_reason = ?,
                reason_in_words = ?,
                tax_category = ?,
                certificate_category = ?,
                updatedAt = CURRENT_TIMESTAMP
            WHERE id = ?
        `;

    const params = [
      updateData.main_reason,
      updateData.reason_in_words,
      updateData.tax_category,
      updateData.certificate_category,
      updateData.id,
    ];

    return runQuery(pool, q, params);
  },
};

module.exports = namuna5SamanyaReasonsModel;
