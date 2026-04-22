const { INTEGER, STRING, BIGINT, BOOLEAN, DATE, literal, ENUM, DATEONLY, NOW, TINYINT } = require('sequelize');
const sequelize = require('../config/db-connect-migration');
const ps_bpl_certificates = require('./ps_bpl_certificates');

const ps_bpl_certificate_family_members = sequelize.define(
    'ps_bpl_certificate_family_members',
    {
        id: {
            type: BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        bpl_certificate_id_fk: {
            type: BIGINT,
            allowNull: false,
            references: {
                model: ps_bpl_certificates,
                key: 'id'
            },
            onDelete: 'CASCADE' // This will enable cascading delete
        },

        family_member_name: {
            type: STRING(50),
            allowNull: false,
        },

        // in marathi
        family_member_name_m: {
            type: STRING,
            allowNull: false,
        },

        relation: {
            type: STRING
        },

        relation_m: {
            type: STRING
        },

        age: {
            type: TINYINT
        },

        age_m: {
            type: STRING(3)
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

module.exports = ps_bpl_certificate_family_members;
