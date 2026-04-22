const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_pani_kar = sequelize.define(
  "ps_pani_kar",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    generalWaterTax: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    specialWaterTax: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    modifiedAt: false,
  },
);

module.exports = ps_pani_kar;
