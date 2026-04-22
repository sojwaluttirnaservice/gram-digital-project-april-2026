const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_document_type = sequelize.define(
  "ps_document_type",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    dt_doc_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = ps_document_type;
