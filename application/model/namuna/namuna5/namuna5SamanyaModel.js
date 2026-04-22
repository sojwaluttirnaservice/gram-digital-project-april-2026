const fmtDateField = require("../../../utils/fmtDateField");
const { runQuery } = require("../../../utils/runQuery");

const namuna5ExpenditureSamanyaModel = {
  list: (pool, options = {}) => {

    let { date, month, year, fromYear, toYear} = options;

    let params = [];
    let conditions = [];

    let q = `
        SELECT 
                ps_bank_details_id_fk,
                payment_date,
                ${fmtDateField('payment_date')},
                available_account_balance,
                remaining_account_balance,
                amount_spent,
                check_no,
                voucher_number,
                payment_reciever,
                main_reason,
                reason_of_expenditure,
                ledger_title,
                receipt_file_name 
        FROM 
            ps_n_5_expenditure_samanya p
    `;

    if (fromYear && toYear) {
        const fyStart = `${fromYear}-04-01`;
        const fyEnd = `${toYear}-03-31`;

        conditions.push(`p.createdAt BETWEEN ? AND ?`);
        params.push(fyStart, fyEnd);
    }


        /* Year filter (index friendly) */
    if (year) {
        const start = `${year}-01-01`;
        const end = `${year}-12-31`;

        conditions.push(`p.createdAt BETWEEN ? AND ?`);
        params.push(start, end);
    }

    /* Month filter (index friendly) */
    if (month) {
        const y = year || new Date().getFullYear();
        const start = `${y}-${String(month).padStart(2, "0")}-01`;
        const end = `${y}-${String(month).padStart(2, "0")}-31`;

        conditions.push(`p.createdAt BETWEEN ? AND ?`);
        params.push(start, end);
    }

        /* Exact date filter */
    if (date) {
      conditions.push(`p.createdAt = ?`);
      params.push(date);
    }

    if (conditions.length > 0) {
      q += " WHERE " + conditions.join(" AND ");
    }

    return runQuery(pool, q, params)
  },

  save: (pool, data) => {
    const q = `
      INSERT INTO ps_n_5_expenditure_samanya (
        ps_bank_details_id_fk,
        payment_date,
        available_account_balance,
        remaining_account_balance,
        amount_spent,
        check_no,
        voucher_number,
        payment_reciever,
        main_reason,
        reason_of_expenditure,
        ledger_title,
        receipt_file_name
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const insertArr = [
      data.ps_bank_details_id_fk,
      data.payment_date,
      data.available_account_balance,
      data.remaining_account_balance,
      data.amount_spent,
      data.check_no || null,
      data.voucher_number,
      data.payment_reciever,
      data.main_reason,
      data.reason_of_expenditure,
      data.ledger_title,
      data.receipt_file_name || null,
    ];

    return runQuery(pool, q, insertArr);
  },

// getLastRemaining: (pool, filters) => {
//   let { fromYear, toYear } = filters;

//   let fromDate = `${fromYear}-04-01`;
//   let toDate = `${toYear}-03-31`;

//   let q = `
//     WITH RECURSIVE months AS (
//         SELECT DATE(?) AS dt
//         UNION ALL
//         SELECT DATE_ADD(dt, INTERVAL 1 MONTH)
//         FROM months
//         WHERE DATE_ADD(dt, INTERVAL 1 MONTH) <= ?
//     ),

//     last_rows AS (
//         SELECT 
//             t.*,
//             ROW_NUMBER() OVER (
//                 PARTITION BY YEAR(t.payment_date), MONTH(t.payment_date)
//                 ORDER BY t.payment_date DESC, t.id DESC
//             ) as rn
//         FROM ps_n_5_expenditure_samanya t
//         WHERE t.payment_date BETWEEN ? AND ?
//     )

//     SELECT 
//         YEAR(m.dt) AS yr,
//         MONTH(m.dt) AS mn,
//         DATE_FORMAT(m.dt, '%Y-%m') AS ym,

//         lr.ps_bank_details_id_fk,
//         lr.payment_date,
//         lr.available_account_balance,
//         lr.remaining_account_balance,
//         lr.amount_spent,
//         lr.check_no,
//         lr.voucher_number,
//         lr.payment_reciever,
//         lr.main_reason,
//         lr.reason_of_expenditure,
//         lr.ledger_title,
//         lr.receipt_file_name

//     FROM months m

//     LEFT JOIN last_rows lr
//         ON YEAR(lr.payment_date) = YEAR(m.dt)
//        AND MONTH(lr.payment_date) = MONTH(m.dt)
//        AND lr.rn = 1

//     ORDER BY yr, mn
//   `;

//   let params = [fromDate, toDate, fromDate, toDate];

//   return runQuery(pool, q, params);
// },
};

module.exports = namuna5ExpenditureSamanyaModel;
