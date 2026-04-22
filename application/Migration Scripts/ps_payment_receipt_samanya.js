const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");



// this is for hanlding the entries 
const ps_payment_receipt_samanya = sequelize.define(
  "ps_payment_receipt_samanya",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    ps_payment_information_id_fk: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    malmatta_no: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    recipient_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },

    payment_number: {
      type: Sequelize.STRING(100),
      defaultValue: "0",
    },

    payment_medium: {
      type: Sequelize.STRING(40),
      allowNull: true,
    },

    transaction_number: {
      type: Sequelize.STRING(60),
      defaultValue: "0",
    },

    check_no: {
      type: Sequelize.STRING(20),
      allowNull: true,
      unique: true,
    },

    // DD -Demand Draft is basically a prepaid cheque issued by a bank
    demand_draft_no: {
      type: Sequelize.STRING(20),
      allowNull: true,
      unique: true,
    },

    rtgs_no: {
      type: Sequelize.STRING(20),
      allowNull: true,
      unique: true,
    },

    other_id: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },

    other_id_name: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    // was paid by other than gp person i.e. the end user or other
    // -------------------
    was_paid_by_dharak: {
      type: Sequelize.ENUM("YES", "NO"),
      defaultValue: "NO",
    },

    approval_status: {
      type: Sequelize.ENUM("PENDING", "APPROVED", "REJECTED"),
      defaultValue: null,
    },

    approval_date: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
    // -----------------

    payment_amount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    payment_date: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },

    paymet_time: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },

    payment_for: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },


    payment_for_desc: {
        type: Sequelize.STRING,
        allowNull: true
    },

    payment_type: {
        type: Sequelize.ENUM("CERTIFICATE", "TAX"),
        allowNull: true,
        comment: "Defines whether payment is for certificate or tax",
    },

    tax_category: {
        type: Sequelize.ENUM("SAMANYA", "PANI"),
        allowNull: true,
        comment: "Applicable only for tax-related payments",
    },

    reason_in_words: {
      type: Sequelize.STRING(75),
      allowNull: true,
    },

    payment_screenshot_image_name: {
      type: Sequelize.STRING(120), // Slightly increased limit for longer names
      allowNull: true, // Allows it to be empty when no image is uploaded
      defaultValue: null, // More meaningful than '0'
    },

    // 0 MEANS OFFLINE PAYMENT,
    // 1 MEANS ONLINE PAYMENT
    payment_mode: {
      type: Sequelize.TINYINT,
      allowNull: false,
      comment: "0 = OFFLINE, 1 = ONLINE ",
    },

    ps_bank_details_id_fk: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: "Foreign key referencing ps_bank_details.id for online payments",
    },


    // copied from ps_tax_payer_list_samanya
    form_nine_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    tpl_lastBuildingTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_currentBuildingTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_totalBuildingTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_lastDivaTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_currentDivaTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_totalDivaTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_lastArogyaTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_currentArogyaTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_totalArogyaTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_lastCleaningTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_currentCleaningTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_totalCleaningTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_lastFireblegateTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_currentFireblegateTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_totalFireblegateTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_lastTreeTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_currentTreeTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_totalTreeTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_lastEducationTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_currentEducationTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_totalEducationTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_lastTaxFine: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_lastTaxRelief: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_totalTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    tpl_totalSampurnaTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    


    created_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        tpl_bharnaDate: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        tpl_amountInWords: {
            type: Sequelize.TEXT('long'),
            allowNull: false,
        },
        payment_id: {
            type: Sequelize.STRING(255),
            defaultValue: '-',
        },
        order_id: {
            type: Sequelize.STRING(255),
            defaultValue: '-',
        },
        mobile: {
            type: Sequelize.STRING(100),
            defaultValue: '-',
        },
        checkNo: {
            type: Sequelize.STRING(255),
            defaultValue: null,
        },
        ps_tax_payer_list_samanyacol: {
            type: Sequelize.STRING(45),
            defaultValue: null,
        },

    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },

    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {

    indexes: [
      { fields: ["malmatta_no"] }, // common filter by malmatta_no
      { fields: ["recipient_name"] }, // search by recipient
      { fields: ["payment_number"] }, // unique payments
      { fields: ["transaction_number"] }, // unique transaction
      { fields: ["payment_for"] }, // filter by type of payment
      { fields: ["approval_status"] }, // filter by approval status
      { fields: ["payment_date"] }, // filtering by date
    ],
  },
);

module.exports = ps_payment_receipt_samanya;


