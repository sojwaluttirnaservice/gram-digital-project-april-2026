const { Sequelize } = require("sequelize");
const sequelize = require("../../../config/db-connect-migration");

const ps_n_5_samanya_reasons = sequelize.define(
  "ps_n_5_samanya_reasons",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    tax_category: {
      type: Sequelize.ENUM("SAMANYA"),
      allowNull: true,
      comment: "Applicable only for tax-related payments",
    },

    certificate_category: {
      type: Sequelize.STRING(20),
      allowNull: true,
      defaultValue: "CERTIFICATE",
    },

    main_reason: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },

    // subreason
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
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: true,
    comment: "नमुना ५ सामान्य कारण",
    indexes: [
      {
        unique: true,
        fields: ["tax_category", "main_reason", "reason_in_words"],
        name: "uq_n5_sam_reasons",
      },
    ],
  },
);

module.exports = ps_n_5_samanya_reasons;
