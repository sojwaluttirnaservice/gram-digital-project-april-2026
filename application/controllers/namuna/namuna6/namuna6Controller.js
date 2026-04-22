const namuna6CModel = require("../../../model/namuna/namuna6Model");
const asyncHandler = require("../../../utils/asyncHandler");
const { renderPage } = require("../../../utils/sendResponse");

const namuna6Controller = {
  renderNamuna6Print: asyncHandler(async (req, res) => {
    const { report, date, month, year, fromYear, toYear } = req.query;

    const collectionList = await namuna6CModel.collectionList(res.pool, {
        date, month, year, fromYear, toYear 
    });

    let isCollection = report == "collection";

    const expenditureList = await namuna6CModel.expenditureList(res.pool, {
        date, month, year, fromYear, toYear 
    })

    const _renderPage = isCollection
      ? "namuna-6-collection-print"
      : "namuna-6-expenditure-print";

    console.log(collectionList);
    // console.log(expenditureList)


    renderPage(res, `user/namuna/namuna6/${_renderPage}.pug`, {
      collectionList,
      expenditureList,
      date,
      month,
      year,
      fromYear, 
      toYear
    });
  }),
};

module.exports = namuna6Controller;

/**
//  3rd query
SELECT 
    tax_type AS `Tax Name`,

    SUM(CASE WHEN day = 1 THEN amount ELSE 0 END) AS `1`,
    SUM(CASE WHEN day = 2 THEN amount ELSE 0 END) AS `2`,
    SUM(CASE WHEN day = 3 THEN amount ELSE 0 END) AS `3`,
    SUM(CASE WHEN day = 4 THEN amount ELSE 0 END) AS `4`,
    SUM(CASE WHEN day = 5 THEN amount ELSE 0 END) AS `5`,
    SUM(CASE WHEN day = 6 THEN amount ELSE 0 END) AS `6`,
    SUM(CASE WHEN day = 7 THEN amount ELSE 0 END) AS `7`,
    SUM(CASE WHEN day = 8 THEN amount ELSE 0 END) AS `8`,
    SUM(CASE WHEN day = 9 THEN amount ELSE 0 END) AS `9`,
    SUM(CASE WHEN day = 10 THEN amount ELSE 0 END) AS `10`,
    SUM(CASE WHEN day = 11 THEN amount ELSE 0 END) AS `11`,
    SUM(CASE WHEN day = 12 THEN amount ELSE 0 END) AS `12`,
    SUM(CASE WHEN day = 13 THEN amount ELSE 0 END) AS `13`,
    SUM(CASE WHEN day = 14 THEN amount ELSE 0 END) AS `14`,
    SUM(CASE WHEN day = 15 THEN amount ELSE 0 END) AS `15`,
    SUM(CASE WHEN day = 16 THEN amount ELSE 0 END) AS `16`,
    SUM(CASE WHEN day = 17 THEN amount ELSE 0 END) AS `17`,
    SUM(CASE WHEN day = 18 THEN amount ELSE 0 END) AS `18`,
    SUM(CASE WHEN day = 19 THEN amount ELSE 0 END) AS `19`,
    SUM(CASE WHEN day = 20 THEN amount ELSE 0 END) AS `20`,
    SUM(CASE WHEN day = 21 THEN amount ELSE 0 END) AS `21`,
    SUM(CASE WHEN day = 22 THEN amount ELSE 0 END) AS `22`,
    SUM(CASE WHEN day = 23 THEN amount ELSE 0 END) AS `23`,
    SUM(CASE WHEN day = 24 THEN amount ELSE 0 END) AS `24`,
    SUM(CASE WHEN day = 25 THEN amount ELSE 0 END) AS `25`,
    SUM(CASE WHEN day = 26 THEN amount ELSE 0 END) AS `26`,
    SUM(CASE WHEN day = 27 THEN amount ELSE 0 END) AS `27`,
    SUM(CASE WHEN day = 28 THEN amount ELSE 0 END) AS `28`,
    SUM(CASE WHEN day = 29 THEN amount ELSE 0 END) AS `29`,
    SUM(CASE WHEN day = 30 THEN amount ELSE 0 END) AS `30`,
    SUM(CASE WHEN day = 31 THEN amount ELSE 0 END) AS `31`

FROM (
    SELECT 
        DAY(p.payment_date) AS day,
        'मालमत्ता कर' AS tax_type,
        (p.tpl_lastBuildingTax + p.tpl_currentBuildingTax) AS amount,
        p.approval_status,
        p.payment_date
    FROM `g-seva_uat`.`ps_payment_receipt_samanya` p

    UNION ALL

    SELECT 
        DAY(p.payment_date),
        'दिवाबत्ती कर',
        (p.tpl_lastDivaTax + p.tpl_currentDivaTax),
        p.approval_status,
        p.payment_date
    FROM `g-seva_uat`.`ps_payment_receipt_samanya` p

    UNION ALL

    SELECT 
        DAY(p.payment_date),
        'आरोग्य कर',
        (p.tpl_lastArogyaTax + p.tpl_currentArogyaTax),
        p.approval_status,
        p.payment_date
    FROM `g-seva_uat`.`ps_payment_receipt_samanya` p

    UNION ALL

    SELECT 
        DAY(p.payment_date),
        'स्वच्छता कर',
        (p.tpl_lastCleaningTax + p.tpl_currentCleaningTax),
        p.approval_status,
        p.payment_date
    FROM `g-seva_uat`.`ps_payment_receipt_samanya` p

) t

WHERE 
    (t.approval_status = 'APPROVED' OR t.approval_status IS NULL)
    AND t.payment_date BETWEEN '2026-04-01' AND '2026-04-30'

GROUP BY tax_type
ORDER BY tax_type;
 */

