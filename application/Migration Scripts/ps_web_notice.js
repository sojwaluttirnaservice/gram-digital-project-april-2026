const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_web_notice = sequelize.define(
  "ps_web_notice",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    wn_notice_name: { type: Sequelize.TEXT("long"), allowNull: false },
    wn_show: { type: Sequelize.INTEGER, allowNull: false, defaultValue: "1" },
    created_date: { type: Sequelize.DATEONLY, allowNull: false },
  },
  {
    createdAt: false,
    modifiedAt: false,
  },
);
module.exprts = ps_web_notice;
