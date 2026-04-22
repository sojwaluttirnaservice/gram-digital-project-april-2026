const { BIGINT, DATE, DATEONLY, TEXT, ENUM, literal } = require("sequelize");

const sequelize = require("../../config/db-connect-migration");

const ps_labor_attendance = sequelize.define(
  "ps_labor_attendance",
  {
    id: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    work_id_fk: {
      type: BIGINT,
      allowNull: true,
      references: {
        model: "ps_labor_works",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    worker_id_fk: {
      type: BIGINT,
      allowNull: false,
      references: {
        model: "ps_labor_workers",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    date: {
      type: DATEONLY,
      allowNull: false,
    },

    present_type: {
      type: ENUM("full", "half", "absent"),
      allowNull: false,
      defaultValue: "full",
      comment: "Attendance type: full, half, or absent",
    },

    notes: {
      type: TEXT,
      allowNull: true,
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
    tableName: "ps_labor_attendance", // ✅ corrected
    comment: "Labor daily attendance records",
  }
);

module.exports = ps_labor_attendance;
