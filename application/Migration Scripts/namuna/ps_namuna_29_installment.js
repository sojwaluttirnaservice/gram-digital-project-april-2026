//so table is about कर्जाची नोंदवही, and columns are कर्ज उभारणेची साधने,
// कर्ज मंजूरी आदेश क्रमांक व दिनांक, कर्जाचे प्रयोजन,
// कर्जाची रfक्कम, व्याज दर, कर्ज मिळाल्याची तारीख,
// under कर्ज व व्याज परतफेडीच्या हफ्त्यांची संख्या व नियत तारीख ,  there are subcolumns मुद्दल , व्याज,
// under प्रत्येक हफ्त्यातील मुद्दलीची व व्याजाची रक्कम there are subocolumns कर्ज , व्याज,
// under  प्रदानाची तपशील there are दिनांक, मुद्दल, व्याज,
// under शिल्लक  रकमा there are  subocolumns एकूण, मुद्दल, व्याज,
// and the final column is शेरा

const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

// NAMUNA 29 CAN BE CONVERTED INTO TWO TABLES FURTHER

const ps_namuna_29_installment = sequelize.define(
    'ps_namuna_29_installment', // Table name
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: "Each record's unique identifier (Unique identifier for each record).",
        },

        // FOREIGN KEY (with namuna_29 id)
        namuna_29_loan_id_fk: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },

        installment_month: {
            type: Sequelize.TINYINT,
            allowNull: false,
        },

        installment_year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        // प्रत्येक हफ्त्यातील मुद्दलीची व व्याजाची रक्कम there are subocolumns कर्ज , व्याज,
        // Below two columns
        installment_principal: {
            type: Sequelize.DECIMAL(15, 2), // Adjust precision if necessary
            allowNull: false,
            comment: 'प्रत्येक हफ्त्यातील मुद्दलीची रक्कम (कर्ज)',
        },

        installment_interest_amount: {
            type: Sequelize.DECIMAL(15, 2), // Adjust precision if necessary
            allowNull: false,
            comment: 'प्रत्येक हफ्त्यातील मुद्दलीची रक्कम (व्याज)',
        },

        // प्रदानाची तपशील there are दिनांक, मुद्दल, व्याज,
        // Belwo three columns for each thing
        disbursement_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            comment: 'The date on which the loan disbursement occurred. (लोन वितरणाचा दिनांक).',
        },

        disbursement_principal: {
            type: Sequelize.DECIMAL(15, 2), // Adjust precision if necessary
            allowNull: false,
            comment: 'Principal amount of the loan disbursement. (लोन वितरणातील मुद्दल रक्कम).',
        },

        // Interest amount for the loan disbursement
        disbursement_interest: {
            type: Sequelize.DECIMAL(15, 2), // Adjust precision if necessary
            allowNull: false,
            comment: 'Interest amount of the loan disbursement. (लोन वितरणावरील व्याज रक्कम).',
        },

        // शिल्लक  रकमा there are  subocolumns एकूण, मुद्दल, व्याज
        // Below three columns

        // Total outstanding balance (शिल्लक रकमेचा एकूण रकम)
        total_balance: {
            type: Sequelize.DECIMAL(15, 2), // Adjust precision if necessary
            allowNull: false,
            comment: 'Total outstanding balance amount. (शिल्लक रकमेची एकूण रक्कम).',
        },

        // Principal portion of the balance (मुद्दलाचा भाग)
        balance_principal: {
            type: Sequelize.DECIMAL(15, 2), // Adjust precision if necessary
            allowNull: false,
            comment:
                'Principal portion of the outstanding balance. (शिल्लक रकमेतील मुद्दलाचा भाग).',
        },

        // Interest portion of the balance (व्याजाचा भाग)
        balance_interest: {
            type: Sequelize.DECIMAL(15, 2), // Adjust precision if necessary
            allowNull: false,
            comment: 'Interest portion of the outstanding balance. (शिल्लक रकमेतील व्याजाचा भाग).',
        },

        // शेरा
        remarks: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'शेरा(Remarks).',
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
        tableName: 'ps_namuna_29_installment', // Table name
        timestamps: true, // Enable auto timestamps for create and update
    }
);

module.exports = ps_namuna_29_installment;