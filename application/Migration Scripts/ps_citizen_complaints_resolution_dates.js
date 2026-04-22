const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");
const ps_citizen_complaints = require("./ps_citizen_complaints");

const ps_citizen_complaints_resolution_dates = sequelize.define(
  "ps_citizen_complaints_resolution_dates",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    ps_citizen_complaints_id_fk: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: ps_citizen_complaints,
        key: "id",
      },
      onDelete: "CASCADE",
      comment: "Primary key of the ps_citizen_complaints",
    },

    oldResolutionDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    newResolutionDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    oldResolutionRemark: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },

    newResolutionRemark: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },

    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: true,
  }
);
module.exports = ps_citizen_complaints_resolution_dates;
