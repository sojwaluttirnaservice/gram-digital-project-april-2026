const Sequelize = require('sequelize');
const sequelize = require('../../../../config/db-connect-migration');

// New Schema based on provided columns
const ps_n_3_patrak_j_public_infra_1 = sequelize.define(
    'ps_n_3_patrak_j_public_infra_1',
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
            comment: 'वर्ष',
        },

        // Column for Gram Panchayat or Group Gram Panchayat name
        gram_panchayat_name: {
            type: Sequelize.STRING,
            allowNull: false,
            comment:
                'ग्रामपंचायतीने वा गटग्रामपंचायतीचे नाव (Name of Gram Panchayat or Group Gram Panchayat)',
        },

        // Column for existing encroachments at the start of the year
        encroachments_start_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षारंभी अस्तित्व असलेली अतिक्रमणे (Encroachments at the start of the year)',
        },

        // Column for encroachments detected in the year
        encroachments_detected: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षामध्ये दृष्टिस पडलेली अतिक्रमणे (Encroachments detected in the year)',
        },

        // Column for encroachments removed in the year
        encroachments_removed: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात काढून आकलेली अतिक्रमणे (Encroachments removed in the year)',
        },

        // रस्त्यांची लांबी मैलामध्ये
        // ------------------------------------------
        // Sub-column for roads started at the beginning of the year (length)
        roads_start_year_length: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment:
                'वर्षारंभी सुरू असलेली रस्ते लांबी (Length of roads started at the beginning of the year)',
        },

        // Sub-column for roads constructed in the year (length)
        roads_constructed_year_length: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'वर्षात बांधलेले रस्ते लांबी (Length of roads constructed in the year)',
        },

        // Sub-column for roads repaired in the year (length)
        roads_repaired_year_length: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'वर्षात दुरुस्त केलेले रस्ते लांबी (Length of roads repaired in the year)',
        },

        // बांधाची संख्या
        // --------------------------------
        // Sub-column for number of dams repaired in the year
        dams_repaired_year_count: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात दुरुस्त केलेले बांध संख्या (Number of dams repaired in the year)',
        },

        // Sub-column for number of new dams constructed in the year
        dams_new_constructed_year_count: {
            type: Sequelize.STRING,
            allowNull: true,
            comment:
                'वर्षात नवीन बांधलेले बांध संख्या (Number of new dams constructed in the year)',
        },

        // Sub-column for number of dams repaired in the year (total repairs)
        dams_total_repaired_year_count: {
            type: Sequelize.STRING,
            allowNull: true,
            comment:
                'वर्षात दुरुस्त एकूण केलेले बांध संख्या (Total number of dams repaired in the year)',
        },

        // गटाराची लांबी यार्डात
        // ------------------
        // Sub-column for length of sewers existing at the start of the year (in yards)
        sewers_existing_start_year_length: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment:
                'वर्षारंभी अस्तित्व असलेली गटारे (Sewers existing at the start of the year in yards)',
        },

        // Sub-column for length of sewers built during the year (in yards)
        sewers_built_this_year_length: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'वर्षात बांधलेली गटारे (Sewers built this year in yards)',
        },

        // Sub-column for length of sewers repaired during the year (in yards)
        sewers_repaired_this_year_length: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'वर्षात दुरुस्त केलेली गटारे (Sewers repaired this year in yards)',
        },
        // पुलांची संख्या
        // -----------------------

        bridge_count_existing_at_start_of_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षारंभी असलेले पूल (Bridges Existing at the Beginning of the Year)',
        },

        bridge_count_built_this_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात बांधलेले पूल (Bridges Built This Year)',
        },

        bridge_count_repaired_this_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात दुरुस्त केलेले पूल (Bridges Repaired This Year)',
        },

        // दिव्यांच्या खांबांची संख्या
        // ----------------------
        pole_count_existing_at_start_of_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षारंभी असलेले खांब (Poles Existing at the Beginning of the Year)',
        },

        pole_count_extra_lights_installed_this_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात बसवलेले ज्यादा दिवे (Extra Lights Installed This Year)',
        },

        // झाडांची संख्या
        // ----------------------
        trees_existing_at_start_of_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षारंभी असलेली झाडे (Trees Existing at the Start of the Year)',
        },

        trees_planted_and_nurtured_this_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात लावलेली व पोसलेली झाडे (Trees Planted and Nurtured This Year)',
        },

        // धर्मशाळांची संख्या
        // --------------
        // Column for "वर्षारंभी असलेल्या धर्मशाळा"
        existing_religious_halls_at_year_start: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षारंभी असलेल्या धर्मशाळा (Existing Religious Halls at Year Start)',
        },

        // Column for "वर्षात बांधलेल्या धर्मशाळा"
        constructed_religious_halls_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात बांधलेल्या धर्मशाळा (Constructed Religious Halls in Year)',
        },

        // Column for "वर्षात दुरुस्त केलेल्या धर्मशाळा"
        repaired_religious_halls_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात दुरुस्त केलेल्या धर्मशाळा (Repaired Religious Halls in Year)',
        },

        // स्नानासाठी कपडे धुण्यासाठी बांधलेल्या घाटांची  संख्या
        // -------------------------
        // Column for "Existing Ghats at the start of the year"
        existing_ghats_at_year_start: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'Existing Ghats at the start of the year',
        },

        // Column for "Constructed Ghats in the year"
        constructed_ghats_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'Constructed Ghats in the year',
        },

        // Column for "Repaired Ghats in the year"
        repaired_ghats_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'Repaired Ghats in the year',
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
        comment: 'पत्रक जे -प्रपत्र अतिक्रमण संबंधित माहिती  (Encroachment-related Information)',
    }
);

module.exports = ps_n_3_patrak_j_public_infra_1;
