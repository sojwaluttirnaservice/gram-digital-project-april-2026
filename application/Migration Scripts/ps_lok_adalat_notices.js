const Sequelize = require('sequelize');
const sequelize = require('../config/db-connect-migration');

const ps_lok_adalat_notices = sequelize.define(
    'ps_lok_adalat_notices',
    {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: 'नोटिसेचा अद्वितीय ओळख क्रमांक (Primary Key)' // Unique identifier for each notice
        },

        applicant_name: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'अर्जदाराचे पूर्ण नाव' // Full name of the applicant
        },

        amount: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'नोटिसेतील रक्कम (संख्यात्मक स्वरूपात)' // Amount mentioned in the notice (in numeric form)
        },

        amount_in_words: {
            type: Sequelize.STRING,
            comment: 'नोटिसेतील रक्कम शब्दात' // Amount in words (e.g., "Five Thousand")
        },

        court_date: {
            type: Sequelize.STRING,
            comment: 'कोर्टाची तारीख' // Date of the court hearing
        },

        court_time: {
            type: Sequelize.STRING,
            comment: 'कोर्टाचा वेळ' // Time of the court hearing
        },

        court_address: {
            type: Sequelize.STRING,
            comment: 'कोर्टाचा पत्ता' // Address of the court
        },

        date_of_settlement_acceptance: {
            type: Sequelize.STRING,
            comment: 'तडजोड स्वीकारण्याची तारीख' // Date when the settlement was accepted
        },

        place: {
            type: Sequelize.STRING,
            comment: 'नोटिसेचा ठिकाण' // Place where the notice was issued
        },

        print_date: {
            type: Sequelize.STRING,
            comment: 'नोटिसेची मुद्रण तारीख' // Date when the notice was printed
        },

        month: {
            type: Sequelize.TINYINT,
            comment: 'नोटिसेचा महिना (1 ते 12 दरम्यान)' // Month of the notice (1 to 12)
        },

        year: {
            type: Sequelize.INTEGER,
            comment: 'नोटिसेचा वर्ष' // Year of the notice
        },

        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'नोंदणीची तारीख आणि वेळ' // Timestamp when the record was created
        },

        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'अद्यतनाची तारीख आणि वेळ' // Timestamp when the record was last updated
        },
    },
    {

        comment: 'लोक अदालत नोटिसेससाठीचा टेबल' // Table for Lok Adalat notices
    }
);

module.exports = ps_lok_adalat_notices;
