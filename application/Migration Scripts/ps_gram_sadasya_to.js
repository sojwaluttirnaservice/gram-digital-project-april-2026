const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_gram_sadasya_to = sequelize.define(
  "ps_gram_sadasya_to",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    to_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = ps_gram_sadasya_to;
