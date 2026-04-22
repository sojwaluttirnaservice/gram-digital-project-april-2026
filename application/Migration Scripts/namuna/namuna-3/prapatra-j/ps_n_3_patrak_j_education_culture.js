const Sequelize = require('sequelize');
const sequelize = require('../../../../config/db-connect-migration');

// New Schema based on provided columns
const ps_n_3_patrak_j_education_culture = sequelize.define(
    'ps_n_3_patrak_j_education_culture',
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

        // ग्रामपंचायतीने वा गटग्रामपंचायतीचे नाव
        gram_panchayat_name: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'ग्रामपंचायतीने वा गटग्रामपंचायतीचे नाव (Name of Gram Panchayat or Group Gram Panchayat)',
        },

        // वर्गांच्या खोल्यांची संख्या
        // --------------------------
        // वर्षाच्या सुरुवातीस असलेल्या खोल्या
        rooms_at_year_start: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षाच्या सुरुवातीस असलेली खोल्या (Rooms at the start of the year)',
        },

        // वर्षात बांधलेल्या खोल्या
        rooms_constructed_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात बांधलेल्या खोल्या (Rooms constructed in the year)',
        },

        // वर्षात दुरुस्त केलेल्या खोल्या
        rooms_repaired_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात दुरुस्त केलेल्या खोल्या (Rooms repaired in the year)',
        },

        // शिक्षण सांस्कृतिक कार्य चालू
        // -------------------------------
        // शाळेत जाणाऱ्या मुलांची संख्या
        students_in_schools: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'शाळेत जाणाऱ्या मुलांची संख्या (Number of students in schools)',
        },

        // कॉ. ६१ अ तील विद्यार्थ्याची आकडेवारी
        students_in_col_61a: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'कॉ. ६१ अ तील विद्यार्थ्याची आकडेवारी (Students in Com 61A)',
        },

        // गतवर्षापेक्षा वाढ किंवा घट
        change_from_last_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'गतवर्षापेक्षा वाढ किंवा घट (Increase/Decrease from Last Year)',
        },

        // खळीची संख्या
        // ----------------
        // वर्षात सुरुवातीस असलेले आखाडे
        arenas_at_year_start: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात सुरुवातीस असलेले आखाडे (Pits at the start of the year)',
        },

        // वर्षात बांधलेली आखाडे
        arenas_constructed_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात बांधलेली आखाडे (Pits constructed in the year)',
        },

        // क्लबांची संख्या
        // ---------------
        // वर्षाच्या सुरुवातीस असलेले क्लब
        clubs_at_year_start: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षाच्या सुरुवातीस असलेले क्लब (Clubs at the start of the year)',
        },

        // वर्षात स्थापन केलेली क्लब
        clubs_established_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात स्थापन केलेली क्लब (Clubs established in the year)',
        },

        // -----------------------
        // NESTED SECTIONS: 
        // -----------------------
        // नाटक गृहांची संख्या
        // ---------------------
        theatres_at_year_start: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षाच्या सुरुवातीस असलेली नाटकगृहे (Theatres at the start of the year)',
        },

        theatres_constructed_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात बांधलेली नाट्यगृहे (Theatres constructed in the year)',
        },

        // ग्रंथालय व वाचनालयाची संख्या
        // -----------------------------
        libraries_at_year_start: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षाच्या सुरुवातीस असलेली ग्रंथालय (Libraries at the start of the year)',
        },

        libraries_established_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात स्थापन केलेली ग्रंथालय (Libraries established in the year)',
        },

        // नोकरांची संख्या (Employee Count)
        // ---------------------------------
        // कारकून
        clerks_count: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'कारकून (Clerks count)',
        },

        // निरीक्षक
        inspectors_count: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'निरीक्षक (Inspectors count)',
        },

        // झाडूवाले
        sweepers_count: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'झाडूवाले (Sweepers count)',
        },

        // भंगी
        scavengers_count: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'भंगी (Scavengers count)',
        },

        // पट्टेवाले
        patta_workers_count: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'पट्टेवाले (Patta workers count)',
        },

        // कोंडवाडा मोहरील
        kondawada_workers_count: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'कोंडवाडा मोहरील (Kondawada workers count)',
        },

        // पहारेकरी
        watchmen_count: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'पहारेकरी (Watchmen count)',
        },

        // इतर पाणी पुरवठा कर्मचारी
        other_water_supply_workers_count: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'इतर पाणी पुरवठा कर्मचारी (Other water supply workers count)',
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
        comment: 'प्रपत्र शिक्षण व सार्वजनिक कार्य संबंधित माहिती (Education and Public Works related Information)',
    }
);

module.exports = ps_n_3_patrak_j_education_culture;
