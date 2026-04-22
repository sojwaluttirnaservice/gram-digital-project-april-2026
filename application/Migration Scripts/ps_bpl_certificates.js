const { INTEGER, STRING, BIGINT, BOOLEAN, DATE, literal, ENUM, DATEONLY, NOW, TINYINT } = require('sequelize');
const sequelize = require('../config/db-connect-migration');

const ps_bpl_certificates = sequelize.define(
    'ps_bpl_certificates',
    {
        id: {
            type: BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: STRING(50),
            allowNull: false,
        },

        // in marathi
        name_m: {
            type: STRING,
            allowNull: false,
        },

        gender: {
            type: STRING(15),
            allowNull: true,
        },

        // marathi
        gender_m: {
            type: STRING,
            allowNull: true,
        },

        year: {
            type: INTEGER,
            defaultValue: new Date().getFullYear()
        },


        bpl_list_number: {
            type: STRING,
            allowNull: false
        },

        bpl_list_number_m: {
            type: STRING,
        },

        certificate_holder_image_name: {
            type: STRING(100),
            allowNull: true,
        },

        // गुण
        bpl_score: {
            type: STRING(5)
        },

        age: {
            type: TINYINT,
        },

        age_m: {
            type: STRING(3),
        },


        createdAt: {
            type: DATE,
            allowNull: false,
            defaultValue: literal("CURRENT_TIMESTAMP"),
        },

        updatedAt: {
            type: DATE,
            allowNull: false,
            defaultValue: literal("CURRENT_TIMESTAMP"),
        },
    },
    {
        timestamps: true,
    }
);

module.exports = ps_bpl_certificates;
