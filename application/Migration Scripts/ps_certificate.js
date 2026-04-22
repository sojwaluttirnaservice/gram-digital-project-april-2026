const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_certificate = sequelize.define(
  "ps_certificate",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    // holder name
    certificateHolderNameE: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    certificateHolderNameM: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    // aadhar
    certificateAadharE: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    certificateAadharM: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    // village
    certificateVillageE: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    certificateVillageM: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    // taluka
    certificateTalukaE: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    certificateTalukaM: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    // district
    certificateDistE: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    certificateDistM: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    // created date
    created_date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },

    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },

    ps_payment_information_id_fk: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
  },
  {
    timestamps: true,
  },
);

module.exports = ps_certificate;
