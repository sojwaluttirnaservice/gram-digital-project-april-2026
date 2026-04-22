const { runQuery } = require("../../utils/runQuery");

const samanyaTransactionModel = {
  creditAmount: (pool, data) => {
    let q = `
        INSERT INTO ps_payment_transactions_samanya (
            ps_bank_details_id_fk,
            before_amount,
            amount,

            type,

            payment_mode,
            after_amount,
            transaction_date
        )
        VALUES (
            ?,
            ?,
            ?,
            'CREDIT',
            ?,
            ?,
            NOW()
        )
    `;

    return runQuery(pool, q, [
        data.ps_bank_details_id_fk,
        data.before_amount,
        data.amount,
        data.payment_mode,

        // derive in here itself
        data.before_amount + data.amount,
    ]);
  },

  debitAmount: (pool, data) => {
    let q = `
        INSERT INTO ps_payment_transactions_samanya (
            ps_bank_details_id_fk,
            before_amount,
            amount,

            type,

            payment_mode,
            debit_main_reason,
            debit_sub_reason,
            after_amount,
            transaction_date
        )
        VALUES (
            ?, ?, ?,
            'DEBIT',
            ?, ?, ?,
            ?, ? 
        )
    `;

    return runQuery(pool, q, [
        data.ps_bank_details_id_fk,
        data.before_amount,
        data.amount,
        data.payment_mode,
        data.debit_main_reason,
        data.debit_sub_reason,
        +data.before_amount - (+data.amount),
        new Date()
    ]);
  },

bankaBalanceAtEachMonthLastRow: (pool, { fromYear, toYear }) => {

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
                PARTITION BY YEAR(t.transaction_date), MONTH(t.transaction_date)
                ORDER BY t.transaction_date DESC, t.id DESC
            ) AS rn
        FROM ps_payment_transactions_samanya t
        WHERE t.transaction_date BETWEEN ? AND ?
    )

    SELECT 
        YEAR(m.dt) AS yr,
        MONTH(m.dt) AS mn,
        DATE_FORMAT(m.dt, '%Y-%m') AS ym,

        COALESCE(r.before_amount, 0) AS before_amount,
        COALESCE(r.amount, 0) AS amount,
        COALESCE(r.after_amount, 0) AS after_amount,
        r.type,
        r.id as has_data,
        r.payment_mode

    FROM months m

    LEFT JOIN ranked r
        ON YEAR(r.transaction_date) = YEAR(m.dt)
       AND MONTH(r.transaction_date) = MONTH(m.dt)
       AND r.rn = 1

    ORDER BY YEAR(m.dt), MONTH(m.dt)
  `;

  let params = [fromDate, toDate, fromDate, toDate];

  return runQuery(pool, q, params);
},
};

module.exports = samanyaTransactionModel;
