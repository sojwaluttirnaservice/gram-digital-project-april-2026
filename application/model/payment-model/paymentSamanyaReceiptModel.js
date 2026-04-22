const { myDate } = require("../../config/_responderSet");
const { paymentTypesMap } = require("../../data/paymentForOptions");
const fmtDateField = require("../../utils/fmtDateField");
const { runQuery } = require("../../utils/runQuery");

const paymentSamanyaReceiptModel = {

  savePaymentDetails: (pool, paymentData, newSamanyaVasuliData = {}) => {
    let q = `INSERT INTO ps_payment_receipt_samanya 
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

            -- Tax fields from ps_tax_payer_list_samanya
            form_nine_id,
            user_id,
            tpl_lastBuildingTax,
            tpl_currentBuildingTax,
            tpl_totalBuildingTax,
            tpl_lastDivaTax,
            tpl_currentDivaTax,
            tpl_totalDivaTax,
            tpl_lastArogyaTax,
            tpl_currentArogyaTax,
            tpl_totalArogyaTax,
            tpl_lastCleaningTax,
            tpl_currentCleaningTax,
            tpl_totalCleaningTax,
            tpl_lastFireblegateTax,
            tpl_currentFireblegateTax,
            tpl_totalFireblegateTax,
            tpl_lastTreeTax,
            tpl_currentTreeTax,
            tpl_totalTreeTax,
            tpl_lastEducationTax,
            tpl_currentEducationTax,
            tpl_totalEducationTax,
            tpl_lastTaxFine,
            tpl_lastTaxRelief,
            tpl_totalTax,
            tpl_totalSampurnaTax,
            tpl_bharnaDate,
            tpl_amountInWords,
            payment_id,
            order_id,
            mobile
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
      paymentData.payment_medium,
      paymentData.malmattaNo,
      paymentData.paymentNumber,
      paymentData.amount,
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
      paymentData.payment_for_desc || paymentTypesMap[PAYMENT_FOR],
      [1, 2].includes(+PAYMENT_FOR) ? "TAX" : "CERTIFICATE",
      paymentData.tax_category || null,

      // Tax fields from newSamanyaVasuliData
      newSamanyaVasuliData.formNineId || 0,
      newSamanyaVasuliData.userId || 0,
      newSamanyaVasuliData.lastBuildingTax || 0,
      newSamanyaVasuliData.currentBuildingTax || 0,
      newSamanyaVasuliData.totalBuildingTax || 0,
      newSamanyaVasuliData.lastDivaTax || 0,
      newSamanyaVasuliData.currentDivaTax || 0,
      newSamanyaVasuliData.totalDivaTax || 0,
      newSamanyaVasuliData.lastArogyaTax || 0,
      newSamanyaVasuliData.currentArogyaTax || 0,
      newSamanyaVasuliData.totalArogyaTax || 0,
      newSamanyaVasuliData.lastCleaningTax || 0,
      newSamanyaVasuliData.currentCleaningTax || 0,
      newSamanyaVasuliData.totalCleaningTax || 0,
      newSamanyaVasuliData.lastFireblegateTax || 0,
      newSamanyaVasuliData.currentFireblegateTax || 0,
      newSamanyaVasuliData.totalFireblegateTax || 0,
      newSamanyaVasuliData.lastTreeTax || 0,
      newSamanyaVasuliData.currentTreeTax || 0,
      newSamanyaVasuliData.totalTreeTax || 0,
      newSamanyaVasuliData.lastEducationTax || 0,
      newSamanyaVasuliData.currentEducationTax || 0,
      newSamanyaVasuliData.totalEducationTax || 0,
      newSamanyaVasuliData.lastTaxFine || 0,
      newSamanyaVasuliData.lastTaxRelief || 0,
      newSamanyaVasuliData.totalTax || 0,
      newSamanyaVasuliData.totalSampurnaTax || 0,
      newSamanyaVasuliData.bharnaDate || new Date().toISOString().split("T")[0],
      newSamanyaVasuliData.amountInWords || "",
      newSamanyaVasuliData.payment_id || "-",
      newSamanyaVasuliData.order_id || "-",
      newSamanyaVasuliData.mobile || "-",
    ];

    return runQuery(pool, q, [insertArr]);
  },


  updateStatusById: (pool, {id, newStatus}) =>{
    let q = `UPDATE ps_payment_receipt_samanya 
            SET 
                approval_status = ?
            WHERE 
                id = ?`;
    return runQuery(pool, q, [newStatus, id])
  },

  updateStatusByPaymentInformationId: (pool, {paymentId, newStatus}) =>{
    let q = `UPDATE ps_payment_receipt_samanya 
            SET 
                approval_status = ?
            WHERE 
                ps_payment_information_id_fk = ?`;
    return runQuery(pool, q, [newStatus, paymentId])
  },

  //   getAllPaymentsData: (pool) => {
  //     let q = `SELECT *, ${fmtDateField('payment_date')} FROM ps_payment_receipt_samanya
  //         ORDER BY payment_date, id`;
  //     return runQuery(pool, q);
  //   },

  //   getAllPaymentsData: (pool, options = {}) => {
  //     let { date, month, year, fromYear, toYear } = options;

  //     let params = [];
  //     let conditions = [];
  //     let q = `
  //             SELECT *,
  //             id as collection_id_pk, ${fmtDateField("payment_date")}
  //             FROM ps_payment_receipt_samanya
  //             ORDER BY
  //             payment_date,
  //             CASE
  //                 WHEN payment_type = 'TAX' THEN 1
  //                 WHEN payment_type = 'CERTIFICATE' THEN 2
  //                 ELSE 3
  //             END,
  //             id
  //         `;

  //     /* Financial year filter */
  //     if (fromYear && toYear) {
  //       const fyStart = `${fromYear}-04-01`;
  //       const fyEnd = `${toYear}-03-31`;

  //       conditions.push(`p.createdAt BETWEEN ? AND ?`);
  //       params.push(fyStart, fyEnd);
  //     }

  //     /* Year filter (index friendly) */
  //     if (year) {
  //       const start = `${year}-01-01`;
  //       const end = `${year}-12-31`;

  //       conditions.push(`p.createdAt BETWEEN ? AND ?`);
  //       params.push(start, end);
  //     }

  //     /* Month filter (index friendly) */
  //     if (month) {
  //       const y = year || new Date().getFullYear();
  //       const start = `${y}-${String(month).padStart(2, "0")}-01`;
  //       const end = `${y}-${String(month).padStart(2, "0")}-31`;

  //       conditions.push(`p.createdAt BETWEEN ? AND ?`);
  //       params.push(start, end);
  //     }

  //     /* Exact date filter */
  //     if (date) {
  //       conditions.push(`p.createdAt = ?`);
  //       params.push(date);
  //     }

  //     /* Apply conditions */
  //     if (conditions.length > 0) {
  //       q += " WHERE " + conditions.join(" AND ");
  //     }

  //     return runQuery(pool, q, params);
  //   },

  getAllPaymentsData: (pool, options = {}) => {
    let { date, month, year, fromYear, toYear } = options;

    let params = [];
    let conditions = [];

    let q = `
    SELECT 
      *,
      p.id AS collection_id_pk,
      ${fmtDateField("payment_date")},
      ${fmtDateField('createdAt')}
    FROM ps_payment_receipt_samanya p
  `;

    /* ✅ Priority-based filtering (ONLY ONE लागू होईल) */

    // 1. Exact Date (highest priority)
    if (date) {
      conditions.push(`p.createdAt = ?`);
      params.push(date);
    }

    // 2. Month + Year
    else if (month && year) {
      const start = `${year}-${String(month).padStart(2, "0")}-01`;
      const end = `${year}-${String(month).padStart(2, "0")}-31`;

      conditions.push(`p.createdAt BETWEEN ? AND ?`);
      params.push(start, end);
    }

    // 3. Financial Year
    else if (fromYear && toYear) {
      const fyStart = `${fromYear}-04-01`;
      const fyEnd = `${toYear}-03-31`;

      conditions.push(`p.createdAt BETWEEN ? AND ?`);
      params.push(fyStart, fyEnd);
    }

    // 4. Full Year
    else if (year) {
      const start = `${year}-01-01`;
      const end = `${year}-12-31`;

      conditions.push(`p.createdAt BETWEEN ? AND ?`);
      params.push(start, end);
    }

    /* ✅ Apply WHERE */
    if (conditions.length > 0) {
      q += " WHERE " + conditions.join(" AND ");
    }

    /* ✅ ORDER BY always last */
    q += `
    ORDER BY 
      p.createdAt ASC,
      CASE 
        WHEN p.payment_type = 'TAX' THEN 1
        WHEN p.payment_type = 'CERTIFICATE' THEN 2
        ELSE 3
      END,
      p.id ASC
  `;

    return runQuery(pool, q, params);
  },

  getPaymentByTransactionNumber: (pool, transactionNumber) => {
    let q = `SELECT * FROM ps_payment_receipt_samanya WHERE transaction_number = ?`;
    return runQuery(pool, q, [transactionNumber]);
  },

  updatePaymentStatus: (pool, updateStatData) => {
    let q = `UPDATE 
                    ps_payment_receipt_samanya
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
    const q = `DELETE FROM ps_payment_receipt_samanya WHERE id = ?`;
    return runQuery(pool, q, [paymentId]);
  },

  getPaymentDetailsByPaymentId: (pool, id) => {
    return runQuery(
      pool,
      `SELECT * FROM ps_payment_receipt_samanya WHERE id = ?`,
      [+id],
    );
  },


  getOnlinePaymentMonthWise: (pool, filters) => {
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

        COALESCE(SUM(p.payment_amount), 0) AS total_online_amount

    FROM months m

    LEFT JOIN ps_payment_receipt_samanya p
        ON p.payment_mode = 1
       AND p.createdAt BETWEEN ? AND ?
       AND YEAR(p.createdAt) = YEAR(m.dt)
       AND MONTH(p.createdAt) = MONTH(m.dt)
       AND (p.approval_status = 'APPROVED' OR p.approval_status IS NULL)

    GROUP BY yr, mn
    ORDER BY yr, mn
  `;

    let params = [fromDate, toDate, fromDate, toDate];

    return runQuery(pool, q, params);
  },
};

module.exports = paymentSamanyaReceiptModel;
