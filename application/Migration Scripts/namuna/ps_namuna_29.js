//so table is about कर्जाची नोंदवही, and columns are कर्ज उभारणेची साधने,
// कर्ज मंजूरी आदेश क्रमांक व दिनांक, कर्जाचे प्रयोजन,
// कर्जाची रfक्कम, व्याज दर, कर्ज मिळाल्याची तारीख,
// under कर्ज व व्याज परतफेडीच्या हफ्त्यांची संख्या व नियत तारीख ,  there are subcolumns मुद्दल , व्याज,
// under प्रत्येक हफ्त्यातील मुद्दलीची व व्याजाची रक्कम there are subocolumns कर्ज , व्याज,
// under  प्रदानाची तपशील there are दिनांक, मुद्दल, व्याज,
// underशिल्लक  रकमा there are  subocluns एकूण, मुद्दल, व्याज,
// and the final column is शेरा

const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

// NAMUNA 29 CAN BE CONVERTED INTO TWO TABLES FURTHER

const ps_namuna_29 = sequelize.define(
    'ps_namuna_29', // Table name
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: "Each record's unique identifier (Unique identifier for each record).",
        },

        month: {
            type: Sequelize.TINYINT,
            allowNull: false,
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        // Borrower's Name
        borrower_name: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'कर्ज घेणाऱ्याचे नाव (Name of the borrower).',
        },

        // Loan Instruments used
        // Loan Sources
        loan_sources: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'कर्ज उभारणेची साधने (Loan sources).',
        },

        // Loan approval order number and date (split into atomic fields)
        // Loan Approval Order Number
        loan_approval_order_number: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'कर्ज मंजूरी आदेश क्रमांक (Loan approval order number).',
        },

        loan_approval_order_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment: 'कर्ज मंजूरी आदेश दिनांक (Loan approval order date).',
        },

        // Loan purpose
        loan_purpose: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'कर्जाचे प्रयोजन (Purpose of the loan).',
        },

        // Loan amount
        loan_amount: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: false,
            comment: 'कर्जाची रक्कम (Loan amount).',
        },

        // Interest rate
        interest_rate: {
            type: Sequelize.DECIMAL(5, 2),
            allowNull: false,
            comment: 'व्याज दर (Interest rate).',
        },

        // Loan received date
        loan_received_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment: 'कर्ज मिळाल्याची तारीख (Loan received date).',
        },

        // हफ्त्यांची संख्या
        number_of_installments: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: '(Number of installments).',
        },

        // हफ्त्याची तारीख
        installment_start_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            comment: '(Scheduled date).',
        },

        installment_amount: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: false,
            comment: '(Installment amount).',
        },

        installment_interest: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: false,
            comment: '(Installment interest).',
        },

        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'Creation timestamp of the record.',
        },

        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'Last update timestamp of the record.',
        },
    },
    {
        tableName: 'ps_namuna_29', // Table name
        timestamps: true, // Enable auto timestamps for create and update
    }
);

module.exports = ps_namuna_29;
