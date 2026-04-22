const Sequelize = require('sequelize');
const sequelize = require('../../../config/db-connect-migration');

const ps_n_3_gp_water_supply_fund = sequelize.define(
    'ps_n_3_gp_water_supply_fund',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: 'आइडी (Unique identifier for each record)', // Marathi comment
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            comment: 'वर्ष (Year of the record)',
        },

        initial_balance: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'निधीत सुरुवातीची शिल्लक (1)',
        },

        general_water_tax: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'सामान्य पाणीकर (2)',
        },

        special_water_tax: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'विशेष पाणीकर (3)',
        },
        
        tap_connection_application_fee: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'नळ कनेक्शन अर्ज फी (4)',
        },

        donation: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'देणगी (5)',
        },

        deposit: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'अनामत (6)',
        },

        tap_fitting_expenses: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'नळ फिटिंग खर्चा बाबत (7)',
        },

        revenue_grant_35_percent: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'राजस्व अनुदानाची ३५ % रक्कम (8)',
        },

        electricity_bill_50_percent_grant: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वीज बिलाचे ५०% अनुदान (9)',
        },

        water_supply_grant: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'पाणीपुरवठा कामा करीता अनुदान (10)',
        },

        loan: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'उसनवार (11)',
        },

        others: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'इतर (12)',
        },

        total_income_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'एकूण जमा (वर्षात) 2 ते 12 (13)',
        },

        total_income_with_initial_balance: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'सुरुवातीची शिल्लकेसह एकूण जमा १ + १३ (14)',
        },

        employee_salary: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'नोकर पगार (15)',
        },

        employee_travel_allowance: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'नोकर प्रवास भत्ता (16)',
        },

        uniform: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'गणवेश (17)',
        },

        advance: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'अग्रीम (18)',
        },

        bonus: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'बोनस (19)',
        },

        total_salary_and_benefits: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'एकूण 15 + 19 (20)',
        },

        office_stationery: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'कार्यालयीन स्टेशनरी (21)',
        },

        electricity_expenses: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वीज खर्च (22)',
        },

        water_supply_well: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'पाणी पुरवठा विहिरी (23)',
        },

        water_supply_handpump_powerpump: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'पाणी पुरवठा हातपंप पावर पंप (24)',
        },

        repair_work_stand_post_pipeline: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'दुरुस्ती कामे स्टँड पोस्ट पाईप लाईन (25)',
        },

        repair_work_others: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'दुरुस्ती कामे इतर (26)',
        },

        total_repair_works: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'एकूण 23 + 26 (27)',
        },

        new_water_supply_works_pipeline_well: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'पाणी पुरवठा नवीन कामे पाईप लाईन / विहिरी (28)',
        },

        water_purification: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'पाणी निर्जतूकरण (29)',
        },

        other_expenses: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'इतर (30)',
        },

        total_expenses: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'एकूण खर्च (20+21+22+23+24+25+26+27+28+29+30) (31)',
        },

        final_balance: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'अखेर शिल्लक (14-31) (32)',
        },

        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'निर्मितीची तारीख',
        },

        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'अद्यतनाची तारीख',
        },
    },
    {
        tableName: 'ps_n_3_gp_water_supply_fund',
        timestamps: true,
        comment: "ग्राम पाणी पुरवठा निधी",
    }
);

module.exports = ps_n_3_gp_water_supply_fund;
