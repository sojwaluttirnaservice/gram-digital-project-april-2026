const { INTEGER, STRING, BIGINT, DATE, ENUM, Sequelize } = require('sequelize');
const sequelize = require('../config/db-connect-migration');

const sms_delivery_status = sequelize.define(
    'sms_delivery_status',
    {
        id: {
            type: BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        delivery_id: {
            type: STRING(50),
            allowNull: false,
        },

        original_response: {
            type: STRING(30),
            allowNull: false,
        },

        mobile_number: {
            type: STRING(15), // Assuming maximum length for a mobile number
            allowNull: false,
        },

        sms_delivery_status: {
            type: STRING(10),
            // DELIVERD
            // EXPIRED
            // UNDELIV
            // NCPR
            // PENDING
            allowNull: false,
            defaultValue: ''
        },

        sent_time: {
            // Optional: Timestamp for when the SMS was sent
            type: DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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

module.exports = sms_delivery_status;
