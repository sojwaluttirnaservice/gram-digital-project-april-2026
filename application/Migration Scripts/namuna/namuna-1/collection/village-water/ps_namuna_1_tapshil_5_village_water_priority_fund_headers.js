const Sequelize = require('sequelize');
const sequelize = require('../../../../../config/db-connect-migration.js');

// SAcntioned amount means अभिहस्तांकीत रकमा
const ps_namuna_1_tapshil_5_village_water_priority_fund_headers = sequelize.define(
    'ps_namuna_1_tapshil_5_village_water_priority_fund_headers',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        // year
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            // unique: true,
        },

        // Item specified in the budget
        item_in_budget_header_name: {
            type: Sequelize.STRING(255),
            allowNull: false, // Item specified in the heading of the budget (लेखाशिर्ष अर्थसंकल्पात निर्दिष्ट केलेली बाब)
            comment:
                'Item specified in the heading of the budget (लेखाशिर्ष अर्थसंकल्पात निर्दिष्ट केलेली बाब)',
        },

        // Estimated Income of the Panchayat
        year_of_estimated_income_of_panchayat: {
            type: Sequelize.STRING(255),
            allowNull: false, // Estimated Income of the Panchayat (पंचायातीची अंदाजित प्राप्ती)
            comment: 'Estimated Income of the Panchayat (पंचायातीची अंदाजित प्राप्ती)',
        },

        // Approved Estimated Amount
        year_of_approved_estimated_amount: {
            type: Sequelize.STRING(255),
            allowNull: false, // Approved Estimated Amount (मंजूर केलेली अंदाजित रक्कम)
            comment: 'Approved Estimated Amount (मंजूर केलेली अंदाजित रक्कम)',
        },

        // Actual Amount Received in the Previous Year
        year_of_actual_amount_previous_year: {
            type: Sequelize.STRING(255),
            allowNull: false, // Actual Amount Received in the Previous Year (मागील वर्षी मिळालेली प्रत्यक्ष रक्कम)
            comment:
                'Actual Amount Received in the Previous Year (मागील वर्षी मिळालेली प्रत्यक्ष रक्कम)',
        },

        // Actual Amount Received in the Year Before Last
        year_of_actual_amount_year_before_last: {
            type: Sequelize.STRING(255),
            allowNull: false, // Actual Amount Received in the Year Before Last (गतपूर्व वर्षात मिळालेली प्रत्यक्ष रक्कम)
            comment:
                'Actual Amount Received in the Year Before Last (गतपूर्व वर्षात मिळालेली प्रत्यक्ष रक्कम)',
        },

        remarks: {
            type: Sequelize.STRING(100),
            allowNull: true, // शेरा
        },

        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },

        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    },
    {
        timestamps: true,
        indexes: [
            { unique: true, fields: ['year'] }
        ]
    }
);
module.exports = ps_namuna_1_tapshil_5_village_water_priority_fund_headers;
