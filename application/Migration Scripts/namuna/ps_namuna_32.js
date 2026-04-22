const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_32 = sequelize.define(
    'ps_namuna_32',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        month: {
            type: Sequelize.INTEGER,
            allowNull: false, // Required field, ensure month is provided
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false, // Required field, ensure year is provided
        },

        // **रकमेच्या परताव्यासाठीचा आदेश (Amount Refund Order)**
        amount_refund_order: {
            type: Sequelize.STRING(255),
            allowNull: true, // Optional field
        },

        // **प्रमाणक क्रमांक (Certificate Number)**
        certificate_number: {
            type: Sequelize.STRING(255),
            allowNull: true, // Optional field
        },

        // **पावती क्रमांक (Receipt Number)**
        receipt_number: {
            type: Sequelize.STRING(255),
            allowNull: true, // Optional field
            // unique: true, // Assuming receipt number should be unique
        },

        // **दिलेल्या मूळ रक्कम दिनांक (Given Original Amount Date)**
        given_original_amount_date: {
            type: Sequelize.DATEONLY, // Store as date type
            allowNull: true, // Optional field
        },

        // **रक्कम (Amount)**
        amount: {
            type: Sequelize.DECIMAL(10, 2), // Store amount with 2 decimal precision
            allowNull: false, // Required field
        },

        // **परत करावयाची रक्कम (Amount to Return)**
        amount_to_return: {
            type: Sequelize.DECIMAL(10, 2), // Store amount to return with 2 decimal precision
            allowNull: false, // Required field
        },

        // **ठेविदाराचे नाव (Depositor's Name)**
        depositor_name: {
            type: Sequelize.STRING(255),
            allowNull: false, // Required field
        },

        // **परतावा करणाऱ्या करणाऱ्याचे नाव (Name of the Person Processing the Refund)**
        refund_person_name: {
            type: Sequelize.STRING(255),
            allowNull: false, // Required field
        },

        // **ठिकाण (Location)**
        location: {
            type: Sequelize.STRING(255),
            allowNull: false, // Required field
        },

        // **दिनांक (Date of Receipt)**
        date_of_receipt: {
            type: Sequelize.DATEONLY, // Store date of receipt
            allowNull: false, // This should be required
        },
        
        // **शेरा (Remarks)**
        remarks: {
            type: Sequelize.STRING(255),
            allowNull: true, // Optional field for remarks
        },
        // **Created and Updated Timestamps**
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Use current timestamp for createdAt
            allowNull: false,
        },

        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Use current timestamp for updatedAt
            allowNull: false,
        },
    },
    {
        timestamps: true,
        // indexes: [
        //     {
        //         // unique: true,
        //         fields: ['receipt_number'], // Index for receipt_number to optimize lookups
        //     },
        //     {
        //         fields: ['date_of_receipt'], // Index for faster queries based on date of receipt
        //     },
        // ],
    }
);

module.exports = ps_namuna_32;
