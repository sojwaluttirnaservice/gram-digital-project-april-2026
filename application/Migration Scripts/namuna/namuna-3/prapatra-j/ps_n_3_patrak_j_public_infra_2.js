const Sequelize = require('sequelize');
const sequelize = require('../../../../config/db-connect-migration');

// New Schema based on provided columns
const ps_n_3_patrak_j_public_infra_2 = sequelize.define(
    'ps_n_3_patrak_j_public_infra_2',
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

        //  झाडू कामगारा
        // -------------------------------------------------
        // Column for "Houses existing at the start of the year"
        existing_houses_at_year_start: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'Houses existing at the start of the year',
        },

        // Column for "Houses constructed in the year"
        constructed_houses_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'Houses constructed in the year',
        },

        // Column for "Houses repaired in the year"
        repaired_houses_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'Houses repaired in the year',
        },

        // मैदाने
        // ------------------------------------------
        // Column for "वर्षाच्या सुरुवातीस असलेली मैदाने"
        fields_at_year_start: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षाच्या सुरुवातीस असलेली मैदाने',
        },

        // Column for "वर्षामध्ये अलग राखून ठेवलेली मैदाने"
        fields_separated_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षामध्ये अलग राखून ठेवलेली मैदाने',
        },

        // कुरण
        // --------------------------------
        // Column for "वर्षाच्या सुरुवातीस असलेली कुरणे"
        pastures_at_year_start: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षाच्या सुरुवातीस असलेली कुरणे',
        },

        // Column for "वर्षात ज्या राखून ठेवलेली कुरणे"
        pastures_separated_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात ज्या राखून ठेवलेली कुरणे',
        },

        //------------------
        // ------------------
        // Column for "वर्षाच्या सुरुवातीस असलेली"
        at_year_start: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षाच्या सुरुवातीस असलेली',
        },

        // Column for "वर्षात जादा तयार केलेली"
        additional_created_in_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात जादा तयार केलेली',
        },

        // LOWER HALF OF THE PRINT
        existing_barns_at_start_of_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षाच्या सुरुवातीस असलेली वखारी (Existing Barns at the Start of the Year)',
        },

        barns_constructed_during_year: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'वर्षात बांधलेल्या वखारी (Barns Constructed During the Year)',
        },

        // इतर पत्रकामध्ये समाविष्ट केलेल्या इतर सार्वजनिक कामाच्या संख्या

        existing_works_at_start_of_year: {
            type: Sequelize.STRING, // Assuming it's a text field listing the works
            allowNull: true,
            comment:
                'वर्षाच्या सुरुवातीस असलेली कामे (कामे नमूद करावी) (Existing Works at the Start of the Year, List the Works)',
        },

        works_done_during_year: {
            type: Sequelize.STRING, // Assuming it's a text field listing the works
            allowNull: true,
            comment:
                'वर्षात जादा केलेली कामे (कामे नमूद करावी) (Works Done During the Year, List the Works)',
        },

        existing_schools_at_start_of_year: {
            type: Sequelize.STRING, // Assuming it's a count of schools
            allowNull: true,
            comment:
                'वर्षाच्या सुरुवातीस असलेल्या शाळा (Existing Schools at the Start of the Year)',
        },

        //

        schools_established_during_year: {
            type: Sequelize.STRING, // Assuming it's a count of schools
            allowNull: true,
            comment: 'वर्षात स्थापन केलेल्या शाळा (Schools Established During the Year)',
        },

        students_in_primary_schools: {
            type: Sequelize.STRING, // Assuming it's a count of students
            allowNull: true,
            comment:
                'प्राथमिक शाळेत जाणाऱ्या विद्यार्थ्यांची संख्या (Number of Students in Primary Schools)',
        },

        student_percentage_in_58_col: {
            type: Sequelize.STRING, // Assuming it's a percentage
            allowNull: true,
            comment: '५८ कॉ. मधील विद्यार्थ्यांचे % (Percentage of Students in 58 Com)',
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
        comment: 'प्रपत्र अतिक्रमण संबंधित माहिती (Encroachment-related Information)',
    }
);

module.exports = ps_n_3_patrak_j_public_infra_2;
