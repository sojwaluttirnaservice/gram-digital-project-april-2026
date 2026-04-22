const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_ferfar = sequelize.define(
  "ps_ferfar",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    feu_malmatta_no: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    feu_new_owner: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    feu_old_owner: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    tharav_no: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    dastavej: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    ferfar_date: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    registry_no:{
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    }
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = ps_ferfar;
