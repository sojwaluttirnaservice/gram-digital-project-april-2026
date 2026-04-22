const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_property_specification = sequelize.define(
  "ps_property_specification",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    ps_name: { type: Sequelize.TEXT("long"), allowNull: false },

    ps_land_rate: { type: Sequelize.BIGINT, allowNull: false },

    ps_pd_id: { type: Sequelize.BIGINT, allowNull: false },

    ps_skeep_tax: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: "0",
    },

    ps_skip_diwa_arogya: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ps_skip_cleaning_tax: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ps_skip_tree_tax: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ps_skip_fireblegate_tax: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ps_skip_education_tax: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    modifiedAt: false,
  }
);

module.exports = ps_property_specification;
