const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_25_investment_register = sequelize.define(
    'ps_namuna_25_investment_register',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        // गुंतवणुकीची तारीख (Investment Date)
        investment_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            comment: 'Date of the investment. | गुंतवणुकीची तारीख',
        },

        // गुंतवणुकीचा तपशिल (Investment Details)
        investment_details: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Details of the investment, such as bank, deposit, NSC, bonds, etc. | गुंतवणुकीचा तपशिल',
        },

        // क्रमांक व तारीख (Reference Number and Date)
        reference_number: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Reference number of the investment document. | क्रमांक',
        },

        reference_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment: 'Date on the investment reference document. | तारीख',
        },

        // गुंतवणुकीची रक्कम (Investment Amount)
        // Fragmented into दर्शनी मूल्य (Face Value) and खरेदी किंमत (Purchase Price)
        face_value: {
            type: Sequelize.DECIMAL(12, 2),
            allowNull: false,
            comment: 'Face value of the investment. | दर्शनी मूल्य',
        },

        purchase_price: {
            type: Sequelize.DECIMAL(12, 2),
            allowNull: false,
            comment: 'Actual purchase price of the investment. | खरेदी किंमत',
        },

        // परिणत होण्याची तारीख (Maturity Date)
        maturity_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment: 'Date when the investment matures. | परिणत होण्याची तारीख',
        },

        // निव्वळ देय रक्कम (Net Payable Amount)
        net_payable_amount: {
            type: Sequelize.DECIMAL(12, 2),
            allowNull: true,
            comment: 'Net payable amount upon maturity. | निव्वळ देय रक्कम',
        },

        // उपार्जित व्याजाची तारीख (Interest Earned Date)
        interest_earned_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment: 'Date when the interest is earned. | उपार्जित व्याजाची तारीख',
        },

        // बदलीचा पदोन्नतीचा दिनांक (Transfer/Promotion Date)
        transfer_promotion_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment: 'Date of transfer or promotion. | बदलीचा पदोन्नतीचा दिनांक',
        },

        // दैनिक रोकडवहीतील जमा रक्कम (Daily Cashbook Deposited Amount)
        cashbook_deposited_amount: {
            type: Sequelize.DECIMAL(12, 2),
            allowNull: true,
            comment:
                'Amount deposited into the daily cashbook. | दैनिक रोकडवहीतील जमा रक्कम',
        },

        // प्रकातीचा तपशिल (Specific Details)
        specific_details: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Specific or detailed explanation related to the record. | प्रकातीचा तपशिल',
        },

        // Month and Year for record grouping
        month: {
            type: Sequelize.TINYINT,
            allowNull: false,
            comment: 'Month of the record. | महिना',
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: 'Year of the record. | वर्ष',
        },

        // Timestamps
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
        tableName: 'ps_namuna_25_investment_register',
        timestamps: true,
    }
);

module.exports = ps_namuna_25_investment_register;
