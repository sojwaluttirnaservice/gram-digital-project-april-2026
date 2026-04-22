const { INTEGER, STRING, BIGINT, TEXT, DATE, literal } = require('sequelize')
const sequelize = require('../config/db-connect-migration')
const ps_women_empowerment = sequelize.define(

    'ps_women_empowerment',
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
        comment: 'महिला सक्षमीकरण',
    }
)
module.exports = ps_women_empowerment