const { runQuery } = require("../../utils/runQuery");

const TaxPaymentModel = {
  isTaxPaid: function (pool, malmattaNo) {
    // console.log(malmattaNo, 'in model malmatatano ----er-e')
    const query = `SELECT total_tax as pending_amount 

                      FROM ps_form_eight_total_taxation  
                      WHERE user_id = (SELECT id FROM ps_form_eight_user 
                      WHERE feu_malmattaNo = ?)`;

    const query2 = `SELECT totalWaterTax, totalSampurnaTax, user_id
                      FROM ps_form_nine_form 
                      WHERE user_id = (SELECT distinct id FROM ps_form_eight_user 
                      WHERE feu_malmattaNo = ?) limit 1`;

    return runQuery(pool, query2, [malmattaNo]);
  },

  /**
   * Fetch payment details from `ps_payment_information`
   * with conditional LEFT JOIN based on `paymentFor`.
   *
   * JOIN Behavior:
   *  - If `paymentFor === 2`
   *      → LEFT JOIN `ps_tax_payer_list_pani`
   *      → Returns explicit water tax fields
   *
   *  - For all other values
   *      → LEFT JOIN `ps_tax_payer_list_samanya`
   *      → Returns explicit samanya tax fields
   *
   * The join is NULL-safe:
   *  - If a matching record exists in the respective tax table,
   *    joined fields will be populated.
   *  - If no matching record exists, joined fields will be NULL.
   *
   * Supports:
   *  - Optional filtering by single or multiple payment types
   *  - Optional filtering by financial year (April–March)
   *  - Explicit column selection (no wildcard selection from joined tables)
   *
   * @function getPaymentDetails
   *
   * @param {Object} pool
   *        Database connection pool instance.
   *
   * @param {number|number[]} [paymentFor=-1]
   *        Payment type(s) to filter:
   *          - -1 (default): fetch all payment types
   *          - 2: joins `ps_tax_payer_list_pani`
   *          - any other number: joins `ps_tax_payer_list_samanya`
   *          - number[]: multiple payment types (filter applied,
   *                      but join logic follows single-value condition)
   *
   * @param {Object} [options={}]
   *        Optional filter object.
   *
   * @param {number} [options.fromYear]
   *        Financial year start.
   *        Example: 2023 → 2023-04-01
   *
   * @param {number} [options.toYear]
   *        Financial year end.
   *        Example: 2024 → 2024-03-31
   *
   * @returns {Promise<Array<Object>>}
   *          Resolves to an array of payment records.
   *
   *          Each record contains:
   *            - All fields from `ps_payment_information`
   *            - Explicitly selected tax fields from:
   *                • `ps_tax_payer_list_pani` (if paymentFor === 2)
   *                OR
   *                • `ps_tax_payer_list_samanya` (otherwise)
   *
   * @example
   * // Fetch all payments (joins samanya by default)
   * getPaymentDetails(pool);
   *
   * @example
   * // Fetch only water tax payments (payment_for = 2)
   * getPaymentDetails(pool, 2);
   *
   * @example
   * // Fetch samanya payments for FY 2023–2024
   * getPaymentDetails(pool, 1, { fromYear: 2023, toYear: 2024 });
   *
   * @example
   * // Fetch multiple types (filter applied)
   * getPaymentDetails(pool, [1, 2]);
   *
   * @note
   * When `paymentFor` is an array containing multiple types,
   * the filter applies correctly, but the JOIN table is determined
   * by the conditional logic in the implementation.
   * If multi-table joins are required simultaneously,
   * the query must be refactored using UNION or multiple LEFT JOINs.
   */

  //   new version of below getPaymentDetails
  getPaymentDetails: function (pool, paymentFor = -1, options = {}) {
    const { fromYear, toYear } = options || {};

    let query = "";
    let params = [];
    let conditions = [];

    if (paymentFor === 2) {
      query = `
        SELECT 
            p.*,

            -- Rename primary key
            pani.id AS pani_id,

            -- Core references
            pani.form_nine_id,
            pani.user_id,

            -- Special Water Tax
            pani.tpl_lastSpacialWaterTax,
            pani.tpl_currentSpacialWaterTax,
            pani.tpl_totalSpacialWaterTax,

            -- General Water Tax
            pani.tpl_lastGenealWaterTax,
            pani.tpl_currentGenealWaterTax,
            pani.tpl_totalGenealWaterTax,

            -- Totals
            pani.tpl_totalWaterTax,

            -- Dates
            pani.created_date AS pani_created_date,
            pani.tpl_bharnaDate,

            -- Payment Info
            pani.checkNo,
            pani.ps_payment_information_id_fk

        FROM ps_payment_information p
        LEFT JOIN ps_tax_payer_list_pani pani
            ON pani.ps_payment_information_id_fk = p.id
    `;
    } else {
      query = `
        SELECT 
            p.*,

            -- Rename primary key
            samanya.id AS samanya_id,

            -- Core references
            samanya.form_nine_id,
            samanya.user_id,

            -- Building Tax
            samanya.tpl_lastBuildingTax,
            samanya.tpl_currentBuildingTax,
            samanya.tpl_totalBuildingTax,

            -- Diva Tax
            samanya.tpl_lastDivaTax,
            samanya.tpl_currentDivaTax,
            samanya.tpl_totalDivaTax,

            -- Arogya Tax
            samanya.tpl_lastArogyaTax,
            samanya.tpl_currentArogyaTax,
            samanya.tpl_totalArogyaTax,

            -- Cleaning Tax
            samanya.tpl_lastCleaningTax,
            samanya.tpl_currentCleaningTax,
            samanya.tpl_totalCleaningTax,

            -- Fire Brigade Tax
            samanya.tpl_lastFireblegateTax,
            samanya.tpl_currentFireblegateTax,
            samanya.tpl_totalFireblegateTax,

            -- Tree Tax
            samanya.tpl_lastTreeTax,
            samanya.tpl_currentTreeTax,
            samanya.tpl_totalTreeTax,

            -- Education Tax
            samanya.tpl_lastEducationTax,
            samanya.tpl_currentEducationTax,
            samanya.tpl_totalEducationTax,

            -- Fine & Relief
            samanya.tpl_lastTaxFine,
            samanya.tpl_lastTaxRelief,

            -- Totals
            samanya.tpl_totalTax,
            samanya.tpl_totalSampurnaTax,

            -- Dates
            samanya.created_date AS samanya_created_date,
            samanya.tpl_bharnaDate,

            -- Payment Info
            samanya.tpl_amountInWords,
            samanya.payment_id AS samanya_payment_id,
            samanya.order_id AS samanya_order_id,
            samanya.mobile AS samanya_mobile,
            samanya.checkNo,

            -- Misc
            samanya.ps_tax_payer_list_samanyacol,
            samanya.ps_payment_information_id_fk

        FROM ps_payment_information p
        LEFT JOIN ps_tax_payer_list_samanya samanya
            ON samanya.ps_payment_information_id_fk = p.id
    `;
    }
    if (paymentFor !== -1) {
      if (Array.isArray(paymentFor)) {
        if (paymentFor.length === 0) {
          return Promise.resolve([]);
        }

        const placeholders = paymentFor.map(() => "?").join(",");
        conditions.push(`p.payment_for IN (${placeholders})`);
        params.push(...paymentFor);
      } else {
        conditions.push(`p.payment_for = ?`);
        params.push(paymentFor);
      }
    }

    if (fromYear && toYear) {
      const fyStart = `${fromYear}-04-01`;
      const fyEnd = `${toYear}-03-31`;
      conditions.push(`p.payment_date BETWEEN ? AND ?`);
      params.push(fyStart, fyEnd);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY p.payment_date DESC";

    return runQuery(pool, query, params);
  },

  /**
   * Fetch payment entries grouped by payment date for Rokad (5C register).
   *
   * This function retrieves payment records from `ps_payment_information`
   * and optionally joins `ps_namuna_7` to attach Samanya tax certificate
   * details related to that payment.
   *
   * The query aggregates all payment rows of the same date into a JSON array.
   *
   * Result Structure:
   *
   * [
   *   {
   *     payment_date: "2026-03-10",
   *     entries: [
   *       {
   *         id: 10,
   *         recipient_name: "ABC",
   *         payment_for: 1,
   *         payment_amount: 500,
   *         payment_medium: "cash",
   *         samanya: { ... } | null
   *       }
   *     ]
   *   }
   * ]
   *
   * Why this structure?
   * - Rokad register is printed date-wise.
   * - Grouping reduces processing in Pug templates.
   * - JSON aggregation keeps related rows together.
   *
   * Supported Filters:
   * - payment type (single or array)
   * - financial year (fromYear → toYear)
   * - specific year
   * - specific month
   * - exact date
   *
   * @param {Pool} pool
   * MySQL connection pool.
   *
   * @param {number|number[]} [paymentFor=-1]
   * Payment type filter. Can be a single value or an array.
   * Pass -1 to disable filtering.
   *
   * @param {Object} [options={}]
   *
   * @param {number} [options.fromYear]
   * Financial year start (e.g. 2025).
   *
   * @param {number} [options.toYear]
   * Financial year end (e.g. 2026).
   *
   * @param {number} [options.month]
   * Filter by month (1-12).
   *
   * @param {number} [options.year]
   * Filter by calendar year.
   *
   * @param {string} [options.date]
   * Exact payment date (YYYY-MM-DD).
   *
   * @returns {Promise<Array>}
   * Returns grouped payment records.
   */
  getPaymentDetailsFor5CSamanyaAllWithCertificates2: (
    pool,
    paymentFor = -1,
    options = {},
  ) => {
    const { fromYear, toYear, month, year, date } = options || {};

    let params = [];
    let conditions = [];

    /**
     * ------------------------------------------------
     * Base Query
     * ------------------------------------------------
     *
     * - ps_payment_information is the primary source
     * - ps_namuna_7 provides Samanya certificate details
     * - JSON_ARRAYAGG groups payments by date
     */

    let query = `
        SELECT 
            p.payment_date,

            JSON_ARRAYAGG(
                JSON_OBJECT(

                    'id', p.id,

                    'recipient_name', p.recipient_name,

                    'payment_for', p.payment_for,

                    'reason_in_words', p.reason_in_words,

                    'amount', p.payment_amount,

                    'payment_medium', p.payment_medium,

                    'check_no', p.check_no,

                    'demand_draft_no', p.demand_draft_no,

                    'rtgs_no', p.rtgs_no,

                    'transaction_number', p.transaction_number,

                    'other_id', p.other_id,

                    'other_id_name', p.other_id_name,

                    'payment_date', p.payment_date,

                    'payment_id', p.id,

                    'malmatta_no', p.malmatta_no,

                    'payment_amount', p.payment_amount,

                    'payment_mode', p.payment_mode,

                    'approval_status', p.approval_status,

                    'approval_date', p.approval_date,

                    'samanya',
                    IF(
                        n7.id IS NULL,
                        NULL,
                        JSON_OBJECT(
                            'id', n7.id,
                            'form_nine_id', n7.form_nine_id,
                            'tpl_totalTax', n7.tpl_totalTax,
                            'tpl_totalSampurnaTax', n7.tpl_totalSampurnaTax,
                            'tpl_bharnaDate', n7.tpl_bharnaDate,
                            'tpl_amountInWords', n7.tpl_amountInWords
                        )
                    )

                )
            ) AS entries

        FROM ps_payment_information AS p

        LEFT JOIN ps_namuna_7 AS n7
            ON p.id = n7.ps_payment_information_id_fk
    `;

    /**
     * ------------------------------------------------
     * PAYMENT TYPE FILTER
     * ------------------------------------------------
     */
    if (paymentFor !== -1) {
      if (Array.isArray(paymentFor)) {
        if (paymentFor.length === 0) {
          return Promise.resolve([]);
        }

        const placeholders = paymentFor.map(() => "?").join(",");
        conditions.push(`p.payment_for IN (${placeholders})`);
        params.push(...paymentFor);
      } else {
        conditions.push(`p.payment_for = ?`);
        params.push(paymentFor);
      }
    }

    /**
     * ------------------------------------------------
     * FINANCIAL YEAR FILTER
     * ------------------------------------------------
     */
    if (fromYear && toYear) {
      const fyStart = `${fromYear}-04-01`;
      const fyEnd = `${toYear}-03-31`;

      conditions.push(`p.payment_date BETWEEN ? AND ?`);
      params.push(fyStart, fyEnd);
    }

    /**
     * ------------------------------------------------
     * YEAR FILTER
     * ------------------------------------------------
     */
    if (year) {
      conditions.push(`YEAR(p.payment_date) = ?`);
      params.push(year);
    }

    /**
     * ------------------------------------------------
     * MONTH FILTER
     * ------------------------------------------------
     */
    if (month) {
      conditions.push(`MONTH(p.payment_date) = ?`);
      params.push(month);
    }

    /**
     * ------------------------------------------------
     * EXACT DATE FILTER
     * ------------------------------------------------
     */
    if (date) {
      conditions.push(`p.payment_date = ?`);
      params.push(date);
    }

    /**
     * ------------------------------------------------
     * APPLY CONDITIONS
     * ------------------------------------------------
     */
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    /**
     * ------------------------------------------------
     * GROUPING
     * ------------------------------------------------
     *
     * Grouping by payment_date allows the Rokad register
     * to render date-wise entries efficiently.
     */
    query += `
        GROUP BY p.payment_date
        ORDER BY p.payment_date ASC
    `;

    return runQuery(pool, query, params);
  },

  //   my current function

  /**
   * Fetch payment entries grouped by payment date for Rokad (5C register).
   *
   * Pulls payments from ps_payment_information and attaches
   * samanya tax details from ps_tax_payer_list_samanya when available.
   *
   * Returns date-wise grouped entries suitable for Rokad register printing.
   */
  getPaymentDetailsFor5CSamanyaAllWithCertificates: (
    pool,
    forType,
    options = {},
  ) => {
    const { fromYear, toYear, month, year, date, payment_upto_date } =
      options || {};

    let params = [];
    let conditions = [];

    let query = `
        SELECT 
            p.payment_date,

            JSON_ARRAYAGG(
                JSON_OBJECT(

                    'id', p.id,
                    'recipient_name', p.recipient_name,
                    'payment_for', p.payment_for,

                    'payment_for_desc', p.payment_for_desc,
                    'tax_category', p.tax_category,
                    'payment_type', p.payment_type,

                    'reason_in_words', p.reason_in_words,

                    'amount', p.payment_amount,
                    'payment_medium', p.payment_medium,

                    'check_no', p.check_no,
                    'demand_draft_no', p.demand_draft_no,
                    'rtgs_no', p.rtgs_no,
                    'transaction_number', p.transaction_number,

                    'other_id', p.other_id,
                    'other_id_name', p.other_id_name,

                    'payment_date', p.payment_date,
                    'payment_id', p.id,
                    'malmatta_no', p.malmatta_no,

                    'payment_amount', p.payment_amount,
                    'payment_mode', p.payment_mode,

                    'approval_status', p.approval_status,
                    'approval_date', p.approval_date,

                    'samanya',
                    IF(
                        s.id IS NULL,
                        NULL,
                        JSON_OBJECT(

                            'id', s.id,
                            'form_nine_id', s.form_nine_id,
                            'user_id', s.user_id,

                            'tpl_lastBuildingTax', s.tpl_lastBuildingTax,
                            'tpl_currentBuildingTax', s.tpl_currentBuildingTax,
                            'tpl_totalBuildingTax', s.tpl_totalBuildingTax,

                            'tpl_lastDivaTax', s.tpl_lastDivaTax,
                            'tpl_currentDivaTax', s.tpl_currentDivaTax,
                            'tpl_totalDivaTax', s.tpl_totalDivaTax,

                            'tpl_lastArogyaTax', s.tpl_lastArogyaTax,
                            'tpl_currentArogyaTax', s.tpl_currentArogyaTax,
                            'tpl_totalArogyaTax', s.tpl_totalArogyaTax,

                            'tpl_lastCleaningTax', s.tpl_lastCleaningTax,
                            'tpl_currentCleaningTax', s.tpl_currentCleaningTax,
                            'tpl_totalCleaningTax', s.tpl_totalCleaningTax,

                            'tpl_lastFireblegateTax', s.tpl_lastFireblegateTax,
                            'tpl_currentFireblegateTax', s.tpl_currentFireblegateTax,
                            'tpl_totalFireblegateTax', s.tpl_totalFireblegateTax,

                            'tpl_lastTreeTax', s.tpl_lastTreeTax,
                            'tpl_currentTreeTax', s.tpl_currentTreeTax,
                            'tpl_totalTreeTax', s.tpl_totalTreeTax,

                            'tpl_lastEducationTax', s.tpl_lastEducationTax,
                            'tpl_currentEducationTax', s.tpl_currentEducationTax,
                            'tpl_totalEducationTax', s.tpl_totalEducationTax,

                            'tpl_lastTaxFine', s.tpl_lastTaxFine,
                            'tpl_lastTaxRelief', s.tpl_lastTaxRelief,

                            'tpl_totalTax', s.tpl_totalTax,
                            'tpl_totalSampurnaTax', s.tpl_totalSampurnaTax,

                            'created_date', s.created_date,
                            'tpl_bharnaDate', s.tpl_bharnaDate,
                            'tpl_amountInWords', s.tpl_amountInWords,

                            'payment_id', s.payment_id,
                            'order_id', s.order_id,
                            'mobile', s.mobile,
                            'checkNo', s.checkNo,

                            'ps_payment_information_id_fk', s.ps_payment_information_id_fk
                        )
                    )

                )
            ) AS entries

        FROM ps_payment_information AS p

        LEFT JOIN ps_tax_payer_list_samanya AS s
            ON p.id = s.ps_payment_information_id_fk
    `;

    /* Payment type filter */
    if (forType !== -1) {
      //   if (Array.isArray(paymentFor)) {
      //     if (paymentFor.length === 0) {
      //       return Promise.resolve([]);
      //     }

      //     const placeholders = paymentFor.map(() => "?").join(",");
      //     conditions.push(`p.payment_for IN (${placeholders})`);
      //     params.push(...paymentFor);
      //   } else {
      //     conditions.push(`p.payment_for = ?`);
      //     params.push(paymentFor);
      //   }

      conditions.push(`p.tax_category = ?`);
      params.push("SAMANYA");
    }

    /* Financial year filter */
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

    /* Payment upto date filter */
    if (payment_upto_date) {
      conditions.push(`p.createdAt > ?`);
      params.push(payment_upto_date);
    }

    // push if status is approved or null

    conditions.push(`(p.approval_status = 'APPROVED' OR p.approval_status IS NULL)`)

    /* Apply conditions */
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }




    /* Grouping */
    query += `
        GROUP BY p.createdAt
        ORDER BY p.createdAt ASC
    `;

    
    return runQuery(pool, query, params);
  },

  getPaymentDetailsFor5CPaniAllWithCertificates: (
    pool,
    forType,
    options = {},
  ) => {
    const { fromYear, toYear, month, year, date, payment_upto_date } =
      options || {};

    let params = [];
    let conditions = [];

    let query = `
    SELECT 
        p.payment_date,

        JSON_ARRAYAGG(
            JSON_OBJECT(

                'payment_id', p.id,
                'recipient_name', p.recipient_name,
                'payment_for', p.payment_for,
                'payment_for_desc', p.payment_for_desc,

                'tax_category', p.tax_category,
                'payment_type', p.payment_type,

                'reason_in_words', p.reason_in_words,

                'payment_amount', p.payment_amount,
                'payment_medium', p.payment_medium,

                'check_no', p.check_no,
                'demand_draft_no', p.demand_draft_no,
                'rtgs_no', p.rtgs_no,
                'transaction_number', p.transaction_number,

                'other_id', p.other_id,
                'other_id_name', p.other_id_name,

                'payment_date', p.payment_date,
                'malmatta_no', p.malmatta_no,

                'payment_mode', p.payment_mode,
                'approval_status', p.approval_status,
                'approval_date', p.approval_date,

                'pani',
                IF(
                    pani.id IS NULL,
                    NULL,
                    JSON_OBJECT(

                        'id', pani.id,
                        'form_nine_id', pani.form_nine_id,
                        'user_id', pani.user_id,

                        'tpl_lastSpacialWaterTax', pani.tpl_lastSpacialWaterTax,
                        'tpl_currentSpacialWaterTax', pani.tpl_currentSpacialWaterTax,
                        'tpl_totalSpacialWaterTax', pani.tpl_totalSpacialWaterTax,

                        'tpl_lastGenealWaterTax', pani.tpl_lastGenealWaterTax,
                        'tpl_currentGenealWaterTax', pani.tpl_currentGenealWaterTax,
                        'tpl_totalGenealWaterTax', pani.tpl_totalGenealWaterTax,

                        'tpl_totalWaterTax', pani.tpl_totalWaterTax,

                        'tpl_bharnaDate', pani.tpl_bharnaDate,
                        'created_date', pani.created_date,

                        'checkNo', pani.checkNo,

                        'ps_payment_information_id_fk', pani.ps_payment_information_id_fk
                    )
                )

            )
        ) AS entries

    FROM ps_payment_information AS p

    LEFT JOIN ps_tax_payer_list_pani AS pani
        ON p.id = pani.ps_payment_information_id_fk
  `;

    // ------------------------------------------------
    // PAYMENT TYPE FILTER
    // ------------------------------------------------
    if (forType !== -1) {
      conditions.push(`p.tax_category = ?`);
      params.push("PANI");

      //   conditions.push(`p.payment_type = ?`);
      //   params.push("CERTIFICATE");
    }

    // ------------------------------------------------
    // FINANCIAL YEAR FILTER
    // ------------------------------------------------
    if (fromYear && toYear) {
      const fyStart = `${fromYear}-04-01`;
      const fyEnd = `${toYear}-03-31`;

      conditions.push(`p.payment_date BETWEEN ? AND ?`);
      params.push(fyStart, fyEnd);
    }

    // ------------------------------------------------
    // YEAR FILTER (INDEX FRIENDLY)
    // ------------------------------------------------
    if (year) {
      const start = `${year}-01-01`;
      const end = `${year}-12-31`;

      conditions.push(`p.payment_date BETWEEN ? AND ?`);
      params.push(start, end);
    }

    // ------------------------------------------------
    // MONTH FILTER (CORRECTED ✅)
    // ------------------------------------------------
    if (month) {
      const y = year || new Date().getFullYear();
      const start = `${y}-${String(month).padStart(2, "0")}-01`;
      const end = `${y}-${String(month).padStart(2, "0")}-31`;

      conditions.push(`p.payment_date BETWEEN ? AND ?`);
      params.push(start, end);
    }

    // ------------------------------------------------
    // EXACT DATE FILTER
    // ------------------------------------------------
    if (date) {
      conditions.push(`p.payment_date = ?`);
      params.push(date);
    }

    /* Payment upto date filter */
    if (payment_upto_date) {
      conditions.push(`p.payment_date > ?`);
      params.push(payment_upto_date);
    }

    // ------------------------------------------------
    // APPLY CONDITIONS
    // ------------------------------------------------
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    // ------------------------------------------------
    // GROUPING
    // ------------------------------------------------
    query += `
    GROUP BY p.payment_date
    ORDER BY p.payment_date ASC
  `;

    // console.log(query, params);

    return runQuery(pool, query, params);
  },

  /**
   * Fetch Namuna-7 payment details grouped by payment date.
   *
   * The grouping is performed directly in MySQL using JSON_ARRAYAGG
   * so that Node.js does not need to manually group rows.
   *
   * Output format returned from MySQL:
   *
   * [
   *   {
   *     payment_date: "2026-03-12",
   *     entries: [
   *       { ...row1 },
   *       { ...row2 }
   *     ]
   *   },
   *   {
   *     payment_date: "2026-03-11",
   *     entries: [
   *       { ...row3 }
   *     ]
   *   }
   * ]
   *
   * Important Notes
   * ----------------
   * • Grouping is done using `p.payment_date` from `ps_payment_information`.
   * • Filtering for payment type is also done using `p.payment_for`.
   * • LEFT JOIN ensures payments still appear even if Namuna-7 entry is missing.
   * • JSON_ARRAYAGG builds an array of entries for each date.
   *
   * Tables
   * -------
   * ps_payment_information (p)
   *      Primary payment record
   *
   * ps_namuna_7 (n7)
   *      Voucher / payment usage details
   *
   * Relationship
   * -------------
   * p.id → n7.ps_payment_information_id_fk
   *
   * @param {object} pool
   * MySQL connection pool
   *
   * @param {number|number[]} paymentFor
   * Payment type(s) to filter
   *
   * Example:
   *   3
   *   [3,4,5]
   *
   * @param {object} options
   * Filtering options
   *
   * @param {number} options.fromYear
   * Financial year start
   *
   * @param {number} options.toYear
   * Financial year end
   *
   * @param {number} options.month
   * Filter by month
   *
   * @param {number} options.year
   * Filter by year
   *
   * @param {string} options.date
   * Exact date filter
   *
   * @returns {Promise<Array>}
   */
  getPaymentDetailsWithDateGroupForNamuna7Old: (
    pool,
    paymentFor = -1,
    options = {},
  ) => {
    const { fromYear, toYear, month, year, date } = options || {};

    let params = [];
    let conditions = [];

    /**
     * ------------------------------------------------
     * Base Query
     * ------------------------------------------------
     *
     * Each Namuna-7 row is converted to JSON_OBJECT.
     *
     * JSON_ARRAYAGG then aggregates those objects
     * into an array grouped by payment_date.
     *
     * Final structure:
     *
     * payment_date
     *      ↓
     *   entries[]
     *
     */
    let query = `
    SELECT 
        p.payment_date,

       JSON_ARRAYAGG(
            JSON_OBJECT(

                'id', COALESCE(p.id, n7.id),

                'recipient_name', COALESCE(p.recipient_name, n7.recipient_name),

                'payment_for', COALESCE(p.payment_for, n7.payment_for),

                'reason_in_words', COALESCE(p.reason_in_words, n7.reason_in_words),

                'amount', COALESCE(p.payment_amount, n7.amount),

                'payment_medium', COALESCE(p.payment_medium, n7.payment_medium),

                'check_no', COALESCE(p.check_no, n7.check_no),

                'demand_draft_no', COALESCE(p.demand_draft_no, n7.demand_draft_no),

                'rtgs_no', COALESCE(p.rtgs_no, n7.rtgs_no),

                'transaction_number',
                COALESCE(p.transaction_number, n7.transaction_number),

                'other_id', COALESCE(p.other_id, n7.other_id),

                'other_id_name', COALESCE(p.other_id_name, n7.other_id_name),

                'payment_date', COALESCE(p.payment_date, n7.date),

                'payment_id', p.id,

                'malmatta_no', p.malmatta_no,

                'payment_amount', COALESCE(p.payment_amount, n7.amount),

                'payment_mode', p.payment_mode,

                'approval_status', p.approval_status,

                'approval_date', p.approval_date

            )
        ) AS entries

    FROM ps_payment_information AS p

    LEFT JOIN ps_namuna_7 AS n7
        ON p.id = n7.ps_payment_information_id_fk
  `;

    // ------------------------------------------------
    // PAYMENT TYPE FILTER
    // ------------------------------------------------
    if (paymentFor !== -1) {
      if (Array.isArray(paymentFor)) {
        if (paymentFor.length === 0) {
          return Promise.resolve([]);
        }

        const placeholders = paymentFor.map(() => "?").join(",");
        conditions.push(`p.payment_for IN (${placeholders})`);
        params.push(...paymentFor);
      } else {
        conditions.push(`p.payment_for = ?`);
        params.push(paymentFor);
      }
    }

    // ------------------------------------------------
    // FINANCIAL YEAR FILTER
    // ------------------------------------------------
    if (fromYear && toYear) {
      const fyStart = `${fromYear}-04-01`;
      const fyEnd = `${toYear}-03-31`;

      conditions.push(`p.payment_date BETWEEN ? AND ?`);
      params.push(fyStart, fyEnd);
    }

    // ------------------------------------------------
    // YEAR FILTER
    // ------------------------------------------------
    if (year) {
      conditions.push(`YEAR(p.payment_date) = ?`);
      params.push(year);
    }

    // ------------------------------------------------
    // MONTH FILTER
    // ------------------------------------------------
    if (month) {
      conditions.push(`MONTH(p.payment_date) = ?`);
      params.push(month);
    }

    // ------------------------------------------------
    // EXACT DATE FILTER
    // ------------------------------------------------
    if (date) {
      conditions.push(`p.payment_date = ?`);
      params.push(date);
    }

    // ------------------------------------------------
    // APPLY CONDITIONS
    // ------------------------------------------------
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    // ------------------------------------------------
    // GROUPING
    // ------------------------------------------------
    query += `
      GROUP BY p.payment_date
      ORDER BY p.payment_date ASC
  `;

    return runQuery(pool, query, params);
  },

  getPaymentDetailsWithDateGroupForNamuna7: (pool, forType, options = {}) => {
    const { fromYear, toYear, month, year, date } = options || {};

    let params = [];
    let conditions = [];

    /**
     * ------------------------------------------------
     * Base Query
     * ------------------------------------------------
     *
     * Each Namuna-7 row is converted to JSON_OBJECT.
     *
     * JSON_ARRAYAGG then aggregates those objects
     * into an array grouped by payment_date.
     *
     * Final structure:
     *
     * payment_date
     *      ↓
     *   entries[]
     *
     */
    let query = `
    SELECT 
        p.payment_date,

       JSON_ARRAYAGG(
            JSON_OBJECT(

                'id', COALESCE(p.id, n7.id),

                'recipient_name', COALESCE(p.recipient_name, n7.recipient_name),

                'payment_for', COALESCE(p.payment_for, n7.payment_for),

                'reason_in_words', COALESCE(p.reason_in_words, n7.reason_in_words),

                'amount', COALESCE(p.payment_amount, n7.amount),

                'payment_medium', COALESCE(p.payment_medium, n7.payment_medium),

                'check_no', COALESCE(p.check_no, n7.check_no),

                'demand_draft_no', COALESCE(p.demand_draft_no, n7.demand_draft_no),

                'rtgs_no', COALESCE(p.rtgs_no, n7.rtgs_no),

                'transaction_number',
                COALESCE(p.transaction_number, n7.transaction_number),

                'other_id', COALESCE(p.other_id, n7.other_id),

                'other_id_name', COALESCE(p.other_id_name, n7.other_id_name),

                'payment_date', COALESCE(p.payment_date, n7.date),

                'payment_id', p.id,


                'tax_category', p.tax_category,

                'payment_for_desc', p.payment_for_desc,
                'payment_type', p. payment_type,



                'malmatta_no', p.malmatta_no,

                'payment_amount', COALESCE(p.payment_amount, n7.amount),

                'payment_mode', p.payment_mode,

                'approval_status', p.approval_status,

                'approval_date', p.approval_date

            )
        ) AS entries

    FROM ps_payment_information AS p

    LEFT JOIN ps_namuna_7 AS n7
        ON p.id = n7.ps_payment_information_id_fk
  `;

    // ------------------------------------------------
    // PAYMENT TYPE FILTER
    // ------------------------------------------------
    if (forType !== -1) {
      //   if (Array.isArray(paymentFor)) {
      //     if (paymentFor.length === 0) {
      //       return Promise.resolve([]);
      //     }

      //     const placeholders = paymentFor.map(() => "?").join(",");
      //     conditions.push(`p.payment_for IN (${placeholders})`);
      //     params.push(...paymentFor);
      //   } else {
      //     conditions.push(`p.payment_for = ?`);
      //     params.push(paymentFor);
      //   }

      if (forType == "samanya") {
        conditions.push("p.tax_category = ?");
        params.push("SAMANYA");

        conditions.push("p.payment_type = ?");
        params.push("CERTIFICATE");
      } else if (forType == "pani") {
        // might be needed
        conditions.push("p.tax_category = ?");
        params.push("PANI");

        conditions.push("p.payment_type = ?");
        params.push("CERTIFICATE");
      }
    }

    // ------------------------------------------------
    // FINANCIAL YEAR FILTER
    // ------------------------------------------------
    if (fromYear && toYear) {
      const fyStart = `${fromYear}-04-01`;
      const fyEnd = `${toYear}-03-31`;

      conditions.push(`p.payment_date BETWEEN ? AND ?`);
      params.push(fyStart, fyEnd);
    }

    // ------------------------------------------------
    // YEAR FILTER
    // ------------------------------------------------
    if (year) {
      conditions.push(`YEAR(p.payment_date) = ?`);
      params.push(year);
    }

    // ------------------------------------------------
    // MONTH FILTER
    // ------------------------------------------------
    if (month) {
      conditions.push(`MONTH(p.payment_date) = ?`);
      params.push(month);
    }

    // ------------------------------------------------
    // EXACT DATE FILTER
    // ------------------------------------------------
    if (date) {
      conditions.push(`p.payment_date = ?`);
      params.push(date);
    }

    // ------------------------------------------------
    // APPLY CONDITIONS
    // ------------------------------------------------
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    // ------------------------------------------------
    // GROUPING
    // ------------------------------------------------
    query += `
      GROUP BY p.payment_date
      ORDER BY p.payment_date ASC
  `;

    console.log(query);
    return runQuery(pool, query, params);
  },

  getPaymentDetailsWithDateGroupForNamuna7Water: (
    pool,
    forType,
    options = {},
  ) => {
    const { fromYear, toYear, month, year, date } = options || {};

    let params = [];
    let conditions = [];

    let query = `
    SELECT 
        p.payment_date,

        JSON_ARRAYAGG(
            JSON_OBJECT(

                'id', COALESCE(p.id, pani.id),

                'recipient_name', p.recipient_name,

                'payment_for', p.payment_for,

                'reason_in_words', p.reason_in_words,

                'amount', COALESCE(p.payment_amount, pani.tpl_totalWaterTax),

                'payment_medium', p.payment_medium,

                'check_no', COALESCE(p.check_no, pani.checkNo),

                'demand_draft_no', p.demand_draft_no,

                'rtgs_no', p.rtgs_no,

                'transaction_number', p.transaction_number,

                'other_id', p.other_id,

                'other_id_name', p.other_id_name,

                'payment_date', COALESCE(p.payment_date, pani.tpl_bharnaDate),

                'payment_id', p.id,

                'tax_category', p.tax_category,

                'payment_for_desc', p.payment_for_desc,

                'payment_type', p.payment_type,

                'malmatta_no', p.malmatta_no,

                'payment_amount', COALESCE(p.payment_amount, pani.tpl_totalWaterTax),

                'payment_mode', p.payment_mode,

                'approval_status', p.approval_status,

                'approval_date', p.approval_date

            )
        ) AS entries

    FROM ps_payment_information AS p

    LEFT JOIN ps_tax_payer_list_pani AS pani
        ON p.id = pani.ps_payment_information_id_fk
  `;

    // ------------------------------------------------
    // PAYMENT TYPE FILTER
    // ------------------------------------------------
    if (forType !== -1) {
      if (forType == "pani") {
        conditions.push("p.tax_category = ?");
        params.push("PANI");

        conditions.push("p.payment_type = ?");
        params.push("CERTIFICATE");
      }
    }

    // ------------------------------------------------
    // FINANCIAL YEAR FILTER
    // ------------------------------------------------
    if (fromYear && toYear) {
      const fyStart = `${fromYear}-04-01`;
      const fyEnd = `${toYear}-03-31`;

      conditions.push(`p.payment_date BETWEEN ? AND ?`);
      params.push(fyStart, fyEnd);
    }

    // ------------------------------------------------
    // YEAR FILTER
    // ------------------------------------------------
    if (year) {
      conditions.push(`YEAR(p.payment_date) = ?`);
      params.push(year);
    }

    // ------------------------------------------------
    // MONTH FILTER
    // ------------------------------------------------
    if (month) {
      conditions.push(`MONTH(p.payment_date) = ?`);
      params.push(month);
    }

    // ------------------------------------------------
    // EXACT DATE FILTER
    // ------------------------------------------------
    if (date) {
      conditions.push(`p.payment_date = ?`);
      params.push(date);
    }

    // ------------------------------------------------
    // APPLY CONDITIONS
    // ------------------------------------------------
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    // ------------------------------------------------
    // GROUPING
    // ------------------------------------------------
    query += `
    GROUP BY p.payment_date
    ORDER BY p.payment_date ASC
  `;

    console.log(query);

    return runQuery(pool, query, params);
  },

  getPaymentDetailsForSamanyaAndPani: function (pool, dateFrom, dateTo) {
    const query = `SELECT 
						t.* 
					FROM ps_payment_information AS t 
					WHERE 
						(
							payment_for = 1 
						OR 
							payment_for = 2
						)
						AND
							DATE(payment_date) BETWEEN ? AND ?`;

    return runQuery(pool, query, [dateFrom, dateTo]);
  },

  getPaymentDetailsByMalmattaAndPaymentFor: (
    pool,
    malmatta,
    paymentFor = -1,
  ) => {
    const query = `SELECT * FROM 
							ps_payment_information 
						WHERE 
					malmatta_no = ? 
						AND 
					${paymentFor == -1 ? "payment_for != ?" : "payment_for = ?"};`;

    return runQuery(pool, query, [malmatta, paymentFor]);
  },
};

module.exports = TaxPaymentModel;
