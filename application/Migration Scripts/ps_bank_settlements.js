const {
  INTEGER,
  STRING,
  DATE,
  TEXT,
  ENUM,
  literal,
  BIGINT,
  TINYINT,
} = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_payment_settlements = sequelize.define(
  "ps_payment_settlements",
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "Primary Key - Unique identifier for each settlement record",
    },

    settlement_for: {
      type: ENUM("SAMANYA", "PANI"),
      allowNull: false,
      comment:
        "Indicates which fund category this settlement belongs to. SAMANYA represents general Gram Panchayat revenue (taxes, general payments) while PANI represents water supply related collections. This helps separate financial tracking for different funds.",
    },

    settlement_reference: {
      type: STRING(50),
      allowNull: false,
      comment:
        "System generated settlement reference number (example: SET-SAMANYA-2026-001)",
    },

    bank_details_id_fk: {
      type: INTEGER,
      allowNull: false,
      comment:
        "Foreign key referencing ps_bank_details.id representing the Gram Panchayat bank account where the deposit was made",
    },

    financial_year: {
      type: STRING(10),
      allowNull: false,
      comment: "Financial year for the settlement (example: 2025-26)",
    },

    settlement_upto_date: {
      type: DATE,
      allowNull: false,
      comment:
        "All offline payments collected up to this date are included in this settlement",
    },

    settlement_date: {
      type: DATE,
      allowNull: false,
      comment:
        "Actual date when the collected money was deposited into the bank account",
    },

    settlement_amount: {
      type: BIGINT,
      allowNull: false,
      defaultValue: 0,
      comment: "Total amount deposited into the bank for this settlement",
    },

    outstanding_amount: {
      type: BIGINT,
      allowNull: true,
      comment:
        "Amount that was pending from previous settlements before this deposit",
    },

    pending_amount: {
      type: BIGINT,
      allowNull: true,
      comment: "Remaining amount still not deposited after this settlement",
    },

    transaction_mode: {
      type: ENUM("CASH_DEPOSIT", "CHEQUE_DEPOSIT", "ONLINE_TRANSFER"),
      allowNull: true,
      comment: "Mode used to deposit the money into the bank",
    },

    deposit_slip_number: {
      type: STRING(100),
      allowNull: true,
      comment:
        "Bank challan or deposit slip number provided by the bank during deposit",
    },

    // not thinkgin of it too mcuh now, As soon as we do the entry, its considered as settled
    is_settled: {
        type: TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: "Indicates whether the settlement has been completed and verified. 1 = Settled, 0 = Not Settled",
    },

    receipt_number: {
      type: STRING(100),
      allowNull: true,
      comment: "Internal or bank receipt number for settlement reference",
    },

    receipt_photo: {
      type: STRING(500),
      allowNull: true,
      comment: "Path to uploaded image of bank challan or receipt proof",
    },

    remarks: {
      type: TEXT,
      allowNull: true,
      comment: "Additional notes related to this settlement (optional)",
    },

    created_by: {
      type: INTEGER,
      allowNull: true,
      comment: "User ID of the system operator who recorded this settlement",
    },

    verified_by: {
      type: INTEGER,
      allowNull: true,
      comment: "User ID of authority who verified or approved this settlement",
    },

    verified_at: {
      type: DATE,
      allowNull: true,
      comment: "Timestamp when the settlement was verified",
    },

    is_active: {
      type: TINYINT,
      defaultValue: 1,
      comment:
        "Indicates whether the settlement record is active (used for soft deletion)",
    },

    createdAt: {
      type: DATE,
      allowNull: false,
      defaultValue: literal("CURRENT_TIMESTAMP"),
      comment: "Timestamp when this settlement record was created",
    },

    updatedAt: {
      type: DATE,
      allowNull: false,
      defaultValue: literal("CURRENT_TIMESTAMP"),
      comment: "Timestamp when this settlement record was last updated",
    },
  },
  {
    timestamps: true,
    tableName: "ps_payment_settlements",
    comment:
      "Settlement ledger recording deposits of collected offline payments into Gram Panchayat bank accounts",
  },
);

module.exports = ps_payment_settlements;
