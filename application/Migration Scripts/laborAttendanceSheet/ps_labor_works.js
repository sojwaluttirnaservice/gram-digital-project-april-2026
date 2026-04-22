const {
  STRING,
  DATEONLY,
  DATE,
  DECIMAL,
  TEXT,
  literal,
  TINYINT,
  BIGINT,
} = require("sequelize");
const sequelize = require("../../config/db-connect-migration");

const ps_labor_works = sequelize.define(
  "ps_labor_works",
  {
    id: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    code: {
      type: STRING(50),
      allowNull: true,
      //   unique: true,
    },

    name: {
      type: STRING(255),
      allowNull: false,
    },

    location: {
      type: STRING(255),
      allowNull: true,
    },

    start_date: {
      type: DATEONLY,
      allowNull: false,
    },

    end_date: {
      type: DATEONLY,
      allowNull: false,
    },

    default_rate: {
      type: DECIMAL(10, 2),
      allowNull: true,
      comment: "optional project-level fallback rate",
    },

    notes: {
      type: TEXT,
      allowNull: true,
    },

    // 1 -> deleted, 0 -> not deleted
    // for soft delete
    is_deleted: {
      type: TINYINT,
      defaultValue: 0,
    },

    createdAt: {
      type: DATE,
      allowNull: false,
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },

    updatedAt: {
      type: DATE,
      allowNull: false,
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: true,
    tableName: "ps_labor_works",
    comment: "Works / project / site",
  }
);

module.exports = ps_labor_works;
