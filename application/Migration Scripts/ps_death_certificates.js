const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_death_certificates = sequelize.define(
  "ps_death_certificates",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    name_of_deceased: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },

    name_of_deceased_m: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    aadhar_of_deceased: {
      type: Sequelize.STRING(12),
      allowNull: false,
    },

    aadhar_of_deceased_m: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    gender: {
      type: Sequelize.STRING(15),
      allowNull: false,
    },

    gender_m: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date_of_death: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },

    date_of_death_m: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    date_of_death_in_words: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    place_of_death: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    place_of_death_m: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    age_of_deceased: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    age_of_deceased_m: {
      type: Sequelize.STRING(15),
      allowNull: false,
      defaultValue: ""
    },
    reason_of_death: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ""
    },

    reason_of_death_m: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name_of_husband_or_wife: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },

    name_of_husband_or_wife_m: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    name_of_mother: {
      type: Sequelize.STRING(50),
      allowNull: true,
      defaultValue: "",
    },

    name_of_mother_m: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "",
    },

    aadhar_number_of_mother: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "",
    },

    aadhar_number_of_mother_m: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "",
    },

    name_of_father: {
      type: Sequelize.STRING(50),
      allowNull: true,
      defaultValue: "",
    },

    name_of_father_m: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "",
    },

    aadhar_number_of_father: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "",
    },

    aadhar_number_of_father_m: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "",
    },

    aadhar_number_of_husband_or_wife: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    aadhar_number_of_husband_or_wife_m: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    address_of_deceased_at_death_time: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    address_of_deceased_at_death_time_m: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    permanent_address_of_deceased: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    permanent_address_of_deceased_m: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    remarks: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "",
    },

    gp_registration_number: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
    informer_name: {
      type: Sequelize.STRING(50),
      allowNull: true,
      defaultValue: "",
    },

    informer_name_m: {
      type: Sequelize.STRING(50),
      allowNull: true,
      defaultValue: "",
    },

    informer_address: {
      type: Sequelize.STRING(150),
      allowNull: true,
      defaultValue: "",
    },

    informer_address_m: {
      type: Sequelize.STRING(800),
      allowNull: true,
      defaultValue: "",
    },

    gp_registration_death_report_file_name: {
        // the saved name in the directory
        type: Sequelize.STRING(60),
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

module.exports = ps_death_certificates;
