const Sequelize = require('sequelize');
const sequelize = require('../../../config/db-connect-migration');

const ps_n_3_backward_class = sequelize.define(
    'ps_n_3_backward_class',
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
        },

        actual_total_income_year: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: 'वर्षात प्रत्यक्ष एकूण उत्त्पन्न (Actual total income for the year)',
        },

        backward_classes_15_percent_expense: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment:
                'मागासवर्गीयासाठी १५ टक्के खर्च करावयाची रक्कम (Amount to be spent for backward classes, 15%)',
        },

        budget_estimate_amount: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: 'अंदाज पत्रकातील तरतूद रक्कम (Amount allocated in the budget estimate)',
        },

        actual_expenditure_amount: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: 'वर्षात प्रत्यक्ष खर्च केलेली रक्कम (Actual amount spent in the year)',
        },

        unspent_amount: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: 'खर्च न झालेली रक्कम (Amount that was not spent)',
        },

        remaining_amount_to_be_spent: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: 'खर्च करावयाची शिल्लक रक्कम (Remaining amount to be spent)',
        },

        reason_if_not_spent: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment:
                'खर्च झाला नसल्यास न होण्याची कारणे (Reasons for not spending the allocated amount)',
        },

        work_name: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'कामाचे नाव (Name of the work associated with the expense)',
        },

        expense_amount: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: 'खर्च रक्कम (Amount of expenditure)',
        },

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
        comment: 'मागासवर्गीयासाठी १५ टक्के खर्च केल्याचा वार्षिक अहवाल',
    }
);

module.exports = ps_n_3_backward_class;
