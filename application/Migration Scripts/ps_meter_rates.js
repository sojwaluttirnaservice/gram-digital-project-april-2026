const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_meter_rates = sequelize.define(
  "ps_meter_rates",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    unit_form: { type: Sequelize.DOUBLE, allowNull: false },
    unit_to: { type: Sequelize.DOUBLE, allowNull: false },
    rate: { type: Sequelize.DOUBLE, allowNull: false },
  },
  {
    createdAt: false,
    modifiedAt: false,
  },
);

module.exports = ps_meter_rates;
