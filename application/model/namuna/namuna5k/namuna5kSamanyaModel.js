const fmtDateField = require("../../../utils/fmtDateField");
const { runQuery } = require("../../../utils/runQuery");

const namuna5kSamanyaModel = {
  /**
   * Save a payment record
   * @param pool - DB connection pool
   * @param data - Object containing payment details
   * {
   *    ps_bank_details_id_fk,
   *    payment_from_date,
   *    payment_upto_date,
   *    actual_cash_outstanding,
   *    deposited_cash_amount,
   *    receipt_file_name
   * }
   */
  savePayment: async (pool, data) => {
    const pendingAmount =
      data.actual_cash_outstanding - data.deposited_cash_amount;

    const query = `
            INSERT INTO ps_namuna_5k_samanya
                (
                    ps_bank_details_id_fk, 
                    payment_from_date, 
                    payment_upto_date, 
                    actual_cash_outstanding, 
                    deposited_cash_amount, 
                    amount_not_paid, 
                    receipt_file_name
                )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

    const params = [
      data.ps_bank_details_id_fk,
      data.payment_from_date,
      data.payment_upto_date,
      data.actual_cash_outstanding,
      data.deposited_cash_amount,
      pendingAmount,
      data.receipt_file_name || null,
    ];

    return runQuery(pool, query, params);
  },

  /**
   * Get the last payment record (latest by payment_upto_date)
   */
  lastPayment: async (pool, bankId = null) => {
    let query = `
            SELECT *,
            ${fmtDateField("payment_upto_date")}
            FROM ps_namuna_5k_samanya
        `;

    if (bankId) {
      query += ` WHERE ps_bank_details_id_fk = ?`;
    }

    query += ` ORDER BY payment_upto_date DESC LIMIT 1`;

    const params = bankId ? [bankId] : [];
    return runQuery(pool, query, params);
  },

  /**
   * Get all unpaid periods
   * Useful to check which days are pending payment
   */
  getUnpaidPeriods: async (pool, bankId = null) => {
    let query = `
            SELECT *
            FROM ps_namuna_5k_samanya
            WHERE amount_not_paid > 0
        `;

    if (bankId) {
      query += ` AND ps_bank_details_id_fk = ?`;
    }

    query += ` ORDER BY payment_from_date ASC`;

    const params = bankId ? [bankId] : [];
    return runQuery(pool, query, params);
  },

  /**
   * Fetch all payments for a specific bank account
   */
  getPaymentsByBank: async (pool, bankId) => {
    const query = `
            SELECT *
            FROM ps_namuna_5k_samanya
            WHERE ps_bank_details_id_fk = ?
            ORDER BY payment_from_date ASC
        `;
    return runQuery(pool, query, [bankId]);
  },

  /**
   * Fetch total pending amount for a specific bank account
   */
  getTotalPending: async (pool, bankId) => {
    const query = `
            SELECT SUM(amount_not_paid) AS total_pending
            FROM ps_namuna_5k_samanya
            WHERE ps_bank_details_id_fk = ?
        `;
    return runQuery(pool, query, [bankId]);
  },

  //   new for namuna 26 kh
  getNamuna5kMonthWise2: (pool, filters) => {
    let { fromYear, toYear } = filters;

    let fromDate = `${fromYear}-04-01`;
    let toDate = `${toYear}-03-31`;

    let q = `
    SELECT 
        YEAR(payment_upto_date) AS yr,
        MONTH(payment_upto_date) AS mn,
        DATE_FORMAT(payment_upto_date, '%Y-%m') AS ym,

        COALESCE(SUM(actual_cash_outstanding), 0) AS total_outstanding,
        COALESCE(SUM(deposited_cash_amount), 0) AS total_deposited,
        COALESCE(SUM(amount_not_paid), 0) AS total_not_paid

    FROM ps_namuna_5k_samanya

    WHERE payment_upto_date BETWEEN ? AND ?

    GROUP BY YEAR(payment_upto_date), MONTH(payment_upto_date)

    ORDER BY 
      CASE 
        WHEN MONTH(payment_upto_date) >= 4 THEN MONTH(payment_upto_date)
        ELSE MONTH(payment_upto_date) + 12
      END
  `;

    let params = [fromDate, toDate];

    return runQuery(pool, q, params);
  },

  getNamuna5kMonthWise: (pool, filters) => {
  let { fromYear, toYear } = filters;

  let fromDate = `${fromYear}-04-01`;
  let toDate = `${toYear}-03-31`;

  let q = `
    WITH RECURSIVE months AS (
        SELECT DATE(?) AS dt
        UNION ALL
        SELECT DATE_ADD(dt, INTERVAL 1 MONTH)
        FROM months
        WHERE DATE_ADD(dt, INTERVAL 1 MONTH) <= ?
    )

    SELECT 
        YEAR(m.dt) AS yr,
        MONTH(m.dt) AS mn,
        DATE_FORMAT(m.dt, '%Y-%m') AS ym,

        COALESCE(SUM(n.actual_cash_outstanding), 0) AS total_outstanding,
        COALESCE(SUM(n.deposited_cash_amount), 0) AS total_deposited,
        COALESCE(SUM(n.amount_not_paid), 0) AS total_not_paid

    FROM months m

    LEFT JOIN ps_namuna_5k_samanya n
        ON n.payment_upto_date BETWEEN ? AND ?
       AND YEAR(n.payment_upto_date) = YEAR(m.dt)
       AND MONTH(n.payment_upto_date) = MONTH(m.dt)

    GROUP BY yr, mn

    ORDER BY 
      CASE 
        WHEN MONTH(m.dt) >= 4 THEN MONTH(m.dt)
        ELSE MONTH(m.dt) + 12
      END
  `;

  let params = [fromDate, toDate, fromDate, toDate];

  return runQuery(pool, q, params);
},

    getLastRemaining: (pool, filters) => {
    let { fromYear, toYear } = filters;

    let fromDate = `${fromYear}-04-01`;
    let toDate = `${toYear}-03-31`;

    let q = `
        WITH RECURSIVE months AS (
            SELECT DATE(?) AS dt
            UNION ALL
            SELECT DATE_ADD(dt, INTERVAL 1 MONTH)
            FROM months
            WHERE DATE_ADD(dt, INTERVAL 1 MONTH) <= ?
        ),

        ranked AS (
            SELECT 
                t.*,
                ROW_NUMBER() OVER (
                    PARTITION BY YEAR(t.payment_upto_date), MONTH(t.payment_upto_date)
                    ORDER BY t.payment_upto_date DESC, t.id DESC
                ) AS rn
            FROM ps_namuna_5k_samanya t
            WHERE t.payment_upto_date BETWEEN ? AND ?
        )

        SELECT 
            YEAR(m.dt) AS yr,
            MONTH(m.dt) AS mn,
            DATE_FORMAT(m.dt, '%Y-%m') AS ym,
            r.id as has_data,

            COALESCE(r.actual_cash_outstanding, 0) AS actual_cash_outstanding,
            COALESCE(r.deposited_cash_amount, 0) AS deposited_cash_amount,
            COALESCE(r.amount_not_paid, 0) AS amount_not_paid

        FROM months m

        LEFT JOIN ranked r
            ON YEAR(r.payment_upto_date) = YEAR(m.dt)
        AND MONTH(r.payment_upto_date) = MONTH(m.dt)
        AND r.rn = 1

        ORDER BY 
        CASE 
            WHEN MONTH(m.dt) >= 4 THEN MONTH(m.dt)
            ELSE MONTH(m.dt) + 12
        END
    `;

    let params = [fromDate, toDate, fromDate, toDate];

    return runQuery(pool, q, params);
    },
};

module.exports = namuna5kSamanyaModel;