/**

-- ============================================
-- STEP 1: PREVIEW (SAFE CHECK - NO CHANGES)
-- ============================================
SELECT *
FROM `g-seva_uat`.`ps_payment_information` src
WHERE src.tax_category = 'SAMANYA'
AND NOT EXISTS (
    SELECT 1
    FROM `g-seva_uat`.`ps_payment_receipt_samanya` dest
    WHERE dest.ps_payment_information_id_fk = src.id
);

-- ============================================
-- STEP 2: SAFE INSERT (WITH TRANSACTION)
-- ============================================
START TRANSACTION;

INSERT INTO `g-seva_uat`.`ps_payment_receipt_samanya` (
    ps_payment_information_id_fk,
    malmatta_no,
    recipient_name,
    payment_number,
    payment_medium,
    transaction_number,
    check_no,
    demand_draft_no,
    rtgs_no,
    other_id,
    other_id_name,
    was_paid_by_dharak,
    approval_status,
    approval_date,
    payment_amount,
    payment_date,
    paymet_time,
    payment_for,
    payment_for_desc,
    payment_type,
    tax_category,
    reason_in_words,
    payment_screenshot_image_name,
    payment_mode,
    ps_bank_details_id_fk
)
SELECT
    src.id,
    src.malmatta_no,
    src.recipient_name,
    src.payment_number,
    src.payment_medium,
    src.transaction_number,
    src.check_no,
    src.demand_draft_no,
    src.rtgs_no,
    src.other_id,
    src.other_id_name,
    src.was_paid_by_dharak,
    src.approval_status,
    src.approval_date,
    src.payment_amount,
    src.payment_date,
    src.paymet_time,
    src.payment_for,
    src.payment_for_desc,
    src.payment_type,
    src.tax_category,
    src.reason_in_words,
    src.payment_screenshot_image_name,
    src.payment_mode,
    src.ps_bank_details_id_fk
FROM `g-seva_uat`.`ps_payment_information` src
WHERE src.tax_category = 'SAMANYA'
AND NOT EXISTS (
    SELECT 1
    FROM `g-seva_uat`.`ps_payment_receipt_samanya` dest
    WHERE dest.ps_payment_information_id_fk = src.id
);

-- Check how many rows were inserted
SELECT ROW_COUNT() AS inserted_rows;

-- ✅ If correct → COMMIT
COMMIT;

-- ❌ If something is wrong → run this instead of COMMIT
-- ROLLBACK;


 */



// ===============
/**

START TRANSACTION;

UPDATE `g-seva_uat`.`ps_payment_receipt_samanya` r

JOIN `g-seva_uat`.`ps_tax_payer_list_samanya` t
ON t.ps_payment_information_id_fk = r.ps_payment_information_id_fk

SET
    r.form_nine_id = t.form_nine_id,
    r.user_id = t.user_id,

    r.tpl_lastBuildingTax = t.tpl_lastBuildingTax,
    r.tpl_currentBuildingTax = t.tpl_currentBuildingTax,
    r.tpl_totalBuildingTax = t.tpl_totalBuildingTax,

    r.tpl_lastDivaTax = t.tpl_lastDivaTax,
    r.tpl_currentDivaTax = t.tpl_currentDivaTax,
    r.tpl_totalDivaTax = t.tpl_totalDivaTax,

    r.tpl_lastArogyaTax = t.tpl_lastArogyaTax,
    r.tpl_currentArogyaTax = t.tpl_currentArogyaTax,
    r.tpl_totalArogyaTax = t.tpl_totalArogyaTax,

    r.tpl_lastCleaningTax = t.tpl_lastCleaningTax,
    r.tpl_currentCleaningTax = t.tpl_currentCleaningTax,
    r.tpl_totalCleaningTax = t.tpl_totalCleaningTax,

    r.tpl_lastFireblegateTax = t.tpl_lastFireblegateTax,
    r.tpl_currentFireblegateTax = t.tpl_currentFireblegateTax,
    r.tpl_totalFireblegateTax = t.tpl_totalFireblegateTax,

    r.tpl_lastTreeTax = t.tpl_lastTreeTax,
    r.tpl_currentTreeTax = t.tpl_currentTreeTax,
    r.tpl_totalTreeTax = t.tpl_totalTreeTax,

    r.tpl_lastEducationTax = t.tpl_lastEducationTax,
    r.tpl_currentEducationTax = t.tpl_currentEducationTax,
    r.tpl_totalEducationTax = t.tpl_totalEducationTax,

    r.tpl_lastTaxFine = t.tpl_lastTaxFine,
    r.tpl_lastTaxRelief = t.tpl_lastTaxRelief,
    r.tpl_totalTax = t.tpl_totalTax,
    r.tpl_totalSampurnaTax = t.tpl_totalSampurnaTax,

    r.created_date = t.created_date,
    r.tpl_bharnaDate = t.tpl_bharnaDate,
    r.tpl_amountInWords = t.tpl_amountInWords,

    r.payment_id = t.payment_id,
    r.order_id = t.order_id,
    r.mobile = t.mobile,
    r.checkNo = t.checkNo

-- 🔒 Only update "empty" records (your logic = 0)
WHERE r.form_nine_id = 0 AND r.id > 0;

-- Check affected rows
SELECT ROW_COUNT() AS updated_rows;

COMMIT;

-- ❌ If needed
-- ROLLBACK;

 */