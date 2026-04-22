const Sequelize = require('sequelize');
const sequelize = require('../../../config/db-connect-migration');

const ps_namuna_2 = sequelize.define(
    'ps_namuna_2',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: 'Unique identifier for each record',
        },

        // Month (महिना)
        month: {
            type: Sequelize.TINYINT,
            allowNull: false,
            comment: 'महिना (Month of the transaction)',
        },

        // Year (वर्ष)
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: 'वर्ष (Year of the transaction)',
        },

        /* ============================
           जमा विभाग (Income Section)
        ============================ */

        income_main_head: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'जमा रकमांचे मुख्य शीर्षक (Main head of receipts)',
        },

        income_approved_budget: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment: 'मंजूर अर्थसंकल्प (Approved budget for income)',
        },

        income_revised_estimate: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment: 'सुधारित अंदाज (Revised estimate for income)',
        },

        income_variation: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment: 'अधिक (+) किंवा (-) कमी (Excess or deficit in income)',
        },

        income_remarks: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'शेरा - जमा विभाग (Remarks for income section)',
        },

        /* ============================
           खर्च विभाग (Expenditure Section)
        ============================ */

        expense_main_head: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'खर्चाचे मुख्य शीर्षक (Main head of expenditure)',
        },

        expense_approved_amount: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment: 'मंजूर रक्कम (Approved expenditure amount)',
        },

        expense_revised_estimate: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment: 'खर्चाचा सुधारित अंदाज (Revised expenditure estimate)',
        },

        expense_variation: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment: 'अधिक (+) किंवा (-) कमी (Excess or deficit in expenditure)',
        },

        expense_remarks: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'शेरा - खर्च विभाग (Remarks for expenditure section)',
        },

        // Created At
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'Timestamp when the record was created',
        },

        // Updated At
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'Timestamp of last update',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = ps_namuna_2;
