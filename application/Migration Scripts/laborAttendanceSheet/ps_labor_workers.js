const {
  STRING,
  DATE,
  DECIMAL,
  BOOLEAN,
  literal,
  TEXT,
  INTEGER,
  BIGINT,
} = require("sequelize");
const sequelize = require("../../config/db-connect-migration");

const ps_labor_workers = sequelize.define(
  "ps_labor_workers",
  {
    id: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    work_id_fk: {
      type: BIGINT,
      allowNull: false,
      references: {
        model: "ps_labor_works",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    worker_name: {
      type: STRING(255),
      allowNull: false,
    },

    worker_phone: {
      type: STRING(30),
      allowNull: true,
    },

    worker_aadhar: {
      type: STRING(20),
      allowNull: true,
    },

    daily_rate: {
      type: DECIMAL(10, 2),
      allowNull: true,
      comment: "worker base daily rate",
    },

    notes: {
      type: TEXT,
      allowNull: true,
    },

    fine: {
      type: INTEGER,
      allowNull: true,
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
    tableName: "ps_labor_workers",
    comment: "Workers / labourers",
  }
);

module.exports = ps_labor_workers;
