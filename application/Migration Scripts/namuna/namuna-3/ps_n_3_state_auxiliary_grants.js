// राज्य शासन सहाय्यक अनुदाने जमा

const Sequelize = require('sequelize');
const sequelize = require('../../../config/db-connect-migration');

const ps_n_3_state_auxiliary_grants = sequelize.define(
    'ps_n_3_state_auxiliary_grants',
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
            unique: true,
        },

        // Atomic columns for each heading
        toilet_fund: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'शौचालय (Toilet Fund)',
        },

        dalit_vasti_improvement_fund: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'दलित वस्ती सुधार (Dalit Vasti Improvement Fund)',
        },

        water_supply_tcl_fund: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'पाणी पुरवठा टी.सी. एल (Water Supply TCL Fund)',
        },

        construction_fund: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'बांधकाम (Construction Fund)',
        },

        education_school_fund: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'शिक्षण शाळा (Education School Fund)',
        },

        minimum_wage_and_meeting_allowance_fund: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'मानधन किमान वेतन व बैठक भत्ता (Minimum Wage and Meeting Allowance Fund)',
        },

        health_fund: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'आरोग्य (Health Fund)',
        },

        other_fund: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'इतर (Other Fund)',
        },

        total_2a_1_to_8: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'एकूण (दोन)(अ) (१ ते ८) (Total (Two)(A) (1 to 8))',
        },

        received_fund: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'आलेला निधी (Received Fund)',
        },

        total_2_ab: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'एकूण (दोन) (अ + ब) (Total (Two) (A + B))',
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
        commment: 'दोन (अ) राज्य शासन सहाय्यक अनुदाने जमा'
    }
);

module.exports = ps_n_3_state_auxiliary_grants;
