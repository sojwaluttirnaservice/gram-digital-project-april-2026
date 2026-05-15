const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_fund_income_expense_details = sequelize.define(
    'ps_fund_income_expense_details',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        from_year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        to_year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        title: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },

        uploaded_document: {
            type: Sequelize.STRING(255),
            allowNull: false,
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
            {
                unique: true,
                fields: ['from_year', 'to_year'],
                name: 'idx_from_to_year_unique',
            },
        ],
    }
);

module.exports = ps_fund_income_expense_details;