const { INTEGER, STRING, BIGINT, TEXT, DATE, literal } = require('sequelize')
const sequelize = require('../config/db-connect-migration')
const womens_savings_group_names = sequelize.define(
    'womens_savings_group_names',
    {
        id: {
            type: BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        group_name: {
            type: STRING,
            allowNull: false,
            comment: "बचतगटाचे नाव"
        },

        village_name: {
            type: STRING,
            allowNull: true,
            defaultValue: '',
            comment: 'गावाचे नाव'
        },

        createdAt: {
            type: DATE,
            defaultValue: literal('CURRENT_TIMESTAMP'),
        },

        updatedAt: {
            type: DATE,
            defaultValue: literal('CURRENT_TIMESTAMP'),
        },
    },
    {
        timestamps: true,
        comment: 'बचतगट यादी',
    }
)
module.exports = womens_savings_group_names