const Sequelize = require('sequelize');
const sequelize = require('../../../config/db-connect-migration');

// प्रपत्र ई चालू
const ps_n_3_prapatra_ee_current_page = sequelize.define(
    'ps_n_3_prapatra_ee_current_page',
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

        // Column for "शौचालय"
        toilet_expenses: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'शौचालय (Toilet Expenses)',
        },

        // Column for "दलित वस्ती सुधार"
        dalit_welfare: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'दलित वस्ती सुधार (Dalit Wasti Sudhar)',
        },

        // Column for "पाणीपुरवठा / टी. सी. एल"
        water_supply_tcl: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'पाणीपुरवठा / टी. सी. एल (Water Supply / TCL)',
        },

        // Column for "बांधकाम"
        construction_expenses: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'बांधकाम (Construction Expenses)',
        },

        // Column for "शिक्षण शाळा"
        education_schools: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'शिक्षण शाळा (Education Schools)',
        },

        // Column for "मानधन किमान वेतन व बैठक भत्ता"
        honorarium_min_wage_allowance: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'मानधन किमान वेतन व बैठक भत्ता (Honorarium Minimum Wage & Meeting Allowance)',
        },

        // Column for "आरोग्य"
        health_expenses: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'आरोग्य (Health Expenses)',
        },

        // Column for "इतर"
        other_expenses: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'इतर (Other Expenses)',
        },

        // Column for "एकूण (दोन) शासकीय अनुदाने"
        total_government_grants_2: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'एकूण (दोन) शासकीय अनुदाने (Total (Two) Government Grants)',
        },

        // Column for "स्वर्ण जयंती ग्राम स्वरोजगार योजना"
        golden_jubilee_village_self_employment_scheme: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment:
                'स्वर्ण जयंती ग्राम स्वरोजगार योजना (Golden Jubilee Village Self-Employment Scheme)',
        },

        // Column for "जवाहर ग्राम समृद्धी योजना"
        jawahar_village_prosperity_scheme: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'जवाहर ग्राम समृद्धी योजना (Jawahar Village Prosperity Scheme)',
        },

        // Column for "इतर"
        other_schemes: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'इतर (Other Schemes)',
        },

        // Column for "एकूण (तीन) १ ते ३"
        total_schemes_1_to_3: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'एकूण (तीन) १ ते ३ (Total (Three) 1 to 3)',
        },

        // Lower half of the print

        // संकीर्ण खर्च (Restricted expenses)
        // Column for "अग्रीम / अनामत"
        restricted_advance_security: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'अग्रीम / अनामत (Advance / Security)',
        },

        // Column for "ठेवी"
        restricted_deposits: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'ठेवी (Deposits)',
        },

        // Column for "कर्ज हफ्ता व व्याज प्रदाने"
        restricted_loan_repayment_and_interest: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'कर्ज हफ्ता व व्याज प्रदाने (Loan Repayment and Interest Payments)',
        },

        // Column for "इतर"
        restricted_other_loan_expenses: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'इतर (Other Loan Expenses)',
        },

        // Column for "एकूण (चार)"
        restricted_total_expenses_4: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'एकूण (चार) (Total (Four))',
        },

        // under अखेरची शिल्लक

        final_balance_advance_security: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'अग्रीम / अनामत (Advance / Security)',
        },

        // Column for "ठेवी"
        final_balance_deposits: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'ठेवी (Deposits)',
        },

        // Column for "कर्ज"
        final_balance_loan: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'कर्ज हफ्ता व व्याज प्रदाने (Loan Repayment and Interest Payments)',
        },

        // Column for "इतर"
        final_balance_other: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'इतर (Other Loan Expenses)',
        },

        // Column for "एकूण (पाच)"
        final_balance_total_expenses_5: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'एकूण (पाच) (Total (Five))',
        },

        // ----------------------------------

        // Column for "जवाहर ग्राम समृद्धी योजना"
        jawahar_village_prosperity_expenses: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'जवाहर ग्राम समृद्धी योजना (Jawahar Village Prosperity Expenses)',
        },

        // Column for "पंचायत निधी खाते"
        panchayat_fund_account: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'पंचायत निधी खाते (Panchayat Fund Account)',
        },

        // Column for "ग्राम पाणी पुरवठा निधी"
        village_water_supply_fund: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'ग्राम पाणी पुरवठा निधी (Village Water Supply Fund)',
        },

        // Column for "इतर"
        other_funds: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'इतर (Other Funds)',
        },

        total_6: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'एकूण (सहा)',
        },

        // Created and Updated timestamps
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
        comment: 'प्रपत्र (ई) चालू पान नंबर १',
    }
);

module.exports = ps_n_3_prapatra_ee_current_page;
