const Sequelize = require('sequelize');
const sequelize = require('../../../../config/db-connect-migration');

// New Schema based on provided columns
const ps_n_3_patrak_j_cleanliness = sequelize.define(
    'ps_n_3_patrak_j_cleanliness',
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

        // ग्रामपंचायतीने वा गटग्रामपंचायतीचे नाव
        gram_panchayat_name: {
            type: Sequelize.STRING,
            allowNull: true,
            comment:
                'ग्रामपंचायतीने वा गटग्रामपंचायतीचे नाव (Name of Gram Panchayat or Group Gram Panchayat)',
        },

        // विहिरीची संख्या (Wells)
        existing_wells_at_year_start: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षारंभी अस्तित्वात असलेली विहिरी (Existing Wells at the start of the year)',
        },

        wells_constructed_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात बांधलेल्या नव्या विहिरी (Wells constructed in the year)',
        },

        wells_repaired_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात दुरुस्त केलेल्या विहिरी (Wells repaired in the year)',
        },

        // ----------------------------------------------
        existing_at_start_year_2: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षारंभी अस्तित्वात असलेल्या',
        },

        newly_constructed_in_year_2: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात बांधलेल्या नव्या',
        },

        repaired_in_year_2: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात दुरुस्त केलेल्या',
        },

        // --------------------

        existing_at_start_year_3: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षारंभी अस्तित्वात असलेल्या',
        },

        mentioned_in_year_3: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात तरतूद केलेली',
        },

        // सार्वजनिक संडासांची संख्या (Public Toilets)
        existing_public_toilets_at_year_start: {
            type: Sequelize.STRING,
            allowNull: true,
            comment:
                'वर्षारंभी अस्तित्वात असलेले सार्वजनिक संडास (Public Toilets at the start of the year)',
        },

        public_toilets_constructed_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात बांधलेले सार्वजनिक संडास (Public Toilets constructed in the year)',
        },

        public_toilets_repaired_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात दुरुस्त केलेले सार्वजनिक संडास (Public Toilets repaired in the year)',
        },

        // प्रसूती गृहांची संख्या (Maternity Homes)
        existing_maternity_homes_at_year_start: {
            type: Sequelize.STRING,
            allowNull: true,
            comment:
                'वर्षारंभी अस्तित्वात असलेली प्रसूती गृह (Existing Maternity Homes at the start of the year)',
        },

        allocated_beds_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात तरतूद केलेल्या खाटा',
        },

        // बाल कल्याण केंद्रांची संख्या (Child Welfare Centers)
        existing_child_welfare_centers_at_year_start: {
            type: Sequelize.STRING,
            allowNull: true,
            comment:
                'वर्षारंभी अस्तित्वात असलेली बाल कल्याण केंद्रे (Existing Child Welfare Centers at the start of the year)',
        },

        new_centers_allocated_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षामध्ये तरतूद केलेली नवी केंद्र',
        },

        // दवाखाने वगैरे चालू (Hospitals and Other Medical Facilities)
        existing_hospitals_at_year_start: {
            type: Sequelize.STRING,
            allowNull: true,
            comment:
                'वर्षारंभी अस्तित्वात असलेले दवाखाने (Existing Hospitals at the start of the year)',
        },

        new_hospitals_allocated_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात तरतूद केलेले नवीन दवाखाने',
        },

        // इतर कोणतेही कामे (Other Works)
        other_works_done_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात केलेली व इतर कोणतीही कामे (Other works done in the year)',
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
        comment:
            'स्वच्छता व आरोग्य संबंधित माहिती (प्रपत्र जे) (Cleanliness and Health-related Information)',
    }
);

module.exports = ps_n_3_patrak_j_cleanliness;
