const { myDate } = require("../../config/_responderSet");
const { paymentTypesMap } = require("../../data/paymentForOptions");
const { runQuery } = require("../../utils/runQuery");

const paymentPaniReceiptModel = {
  savePaymentDetailsOld: (pool, paymentData) => {
    let q = `INSERT INTO 
            ps_payment_receipt_pani 
                (
                    ps_payment_information_id_fk,

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

    console.log(paymentData);

    let PAYMENT_FOR = paymentData.paymentFor || paymentData.payment_for;

    let insertArr = [
      paymentData.ps_payment_information_id_fk, // ✅ added field

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

      paymentData.payment_for_desc || paymentTypesMap[PAYMENT_FOR],

      [1, 2].includes(+PAYMENT_FOR) ? "TAX" : "CERTIFICATE",

      paymentData.tax_category,
    ];

    return runQuery(pool, q, [insertArr]);
  },

  savePaymentDetails: (pool, paymentData, newWaterVasuliDetails={}) => {
    let q = `INSERT INTO ps_payment_receipt_pani 
        (
            ps_payment_information_id_fk,
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
            tax_category,

            -- Water tax fields
            form_nine_id,
            user_id,
            tpl_lastSpacialWaterTax,
            tpl_currentSpacialWaterTax,
            tpl_totalSpacialWaterTax,
            tpl_lastGenealWaterTax,
            tpl_currentGenealWaterTax,
            tpl_totalGenealWaterTax,
            tpl_totalWaterTax,
            tpl_checkNo,
            tpl_bharnaDate,
            tpl_createdDate
        )
        VALUES 
        (?)`;

    let PAYMENT_FOR = paymentData.paymentFor || paymentData.payment_for;

    let insertArr = [
      paymentData.ps_payment_information_id_fk || null,
      paymentData.personName,
      paymentData.transactionNumber,
      paymentData.check_no || null,
      paymentData.demand_draft_no || null,
      paymentData.rtgs_no || null,
      paymentData.other_id || null,
      paymentData.other_id_name || null,
      paymentData.payment_medium || null,
      paymentData.malmattaNo || 0,
      paymentData.paymentNumber || "0",
      paymentData.amount || 0,
      paymentData.paymentDate || new Date().toISOString().split("T")[0],
      new Date().toLocaleTimeString(),
      PAYMENT_FOR,
      paymentData.reason_in_words || null,
      paymentData.paymentMode || paymentData.payment_mode || 0,
      paymentData.payment_screenshot_image_name || null,
      paymentData.was_paid_by_dharak || null,
      paymentData &&
      typeof paymentData === "object" &&
      Object.prototype.hasOwnProperty.call(paymentData, "approval_status")
        ? "PENDING"
        : null,
      paymentData.approval_date || null,
      paymentData.ps_bank_details_id_fk || null,
      paymentData.payment_for_desc || null,
      [1, 2].includes(+PAYMENT_FOR) ? "TAX" : "CERTIFICATE",
      paymentData.tax_category || null,

      // Water tax fields from newWaterVasuliDetails
      newWaterVasuliDetails.formNineId || 0,
      newWaterVasuliDetails.userId || 0,
      newWaterVasuliDetails.lastSpacialWaterTax || 0,
      newWaterVasuliDetails.currentSpacialWaterTax || 0,
      Number(newWaterVasuliDetails.lastSpacialWaterTax || 0) +
        Number(newWaterVasuliDetails.currentSpacialWaterTax || 0),
      newWaterVasuliDetails.lastGenealWaterTax || 0,
      newWaterVasuliDetails.currentGenealWaterTax || 0,
      Number(newWaterVasuliDetails.lastGenealWaterTax || 0) +
        Number(newWaterVasuliDetails.currentGenealWaterTax || 0),
      newWaterVasuliDetails.finalWaterTax || 0,
      newWaterVasuliDetails.checkNo || null,
      newWaterVasuliDetails.bharnaDate ||
        new Date().toISOString().split("T")[0],
      new Date().toISOString().split("T")[0],
    ];

    return runQuery(pool, q, [insertArr]);
  },

  getAllPaymentsData: (pool) => {
    let q = `SELECT * FROM ps_payment_receipt_pani`;
    return runQuery(pool, q);
  },

  getPaymentByTransactionNumber: (pool, transactionNumber) => {
    let q = `SELECT * FROM ps_payment_receipt_pani WHERE transaction_number = ?`;
    return runQuery(pool, q, [transactionNumber]);
  },

  updatePaymentStatus: (pool, updateStatData) => {
    let q = `UPDATE 
                    ps_payment_receipt_pani
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
    const q = `DELETE FROM ps_payment_receipt_pani WHERE id = ?`;
    return runQuery(pool, q, [paymentId]);
  },

  getPaymentDetailsByPaymentId: (pool, id) => {
    return runQuery(
      pool,
      `SELECT * FROM ps_payment_receipt_pani WHERE id = ?`,
      [+id],
    );
  },
};

module.exports = paymentPaniReceiptModel;
