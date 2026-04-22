const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_gp_sites = sequelize.define(
  "ps_gp_sites",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    gps_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    gps_site: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = ps_gp_sites;
