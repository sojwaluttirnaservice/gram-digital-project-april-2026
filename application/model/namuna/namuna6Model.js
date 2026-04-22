const { runQuery } = require("../../utils/runQuery");

const namuna6CModel = {
  collectionList: (pool, filters = {}) => {
    const { date, month, year, fromYear, toYear } = filters;

    let whereClause = `
        (t.approval_status = 'APPROVED' OR t.approval_status IS NULL)
    `;

    let params = [];

    // ✅ 1. Exact Date
    if (date) {
      whereClause += ` AND DATE(t.createdAt) = ?`;
      params.push(date);
    }

    // ✅ 2. Month + Year
    else if (month && year) {
      whereClause += ` AND MONTH(t.createdAt) = ? AND YEAR(t.createdAt) = ?`;
      params.push(month, year);
    }

    // ✅ 3. Financial Year (April → March)
    else if (fromYear && toYear) {
      whereClause += ` AND t.createdAt BETWEEN ? AND ?`;
      params.push(`${fromYear}-04-01`, `${toYear}-03-31`);
    }

    // LATEST QUERY WORKING FINE

    let q = `
    SELECT 
        month,
        year,

        JSON_ARRAYAGG(
            JSON_OBJECT(
                'taxName', taxName,
                '1', \`1\`, '2', \`2\`, '3', \`3\`, '4', \`4\`, '5', \`5\`,
                '6', \`6\`, '7', \`7\`, '8', \`8\`, '9', \`9\`, '10', \`10\`,
                '11', \`11\`, '12', \`12\`, '13', \`13\`, '14', \`14\`, '15', \`15\`,
                '16', \`16\`, '17', \`17\`, '18', \`18\`, '19', \`19\`, '20', \`20\`,
                '21', \`21\`, '22', \`22\`, '23', \`23\`, '24', \`24\`, '25', \`25\`,
                '26', \`26\`, '27', \`27\`, '28', \`28\`, '29', \`29\`, '30', \`30\`, '31', \`31\`
            )
        ) AS data

    FROM (

        SELECT 
            MONTH(t.createdAt) AS month,
            YEAR(t.createdAt) AS year,

            -- ✅ Financial Year Month Order (April = 1)
            CASE 
                WHEN MONTH(t.createdAt) >= 4 THEN MONTH(t.createdAt) - 3
                ELSE MONTH(t.createdAt) + 9
            END AS fy_month_order,

            t.tax_type AS taxName,

            SUM(CASE WHEN t.day = 1 THEN t.amount ELSE 0 END) AS \`1\`,
            SUM(CASE WHEN t.day = 2 THEN t.amount ELSE 0 END) AS \`2\`,
            SUM(CASE WHEN t.day = 3 THEN t.amount ELSE 0 END) AS \`3\`,
            SUM(CASE WHEN t.day = 4 THEN t.amount ELSE 0 END) AS \`4\`,
            SUM(CASE WHEN t.day = 5 THEN t.amount ELSE 0 END) AS \`5\`,
            SUM(CASE WHEN t.day = 6 THEN t.amount ELSE 0 END) AS \`6\`,
            SUM(CASE WHEN t.day = 7 THEN t.amount ELSE 0 END) AS \`7\`,
            SUM(CASE WHEN t.day = 8 THEN t.amount ELSE 0 END) AS \`8\`,
            SUM(CASE WHEN t.day = 9 THEN t.amount ELSE 0 END) AS \`9\`,
            SUM(CASE WHEN t.day = 10 THEN t.amount ELSE 0 END) AS \`10\`,
            SUM(CASE WHEN t.day = 11 THEN t.amount ELSE 0 END) AS \`11\`,
            SUM(CASE WHEN t.day = 12 THEN t.amount ELSE 0 END) AS \`12\`,
            SUM(CASE WHEN t.day = 13 THEN t.amount ELSE 0 END) AS \`13\`,
            SUM(CASE WHEN t.day = 14 THEN t.amount ELSE 0 END) AS \`14\`,
            SUM(CASE WHEN t.day = 15 THEN t.amount ELSE 0 END) AS \`15\`,
            SUM(CASE WHEN t.day = 16 THEN t.amount ELSE 0 END) AS \`16\`,
            SUM(CASE WHEN t.day = 17 THEN t.amount ELSE 0 END) AS \`17\`,
            SUM(CASE WHEN t.day = 18 THEN t.amount ELSE 0 END) AS \`18\`,
            SUM(CASE WHEN t.day = 19 THEN t.amount ELSE 0 END) AS \`19\`,
            SUM(CASE WHEN t.day = 20 THEN t.amount ELSE 0 END) AS \`20\`,
            SUM(CASE WHEN t.day = 21 THEN t.amount ELSE 0 END) AS \`21\`,
            SUM(CASE WHEN t.day = 22 THEN t.amount ELSE 0 END) AS \`22\`,
            SUM(CASE WHEN t.day = 23 THEN t.amount ELSE 0 END) AS \`23\`,
            SUM(CASE WHEN t.day = 24 THEN t.amount ELSE 0 END) AS \`24\`,
            SUM(CASE WHEN t.day = 25 THEN t.amount ELSE 0 END) AS \`25\`,
            SUM(CASE WHEN t.day = 26 THEN t.amount ELSE 0 END) AS \`26\`,
            SUM(CASE WHEN t.day = 27 THEN t.amount ELSE 0 END) AS \`27\`,
            SUM(CASE WHEN t.day = 28 THEN t.amount ELSE 0 END) AS \`28\`,
            SUM(CASE WHEN t.day = 29 THEN t.amount ELSE 0 END) AS \`29\`,
            SUM(CASE WHEN t.day = 30 THEN t.amount ELSE 0 END) AS \`30\`,
            SUM(CASE WHEN t.day = 31 THEN t.amount ELSE 0 END) AS \`31\`

        FROM (
            -- ✅ ORIGINAL UNION (unchanged)
            SELECT DAY(p.createdAt) AS day, 'मालमत्ता कर' AS tax_type,
                (p.tpl_lastBuildingTax + p.tpl_currentBuildingTax) AS amount,
                p.approval_status, p.createdAt
            FROM ps_payment_receipt_samanya p

            UNION ALL
            SELECT DAY(p.createdAt), 'दिवाबत्ती कर',
                (p.tpl_lastDivaTax + p.tpl_currentDivaTax),
                p.approval_status, p.createdAt
            FROM ps_payment_receipt_samanya p

            UNION ALL
            SELECT DAY(p.createdAt), 'आरोग्य कर',
                (p.tpl_lastArogyaTax + p.tpl_currentArogyaTax),
                p.approval_status, p.createdAt
            FROM ps_payment_receipt_samanya p

            UNION ALL
            SELECT DAY(p.createdAt), 'स्वच्छता कर',
                (p.tpl_lastCleaningTax + p.tpl_currentCleaningTax),
                p.approval_status, p.createdAt
            FROM ps_payment_receipt_samanya p

            UNION ALL
            SELECT DAY(p.createdAt), 'दंड कर',
                COALESCE(p.tpl_lastTaxFine, 0),
                p.approval_status, p.createdAt
            FROM ps_payment_receipt_samanya p

            UNION ALL
            SELECT DAY(p.createdAt),
                p.payment_for_desc,
                p.payment_amount,
                p.approval_status,
                p.createdAt
            FROM ps_payment_receipt_samanya p
        ) t

        WHERE ${whereClause}

        GROUP BY year, month, taxName, fy_month_order

    ) final

    GROUP BY year, month

    -- ✅ CORRECT FINANCIAL YEAR ORDER
    ORDER BY 
        CASE 
            WHEN month >= 4 THEN year
            ELSE year - 1
        END,
        CASE 
            WHEN month >= 4 THEN month - 3
            ELSE month + 9
        END;
    `;

    return runQuery(pool, q, params);
  },


    expenditureList: (pool, filters = {}) => {
  const { date, month, year, fromYear, toYear } = filters;

  let whereClause = `1=1`;
  let params = [];

  // ✅ Filters
  if (date) {
    whereClause += ` AND DATE(createdAt) = ?`;
    params.push(date);
  } 
  else if (month && year) {
    whereClause += ` AND MONTH(createdAt) = ? AND YEAR(createdAt) = ?`;
    params.push(month, year);
  } 
  else if (fromYear && toYear) {
    whereClause += ` AND createdAt BETWEEN ? AND ?`;
    params.push(`${fromYear}-04-01`, `${toYear}-03-31`);
  }



  let q = `
SELECT 
    month,
    year,

    JSON_ARRAYAGG(
        JSON_OBJECT(
            'main_reason', main_reason,
            'subreasons', subreasons
        )
    ) AS data

FROM (

    SELECT 
        month,
        year,
        main_reason,

        JSON_ARRAYAGG(
            JSON_OBJECT(
                'label', reason_of_expenditure,
                'days', JSON_ARRAY(
                    \`1\`,\`2\`,\`3\`,\`4\`,\`5\`,\`6\`,\`7\`,\`8\`,\`9\`,\`10\`,
                    \`11\`,\`12\`,\`13\`,\`14\`,\`15\`,\`16\`,\`17\`,\`18\`,\`19\`,\`20\`,
                    \`21\`,\`22\`,\`23\`,\`24\`,\`25\`,\`26\`,\`27\`,\`28\`,\`29\`,\`30\`,\`31\`
                )
            )
        ) AS subreasons,

        -- FY order helper
        CASE 
            WHEN month >= 4 THEN month - 3
            ELSE month + 9
        END AS fy_month_order

    FROM (

        SELECT 
            MONTH(createdAt) AS month,
            YEAR(createdAt) AS year,
            main_reason,
            reason_of_expenditure,

            SUM(CASE WHEN DAY(createdAt)=1 THEN amount_spent ELSE 0 END) AS \`1\`,
            SUM(CASE WHEN DAY(createdAt)=2 THEN amount_spent ELSE 0 END) AS \`2\`,
            SUM(CASE WHEN DAY(createdAt)=3 THEN amount_spent ELSE 0 END) AS \`3\`,
            SUM(CASE WHEN DAY(createdAt)=4 THEN amount_spent ELSE 0 END) AS \`4\`,
            SUM(CASE WHEN DAY(createdAt)=5 THEN amount_spent ELSE 0 END) AS \`5\`,
            SUM(CASE WHEN DAY(createdAt)=6 THEN amount_spent ELSE 0 END) AS \`6\`,
            SUM(CASE WHEN DAY(createdAt)=7 THEN amount_spent ELSE 0 END) AS \`7\`,
            SUM(CASE WHEN DAY(createdAt)=8 THEN amount_spent ELSE 0 END) AS \`8\`,
            SUM(CASE WHEN DAY(createdAt)=9 THEN amount_spent ELSE 0 END) AS \`9\`,
            SUM(CASE WHEN DAY(createdAt)=10 THEN amount_spent ELSE 0 END) AS \`10\`,
            SUM(CASE WHEN DAY(createdAt)=11 THEN amount_spent ELSE 0 END) AS \`11\`,
            SUM(CASE WHEN DAY(createdAt)=12 THEN amount_spent ELSE 0 END) AS \`12\`,
            SUM(CASE WHEN DAY(createdAt)=13 THEN amount_spent ELSE 0 END) AS \`13\`,
            SUM(CASE WHEN DAY(createdAt)=14 THEN amount_spent ELSE 0 END) AS \`14\`,
            SUM(CASE WHEN DAY(createdAt)=15 THEN amount_spent ELSE 0 END) AS \`15\`,
            SUM(CASE WHEN DAY(createdAt)=16 THEN amount_spent ELSE 0 END) AS \`16\`,
            SUM(CASE WHEN DAY(createdAt)=17 THEN amount_spent ELSE 0 END) AS \`17\`,
            SUM(CASE WHEN DAY(createdAt)=18 THEN amount_spent ELSE 0 END) AS \`18\`,
            SUM(CASE WHEN DAY(createdAt)=19 THEN amount_spent ELSE 0 END) AS \`19\`,
            SUM(CASE WHEN DAY(createdAt)=20 THEN amount_spent ELSE 0 END) AS \`20\`,
            SUM(CASE WHEN DAY(createdAt)=21 THEN amount_spent ELSE 0 END) AS \`21\`,
            SUM(CASE WHEN DAY(createdAt)=22 THEN amount_spent ELSE 0 END) AS \`22\`,
            SUM(CASE WHEN DAY(createdAt)=23 THEN amount_spent ELSE 0 END) AS \`23\`,
            SUM(CASE WHEN DAY(createdAt)=24 THEN amount_spent ELSE 0 END) AS \`24\`,
            SUM(CASE WHEN DAY(createdAt)=25 THEN amount_spent ELSE 0 END) AS \`25\`,
            SUM(CASE WHEN DAY(createdAt)=26 THEN amount_spent ELSE 0 END) AS \`26\`,
            SUM(CASE WHEN DAY(createdAt)=27 THEN amount_spent ELSE 0 END) AS \`27\`,
            SUM(CASE WHEN DAY(createdAt)=28 THEN amount_spent ELSE 0 END) AS \`28\`,
            SUM(CASE WHEN DAY(createdAt)=29 THEN amount_spent ELSE 0 END) AS \`29\`,
            SUM(CASE WHEN DAY(createdAt)=30 THEN amount_spent ELSE 0 END) AS \`30\`,
            SUM(CASE WHEN DAY(createdAt)=31 THEN amount_spent ELSE 0 END) AS \`31\`

        FROM ps_n_5_expenditure_samanya

        WHERE ${whereClause}

        GROUP BY year, month, main_reason, reason_of_expenditure

    ) t

    GROUP BY year, month, main_reason

) final

GROUP BY year, month

-- ✅ Financial Year ordering (April → March)
ORDER BY 
    CASE 
        WHEN month >= 4 THEN year
        ELSE year - 1
    END,
    CASE 
        WHEN month >= 4 THEN month - 3
        ELSE month + 9
    END;
`;

  return runQuery(pool, q, params);
},
};

module.exports = namuna6CModel;
