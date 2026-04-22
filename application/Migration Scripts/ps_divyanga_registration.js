const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_divyanga_registration = sequelize.define(
  "ps_divyanga_registration",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    education: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    demand: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    mobile: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    type_of_disability: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    percentage_of_disability: {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    shera: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    aadhar_number: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    bank_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    bank_ifsc_code: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    bank_account_number: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    user_image_pathurl: {
      type: Sequelize.STRING(800),
      allowNull: false,
      defaultValue: ''
    },
    application_status: {
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: 0, // 0 Pending , 1- approved , -1 rejected
    },
    application_number: {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    certificate_file_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = ps_divyanga_registration;
