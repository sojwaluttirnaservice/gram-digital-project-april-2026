const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_14 = sequelize.define(
    'ps_namuna_14',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        month: {
            type: Sequelize.TINYINT,
            allowNull: false,
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        // Date related columns
        date: {
            type: Sequelize.DATEONLY, // दिनांक (Date)
            allowNull: false,
        },

        // Received Stamp details
        certificate_number: {
            type: Sequelize.STRING(100), // प्रमाणक क्रमांक (Certificate Number)
            allowNull: true,
        },

        received_stamp_value: {
            type: Sequelize.DECIMAL(10, 2), // मिळालेल्या मुद्रकाची किमत (Value of Received Stamp)
            allowNull: true,
        },

        // Used Stamp details
        letter_number: {
            type: Sequelize.STRING(100), // पत्र क्रमांक (Letter Number)
            allowNull: true,
        },

        receipt_number: {
            type: Sequelize.STRING(100), // पावती क्रमांक (Receipt Number)
            allowNull: true,
        },

        receipt_date: {
            type: Sequelize.DATEONLY, // पावती दिनांक (Receipt date)
            allowNull: true,
        },

        used_stamp_value: {
            type: Sequelize.DECIMAL(10, 2), // चिकटवलेल्या मुद्रकाची किंमत (Value of Used Stamp)
            allowNull: true,
        },

        // Daily Balance
        daily_balance: {
            type: Sequelize.DECIMAL(10, 2), // दैनिक शिल्लक (Daily Balance)
            allowNull: true,
        },

        // Remarks
        remarks: {
            type: Sequelize.STRING(255), // शेरा (Remarks)
            allowNull: true,
        },

        // Additional information
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },

        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    },
    {
        timestamps: true,
    }
);

module.exports = ps_namuna_14;