/**

// 2nd query
// CORRECT QUERY

SELECT 
    TRIM(tax_type) AS `Tax Name`,

    COALESCE(SUM(CASE WHEN day = 1 THEN amount END), 0) AS `1`,
    COALESCE(SUM(CASE WHEN day = 2 THEN amount END), 0) AS `2`,
    COALESCE(SUM(CASE WHEN day = 3 THEN amount END), 0) AS `3`,
    COALESCE(SUM(CASE WHEN day = 4 THEN amount END), 0) AS `4`,
    COALESCE(SUM(CASE WHEN day = 5 THEN amount END), 0) AS `5`,
    COALESCE(SUM(CASE WHEN day = 6 THEN amount END), 0) AS `6`,
    COALESCE(SUM(CASE WHEN day = 7 THEN amount END), 0) AS `7`,
    COALESCE(SUM(CASE WHEN day = 8 THEN amount END), 0) AS `8`,
    COALESCE(SUM(CASE WHEN day = 9 THEN amount END), 0) AS `9`,
    COALESCE(SUM(CASE WHEN day = 10 THEN amount END), 0) AS `10`,
    COALESCE(SUM(CASE WHEN day = 11 THEN amount END), 0) AS `11`,
    COALESCE(SUM(CASE WHEN day = 12 THEN amount END), 0) AS `12`,
    COALESCE(SUM(CASE WHEN day = 13 THEN amount END), 0) AS `13`,
    COALESCE(SUM(CASE WHEN day = 14 THEN amount END), 0) AS `14`,
    COALESCE(SUM(CASE WHEN day = 15 THEN amount END), 0) AS `15`,
    COALESCE(SUM(CASE WHEN day = 16 THEN amount END), 0) AS `16`,
    COALESCE(SUM(CASE WHEN day = 17 THEN amount END), 0) AS `17`,
    COALESCE(SUM(CASE WHEN day = 18 THEN amount END), 0) AS `18`,
    COALESCE(SUM(CASE WHEN day = 19 THEN amount END), 0) AS `19`,
    COALESCE(SUM(CASE WHEN day = 20 THEN amount END), 0) AS `20`,
    COALESCE(SUM(CASE WHEN day = 21 THEN amount END), 0) AS `21`,
    COALESCE(SUM(CASE WHEN day = 22 THEN amount END), 0) AS `22`,
    COALESCE(SUM(CASE WHEN day = 23 THEN amount END), 0) AS `23`,
    COALESCE(SUM(CASE WHEN day = 24 THEN amount END), 0) AS `24`,
    COALESCE(SUM(CASE WHEN day = 25 THEN amount END), 0) AS `25`,
    COALESCE(SUM(CASE WHEN day = 26 THEN amount END), 0) AS `26`,
    COALESCE(SUM(CASE WHEN day = 27 THEN amount END), 0) AS `27`,
    COALESCE(SUM(CASE WHEN day = 28 THEN amount END), 0) AS `28`,
    COALESCE(SUM(CASE WHEN day = 29 THEN amount END), 0) AS `29`,
    COALESCE(SUM(CASE WHEN day = 30 THEN amount END), 0) AS `30`,
    COALESCE(SUM(CASE WHEN day = 31 THEN amount END), 0) AS `31`

FROM (

    SELECT 
        DAY(STR_TO_DATE(payment_date, '%Y-%m-%d')) AS day,
        'मालमत्ता कर' AS tax_type,
        COALESCE(tpl_lastBuildingTax,0) + COALESCE(tpl_currentBuildingTax,0) AS amount
    FROM `g-seva_uat`.`ps_payment_receipt_samanya`
    WHERE 
        (approval_status = 'APPROVED' OR approval_status IS NULL)
        AND STR_TO_DATE(payment_date, '%Y-%m-%d')
            BETWEEN '2026-04-01' AND '2026-04-30'

    UNION ALL

    SELECT 
        DAY(STR_TO_DATE(payment_date, '%Y-%m-%d')) AS day,
        'दिवाबत्ती कर' AS tax_type,
        COALESCE(tpl_lastDivaTax,0) + COALESCE(tpl_currentDivaTax,0)
    FROM `g-seva_uat`.`ps_payment_receipt_samanya`
    WHERE 
        (approval_status = 'APPROVED' OR approval_status IS NULL)
        AND STR_TO_DATE(payment_date, '%Y-%m-%d')
            BETWEEN '2026-04-01' AND '2026-04-30'

    UNION ALL

    SELECT 
        DAY(STR_TO_DATE(payment_date, '%Y-%m-%d')) AS day,
        'आरोग्य कर' AS tax_type,
        COALESCE(tpl_lastArogyaTax,0) + COALESCE(tpl_currentArogyaTax,0)
    FROM `g-seva_uat`.`ps_payment_receipt_samanya`
    WHERE 
        (approval_status = 'APPROVED' OR approval_status IS NULL)
        AND STR_TO_DATE(payment_date, '%Y-%m-%d')
            BETWEEN '2026-04-01' AND '2026-04-30'

    UNION ALL

    SELECT 
        DAY(STR_TO_DATE(payment_date, '%Y-%m-%d')) AS day,
        'स्वच्छता कर' AS tax_type,
        COALESCE(tpl_lastCleaningTax,0) + COALESCE(tpl_currentCleaningTax,0)
    FROM `g-seva_uat`.`ps_payment_receipt_samanya`
    WHERE 
        (approval_status = 'APPROVED' OR approval_status IS NULL)
        AND STR_TO_DATE(payment_date, '%Y-%m-%d')
            BETWEEN '2026-04-01' AND '2026-04-30'

) t

GROUP BY tax_type
ORDER BY tax_type;
 */

