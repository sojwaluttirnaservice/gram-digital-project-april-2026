const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_33_tree_details = sequelize.define(
    'ps_namuna_33_tree_details',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        month: {
            type: Sequelize.TINYINT,
            allowNull: false,
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        // Details of land/road (with supporting material) | जमिनीचा / रस्त्याचा तपशिल (आधारसामग्रीसह)
        land_or_road_details: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment:
                'Details of land or road, including supporting material. | जमिनीचा / रस्त्याचा तपशिल (आधारसामग्रीसह)',
        },

        // Type of tree | वृक्षाचा प्रकार
        tree_type: {
            type: Sequelize.STRING(100),
            allowNull: false,
            comment: 'Specifies the species or type of tree. | वृक्षाचा प्रकार',
        },

        // Additional information about the tree | वृक्षाविषयीची अधिक माहिती
        tree_additional_info: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment:
                'Supplementary details about the tree, like its age, condition, or characteristics. | वृक्षाविषयीची अधिक माहिती',
        },

        // Number of trees | वृक्षाची संख्या
        tree_count: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: 'The total number of trees being recorded. | वृक्षाची संख्या',
        },

        // Expected annual income | अपेक्षित वार्षिक उत्पन्न
        expected_annual_income: {
            type: Sequelize.DECIMAL(12, 2),
            allowNull: true,
            comment:
                'Anticipated annual income from the trees (e.g., from fruits or timber). | अपेक्षित वार्षिक उत्पन्न',
        },

        // Actual income received | प्रत्यक्ष प्राप्त उत्पन्न
        actual_income_received: {
            type: Sequelize.DECIMAL(12, 2),
            allowNull: true,
            comment: 'The actual income generated from the trees. | प्रत्यक्ष प्राप्त उत्पन्न',
        },

        // Details regarding tree cutting or destruction | वृक्ष तोडल्यास नष्ट झाल्यास त्याबाबाबतचा तपशिल
        tree_cut_or_destroyed_details: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment:
                'Information about trees that were cut down or destroyed, including reasons. | वृक्ष तोडल्यास नष्ट झाल्यास त्याबाबाबतचा तपशिल',
        },

        // Timestamps
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
        tableName: 'ps_namuna_33_tree_details',
        timestamps: true,
    }
);

module.exports = ps_namuna_33_tree_details;
