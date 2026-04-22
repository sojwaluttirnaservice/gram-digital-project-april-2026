const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_certificate_mobile = sequelize.define(
  "ps_certificate_mobile",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    certificate_title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    certificate_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    input_1: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    input_2: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    holder_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    holder_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    certificate_status: {
      type: Sequelize.INTEGER,
      defaultValue: "0",
    },
    certificate_url: {
      type: Sequelize.STRING(1024),
      defaultValue: "-",
    },
    certificate_message: {
      type: Sequelize.STRING(45),
      defaultValue: "-",
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = ps_certificate_mobile;
