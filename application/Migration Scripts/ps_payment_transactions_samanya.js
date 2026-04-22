const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_payment_transactions_samanya = sequelize.define(
  "ps_payment_transactions_samanya",
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    ps_bank_details_id_fk: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },

    before_amount: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
    },

    amount: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    type: {
      type: Sequelize.ENUM("DEBIT", "CREDIT"),
      allowNull: false,
    },

    payment_mode: {
      type: Sequelize.ENUM("ONLINE", "CASH"),
      allowNull: false,
    },

    debit_main_reason: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    debit_sub_reason: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    after_amount: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
    },

    transaction_date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },

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
    timestamps: true, // ❗ IMPORTANT

    indexes: [
      {
        name: "idx_txn_date",
        fields: ["transaction_date"],
      },
      {
        name: "idx_txn_type",
        fields: ["type"],
      },
      {
        name: "idx_bank_txn_date",
        fields: ["ps_bank_details_id_fk", "transaction_date"],
      },
    ],
  },
);

module.exports = ps_payment_transactions_samanya;
