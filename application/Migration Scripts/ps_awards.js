const { INTEGER, STRING, BIGINT, TEXT, DATE, literal } = require('sequelize')
const sequelize = require('../config/db-connect-migration')
const ps_awards = sequelize.define(
    'ps_awards',
    {
        id: {
            type: BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        award_name: {
            type: STRING,
            allowNull: false,
        },

        award_desc: {
            type: STRING,
        },

        award_year: {
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
        comment: 'प्राप्त पुरस्कार',
    }
)
module.exports = ps_awards