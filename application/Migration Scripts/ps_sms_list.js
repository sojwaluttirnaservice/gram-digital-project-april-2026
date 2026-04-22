const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_sms_list = sequelize.define(
  "ps_sms_list",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    sl_message: { type: Sequelize.TEXT("long"), allowNull: false },
    sl_contact_number: { type: Sequelize.TEXT("long"), allowNull: false },
    sl_send_count: { type: Sequelize.TEXT("long"), allowNull: false },
    sl_date: { type: Sequelize.DATEONLY, allowNull: false },
  },
  {
    createdAt: false,
    modifiedAt: false,
  },
);
module.exports = ps_sms_list;
