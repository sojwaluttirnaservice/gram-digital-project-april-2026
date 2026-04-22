const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

// Fields we might need later
// age => dob is required for age
const ps_occupation_noc = sequelize.define(
  "ps_occupation_noc",
  {
    // =======================
    // Primary Key
    // =======================
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "Primary Key",
    },

    // =======================
    // Applicant Identity Details (TOP PRIORITY)
    // =======================

    applicant_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
      comment: "अर्जदाराचे पूर्ण नाव (श्री / सौ.)",
    },

    applicant_mobile: {
      type: Sequelize.STRING(15),
      allowNull: false,
      comment: "अर्जदाराचा मोबाईल क्रमांक",
    },

    applicant_email: {
      type: Sequelize.STRING(100),
      allowNull: true,
      comment: "अर्जदाराचा ई-मेल पत्ता",
    },

    applicant_aadhaar: {
      type: Sequelize.STRING(12),
      allowNull: true,
      comment: "अर्जदाराचा आधार क्रमांक (स्वेच्छेने)",
    },

    // =======================
    // Applicant Address Details
    // =======================
    applicant_address: {
      type: Sequelize.STRING(300),
      allowNull: false,
      comment: "अर्जदाराचा संपूर्ण पत्ता",
    },

    applicant_village: {
      type: Sequelize.STRING(100),
      allowNull: false,
      comment: "मौजे / गाव",
    },

    applicant_taluka: {
      type: Sequelize.STRING(60),
      allowNull: false,
      comment: "तालुका",
    },

    applicant_district: {
      type: Sequelize.STRING(60),
      allowNull: false,
      comment: "जिल्हा",
    },

    subject_code: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: "कुक्कुटपालन_NOC",
    },

    application_subject: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue:
        "कुक्कुटपालन व्यवसाय करण्यासाठी ना हरकत प्रमाणपत्र देण्याबाबत अर्ज",
    },

    dob: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },

    // =======================
    // Application Meta Details
    // =======================

    print_date: {
      type: Sequelize.DATEONLY,
      allowNull: true,
      comment: "प्रमाणपत्र छपाई दिनांक",
    },

    sabha_date: {
      type: Sequelize.DATEONLY,
      allowNull: true,
      comment: "ग्रामपंचायत सभा दिनांक",
    },

    // tharav number
    resolution_no: {
      type: Sequelize.STRING(30),
      allowNull: true,
      comment: "सभा ठराव क्रमांक",
    },

    // =======================
    // Property / Land Details
    // =======================
    malmatta_no: {
      type: Sequelize.STRING(30),
      allowNull: true,
      comment: "मिळकत क्रमांक / मालमत्ता क्रमांक",
    },

    survey_no: {
      type: Sequelize.STRING(50),
      allowNull: true,
      comment: "सर्वे / गट क्रमांक",
    },

    land_ownership: {
      type: Sequelize.ENUM("Owner", "Rented"),
      allowNull: true,
      defaultValue: "Owner",
    },

    reason: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },

    tree_type: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },

    tree_count: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },

    /** 
    land_location: {
      type: Sequelize.STRING(200),
      allowNull: false,
      comment: "व्यवसायाची जागा",
    },
    */

    // =======================
    // Occupation / Business Details
    // =======================

    business_type: {
      type: Sequelize.STRING(100),
      allowNull: false,
      comment: "व्यवसायाचा प्रकार (उदा. कुक्कुटपालन)",
    },

    business_description: {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: "व्यवसायाचे स्वरूप",
    },

    medical_council_number: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    documents: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    /** 

    shed_direction: {
      type: Sequelize.STRING(20),
      allowNull: true,
      comment: "कुक्कुट शेडची दिशा",
    },

    distance_from_habitation: {
      type: Sequelize.STRING(100),
      allowNull: true,
      comment: "मानवी वस्तीपासूनचे अंतर",
    },
    */

    // =======================
    // Application Status
    // =======================
    application_status: {
      type: Sequelize.ENUM("PENDING", "ACCEPTED", "REJECTED"),
      allowNull: false,
      defaultValue: "PENDING",
      comment: "अर्जाची सद्यस्थिती",
    },

    acceptance_remark: {
      type: Sequelize.STRING(300),
      allowNull: true,
      comment: "अर्ज मंजूर करतानाची नोंद",
    },

    date_of_acceptance: {
      type: Sequelize.DATE,
      allowNull: true,
      comment: "मंजुरी दिनांक",
    },

    rejection_remark: {
      type: Sequelize.STRING(300),
      allowNull: true,
      comment: "अर्ज नाकारण्याचे कारण",
    },

    date_of_rejection: {
      type: Sequelize.DATE,
      allowNull: true,
      comment: "नकार दिनांक",
    },

    // =======================
    // System Timestamps
    // =======================
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      comment: "रेकॉर्ड तयार दिनांक",
    },

    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      comment: "रेकॉर्ड शेवटचा अद्ययावत दिनांक",
    },
  },
  {
    tableName: "ps_occupation_noc",
    timestamps: true,
    comment: "नागरिक सेवा – व्यवसायासाठी ना हरकत प्रमाणपत्र (ग्रामपंचायत)",
    indexes: [
      { fields: ["applicant_mobile"] },
      { fields: ["applicant_aadhaar"] },
      { fields: ["application_status"] },
    ],
  },
);

module.exports = ps_occupation_noc;
