const Sequelize = require('sequelize');
const sequelize = require('../../../config/db-connect-migration');

const ps_n_3_prapatra_b = sequelize.define(
    'ps_n_3_prapatra_b',
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
            unique: true
        },

        // ग्रामपंचायतीचे गट व ग्रामपंचायतीचे नाव व गावाचा मिळून गट बनला असेल त्यांची नावे
        gp_groups: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment:
                'ग्रामपंचायतीचे गट व ग्रामपंचायतीचे नाव व गावाचा मिळून गट बनला असेल त्यांची नावे',
        },

        sq_meter_area: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'क्षेत्रफळ चौरस हे - आर',
        },

        population_at_201: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment:
                '२०१ च्या खाने सुमारास क्षेत्रातील लोकसंख्या (Population in the area around the year 201 or based on data from that time)',
        },

        establishment_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment: 'स्थापना केल्याची तारीख (Establishment Date)',
        },

        last_election_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment: 'मागील सार्वत्रिक निवडणूक तारीख (Last Election Date)',
        },

        regular_term_expiry_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment: 'नेहमीची मुदल संपण्याची तारीख (Regular Term Expiry Date)',
        },

        not_reserved_posts_count: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: 'राखीव नसलेल्या पदांची संख्या (Number of Unreserved Posts)',
        },

        reserved_seats_female: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment:
                'राखीव जागांतील महिला सदस्यांची संख्या (Number of reserved seats for female members)',
        },

        reserved_seats_scheduled_caste: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment:
                'राखीव जागांतील अनुसूचित जातीतील सदस्यांची संख्या (Number of reserved seats for Scheduled Caste members)',
        },

        reserved_seats_scheduled_tribe: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment:
                'राखीव जागांतील अनुसूचित जमातीतील सदस्यांची संख्या (Number of reserved seats for Scheduled Tribe members)',
        },

        reserved_seats_other_backward_classes: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment:
                'राखीव जागांतील इतर मागासवर्गीय सदस्यांची संख्या (Number of reserved seats for Other Backward Classes members)',
        },

        // निवडून आलेल्या किंवा नेमलेल्या सदस्यांची प्रत्यक्ष संख्या (Actual number of elected or appointed members)
        // two subcolumns under this

        elected_grampanchayat_members_count: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment:
                'निवडणूक झालेल्या ग्रा.पं. सदस्यांची संख्या (Number of elected Gram Panchayat members)',
        },

        by_election_grampanchayat_members_count: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment:
                'पोट निवडणूक झालेल्या ग्रा.पं. सदस्यांची संख्या (Number of by-election Gram Panchayat members)',
        },

        // ---------------------------------

        elected_female_members_count: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: 'निवडून आलेल्या स्त्री सदस्या (Number of elected female members)',
        },

        elected_male_members_count: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: 'निवडून आलेल्या पुरुष सदस्य (Number of elected male members)',
        },
        //--------------------

        scheduled_tribe_members_elected_female: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment:
                'अनुसूचित जमातीतील निवडून आलेल्या महिला सदस्यांची संख्या (Number of elected female members from Scheduled Tribes)',
        },

        scheduled_tribe_members_elected_male: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment:
                'अनुसूचित जमातीतील निवडून आलेल्या पुरुष सदस्यांची संख्या (Number of elected male members from Scheduled Tribes)',
        },

        scheduled_caste_members_elected_female: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment:
                'अनुसूचित जातीतील निवडून आलेल्या महिला सदस्यांची संख्या (Number of elected female members from Scheduled Castes)',
        },

        scheduled_caste_members_elected_male: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment:
                'अनुसूचित जातीतील निवडून आलेल्या पुरुष सदस्यांची संख्या (Number of elected male members from Scheduled Castes)',
        },

        other_backward_classes_members_elected_female: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment:
                'इतर मागासवर्गीयातील निवडून आलेल्या महिला सदस्यांची संख्या (Number of elected female members from Other Backward Classes)',
        },

        other_backward_classes_members_elected_male: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment:
                'इतर मागासवर्गीयातील निवडून आलेल्या पुरुष सदस्यांची संख्या (Number of elected male members from Other Backward Classes)',
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
    }
);
module.exports = ps_n_3_prapatra_b;
