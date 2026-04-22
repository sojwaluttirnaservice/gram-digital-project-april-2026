const Sequelize = require('sequelize');
const sequelize = require('../config/db-connect-migration');

const ps_gharkul_yojna = sequelize.define(
  'ps_gharkul_yojna',
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    gy_name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  },
  {
    createdAt: false,
    updatedAt: false
  }
);

module.exports = ps_gharkul_yojna;
