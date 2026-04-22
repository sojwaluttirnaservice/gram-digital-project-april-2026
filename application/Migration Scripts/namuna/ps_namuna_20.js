const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_20 = sequelize.define(
    'ps_namuna_20',
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

        // परिमाण (Quantity)
        quantity: {
            type: Sequelize.DECIMAL(10, 2), // दशांश स्वरूपात
            allowNull: false,
        },

        // बाब (Item/Description)
        item_description: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },

        // दर (र. पै.) (Rate in Rupees and Paisa)
        rate: {
            type: Sequelize.DECIMAL(10, 2), // र. पै.
            allowNull: false,
        },

        // प्रत्येकी (Per Unit)
        per_unit: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },

        // रक्कम रू. (Amount in Rupees - Decimal)
        amount: {
            type: Sequelize.DECIMAL(10, 2), // रक्कम
            allowNull: false,
        },

        // -------------------------------------------------------------------
        // -------------------------------------------------------------------

        // क्रमांक (Serial Number)
        serial_number: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        // लांबी (Length)
        length: {
            type: Sequelize.DECIMAL(10, 2), // लांबी दशांश स्वरूपात
            allowNull: true,
        },

        // रुंदी (Width)
        width: {
            type: Sequelize.DECIMAL(10, 2), // रुंदी दशांश स्वरूपात
            allowNull: true,
        },

        // खोली (Depth)
        depth: {
            type: Sequelize.DECIMAL(10, 2), // खोली दशांश स्वरूपात
            allowNull: true,
        },

        // परिमाण दशांशात (Calculated Quantity)
        calculated_quantity: {
            type: Sequelize.DECIMAL(10, 2), // परिमाण
            allowNull: false,
        },

        // एकूण (Total)
        total: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },

        // Remarks (टीप)
        remarks: {
            type: Sequelize.STRING(255), // टीप
            allowNull: true,
        },

        // Created At
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },

        // Updated At
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    },
    {
        timestamps: true,
    }
);

module.exports = ps_namuna_20;
