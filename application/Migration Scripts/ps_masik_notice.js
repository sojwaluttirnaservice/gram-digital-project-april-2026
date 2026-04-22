const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_masik_notice = sequelize.define(
  "ps_masik_notice",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    notice_name: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    notice_date: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    notice_scheule: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    notice_time: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    notice_place: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    notice_subject: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    notice_number: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
  }
);

module.exports = ps_masik_notice;
