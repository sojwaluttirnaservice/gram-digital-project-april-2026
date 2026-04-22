const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_16 = sequelize.define(
    'ps_namuna_16',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        month: {
            type: Sequelize.SMALLINT,
            allowNull: false,
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        // वास्तूचे वर्णन (Description of the item)
        item_description: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        // खरेदीचे प्राधिकार (Purchase authority)
        purchase_authority: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        // खरेदीची तारीख (Purchase date)
        purchase_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },  

        // संख्या (Quantity)
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        // किंमत (Cost/Price)
        cost: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },

        disposal_count: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        // विल्हेवाटाचे स्वरूप (Disposal details)
        disposal_details: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        // प्राधिकार पत्र किंवा प्रमाणपत्र (Authorization or certificate)
        authorization_certificate: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        // वसूल केलेली रक्कम (Recovered amount)
        recovered_amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
        },

        // कोषागाराची तारीख (Treasury date)
        treasury_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },

        // साठ्यातील शिल्लक (Remaining balance in stock)
        stock_balance: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

        // शेरा (Remarks)
        remarks: {
            type: Sequelize.TEXT,
            allowNull: true,
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
        tableName: 'ps_namuna_16',
        timestamps: true,
    }
);

module.exports = ps_namuna_16;
