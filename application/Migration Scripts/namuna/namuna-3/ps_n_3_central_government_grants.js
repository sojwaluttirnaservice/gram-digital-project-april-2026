// केंद्र शासन अनुदाने जमा

const Sequelize = require('sequelize');
const sequelize = require('../../../config/db-connect-migration');

const ps_n_3_central_government_grants = sequelize.define(
    'ps_n_3_central_government_grants',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            comment: 'वर्ष (Year)',
        },

        // (तीन) केंद्र शासन अनुदाने जमा (Central Government Grants)
        golden_jubilee_self_employment_scheme: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'स्वर्ण जयंती ग्राम स्वरोजगार योजना (Golden Jubilee Self-Employment Scheme)',
        },

        jawahar_gram_samruddhi_scheme: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'जवाहर ग्रामसमृद्धी योजना (Jawahar Gram Samruddhi Scheme)',
        },

        other_central_grants: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'इतर केंद्र शासन अनुदाने (Other Central Government Grants)',
        },

        total_central_grants_1_to_3: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'एकूण (तीन) (१ ते ३) (Total (Three) (1 to 3))',
        },

        // (चार) संकीर्ण जमा (Narrow Grants)
        deposit_security: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'अनामत प्रतीभूर्ती (Deposit Security)',
        },

        deposit: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'ठेवी (Deposit)',
        },

        loans: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'कर्जे (Loans)',
        },

        other_narrow_grants: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'इतर संकीर्ण जमा (Other Narrow Grants)',
        },

        total_narrow_grants_1_to_4: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'एकूण (चार) (१ ते ४) (Total (Four) (1 to 4))',
        },

        // (पाच) प्रारंभीची शिल्लक (Initial Balance)
        deposit_security_5: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'अनामत प्रतीभूर्ती ५ (Deposit Security 5)',
        },

        deposit_5: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'ठेवी ५ (Deposit 5)',
        },

        loans_5: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'कर्ज ५ (Loans 5)',
        },

        other_initial_balance: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'इतर प्रारंभीची शिल्लक (Other Initial Balance)',
        },

        total_initial_balance_1_to_4: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'एकूण (पाच) (१ ते ४) (Total (Five) (1 to 4))',
        },

        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'तयार तारीख (Created At)',
        },

        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'अद्यतन तारीख (Updated At)',
        },
    },
    {
        timestamps: true,
        commment: '(तीन) केंद्र शासन अनुदाने जमा',
    }
);

module.exports = ps_n_3_central_government_grants;
