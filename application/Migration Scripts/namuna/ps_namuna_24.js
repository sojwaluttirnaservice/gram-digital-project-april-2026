const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_24 = sequelize.define(
    'ps_namuna_24', // Table name
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: "Each record's unique identifier (Unique identifier for each record).",
        },

        month: {
            type: Sequelize.TINYINT,
            allowNull: false,
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        // Date of transaction (transaction date)
        transaction_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment:
                'हस्तांतरीत खरेदी किंवा संपादित केल्याची तारीख (Date of transfer or modification of the transaction).',
        },

        // Reason for transaction
        transaction_reason: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'कोणत्या कारणासाठी (For which reason or purpose of the transaction).',
        },

        // From whom the land was transferred
        from_party: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'कोणाकडून (From whom the land was transferred).',
        },

        // Agreement or document references (Contract, settlement, etc.)
        agreement_reference: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment:
                'करारनामा, निवाडा इत्यादींचा निर्देश (Reference to agreement, settlement, etc.).',
        },

        // Land and Property details
        land_area: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment: 'जमिनीचे क्षेत्रफळ (Area of land in square units).',
        },

        survey_number: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'भूमापन क्रमांक (Survey number).',
        },

        land_valuation: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'आकारणी (Shape or measurement of land).',
        },

        land_boundaries: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'जमिनीच्या सीमा (Boundaries of the land).',
        },

        land_and_building_purchase: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment:
                'जमिनीसह खरेदी केलेल्या किंवा संपादन केलेल्या कोणत्याही असल्यास (If any purchase or acquisition of land along with buildings).',
        },

        disposal_of_land_and_building: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'जमिनीची व इमारतीची विल्हेवाट (Disposal of land and buildings).',
        },

        // Transaction Amount and Certificate Information
        transaction_amount_from_sale: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment: 'विक्रीपासून मिळालेली रक्कम (Amount received from the sale of land).',
        },

        certificate_number: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'प्रमाणपत्राचा क्रमांक (Certificate number).',
        },

        certificate_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment: 'प्रमाणपत्राचा दिनांक (Date of certificate issuance).',
        },

        resolution_number: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'पंचायतीचा ठराव क्रमांक (Panchayat resolution number).',
        },

        resolution_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment: 'पंचायतीचा ठराव तारीख (Date of Panchayat resolution).',
        },

        authority_order_number: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'प्रधिकाऱ्याच्या आदेशाचा क्रमांक (Order number by the authority).',
        },

        authority_order_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment: 'प्रधिकाऱ्याच्या आदेशाचा दिनांक (Date of the authority order).',
        },

        remarks: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'अतिरिक्त शेरा (Additional remarks about the land transaction).',
        },

        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'Creation timestamp of the record (Record creation timestamp).',
        },

        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'Last update timestamp of the record (Record last update timestamp).',
        },
    },
    {
        tableName: 'ps_namuna_24', // Table name
        timestamps: true, // Enable auto timestamps for create and update
    }
);

module.exports = ps_namuna_24;
