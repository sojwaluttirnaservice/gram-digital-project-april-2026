// अभिहस्तांतरीत रकमा


const Sequelize = require('sequelize');
const sequelize = require('../../../config/db-connect-migration');

const ps_n_3_transferred_amount = sequelize.define(
    'ps_n_3_transferred_amount',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        },

        // Converting each heading to a column name in snake_case
        stamp_duty_fee: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'मुद्रांक शुल्क (Stamp Duty Fee)'
        },

        tax_amount: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'उपकर (Tax)'
        },

        land_revenue: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'जमीन महसूल (Land Revenue)'
        },

        land_uniform_tax: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'जमीन समानी करण (Land Uniform Tax)'
        },

        minor_minerals_amount: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'गौण खनिजे (Minor Minerals)'
        },

        road_lighting_subsidy: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'पथ दिवाबत्ती देयाकाचा भरणा करण्यासाठी अनुदान (Road Lighting Subsidy)'
        },

        water_supply_subsidy: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'नळ पाणी पुरवठ्यातील देयाकासाठी ५०% अनुदान (50% Water Supply Subsidy)'
        },

        backward_tribal_area_support: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'मागास व आदिवासी क्षेत्रासाठी सहाय्य (Support for Backward and Tribal Areas)'
        },

        travel_subsidy: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'यात्राकरा ऐवजी अनुदाने (Travel Subsidy Instead of Travel)'
        },

        tax_loss_compensation_grant: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'जकात नुकसान भरपाई अनुदान (Tax Loss Compensation Grant)'
        },

        other_grants: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'इतर अनुदान (Other Grants)'
        },

        total_k_amount: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'एकूण (एक) क (१ ते ११) (Total K (1 to 11))'
        },

        total_abk_amount: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'एकूण (एक) (अ + ब + क) (Total (A + B + C))'
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
        comment: 'एक (अ) अभिहस्तांतरीत रकमा'
    }
);

module.exports = ps_n_3_transferred_amount;
