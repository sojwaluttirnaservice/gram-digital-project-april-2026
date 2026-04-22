const Sequelize = require('sequelize');
const sequelize = require('../../../../../config/db-connect-migration.js');

const ps_namuna_1_other_expenditures = sequelize.define(
    'ps_namuna_1_other_expenditures',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        // वर्ष (Year)
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            // unique: true,
        },

        // मासिक ठराव (Monthly Resolution)
        monthly_resolution: {
            type: Sequelize.STRING(255),
            allowNull: true, // Optional field for Monthly Resolution
            comment: 'मासिक ठराव',
        },

        monthly_resolution_date: {
            type: Sequelize.DATEONLY,
            allowNull: true, // Optional field for Monthly Resolution DATE
            comment: 'मासिक ठराव क्रमांक',
        },

        // मागासवर्गीय खर्च १५ % टक्के खर्च (Backward Class 15% Expenditure)
        backward_class_15_percent_expenditure: {
            type: Sequelize.BIGINT,
            allowNull: false, //
            comment: 'मागासवर्गीय खर्च १५ % टक्के खर्च',
        },

        // महिला व बाल कल्याण १० टक्के खर्च (Women and Child Welfare 10% Expenditure)
        women_and_child_welfare_10_percent_expenditure: {
            type: Sequelize.STRING(255),
            allowNull: false, //
            comment: 'महिला व बाल कल्याण १० टक्के खर्च',
        },

        // अपंग कल्याण करिता खर्च ३ % टक्के खर्च (Disabled People 3% Expenditure)
        disabled_people_3_percent_expenditure: {
            type: Sequelize.STRING(255),
            allowNull: false, //
            comment: 'अपंग कल्याण करिता खर्च ३ % टक्के खर्च',
        },

        // ०.२५ टक्के जिल्हा ग्रामविकास निधी वर्गणी (0.25% District Rural Development Fund Contribution)
        district_rural_development_fund_contribution_025_percent: {
            type: Sequelize.STRING(255),
            allowNull: false, //
            comment: '०.२५ टक्के जिल्हा ग्रामविकास निधी वर्गणी',
        },

        remarks: {
            type: Sequelize.STRING(100),
            allowNull: true, // शेरा (Remarks)
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

module.exports = ps_namuna_1_other_expenditures;
