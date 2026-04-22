const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_payment_information = sequelize.define(
  "ps_payment_information",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    malmatta_no: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    recipient_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },

    payment_number: {
      type: Sequelize.STRING(100),
      defaultValue: "0",
    },

    payment_medium: {
      type: Sequelize.STRING(40),
      allowNull: true,
    },

    transaction_number: {
      type: Sequelize.STRING(60),
      defaultValue: "0",
    },

    check_no: {
      type: Sequelize.STRING(20),
      allowNull: true,
      unique: true,
    },

    // DD -Demand Draft is basically a prepaid cheque issued by a bank
    demand_draft_no: {
      type: Sequelize.STRING(20),
      allowNull: true,
      unique: true,
    },

    rtgs_no: {
      type: Sequelize.STRING(20),
      allowNull: true,
      unique: true,
    },

    other_id: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },

    other_id_name: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    // was paid by other than gp person i.e. the end user or other
    // -------------------
    was_paid_by_dharak: {
      type: Sequelize.ENUM("YES", "NO"),
      defaultValue: "NO",
    },

    approval_status: {
      type: Sequelize.ENUM("PENDING", "APPROVED", "REJECTED"),
      defaultValue: null,
    },

    approval_date: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
    // -----------------

    payment_amount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    payment_date: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },

    paymet_time: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },

    payment_for: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },

    payment_for_desc: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    payment_type: {
      type: Sequelize.ENUM("CERTIFICATE", "TAX"),
      allowNull: true,
      comment: "Defines whether payment is for certificate or tax",
    },

    tax_category: {
      type: Sequelize.ENUM("SAMANYA", "PANI"),
      allowNull: true,
      comment: "Applicable only for tax-related payments",
    },

    reason_in_words: {
      type: Sequelize.STRING(75),
      allowNull: true,
    },

    payment_screenshot_image_name: {
      type: Sequelize.STRING(120), // Slightly increased limit for longer names
      allowNull: true, // Allows it to be empty when no image is uploaded
      defaultValue: null, // More meaningful than '0'
    },

    // 0 MEANS OFFLINE PAYMENT,
    // 1 MEANS ONLINE PAYMENT
    payment_mode: {
      type: Sequelize.TINYINT,
      allowNull: false,
      comment: "0 = OFFLINE, 1 = ONLINE ",
    },

    ps_bank_details_id_fk: {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: "Foreign key referencing ps_bank_details.id for online payments",
    },

    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },

    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP",
      ),
    },
  },
  {
    indexes: [
      { fields: ["malmatta_no"] }, // common filter by malmatta_no
      { fields: ["recipient_name"] }, // search by recipient
      { fields: ["payment_number"] }, // unique payments
      { fields: ["transaction_number"] }, // unique transaction
      { fields: ["payment_for"] }, // filter by type of payment
      { fields: ["approval_status"] }, // filter by approval status
      { fields: ["payment_date"] }, // filtering by date
    ],
  },
);

module.exports = ps_payment_information;

// refer paymentForOptions.js files in the data folder in case needed,

/**


    payment_for:  

                  when 1
                    - pramanpatra_name = 'सामान्य कर भरणा'
                    break
                  when 2
                    - pramanpatra_name = 'पाणी कर भरणा'
                    break
                  when 3
                    - pramanpatra_name = 'विवाह नोंदणी प्रमाणपत्र'
                    break
                  when 4
                    - pramanpatra_name = 'रहिवासी स्वयंघोषितपत्र'
                    break
                  when 5
                    - pramanpatra_name = 'नमुना ८ प्रिंट'
                    break
                  when 6
                    - pramanpatra_name = 'थकबाकी/निराधार प्रमाणपत्र'
                    break


                    when 7
                        - pramanpatra_name = "निविदा फी (सामान्य)"
                    when 8 
                        - pramanpatra_name = "फेरफार फी"
                    when 9
                        - pramanpatra_name = "बायाना रक्कम (सामान्य)"
                    when 10
                        - pramanpatra_name  = "अनुदान रक्कम (सामान्य)"


                    when 
                        - pramanpatra_name  = "अनुदान रक्कम (पाणी)"

                    when 
                        - pramanpatra_name  = "नळ कनेक्शन फी (पाणी)"

                    when 
                        - ppramanpatra_name = ""


 */
