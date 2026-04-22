
const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_individual_group_employment_demand_application = sequelize.define(
  "ps_individual_group_employment_demand_application",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "Primary key – unique job card application ID",
    },

    // ===== Job Card Details =====
    // linked to ps_job_card
    job_card_number_fk: {
      type: Sequelize.STRING(50),
      allowNull: true,
      comment: "मंजूर झाल्यानंतर दिलेला जॉब कार्ड क्रमांक",
    },

    from_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },

    to_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    // ===== Family Members =====
    // ===== Family Members =====
    family_members_list: {
      type: Sequelize.TEXT("long"),
      allowNull: true,
      comment: `कुटुंबातील सदस्यांची यादी (JSON array स्वरूपात):
                [
                    {
                        id: "",
                        member_name: "", 
                        bank_account_number: "",
                        adhar_card_number: "",
                        is_creche_required_at_workplace: "" // YES or NO
                        sign_or_thumb_stamp_photo_name: ""
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
    tableName: "ps_individual_group_employment_demand_application",
    timestamps: true,
    comment: "वैयक्तिक सामूहिक रोजगार मागणीचा अर्ज",
  }
);

module.exports = ps_individual_group_employment_demand_application;
