const { INTEGER, STRING, BIGINT, TEXT, DATE, Sequelize } = require('sequelize');
const sequelize = require('../config/db-connect-migration');
const sms_track_record = sequelize.define(
    'sms_track_record',
    {
        id: {
            type: BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        campaining_name: {
            type: STRING,
            allowNull: false,
        },

        message: {
            type: TEXT('long'),
            allowNull: false,
            // defaultValue: '',
        },

        response_data: {
            type: STRING,
            allowNull: false,
        },

        template_id: {
            type: STRING,
            allowNull: false,
        },

        sender_id: {
            type: STRING(10),
            allowNull: false,
        },

        mobile_numbers: {
            type: TEXT('long'),
            allowNull: true,
            // defaultValue: '',
        },

        mobile_delivery_response: {
            type: TEXT('long'),
            allowNull: true,
            // defaultValue: '',
        },

        total_mobile_numbers_count: {
            type: INTEGER,
            allowNull: false,
        },

        delivered_mobile_numbers_count: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
        },

        not_delivered_mobile_numbers_count: {
            type: INTEGER,
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
module.exports = sms_track_record;
