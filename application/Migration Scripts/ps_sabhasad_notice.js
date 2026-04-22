const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_sabhasad_notice = sequelize.define(
  "ps_sabhasad_notice",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    sn_notice_date: { type: Sequelize.DATEONLY, allowNull: false },
    sn_time: { type: Sequelize.STRING(100), allowNull: false },
    sn_place: { type: Sequelize.STRING(100), allowNull: false },
    sn_time_slot: { type: Sequelize.STRING(20), allowNull: false },
    topic_list: { type: Sequelize.TEXT("long"), allowNull: false },
    created_date: { type: Sequelize.DATEONLY, allowNull: false },
  },
  {
    createdAt: false,
    modifiedAt: false,
  },
);
module.exports = ps_sabhasad_notice;
