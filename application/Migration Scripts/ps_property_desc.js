const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_property_desc = sequelize.define(
  "ps_property_desc",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    pd_name: { type: Sequelize.TEXT("long"), allowNull: false },
    pd_rate: { type: Sequelize.DOUBLE, allowNull: false },
  },
  {
    createdAt: false,
    modifiedAt: false,
  },
);

module.exports = ps_property_desc;
