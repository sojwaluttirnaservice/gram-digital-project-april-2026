const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_18 = sequelize.define(
    'ps_namuna_18',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: 'Unique identifier for each record', // Unique ID
        },

        // Month (महिना)
        month: {
            type: Sequelize.TINYINT, // महिना
            allowNull: false,
            comment: 'Month of the transaction', // Month
        },

        // Year (वर्ष)
        year: {
            type: Sequelize.INTEGER, // वर्ष
            allowNull: false,
            comment: 'Year of the transaction', // Year
        },

        // Date (दिनांक)
        recieved_date: {
            type: Sequelize.DATEONLY, // दिनांक
            allowNull: false,
            comment: 'Date when the amount was received', // Received Date
        },

        // Reference Number (धनादेश क्रमांक)
        cheque_number: {
            type: Sequelize.STRING(50), // क्रमांक
            allowNull: false,
            comment: 'Reference number or cheque number', // Cheque Number
        },

        // Sender/Receiver Details (कोणाकडून प्राप्त झाले)
        received_from: {
            type: Sequelize.TEXT, // कोणाकडून प्राप्त झाले
            allowNull: false,
            comment: 'Details about who the amount was received from', // Received From
        },

        // Details (तपशील)
        recieved_details: {
            type: Sequelize.TEXT, // तपशील
            allowNull: false,
            comment: 'Details of the received amount', // Received Details
        },

        // Amount (रक्कम)
        recieved_amount: {
            type: Sequelize.DECIMAL(10, 2), // रक्कम
            allowNull: false,
            comment: 'Amount received', // Received Amount
        },

        // Advance Transactions (अग्रीम / )
        recieved_advance_amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0,
            comment: 'Advance amount received for future transactions', // Advance Amount
        },

        // Total Amount (एकूण रक्कम)
        total_recieved_amount: {
            type: Sequelize.DECIMAL(10, 2), // एकूण रक्कम
            allowNull: false,
            comment: 'Total amount received (including advance)', // Total Received Amount
        },

        // खर्चाची तारीख
        spending_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            comment: 'Date of the expense', // Spending Date
        },

        // प्रमाणक क्रमांक
        certificate_number: {
            type: Sequelize.STRING(50),
            allowNull: false,
            comment: 'Certificate number associated with the transaction', // Certificate Number
        },

        // Given To (कोणाला दिले)
        given_to: {
            type: Sequelize.STRING(400), // कोणाला दिले
            allowNull: false,
            comment: 'Details about the recipient of the amount', // Given To
        },

        // खर्चाचा तपशील
        expense_details: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Details about the expense', // Expense Details
        },

        // Expense Amount (खर्च केलेली रक्कम)
        expense_amount: {
            type: Sequelize.DECIMAL(10, 2), // खर्च केलेली रक्कम
            allowNull: false,
            comment: 'Total amount spent', // Expense Amount
        },

        // Expense from Advance (अग्रीमातून खर्च)
        expense_from_advance: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0,
            comment: 'Amount spent from the received advance', // Expense From Advance
        },

        // Total Expense Amount (एकूण खर्च केलेली रक्कम)
        total_expense_amount: {
            type: Sequelize.DECIMAL(10, 2), // एकूण खर्च केली रक्कम
            allowNull: false,
            comment: 'Total amount of all expenses', // Total Expense Amount
        },

        // Remarks (shera)
        remarks: {
            type: Sequelize.STRING(255), //shera
            allowNull: true,
            comment: 'Additional remarks or notes about the transaction', // Remarks
        },

        // Created At
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'Timestamp of when the record was created', // Created At
        },

        // Updated At
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'Timestamp of the last record update', // Updated At
        },
    },
    {
        timestamps: true,
    }
);

module.exports = ps_namuna_18;
