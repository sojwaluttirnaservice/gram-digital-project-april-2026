const { Sequelize } = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_namuna_7 = sequelize.define(
  "ps_namuna_7",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    recipient_name: {
      type: Sequelize.STRING(100), // max 100 chars
      allowNull: false,
    },

    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },

    ps_payment_information_id_fk: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },

    ps_payment_receipt_samanya_id_fk: {
        type: Sequelize.INTEGER,
      allowNull: true,
    },

    // taking the same field name as the ps_payment_information so we can later map it in he ps_payment_information in case if needed,
    // and the below field reason_in_words will store the word data in case needed(its optional) e.g. if payment_for = 7 and 7 means निविदा फी, so reason_in_words will store निविदा फी,
    // this reason_in_words in in case needed
    payment_for: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0, // changed from string to number
      validate: {
        min: 0,
        max: 100,
      },
    },

    payment_for_desc: {
        type: Sequelize.STRING,
        allowNull: true
    },

    payment_type: {
        type: Sequelize.ENUM("CERTIFICATE", "TAX"),
        allowNull: false,
        comment: "Defines whether payment is for certificate or tax",
    },

    tax_category: {
        type: Sequelize.ENUM("SAMANYA", "PANI"),
        allowNull: true,
        comment: "Applicable only for tax-related payments",
    },

    reason_in_words: {
      type: Sequelize.STRING(50), // usually short text
      allowNull: true,
    },

    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      comment: "Amount received",
    },

    payment_medium: {
      type: Sequelize.ENUM(
        "CASH",
        "CHEQUE",
        "DEMAND_DRAFT",
        "RTGS",
        "UPI",
        "OTHER",
      ),
      allowNull: false,
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

    transaction_number: {
        type: Sequelize.STRING(100),
        allowNull: true
    },

    other_id: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },

    other_id_name: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },

    // Created and Updated timestamps
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },

    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: true,
    comment: "नमुना ७",
    indexes: [
      { fields: ["ps_payment_information_id_fk"] }, // for fast joins
      { fields: ["payment_for"] }, // for filtering by payment type
      { fields: ["check_no"], unique: true },
      { fields: ["demand_draft_no"], unique: true },
      { fields: ["rtgs_no"], unique: true },
      { fields: ["transaction_number"] },
    ],
  },
);

module.exports = ps_namuna_7;
