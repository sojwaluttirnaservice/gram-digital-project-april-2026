const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_payment_receipt_pani = sequelize.define(
  "ps_payment_receipt_pani",
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

    // copied from ps_tax_payer_list_pani table
    form_nine_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },

    user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },

    tpl_lastSpacialWaterTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: '0',
    },

    tpl_currentSpacialWaterTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: '0',
    },

    tpl_totalSpacialWaterTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: '0',
    },

    tpl_lastGenealWaterTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: '0',
    },

    tpl_currentGenealWaterTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: '0',
    },

    tpl_totalGenealWaterTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: '0',
    },

    tpl_totalWaterTax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: '0',
    },

    tpl_bharnaDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
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

module.exports = ps_payment_receipt_pani;

/**
-- ============================================
-- STEP 1: PREVIEW (SAFE CHECK - NO CHANGES)
-- ============================================
SELECT *
FROM `g-seva_uat`.`ps_payment_information` src
WHERE src.tax_category = 'PANI'
AND NOT EXISTS (
    SELECT 1
    FROM `g-seva_uat`.`ps_payment_receipt_pani` dest
    WHERE dest.ps_payment_information_id_fk = src.id
);

-- ============================================
-- STEP 2: SAFE INSERT (WITH TRANSACTION)
-- ============================================
START TRANSACTION;

INSERT INTO `g-seva_uat`.`ps_payment_receipt_pani` (
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
WHERE src.tax_category = 'PANI'
AND NOT EXISTS (
    SELECT 1
    FROM `g-seva_uat`.`ps_payment_receipt_pani` dest
    WHERE dest.ps_payment_information_id_fk = src.id
);

-- Check how many rows were inserted
SELECT ROW_COUNT() AS inserted_rows;

-- ✅ If correct → COMMIT
COMMIT;

-- ❌ If something is wrong → run this instead of COMMIT
-- ROLLBACK;
 */


/**

START TRANSACTION;

-- Update `ps_payment_receipt_pani` from `ps_tax_payer_list_pani` using LEFT JOIN
UPDATE `g-seva_uat`.`ps_payment_receipt_pani` AS r
LEFT JOIN `g-seva_uat`.`ps_tax_payer_list_pani` AS t
    ON r.ps_payment_information_id_fk = t.ps_payment_information_id_fk
SET 
    r.form_nine_id = IFNULL(t.form_nine_id, r.form_nine_id),
    r.user_id = IFNULL(t.user_id, r.user_id),
    r.tpl_lastSpacialWaterTax = IFNULL(t.tpl_lastSpacialWaterTax, r.tpl_lastSpacialWaterTax),
    r.tpl_currentSpacialWaterTax = IFNULL(t.tpl_currentSpacialWaterTax, r.tpl_currentSpacialWaterTax),
    r.tpl_totalSpacialWaterTax = IFNULL(t.tpl_totalSpacialWaterTax, r.tpl_totalSpacialWaterTax),
    r.tpl_lastGenealWaterTax = IFNULL(t.tpl_lastGenealWaterTax, r.tpl_lastGenealWaterTax),
    r.tpl_currentGenealWaterTax = IFNULL(t.tpl_currentGenealWaterTax, r.tpl_currentGenealWaterTax),
    r.tpl_totalGenealWaterTax = IFNULL(t.tpl_totalGenealWaterTax, r.tpl_totalGenealWaterTax),
    r.tpl_totalWaterTax = IFNULL(t.tpl_totalWaterTax, r.tpl_totalWaterTax),
    r.tpl_bharnaDate = IFNULL(t.tpl_bharnaDate, r.tpl_bharnaDate),
    r.updatedAt = NOW()
WHERE r.id != -1;

COMMIT;
 */