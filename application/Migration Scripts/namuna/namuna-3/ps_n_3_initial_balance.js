const Sequelize = require('sequelize');
const sequelize = require('../../../config/db-connect-migration');

const ps_n_3_initial_balance = sequelize.define(
    'ps_n_3_initial_balance',
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

        // जवाहर ग्रामसमृद्धी योजना (Jawahar Gram Samruddhi Scheme)
        jawahar_gram_samruddhi_scheme: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'जवाहर ग्रामसमृद्धी योजना (Jawahar Gram Samruddhi Scheme)',
        },

        // ग्रामनिधी पुरवठा निधी खाते (Village Fund Supply Account)
        village_fund_supply_account: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'ग्रामनिधी पुरवठा निधी खाते (Village Fund Supply Account)',
        },

        // ग्रामपंचायत निधी खाते (Gram Panchayat Fund Account)
        gram_panchayat_fund_account: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'ग्रामपंचायत निधी खाते (Gram Panchayat Fund Account)',
        },

        // इतर (Other)
        other: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'इतर (Other)',
        },

        // एकूण (सहा) (१ ते ४) (Total (Six) (1 to 4))
        total_6_1_to_4: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'एकूण (सहा) (१ ते ४) (Total (Six) (1 to 4))',
        },

        // एकूण जमा (प्रारंभीची शिल्लकेसह) (एक + दोन + तीन + चार + पाच + सहा) 
        total_with_initial_balance: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'एकूण जमा (प्रारंभीची शिल्लकेसह) (एक + दोन + तीन + चार + पाच + सहा) (Total with Initial Balance (One + Two + Three + Four + Five + Six))',
        },

        // वर्षात जमा (एक + दोन + तीन + चार) (Total in the Year (One + Two + Three + Four))
        total_in_year: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'वर्षात जमा (एक + दोन + तीन + चार) (Total in the Year (One + Two + Three + Four))',
        },

        // जि. ग्रा. वि. निधी आकारण्या योग्य उत्त्पन्न (एकूण) (एक) (अ + ब + क) 
        eligible_income_for_gra_viv_fund: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'जि. ग्रा. वि. निधी आकारण्या योग्य उत्त्पन्न (एकूण) (एक) (अ + ब + क) (Eligible Income for Gram Panchayat Fund (Total) (One) (A + B + C))',
        },

        // मागील वर्षात प्राप्त उत्त्पन्न (Income Received in Previous Year)
        previous_year_income: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'मागील वर्षात प्राप्त उत्त्पन्न (Income Received in Previous Year)',
        },

        // वाढ किंवा घट (Increase or Decrease)
        increase_or_decrease: {
            type: Sequelize.STRING(20),
            allowNull: true,
            comment: 'वाढ किंवा घट (Increase or Decrease)',
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

module.exports = ps_n_3_initial_balance;
