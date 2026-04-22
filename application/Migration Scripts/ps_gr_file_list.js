const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_gr_file_list = sequelize.define(
  "ps_gr_file_list",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    file_name: {
      type: Sequelize.STRING(255),
      allowNull:     false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = ps_gr_file_list;
