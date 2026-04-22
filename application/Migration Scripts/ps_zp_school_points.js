const { INTEGER, STRING, BIGINT, TEXT, DATE, literal } = require('sequelize')
const sequelize = require('../config/db-connect-migration')
const ps_zp_school_points = sequelize.define(

    'ps_zp_school_points',
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
module.exports = ps_zp_school_points