const { Sequelize } = require("sequelize");
const sequelize = require("../../../config/db-connect-migration");

const ps_n_5_pani_reasons = sequelize.define(
  "ps_n_5_pani_reasons",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    tax_category: {
      type: Sequelize.ENUM("PANI"),
      allowNull: true,
      comment: "Applicable only for tax-related payments",
    },

    certificate_category: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: "CERTIFICATE"
    },

    main_reason: {
        type: Sequelize.STRING(50),
        allowNull: true
    },

    reason_in_words: {
      type: Sequelize.STRING(50), // usually short text
      allowNull: true,
    },

    simple_id: {
        type: Sequelize.TINYINT,
        allowNull: true,
        // this is null for now
    },

    // Created and Updated timestamps
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },

    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP",
      ),
    },
  },
  {
    timestamps: true,
    comment: "नमुना ५ पाणी कारण",
  },
);

module.exports = ps_n_5_pani_reasons;
