const { INTEGER, STRING, BIGINT, DATE, Sequelize } = require('sequelize');

const sequelize = require('../config/db-connect-migration');

const sms_templates = sequelize.define(
    'sms_templates',
    {
        id: {
            type: BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        sender_id: {
            type: STRING,
            allowNull: false,
        },

        template_id: {
            type: STRING,
            allowNull: false,
        },

        header_id: {
            type: STRING,
            allowNull: false,
        },

        template_name: {
            type: STRING,
            allowNull: false,
        },

        template_string: {
            type: STRING(2000),
            allowNull: false,
        },

        createdAt: {
            type: DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },

        updatedAt: {
            type: DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    },
    {
        timestamps: true,
    }
);

module.exports = sms_templates;
