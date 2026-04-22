const {
  INTEGER,
  STRING,
  BIGINT,
  DATE,
  literal,
  DATEONLY,
} = require("sequelize");
const sequelize = require("../../../config/db-connect-migration");

// this is for settlement of the values
const ps_namuna_5k_samanya = sequelize.define(
  "ps_namuna_5k_samanya",
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "Primary key - Unique identifier for each record",
    },

    ps_bank_details_id_fk: {
      type: INTEGER,
      allowNull: true,
      comment: "Foreign key linking to bank details table",
    },

    payment_from_date: {
      type: DATEONLY,
      allowNull: true,
      comment: "Start date of the transaction period covered in this payment",
    },

    payment_upto_date: {
      type: DATEONLY,
      allowNull: false,
      comment: "End date of the transaction period covered in this payment",
    },

    actual_cash_outstanding: {
      type: BIGINT,
      allowNull: true,
      comment: "Total cash amount that was expected to be deposited",
    },

    deposited_cash_amount: {
      type: BIGINT,
      allowNull: true,
      comment: "Actual cash amount deposited",
    },

    amount_not_paid: {
      type: BIGINT,
      allowNull: true,
      comment:
        "Remaining unpaid amount (actual_cash_outstanding - deposited_cash_amount)",
    },

    receipt_file_name: {
      type: STRING(200),
      allowNull: true,
      comment: "File name of the uploaded receipt as proof of deposit",
    },

    createdAt: {
      type: DATE,
      allowNull: false,
      defaultValue: literal("CURRENT_TIMESTAMP"),
      comment: "Timestamp when the record was created",
    },

    updatedAt: {
      type: DATE,
      allowNull: false,
      defaultValue: literal("CURRENT_TIMESTAMP"),
      comment: "Timestamp when the record was last updated",
    },
  },
  {
    timestamps: true,
    tableName: "ps_namuna_5k_samanya",
    comment:
      "Stores cash deposit details, including outstanding amount, deposited amount, and pending balance",
  },
);

module.exports = ps_namuna_5k_samanya;
