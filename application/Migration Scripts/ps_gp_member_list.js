const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_gp_member_list = sequelize.define(
  "ps_gp_member_list",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fAadhar: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fMobile: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fAltMobile: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fOccupation: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fEmail: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fDob: {
      type: Sequelize.DATEONLY,
    },
    fBloodGroup: {
      type: Sequelize.STRING,
    },
    fVillage: {
      type: Sequelize.STRING,
    },
    fImage: {
      type: Sequelize.STRING,
    },
    fPassword: {
      type: Sequelize.STRING,
    },

    has_aabha_card: {
      type: Sequelize.ENUM("YES", "NO"),
    },

    aabha_card_number: {
      type: Sequelize.STRING,
    },

    has_ayushman_card: {
      type: Sequelize.ENUM("YES", "NO"),
    },

    ayushman_card_number: {
      type: Sequelize.STRING,
    },

    ayushman_bharat_yojana_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    // New columns for apps
    has_downloaded_meri_gram_panchayat_app: {
      type: Sequelize.ENUM("YES", "NO"),
      allowNull: true,
    },

    has_downloaded_panchayat_decision_app: {
      type: Sequelize.ENUM("YES", "NO"),
      allowNull: true,
    },

    has_downloaded_gram_samvad_app: {
      type: Sequelize.ENUM("YES", "NO"),
      allowNull: true,
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },

    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: true,
  },
);
module.exports = ps_gp_member_list;
