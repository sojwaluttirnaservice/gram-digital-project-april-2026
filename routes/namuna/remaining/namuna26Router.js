const namuna26Controller = require("../../../application/controllers/namuna/remaining/namuna26Controller");
const getRouter = require("../../../application/utils/getRouter");

const namuna26Router = getRouter()

namuna26Router.get(
    '/kh/print',
    namuna26Controller.renderNamuna26khPrintPage
)

module.exports = namuna26Router


/*
WITH RECURSIVE months AS (
    SELECT 4 AS month_num, 1 AS idx
    UNION ALL
    SELECT
        CASE WHEN month_num = 12 THEN 1 ELSE month_num + 1 END,
        idx + 1
    FROM months
    WHERE idx < 12
),

income AS (
    SELECT
        ps_bank_details_id_fk,
        MONTH(payment_date) AS mn,
        SUM(payment_amount) AS total_in
    FROM `g-seva_uat`.`ps_payment_receipt_samanya`
    WHERE payment_mode = 1
      AND payment_date BETWEEN '2026-04-01' AND '2027-03-31'
    GROUP BY ps_bank_details_id_fk, MONTH(payment_date)
),

expense AS (
    SELECT
        ps_bank_details_id_fk,
        MONTH(payment_date) AS mn,
        SUM(amount_spent) AS total_out
    FROM `g-seva_uat`.`ps_n_5_expenditure_samanya`
    WHERE payment_date BETWEEN '2026-04-01' AND '2027-03-31'
    GROUP BY ps_bank_details_id_fk, MONTH(payment_date)
)

SELECT
    b.id AS bank_id,

    CASE
        WHEN m.month_num >= 4 THEN m.month_num - 3
        ELSE m.month_num + 9
    END AS fy_month_order,

    m.month_num AS calendar_month,

    COALESCE(i.total_in, 0) AS total_in,
    COALESCE(e.total_out, 0) AS total_out,

    b.account_balance AS closing_balance,

    (COALESCE(i.total_in, 0) - COALESCE(e.total_out, 0)) AS net_flow

FROM `g-seva_uat`.`ps_bank_details` b

CROSS JOIN months m

LEFT JOIN income i
    ON i.ps_bank_details_id_fk = b.id
    AND i.mn = m.month_num

LEFT JOIN expense e
    ON e.ps_bank_details_id_fk = b.id
    AND e.mn = m.month_num

ORDER BY fy_month_order, b.id;
*/