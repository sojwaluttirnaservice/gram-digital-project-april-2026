const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_ghasara_rate = sequelize.define(
  "ps_ghasara_rate",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    gr_min: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    gr_max: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    gr_type_one: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    gr_type_two: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = ps_ghasara_rate;
