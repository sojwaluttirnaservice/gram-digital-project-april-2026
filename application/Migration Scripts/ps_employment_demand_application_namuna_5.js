// ps_individual_group_employment_demand_application

// ps_employment_demand_application_namuna_5

const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_employment_demand_application_namuna_5 = sequelize.define(
  "ps_employment_demand_application_namuna_5",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "Primary key – unique job card application ID",
    },

    // refers to the id of ps_individual_group_employment_demand_application this table
    ps_individual_group_employment_demand_application_id_fk: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    n5_from_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },

    n5_to_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },

    total_days: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    print_date: {
        type: Sequelize.DATE,
        allowNull: true
    },

    // ===== Timestamps =====
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      comment: "रेकॉर्ड तयार झाल्याची तारीख",
    },

    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      comment: "रेकॉर्ड शेवटचे अद्ययावत केल्याची तारीख",
    },
  },
  {
    tableName: "ps_employment_demand_application_namuna_5",
    timestamps: true,
    comment: "रोजगार मागणीचा अर्ज प्राप्त झाल्याची पोच नमुना ५",
  }
);

module.exports = ps_employment_demand_application_namuna_5;
