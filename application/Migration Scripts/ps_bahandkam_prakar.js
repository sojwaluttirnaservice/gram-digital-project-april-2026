const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_bahandkam_prakar = sequelize.define(
  "ps_bahandkam_prakar",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    bp_type: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    bp_ready_nakar_rate: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    bp_tax_rate: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    bp_pd_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = ps_bahandkam_prakar;
