const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_user_application = sequelize.define(
  "ps_user_application",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    formName: {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: "",
    },

    formMobile: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    formEmail: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    formAddress: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    formAadhar: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },

    docDetails: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    dakhlaCheckColOne: {
      type: Sequelize.STRING(255),
      defaultValue: null,
    },

    dakhlaCheckColTwo: {
      type: Sequelize.STRING(255),
      defaultValue: null,
    },

    documentTypeId: {
      type: Sequelize.BIGINT,
      defaultValue: null,
    },

    documentVerifyDone: {
      type: Sequelize.INTEGER,
      defaultValue: "0",
    },

    docSms: {
      type: Sequelize.TEXT("long"),
      defaultValue: null,
    },

    docRemark: {
      type: Sequelize.ENUM("PENDING", "ACCEPTED", "REJECTED"),
      allowNull: false, // optional, depending on whether you allow nulls
      defaultValue: "PENDING",
    },

    docSmsDate: {
      type: Sequelize.DATEONLY,
    },

    docRemarkDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },

    create_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },

    // reviving the orignal format just in case
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },

    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: true
  },
);
module.exports = ps_user_application;
