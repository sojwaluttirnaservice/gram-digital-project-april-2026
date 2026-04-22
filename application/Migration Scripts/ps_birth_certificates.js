const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_birth_certificates = sequelize.define(
  "ps_birth_certificates",
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

    date_of_birth: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },

    date_of_birth_m: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    date_of_birth_in_words: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    // --------------

    place_of_birth: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    place_of_birth_m: {
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

    // -----------

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

    // ---------------

    address_of_parents_at_birth_time_of_baby: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    },

    address_of_parents_at_birth_time_of_baby_m: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    },

    permanent_address_of_parents: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    permanent_address_of_parents_m: {
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

    official_present_at_birth: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: "",
    },

    official_present_at_birth_m: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: "",
    },

    weight_of_baby: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: null,
    },
    
    gp_registration_birth_report_file_name: {
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

module.exports = ps_birth_certificates;
