const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_construction_applications = sequelize.define(
  "ps_construction_applications",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "Primary key of the construction application",
    },

    malmatta_dharak_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: "",
      comment: "Name of the malmatta holder (applicant)",
    },

    applicant_mobile: {
      type: Sequelize.STRING(255),
      allowNull: false,
      comment: "Mobile number of the applicant",
    },

    applicant_adhar: {
      type: Sequelize.STRING(255),
      allowNull: false,
      comment: "Aadhaar number of the applicant",
    },

    applicant_address: {
      type: Sequelize.STRING(255),
      allowNull: false,
      comment: "Address of the applicant",
    },

    gp_name: {
      type: Sequelize.STRING(200),
      allowNull: false,
      comment: "Name of the Gram Panchayat",
    },

    application_subject: {
      type: Sequelize.STRING(200),
      allowNull: false,
      comment: "Subject of the construction application",
    },

    malmatta_no: {
      type: Sequelize.STRING(10),
      allowNull: false,
      comment: "Malmatta (land) number related to the application",
    },

    attached_documents: {
      type: Sequelize.TEXT("long"),
      allowNull: true,
      comment: "JSON array storing attached documents for the application",
    },

    // East landmark
    east_landmark_image_name: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "File name of the east landmark image",
    },
    east_landmark_image_longitude: {
      type: Sequelize.DECIMAL(10, 7),
      allowNull: true,
      comment: "Longitude coordinate of the east landmark",
    },
    east_landmark_image_latitude: {
      type: Sequelize.DECIMAL(10, 7),
      allowNull: true,
      comment: "Latitude coordinate of the east landmark",
    },

    // West landmark
    west_landmark_image_name: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "File name of the west landmark image",
    },
    west_landmark_image_longitude: {
      type: Sequelize.DECIMAL(10, 7),
      allowNull: true,
      comment: "Longitude coordinate of the west landmark",
    },
    west_landmark_image_latitude: {
      type: Sequelize.DECIMAL(10, 7),
      allowNull: true,
      comment: "Latitude coordinate of the west landmark",
    },

    // North landmark
    north_landmark_image_name: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "File name of the north landmark image",
    },
    north_landmark_image_longitude: {
      type: Sequelize.DECIMAL(10, 7),
      allowNull: true,
      comment: "Longitude coordinate of the north landmark",
    },
    north_landmark_image_latitude: {
      type: Sequelize.DECIMAL(10, 7),
      allowNull: true,
      comment: "Latitude coordinate of the north landmark",
    },

    // South landmark
    south_landmark_image_name: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "File name of the south landmark image",
    },
    south_landmark_image_longitude: {
      type: Sequelize.DECIMAL(10, 7),
      allowNull: true,
      comment: "Longitude coordinate of the south landmark",
    },
    south_landmark_image_latitude: {
      type: Sequelize.DECIMAL(10, 7),
      allowNull: true,
      comment: "Latitude coordinate of the south landmark",
    },

    application_status: {
      type: Sequelize.ENUM("PENDING", "ACCEPTED", "REJECTED", "RESOLVED"),
      allowNull: false,
      defaultValue: "PENDING",
    },

    // Acceptance
    acceptance_remark: {
      type: Sequelize.STRING(200),
      allowNull: true,
      comment: "Remark entered when the application is accepted",
    },
    date_of_acceptance: {
      type: Sequelize.DATE,
      allowNull: true,
      comment: "Date when the application was accepted",
    },

    // Rejection
    rejection_remark: {
      type: Sequelize.STRING(200),
      allowNull: true,
      comment: "Remark entered when the application is rejected",
    },
    date_of_rejection: {
      type: Sequelize.DATE,
      allowNull: true,
      comment: "Date when the application was rejected",
    },

    // Construction resolution
    date_of_resolution: {
      type: Sequelize.DATE,
      allowNull: true,
      comment: "Date when the construction resolution was passed",
    },
    resolution_remark: {
      type: Sequelize.STRING(200),
      allowNull: true,
      comment: "Remark related to the construction resolution",
    },

    masik_sabha_date: {
      type: Sequelize.DATEONLY,
      allowNull: true,
      comment: "Date of the monthly sabha meeting",
    },
    masik_tharav_number: {
      type: Sequelize.STRING(20),
      allowNull: true,
      comment: "Masik Tharav number related to the application",
    },
    resolution_malmatta_number: {
      type: Sequelize.STRING(20),
      allowNull: true,
      comment: "Malmatta number mentioned in the resolution",
    },

    construction_certificate_date: {
      type: Sequelize.DATEONLY,
      allowNull: true,
      comment: "Date when the construction certificate was issued",
    },
    construction_certification_doc_name: {
      type: Sequelize.STRING(500),
      allowNull: true,
      comment: "File name of the construction certification document",
    },

    application_date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      comment: "Date when the application was submitted",
    },

    survey_no: {
      type: Sequelize.STRING(20),
      allowNull: true,
      comment: "सर्व्हे नंबर (स.न.)",
    },

    group_no: {
      type: Sequelize.STRING(20),
      allowNull: true,
      comment: "गट नंबर",
    },

    plot_no: {
      type: Sequelize.STRING(20),
      allowNull: true,
      comment: "प्लॉट नंबर",
    },

    total_area_sq_m: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      comment: "एकूण क्षेत्रफळ (चौरस मीटर मध्ये)",
    },

    total_area_sq_ft: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      comment: "एकूण क्षेत्रफळ (चौरस फूट मध्ये)",
    },

    upper_floor_area_sq_m: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      comment: "वरच्या मजल्याचे क्षेत्रफळ (चौरस मीटर मध्ये)",
    },

    approved_construction_area_sq_m: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      comment: "मंजूर / विचाराधीन बांधकामाचे क्षेत्रफळ (चौरस मीटर मध्ये)",
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      comment: "Record creation timestamp",
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      comment: "Record last update timestamp",
    },
  },
  {
    timestamps: true,
    comment:
      "Table storing all construction applications with landmark details and documents",
  },
);

module.exports = ps_construction_applications;