/**

SELECT 
    d.day,

    -- मालमत्ता कर
    COALESCE(SUM(
        COALESCE(p.tpl_lastBuildingTax,0) + 
        COALESCE(p.tpl_currentBuildingTax,0)
    ), 0) AS buildingTax,

    -- दिवाबत्ती कर
    COALESCE(SUM(
        COALESCE(p.tpl_lastDivaTax,0) + 
        COALESCE(p.tpl_currentDivaTax,0)
    ), 0) AS divaTax,

    -- आरोग्य कर
    COALESCE(SUM(
        COALESCE(p.tpl_lastArogyaTax,0) + 
        COALESCE(p.tpl_currentArogyaTax,0)
    ), 0) AS arogyaTax,

    -- स्वच्छता कर
    COALESCE(SUM(
        COALESCE(p.tpl_lastCleaningTax,0) + 
        COALESCE(p.tpl_currentCleaningTax,0)
    ), 0) AS cleaningTax,

    -- दंड कर
    COALESCE(SUM(
        COALESCE(p.tpl_lastTaxFine,0)
    ), 0) AS fineTax

FROM
(
    SELECT 1 AS day UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL
    SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL
    SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL
    SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL
    SELECT 13 UNION ALL SELECT 14 UNION ALL SELECT 15 UNION ALL
    SELECT 16 UNION ALL SELECT 17 UNION ALL SELECT 18 UNION ALL
    SELECT 19 UNION ALL SELECT 20 UNION ALL SELECT 21 UNION ALL
    SELECT 22 UNION ALL SELECT 23 UNION ALL SELECT 24 UNION ALL
    SELECT 25 UNION ALL SELECT 26 UNION ALL SELECT 27 UNION ALL
    SELECT 28 UNION ALL SELECT 29 UNION ALL SELECT 30 UNION ALL
    SELECT 31
) d

LEFT JOIN `g-seva_uat`.`ps_payment_receipt_samanya` p
    ON DAY(STR_TO_DATE(p.payment_date, '%Y-%m-%d')) = d.day
    AND STR_TO_DATE(p.payment_date, '%Y-%m-%d') 
        BETWEEN '2025-01-01' AND '2025-01-31'
    AND p.approval_status = 'APPROVED'

GROUP BY d.day
ORDER BY d.day;


 */
