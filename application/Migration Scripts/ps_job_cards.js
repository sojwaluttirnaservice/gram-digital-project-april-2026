const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_job_cards = sequelize.define(
  "ps_job_cards",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "Primary key – unique job card application ID",
    },

    family_head_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
      comment: "कुटुंबप्रमुखाचे नाव",
    },
    // ===== Applicant Basic Details =====
    applicant_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
      comment: "अर्जदाराचे पूर्ण नाव",
    },

    applicant_address: {
      type: Sequelize.STRING(500),
      allowNull: false,
      comment: "अर्जदाराचा संपूर्ण पत्ता (घर क्रमांकासह)",
    },

    applicant_mobile: {
      type: Sequelize.STRING(15),
      allowNull: true,
      unique: true,
      comment: "अर्जदाराचा मोबाईल क्रमांक (असल्यास)",
    },

    // ===== Social Category Details =====
    caste_category: {
      type: Sequelize.STRING(50),
      allowNull: false,
      comment:
        "जात प्रवर्ग – string type (capital letters) – possible values: SC, ST, VJ-A, NT-B, NT-C, NT-D, OBC, SEBC, EWS, OPEN",
    },

    minority: {
      type: Sequelize.ENUM("YES", "NO"),
      allowNull: false,
      defaultValue: "NO",
      comment: "अल्पसंख्यांक आहे का (होय/नाही)",
    },

    small_farmer: {
      type: Sequelize.ENUM("YES", "NO"),
      allowNull: false,
      defaultValue: "NO",
      comment: "अल्पभूधारक शेतकरी आहे का (होय/नाही)",
    },

    general_farmer: {
      type: Sequelize.ENUM("YES", "NO"),
      allowNull: false,
      defaultValue: "NO",
      comment:
        "सामान्य शेतकरी आहे का (होय/नाही) – small_farmer आणि general_farmer दोन्ही YES नसावेत (logic validation आवश्यक)",
    },

    land_reform_beneficiary: {
      type: Sequelize.ENUM("YES", "NO"),
      allowNull: false,
      defaultValue: "NO",
      comment: "भूसुधारक लाभार्थी आहे का (होय/नाही)",
    },

    indira_awaas_beneficiary: {
      type: Sequelize.ENUM("YES", "NO"),
      allowNull: false,
      defaultValue: "NO",
      comment: "इंदिरा आवास योजना लाभार्थी आहे का (होय/नाही)",
    },

    aab_yojana_beneficiary: {
      type: Sequelize.ENUM("YES", "NO"),
      allowNull: false,
      defaultValue: "NO",
      comment: "आम आदमी विमा योजना लाभार्थी आहे का (होय/नाही)",
    },

    rashtriya_swasthya_bima_beneficiary: {
      type: Sequelize.ENUM("YES", "NO"),
      allowNull: false,
      defaultValue: "NO",
      comment: "राष्ट्रीय स्वास्थ्य विमा योजना लाभार्थी आहे का (होय/नाही)",
    },

    rashtriya_swasthya_bima_no: {
      type: Sequelize.STRING(50),
      allowNull: true,
      comment: "राष्ट्रीय स्वास्थ्य विमा योजना क्रमांक (लाभार्थी असल्यास)",
    },

    bpl_family: {
      type: Sequelize.ENUM("YES", "NO"),
      allowNull: false,
      defaultValue: "NO",
      comment: "दारिद्र्य रेषेखालील (BPL) कुटुंब आहे का (होय/नाही)",
    },

    bpl_family_no: {
      type: Sequelize.STRING(50),
      allowNull: true,
      comment: "BPL कुटुंब क्रमांक (असल्यास)",
    },

    forest_rights_act_2006: {
      type: Sequelize.ENUM("YES", "NO"),
      allowNull: false,
      defaultValue: "NO",
      comment:
        "अनुसूचित जमाती व इतर पारंपारिक निवासी वन हक्क मान्यता अधिनियम 2006 अंतर्गत जमीन मिळाली आहे का (होय/नाही)",
    },

    // ===== Documents =====
    family_photo_image_name: {
      type: Sequelize.STRING(150),
      allowNull: false,
      comment:
        "कुटुंबातील अर्जदार प्रौढ व्यक्तींचा एकत्रित पोस्टकार्ड आकाराचा फोटो (saved file name)",
    },

    family_head_ration_card_pdf: {
      type: Sequelize.STRING(200),
      allowNull: true,
      comment: "कुटुंबप्रमुखाचा रेशन कार्ड PDF (saved file name)",
    },

    // ===== Family Members =====
    // ===== Family Members =====
    family_members_list: {
      type: Sequelize.TEXT("long"),
      allowNull: true,
      comment: `कुटुंबातील मजूर सदस्यांची यादी (JSON array स्वरूपात):
                [
                    { 
                        member_name: "", 
                        relation_to_family_head: "", 
                        gender: "", 
                        age: "", 
                        is_disabled: "", 
                        adhar_card_pdf_name: "",
                        family_member_photo_name: ""
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

    // ===== Job Card Details =====
    job_card_number: {
      type: Sequelize.STRING(50),
      allowNull: true,
      comment: "मंजूर झाल्यानंतर दिलेला जॉब कार्ड क्रमांक",
    },

    job_card_issue_date: {
      type: Sequelize.DATE,
      allowNull: true,
      comment: "जॉब कार्ड वितरित केल्याची तारीख",
    },

    acknowledgement_number: {
      type: Sequelize.STRING(50),
      allowNull: true,
      comment: "नोंदणी अर्जाची पोच पावती क्रमांक",
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
    tableName: "ps_job_cards",
    timestamps: true,
    comment: "MGNREGA Job Card – कुटुंब नोंदणी अर्ज तालिका",
  }
);

module.exports = ps_job_cards;
