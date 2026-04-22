const Sequelize = require('sequelize');
const sequelize = require('../../../../../config/db-connect-migration.js');

const ps_namuna_1_tapshil_2_expenditure_water_funds = sequelize.define(
    'ps_namuna_1_tapshil_2_expenditure_water_funds',
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

        // Estimated Expenditure of the Panchayat
        estimated_expenditure_of_panchayat: {
            type: Sequelize.BIGINT,
            allowNull: false, // Estimated Expenditure of the Panchayat (पंचायातीची अंदाजित खर्च)
            comment: 'Estimated Expenditure of the Panchayat (पंचायातीची अंदाजित खर्च)',
        },

        // Approved Estimated Expenditure Amount
        approved_estimated_expenditure_amount: {
            type: Sequelize.BIGINT,
            allowNull: false, // Approved Estimated Expenditure Amount (मंजूर केलेली अंदाजित खर्च)
            comment: 'Approved Estimated Expenditure Amount (मंजूर केलेली अंदाजित खर्च)',
        },

        // Actual Expenditure Amount in the Previous Year
        actual_expenditure_amount_previous_year: {
            type: Sequelize.BIGINT,
            allowNull: false, // Actual Expenditure Amount in the Previous Year (मागील वर्षी मिळालेली प्रत्यक्ष खर्च)
            comment:
                'Actual Expenditure Amount in the Previous Year (मागील वर्षी मिळालेली प्रत्यक्ष खर्च)',
        },

        // Actual Expenditure Amount in the Year Before Last
        actual_expenditure_amount_year_before_last: {
            type: Sequelize.BIGINT,
            allowNull: false, // Actual Expenditure Amount in the Year Before Last (गतपूर्व वर्षात मिळालेली प्रत्यक्ष खर्च)
            comment:
                'Actual Expenditure Amount in the Year Before Last (गतपूर्व वर्षात मिळालेली प्रत्यक्ष खर्च)',
        },

        // heades is linked to this entries by this fk in here

        namuna_1_tapshil_2_expenditure_water_funds_headers_id_fk: {
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
module.exports = ps_namuna_1_tapshil_2_expenditure_water_funds;
