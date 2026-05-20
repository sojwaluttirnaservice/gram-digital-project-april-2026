const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_marriage_cert_unavailability_certificates = sequelize.define(
  "ps_marriage_cert_unavailability_certificates",
  {
    id: {
      type: Sequelize.INTEGER,
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

    // aadhar number

    outgoing_no: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },

    adhar: {
      type: Sequelize.STRING(12),
      allowNull: true,
    },

    adhar_m: {
      type: Sequelize.STRING(12),
      allowNull: true,
    },

    mobile: {
      type: Sequelize.STRING(10),
      allowNull: true,
    },

    mobile_m: {
      type: Sequelize.STRING(10),
      allowNull: true,
    },

    // address
    address: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    address_m: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    taluka: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },
    taluka_m: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },

    // district
    dist: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },

    dist_m: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },

    gender: {
      type: Sequelize.STRING(15),
      allowNull: false,
    },

    gender_m: {
      type: Sequelize.STRING(10),
      allowNull: true,
      defaultValue: "",
    },

    date_of_checking: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },

    date_of_checking_m: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },

    remarks: {
      type: Sequelize.STRING(200),
      allowNull: true,
      defaultValue: "",
    },
    remarks_m: {
      type: Sequelize.STRING(200),
      allowNull: true,
      defaultValue: "",
    },

    date_of_registration: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },

    date_of_registration_m: {
      type: Sequelize.STRING(10),
      allowNull: true,
    },

    date_of_issue: {
      type: Sequelize.DATEONLY,
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
  },
);

module.exports = ps_marriage_cert_unavailability_certificates;
