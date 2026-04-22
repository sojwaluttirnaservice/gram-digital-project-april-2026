const { runQuery } = require("../../../utils/runQuery");

const namuna5kPaniModel = {
  // same as that of file namuna5kSamanyaModel.js

  savePayment: async (pool, data) => {
    const pendingAmount =
      data.actual_cash_outstanding - data.deposited_cash_amount;

    const query = `
            INSERT INTO ps_namuna_5k_pani
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

  lastPayment: async (pool, bankId = null) => {
    let query = `
            SELECT *
            FROM ps_namuna_5k_pani
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
            FROM ps_namuna_5k_pani
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
            FROM ps_namuna_5k_pani
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
            FROM ps_namuna_5k_pani
            WHERE ps_bank_details_id_fk = ?
        `;
    return runQuery(pool, query, [bankId]);
  },
};

module.exports = namuna5kPaniModel;
