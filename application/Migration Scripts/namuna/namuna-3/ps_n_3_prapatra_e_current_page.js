const Sequelize = require('sequelize');
const sequelize = require('../../../config/db-connect-migration');

// प्रपत्र इ चालू
const ps_n_3_prapatra_e_current_page = sequelize.define(
    'ps_n_3_prapatra_e_current_page',
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

        //---------- UPPER HALF OF THE PRINT PART
        // -----------------------------------
        // ग्रामनिधीतून खर्च

        // Sarpanch and Member related expenses
        sarpanch_honorarium: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'सरपंच मानधन (Sarpanch Honorarium)',
        },

        member_meeting_allowance: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'सदस्य बैठक भत्ता (Member Meeting Allowance)',
        },

        member_sarpanch_travel_allowance: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'सदस्य/सरपंच प्रवास भत्ता (Member/Sarpanch Travel Allowance)',
        },

        employee_salary: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'कार्माचारी (Employee Salary)',
        },

        // -----------------------------------
        // कारभार विषयक खर्च

        employee_travel_allowance: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'कर्मचारी प्रवास भत्ता (Employee Travel Allowance)',
        },

        office_expenses: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'कार्यालयीन खर्च (Office Expenses)',
        },

        repair_and_maintenance: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'दुरुस्ती व देखभाल (Repair and Maintenance)',
        },

        cleanliness_expenses: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'स्वच्छता (Cleanliness)',
        },

        water_supply_expenses: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'पाणीपुरवठा (Water Supply)',
        },

        // ---------------------------------
        // शिक्षण व आरोग्य विषयक खर्च

        // Below two under विद्युत देयके
        electricity_water_supply_bill: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'पाणीपुरवठा  (Water Supply)',
        },

        road_lighting_expenses: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'रस्त्यावरील दिवाबत्ती (Road Lighting)',
        },

        //---
        total_expenses_a_b: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'एकूण (अ + ब) (Total (A + B))',
        },

        literature_and_miscellaneous: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'साहित्य व इतर (Literature and Miscellaneous)',
        },

        education_expenses: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'शिक्षण (Education)',
        },

        healthcare_expenses: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'आरोग्य (health)',
        },

        // LOWER HALF OF THE PRINT PART
        // New fields for additional expenses
        road_and_drainage_construction: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'रस्ते व गटार (Road and Drainage Construction)',
        },

        other_construction: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'इतर बांधकाम (Other Construction)',
        },

        reading_room: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'वाचनालय (Reading Room)',
        },

        water_purification_tcl: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'जलशुद्धीकरण टीसी एल (Water Purification TCL)',
        },

        gardens_and_playgrounds: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'बाग व मैदान (Gardens and Playgrounds)',
        },

        social_welfare_tribal_welfare: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'समाज कल्याण/आदिवासी व मागासवर्ग (Social Welfare/Tribal Welfare)',
        },

        dvdf_contribution: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'डी.व्ही.सी. एक वर्गणी (DVC Contribution)',
        },

        women_and_child_welfare: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'महिला व बाल कल्य्ना (Women and Child Welfare)',
        },

        social_cultural_programs: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'सामाजिक व सांस्कृतिक कार्यक्रम (Social and Cultural Programs)',
        },

        kondwada: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'कोंडवाडा (Kondwada)',
        },

        literature_and_purchases: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'साहित्य व खरेदी (Literature and Purchases)',
        },

        agriculture_expenses: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'शेती (Agriculture)',
        },

        other_expenses: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'इतर (Other)',
        },

        total_gram_nidhi_expenses: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'एकूण (एक) (ग्रामनिधी खर्च) (Total (A) (Gram Nidhi Expenses))',
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
        commment: 'प्रपत्र (इ) चालू पान नंबर १',
    }
);

module.exports = ps_n_3_prapatra_e_current_page;
