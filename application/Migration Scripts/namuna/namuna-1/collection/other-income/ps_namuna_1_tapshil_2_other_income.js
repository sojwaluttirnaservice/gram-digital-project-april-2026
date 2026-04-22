const Sequelize = require('sequelize');
const sequelize = require('../../../../../config/db-connect-migration.js');

const ps_namuna_1_tapshil_2_other_income = sequelize.define(
    'ps_namuna_1_tapshil_2_other_income',
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
        },

        // Item specified in the budget
        item_in_budget: {
            type: Sequelize.STRING(255),
            allowNull: false, // Item specified in the heading of the budget (लेखाशिर्ष अर्थसंकल्पात निर्दिष्ट केलेली बाब)
            defaultValue: '',
            comment:
                'Item specified in the heading of the budget (लेखाशिर्ष अर्थसंकल्पात निर्दिष्ट केलेली बाब)',
        },

        // Estimated Income of the Panchayat
        estimated_income_of_panchayat: {
            type: Sequelize.BIGINT,
            allowNull: false, // Estimated Income of the Panchayat (पंचायातीची अंदाजित प्राप्ती)
            comment: 'Estimated Income of the Panchayat (पंचायातीची अंदाजित प्राप्ती)',
        },

        // Approved Estimated Amount
        approved_estimated_amount: {
            type: Sequelize.BIGINT,
            allowNull: false, // Approved Estimated Amount (मंजूर केलेली अंदाजित रक्कम)
            comment: 'Approved Estimated Amount (मंजूर केलेली अंदाजित रक्कम)',
        },

        // Actual Amount Received in the Previous Year
        actual_amount_previous_year: {
            type: Sequelize.BIGINT,
            allowNull: false, // Actual Amount Received in the Previous Year (मागील वर्षी मिळालेली प्रत्यक्ष रक्कम)
            comment:
                'Actual Amount Received in the Previous Year (मागील वर्षी मिळालेली प्रत्यक्ष रक्कम)',
        },

        // Actual Amount Received in the Year Before Last
        actual_amount_year_before_last: {
            type: Sequelize.BIGINT,
            allowNull: false, // Actual Amount Received in the Year Before Last (गतपूर्व वर्षात मिळालेली प्रत्यक्ष रक्कम)
            comment:
                'Actual Amount Received in the Year Before Last (गतपूर्व वर्षात मिळालेली प्रत्यक्ष रक्कम)',
        },

        // heades is linked to this entries by this fk in here
        
        namuna_1_tapshil_2_other_income_headers_id_fk: {
            type: Sequelize.BIGINT,
            allowNull: false,
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
    }
);
module.exports = ps_namuna_1_tapshil_2_other_income;
