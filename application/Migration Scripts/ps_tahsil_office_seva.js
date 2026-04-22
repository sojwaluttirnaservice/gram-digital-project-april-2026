const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_tahsil_office_seva = sequelize.define(
  "ps_tahsil_office_seva",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "Primary key – unique tahsil office service application ID",
    },

    // ===== Applicant Basic Details =====
    applicant_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
      comment: "अर्जदाराचे पूर्ण नाव",
    },

    applicant_mobile: {
      type: Sequelize.STRING(15),
      allowNull: true,
      unique: true,
      comment: "अर्जदाराचा मोबाईल क्रमांक (असल्यास)",
    },

    applicant_aadhaar: {
      type: Sequelize.STRING(15),
      allowNull: true,
      unique: true,
      comment: "अर्जदाराचा आधार क्रमांक (असल्यास)",
    },

    applicant_address: {
      type: Sequelize.STRING(300),
      allowNull: true,
      comment: "अर्जदाराचा संपूर्ण पत्ता (घर क्रमांकासह)",
    },

    subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    subject: {
      type: Sequelize.STRING(120),
      allowNull: true,
      comment: "अर्जाचा विषय",
    },

    uploaded_documents_list: {
      type: Sequelize.TEXT("long"),
      allowNull: true,
      comment: `जोडलेल्या कागदपत्रांची यादी (JSON array स्वरूपात):
      [
        {
          id: "",
          document_name: "",
          document_original_name: "",
          document_saved_path: ""
        }
      ]`,
    },

    // ===== Application Status =====
    registration_status: {
      type: Sequelize.ENUM("PENDING", "ACCEPTED", "REJECTED"),
      allowNull: false,
      defaultValue: "PENDING",
      comment: "नोंदणी अर्जाची सद्यस्थिती",
    },

    acceptance_remark: {
      type: Sequelize.STRING(300),
      allowNull: true,
      comment: "अर्ज मंजूर करतानाची नोंद / शेरा",
    },

    date_of_acceptance: {
      type: Sequelize.DATE,
      allowNull: true,
      comment: "अर्ज मंजूर केल्याची तारीख",
    },

    rejection_remark: {
      type: Sequelize.STRING(300),
      allowNull: true,
      comment: "अर्ज नाकारण्याचे कारण",
    },

    date_of_rejection: {
      type: Sequelize.DATE,
      allowNull: true,
      comment: "अर्ज नाकारल्याची तारीख",
    },

    // acknowledgement_number: {
    //   type: Sequelize.STRING(50),
    //   allowNull: true,
    //   comment: "नोंदणी अर्जाची पोचपावती क्रमांक",
    // },

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
    tableName: "ps_tahsil_office_seva",
    timestamps: true,
    comment: "नागरिक सेवा - तहसील कार्यालय सेवा",
  }
);

module.exports = ps_tahsil_office_seva;
