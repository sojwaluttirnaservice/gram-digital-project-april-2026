const Sequelize = require('sequelize');
const sequelize = require('../../../config/db-connect-migration');

const ps_n_3_j_patrak = sequelize.define(
    'ps_n_3_j_patrak',
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

        gram_panchayat_name: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'ग्रामपंचायतीचे नाव (Name of the Gram Panchayat)',
        },
        year_total_income: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'वर्षाचे एकूण उत्त्पन्न (Total Income for the Year)',
        },

        construction_grant_income: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'बांधकामासाठी मिळालेली अनुदान निव्वळ उत्त्पन्न सोडून (Income received for construction)',
        },

        net_income_excluding_construction_grant: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'निव्वळ उत्त्पन्न सोडून (Net income excluding construction grant) (3-4)',
        },

        net_income_after_construction_grant: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'निव्वळ उत्त्पन्नावर कॉ. ५ चे रकमेवर ५% आकाराचे जि. ग्रा. वि. निधी (Net income after excluding construction grant)',
        },

        outstanding_loan_installment: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'जि. ग्रा. निधीमधून घेतलेल्या कर्जांच्या हफ्त्यांची रक्कम थकीत (Outstanding loan installment)',
        },

        current_loan_installment: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'जि. ग्रा. निधीमधून घेतलेल्या कर्जांच्या हफ्त्यांची रक्कम चालू (Current loan installment)',
        },

        total_paid_amount: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'एकूण भरलेली रक्कम (Total paid amount)',
        },

        date_invoice: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment: 'तारीख/पा. न. (Date/Invoice Number)',
        },


        outstanding_amount: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'बकाया रक्कम (Outstanding Amount)',
        },

        remarks: {
            type: Sequelize.TEXT,
            allowNull: true,
            comment: 'शेरा (Remarks)',
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
        comment: '(पाच) प्रारंभीची शिल्लक (Initial Balance)',
    }
);

module.exports = ps_n_3_j_patrak;
