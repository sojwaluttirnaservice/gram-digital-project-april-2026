const { INTEGER, STRING, BIGINT, TEXT, DATE, literal } = require('sequelize')
const sequelize = require('../config/db-connect-migration')
const womens_savings_groups_initiative = sequelize.define(

    'womens_savings_groups_initiative',
    {
        id: {
            type: BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        point_desc: {
            type: STRING,
            allowNull: false,
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
        comment: 'बचतगट उपक्रम',
    }
)
module.exports = womens_savings_groups_initiative