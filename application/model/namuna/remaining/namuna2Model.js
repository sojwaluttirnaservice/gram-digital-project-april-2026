const { runQuery } = require("../../../utils/runQuery");

const namuna2Model = {
  // =====================
  // LIST (Get all records)
  // =====================
  list: (pool) => {
    let q = `
            SELECT 
                id, month, year,
                income_main_head, income_approved_budget, income_revised_estimate, 
                income_variation, income_remarks,
                expense_main_head, expense_approved_amount, expense_revised_estimate,
                expense_variation, expense_remarks,
                createdAt, updatedAt
            FROM ps_namuna_2
            ORDER BY id DESC
        `;

    return runQuery(pool, q);
  },

  getById: (pool, id) =>{
    let q = `
            SELECT 
                id, month, year,
                income_main_head, income_approved_budget, income_revised_estimate, 
                income_variation, income_remarks,
                expense_main_head, expense_approved_amount, expense_revised_estimate,
                expense_variation, expense_remarks,
                createdAt, updatedAt
            FROM ps_namuna_2 WHERE id = ?
        `;
    return runQuery(pool, q, [id]);
  },

  listByGroup: (pool) => {
  
    let q = `
            SELECT 
                fromYear,
                toYear,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', id,
                        'month', month,
                        'year', year,
                        'income_main_head', income_main_head,
                        'income_approved_budget', income_approved_budget,
                        'income_revised_estimate', income_revised_estimate,
                        'income_variation', income_variation,
                        'income_remarks', income_remarks,
                        'expense_main_head', expense_main_head,
                        'expense_approved_amount', expense_approved_amount,
                        'expense_revised_estimate', expense_revised_estimate,
                        'expense_variation', expense_variation,
                        'expense_remarks', expense_remarks,
                        'createdAt', createdAt,
                        'updatedAt', updatedAt
                    )
                ) AS entries
            FROM (
                SELECT *,
                    CASE 
                        WHEN month >= 4 THEN year       -- April to Dec → same year
                        ELSE year - 1                  -- Jan to March → previous year
                    END AS fromYear,
                    CASE 
                        WHEN month >= 4 THEN year + 1
                        ELSE year
                    END AS toYear
                FROM ps_namuna_2
            ) AS fy
            GROUP BY fromYear, toYear
            ORDER BY fromYear ASC, toYear ASC;
            `;

    return runQuery(pool, q);

  },

  getByYearRange: (pool, fromYear, toYear) => {
    let q = `
            SELECT 
                id, month, year,
                income_main_head, income_approved_budget, income_revised_estimate, 
                income_variation, income_remarks,
                expense_main_head, expense_approved_amount, expense_revised_estimate,
                expense_variation, expense_remarks,
                createdAt, updatedAt
            FROM ps_namuna_2
            WHERE 
                (
                    year = ? AND month >= 4             -- fromYear: April to Dec
                )
                OR
                (
                    year = ? AND month <= 3             -- toYear: Jan to March
                )
                OR
                (
                    year > ? AND year < ?               -- years in between
                )
            ORDER BY year ASC, month ASC
        `;

    return runQuery(pool, q, [fromYear, toYear, fromYear, toYear]);
  },

  // =====================
  // SAVE (Insert new row)
  // =====================
  save: (pool, data) => {
    let q = `
            INSERT INTO ps_namuna_2 
            (
                month, year,
                income_main_head, income_approved_budget, income_revised_estimate,
                income_variation, income_remarks,
                expense_main_head, expense_approved_amount, expense_revised_estimate,
                expense_variation, expense_remarks
            )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
        `;

    let insertArr = [
      data.month,
      data.year,

      data.income_main_head,
      data.income_approved_budget,
      data.income_revised_estimate,
      data.income_variation,
      data.income_remarks,

      data.expense_main_head,
      data.expense_approved_amount,
      data.expense_revised_estimate,
      data.expense_variation,
      data.expense_remarks,
    ];

    return runQuery(pool, q, insertArr);
  },

  // =====================
  // UPDATE
  // =====================
  update: (pool, data) => {
    let q = `
            UPDATE ps_namuna_2 SET
                month = ?,
                year = ?,

                income_main_head = ?,
                income_approved_budget = ?,
                income_revised_estimate = ?,
                income_variation = ?,
                income_remarks = ?,

                expense_main_head = ?,
                expense_approved_amount = ?,
                expense_revised_estimate = ?,
                expense_variation = ?,
                expense_remarks = ?,

                updatedAt = CURRENT_TIMESTAMP
            WHERE id = ?
        `;

    let updateArr = [
      data.month,
      data.year,

      data.income_main_head,
      data.income_approved_budget,
      data.income_revised_estimate,
      data.income_variation,
      data.income_remarks,

      data.expense_main_head,
      data.expense_approved_amount,
      data.expense_revised_estimate,
      data.expense_variation,
      data.expense_remarks,

      data.id,
    ];

    return runQuery(pool, q, updateArr);
  },

  // =====================
  // DELETE
  // =====================
  delete: (pool, id) => {
    let q = `
            DELETE FROM ps_namuna_2
            WHERE id = ?
        `;

    return runQuery(pool, q, [id]);
  },
};

module.exports = namuna2Model;
