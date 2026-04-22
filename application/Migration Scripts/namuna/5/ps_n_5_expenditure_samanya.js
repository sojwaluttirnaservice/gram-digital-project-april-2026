const {
  INTEGER,
  STRING,
  BIGINT,
  DATE,
  literal,
  DATEONLY,
} = require("sequelize");
const sequelize = require("../../../config/db-connect-migration");

const ps_n_5_expenditure_samanya = sequelize.define(
  "ps_n_5_expenditure_samanya",
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

    payment_date: {
      type: DATEONLY,
      allowNull: false,
      comment: "End date of the transaction period covered in this payment",
    },

    available_account_balance: {
      type: BIGINT.UNSIGNED,
      allowNull: false,
      comment: "Account balance by the time of expenditure",
      get() {
        const val = this.getDataValue("available_account_balance");
        return val ? val.toString() : null;
      },
    },

    remaining_account_balance: {
      type: BIGINT.UNSIGNED,
      allowNull: false,
      comment: "Remaining account balance after expenditure",
      get() {
        const val = this.getDataValue("remaining_account_balance");
        return val ? val.toString() : null;
      },
    },

    amount_spent: {
      type: BIGINT.UNSIGNED,
      allowNull: false,
      comment: "Actual cash amount spent (खर्च केलेला रक्कम)",
      get() {
        const val = this.getDataValue("amount_spent");
        return val ? val.toString() : null;
      },
    },

    check_no: {
      type: STRING(200),
      allowNull: true,
      comment: "Check number used for the payment, if any",
    },

    voucher_number: {
      type: STRING(50),
      allowNull: false,
      comment: "Unique voucher number for this transaction",
    },

    payment_reciever: {
      type: STRING(150),
      allowNull: false,
      comment: "Name of the person receiving the payment",
    },

    // main reason
    main_reason: {
        type: STRING(50),
        allowNull: false,
        comment: "मुख्य कारण."
    },
    
    // this could be treated as subreason
    reason_of_expenditure: {
      type: STRING(255),
      allowNull: false,
      comment: "Purpose or reason for this expenditure",
    },

    ledger_title: {
      type: STRING(150),
      allowNull: false,
      comment: "Name of the ledger/account (लेखाशीर्षक) for this transaction",
    },


    // not needed now, just in case if needed later
    receipt_file_name: {
      type: STRING(200),
      allowNull: true,
      comment: "File name of the uploaded receipt as proof of payment",
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
    tableName: "ps_n_5_expenditure_samanya",
    comment:
      "Stores expenditure details, including actual spent amount, voucher info, ledger account, and balances",
  },
);

module.exports = ps_n_5_expenditure_samanya;
