const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_birth_death_certificate_unavailability_certificates = sequelize.define(
  "ps_birth_death_certificate_unavailability_certificates",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },

    name_m: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "",
    },

    gender: {
      type: Sequelize.STRING(15),
      allowNull: false,
    },

    gender_m: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "",
    },

    year_range: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    year_range_m: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "",
    },

    name_of_parent_or_spouse: {
      type: Sequelize.STRING(80),
      allowNull: true,
      defaultValue: "",
    },
    name_of_parent_or_spouse_m: {
      type: Sequelize.STRING(80),
      allowNull: true,
      defaultValue: "",
    },

    relation_to_parent_or_spouse: {
      type: Sequelize.STRING(15), // [son, daughter, wife, husband, self]
      allowNull: false,
    },

    relation_to_parent_or_spouse_m: {
      type: Sequelize.STRING(15), // [स्वतः , पत्नी , पती , मुलगी , मुलगा ]
      allowNull: true,
      defaultValue: "",
    },

    certificate_not_found_for: {
      type: Sequelize.STRING, // ['birth', 'death']
      allowNull: false,
    },

    certificate_not_found_for_m: {
      type: Sequelize.STRING, // [जन्म, मृत्यू ]
      allowNull: true,
      defaultValue: "",
    },

    remarks: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "",
    },



    date_of_registration: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },

    date_of_registration_m: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    date_of_issue: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },

    created_on: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },

    updated_on: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = ps_birth_death_certificate_unavailability_certificates;
