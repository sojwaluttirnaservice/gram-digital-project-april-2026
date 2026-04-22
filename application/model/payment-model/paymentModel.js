const { myDate } = require("../../config/_responderSet");
const { paymentTypesMap, isPaymentForSamanyaAndCertificates } = require("../../data/paymentForOptions");
const { runQuery } = require("../../utils/runQuery");
const paymentModel = {
  savePaymentDetails: (pool, paymentData) => {
    let q = `INSERT INTO 
            ps_payment_information 
                (
                    recipient_name,
                    transaction_number,

                    check_no,
                    demand_draft_no,
                    rtgs_no,
                    other_id,
                    other_id_name,

                    payment_medium,

                    malmatta_no,

                    payment_number,
                    payment_amount,

                    payment_date,
                    paymet_time, 

                    payment_for, 
                    reason_in_words,
                    payment_mode,
                    payment_screenshot_image_name,

                    was_paid_by_dharak,
                    approval_status,
                    approval_date,
                    ps_bank_details_id_fk,

                    payment_for_desc,
                    payment_type,
                    tax_category
                ) 
                VALUES 
            (?)`;

    console.log(paymentData)

    let PAYMENT_FOR =paymentData.paymentFor || paymentData.payment_for


    // console.log("payment for ======", PAYMENT_FOR)

    let insertArr = [
      paymentData.personName,
      paymentData.transactionNumber,

      paymentData.check_no || null,
      paymentData.demand_draft_no || null,
      paymentData.rtgs_no || null,
      paymentData.other_id || null,
      paymentData.other_id_name || null,

      paymentData.payment_medium,

      paymentData.malmattaNo,

      paymentData.paymentNumber,
      paymentData.amount,

      paymentData.paymentDate || myDate.getDate(),
      myDate.getTime(),

      PAYMENT_FOR,
      paymentData.reason_in_words,
      paymentData.paymentMode || paymentData.payment_mode || 0,
      paymentData.payment_screenshot_image_name,

      paymentData.was_paid_by_dharak || null,
      paymentData &&
      typeof paymentData === "object" &&
      Object.prototype.hasOwnProperty.call(paymentData, "approval_status")
        ? "PENDING"
        : null,
      paymentData.approval_date || null,
      paymentData.ps_bank_details_id_fk || null,

    //   adding new fields here


    // payment for desc value here
    paymentData.payment_for_desc || paymentTypesMap[PAYMENT_FOR],

    [1, 2].includes(+PAYMENT_FOR) ? "TAX": "CERTIFICATE",

    paymentData.tax_category
    ];

    return runQuery(pool, q, [insertArr]);
  },

  // id=malmattaNo
  getAllPaymentsData: (pool) => {
    let q = `SELECT * FROM ps_payment_information`;
    return runQuery(pool, q);
  },

  getPaymentByTransactionNumber: (pool, transactionNumber) => {
    let q = `SELECT * FROM ps_payment_information WHERE transaction_number = ?`;
    return runQuery(pool, q, [transactionNumber]);
  },

  getPendingPayments: (pool, paymentFor) => {
    let params = [];
    let tableSuffix = "";
    if (paymentFor == 1) tableSuffix = "samanya";
    else if (paymentFor == 2) tableSuffix = "pani";
    let q = `
        SELECT 
            p.*, 
            t.form_nine_id, 
            t.user_id 
        FROM 
            ps_payment_information p
        LEFT JOIN 
            ps_tax_payer_list_${tableSuffix} t 
        ON 
            t.ps_payment_information_id_fk = p.id
        WHERE 
            p.approval_status = 'PENDING'`;

    if (paymentFor !== undefined && paymentFor !== null) {
      q += " AND p.payment_for = ?";
      params.push(paymentFor);
    }

    return runQuery(pool, q, params);
  },

  updatePaymentStatus: (pool, updateStatData) => {
    let q = `UPDATE 
                    ps_payment_information
                SET 
                    approval_status = ?
                WHERE 
                    id = ?`;
    return runQuery(pool, q, [
      updateStatData.updatePaymentStatusTo,
      updateStatData.paymentId,
    ]);
  },

  deletePaymentRecord: (pool, paymentId) => {
    const q = `DELETE FROM ps_payment_information WHERE id = ?`;

    return runQuery(pool, q, [paymentId]);
  },
  
  getPaymentDetailsByPaymentId: (pool, id) =>{
    return runQuery(pool, `SELECT * FROM ps_payment_information WHERE id = ?`, [+id])
  }
};

module.exports = paymentModel;
