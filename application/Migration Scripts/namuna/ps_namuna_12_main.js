const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_12_main = sequelize.define(
    'ps_namuna_12_main',
    {
        id: {
            type: Sequelize.INTEGER,
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

        bill_number: {
            type: Sequelize.STRING(50),
            allowNull: false,
            // Marathi: देयक क्रमांक
            // English: Bill Number
        },

        bill_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            // Marathi: देयक दिनांक
            // English: Bill Date
        },
        name_of_person_accepting_bill: {
            type: Sequelize.STRING(100),
            allowNull: false,
            // Marathi: देयक स्वीकारणाऱ्याचे नाव
            // English: Name of the person accepting the bill
        },
        total_spending: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            // Marathi: एकूण रक्कम
            // English: Total Amount
        },

        certificate_number: {
            type: Sequelize.STRING(50),
            allowNull: false,
            // Marathi: प्रमाणक क्रमांक
            // English: Certificate Number
        },

        page_number_in_cash_book: {
            type: Sequelize.INTEGER,
            allowNull: false,
            // Marathi: रोकडवहीतील पृष्ठ क्रमांक
            // English: Page number in the cash book
        },

        remarks: {
            type: Sequelize.STRING,
            allowNull: true
        },

        ps_bank_details_id_fk: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: "Foreign key referencing ps_bank_details.id for online payments",
        },

        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            // Marathi: रेकॉर्ड तयार करण्याची तारीख
            // English: Record creation date
        },

        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            // Marathi: रेकॉर्ड अद्यतनाची तारीख
            // English: Record update date
        },
    },
    {
        timestamps: true,
        comment: 'आकस्मिक खर्चाचे प्रमाणक',
    }
);

module.exports = ps_namuna_12_main;
