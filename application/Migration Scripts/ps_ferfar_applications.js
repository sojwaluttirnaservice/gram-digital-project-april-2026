const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_ferfar_applications = sequelize.define(
  "ps_ferfar_applications",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    /* ======================
       APPLICANT DETAILS
    ====================== */
    applicant_name: {
      type: Sequelize.STRING(120),
      allowNull: false,
    },

    applicant_mobile: {
      type: Sequelize.STRING(15),
      allowNull: false,
    },

    applicant_adhar: {
      type: Sequelize.STRING(12),
      allowNull: false,
    },

    applicant_address: {
      type: Sequelize.STRING(300),
      allowNull: false,
    },

    applicant_village: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },

    /* ======================
       PROPERTY DETAILS
    ====================== */
    malmatta_no: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },

    original_owner_name: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },

    /* ======================
       FERFAR BASIS / DOCUMENT
    ====================== */
    ferfar_document: {
      type: Sequelize.STRING(300),
      allowNull: true,
    },

    ferfar_document_saved_name: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },

    /* ======================
       CHATUSIMA (BOUNDARIES)
    ====================== */
    east_landmark: {
      type: Sequelize.STRING(150),
      allowNull: true,
    },

    west_landmark: {
      type: Sequelize.STRING(150),
      allowNull: true,
    },

    north_landmark: {
      type: Sequelize.STRING(150),
      allowNull: true,
    },

    south_landmark: {
      type: Sequelize.STRING(150),
      allowNull: true,
    },

    /* ======================
       DECLARATION
    ====================== */
    i_agree_statement: {
      type: Sequelize.TEXT,
      allowNull: true,
    },

    i_agree_statement_status: {
      type: Sequelize.ENUM("AGREE", "DISAGREE"),
      allowNull: false,
      defaultValue: "AGREE",
    },

    /* ======================
       APPLICATION FLOW
    ====================== */
    application_status: {
      type: Sequelize.ENUM("PENDING", "ACCEPTED", "REJECTED", "RESOLVED"),
      allowNull: false,
      defaultValue: "PENDING",
    },

    application_date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },

    acceptance_remark: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    rejection_remark: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    date_of_acceptance: {
      type: Sequelize.DATE,
      allowNull: true,
    },

    date_of_rejection: {
      type: Sequelize.DATE,
      allowNull: true,
    },

    masik_sabha_date: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },

    masik_tharav_number: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    resolution_malmatta_number: {
      type: Sequelize.STRING(10),
      allowNull: true,
    },

    // karyvahi zalyacha shera
    resolution_remark: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    date_of_resolution: {
      type: Sequelize.DATE,
      allowNull: true,
    },

    /* ======================
       SYSTEM FIELDS
    ====================== */
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
    tableName: "ps_ferfar_applications",
    timestamps: true,
    underscored: false,
  }
);

module.exports = ps_ferfar_applications;
