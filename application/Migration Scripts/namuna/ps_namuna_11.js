const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_11 = sequelize.define(
    'ps_namuna_11',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        month: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        // name and address
        name_of_person: {
            type: Sequelize.STRING(255),
            allowNull: false, // व्यक्तीचे नाव
        },

        address_of_person: {
            type: Sequelize.STRING(255),
            allowNull: true, // व्यक्तीचा पत्ता
        },

        // About demand
        nature_of_demand: {
            type: Sequelize.STRING(255),
            allowNull: true, // मागणीचे स्वरूप
        },

        authority_for_demand: {
            type: Sequelize.STRING(255),
            allowNull: true, // मागणीसाठी प्राधिकार
        },

        // मागणी
        demand_installment: {
            type: Sequelize.INTEGER, // हप्ता
            allowNull: true,
        },

        demand_amount: {
            type: Sequelize.DECIMAL(10, 2), // रक्कम
            allowNull: true,
        },

        demand_total_amount: {
            type: Sequelize.DECIMAL(10, 2), // एकूण रक्कम
            allowNull: true,
        },

        // देयक क्रमांक & तारीख
        bill_number: {
            type: Sequelize.STRING(100),
            allowNull: true, // देयक क्रमांक
        },

        bill_date: {
            type: Sequelize.DATEONLY,
            allowNull: true, // देयक तारीख
        },

        // --------------- page2----------
        // वसूल झालेल्या रकमा

        // पावतीचा क्रमांक & तारीख
        receipt_number: {
            type: Sequelize.STRING(100), // पावतीचा क्रमांक
            allowNull: true,
        },

        receipt_date: {
            type: Sequelize.DATEONLY, // पावतीची तारीख
            allowNull: true,
        },

        recovered_amount: {
            type: Sequelize.DECIMAL(10, 2), // वसूल झालेल्या रकमा
            allowNull: true,
        },

        // -------------

        // सूट
        order_number: {
            type: Sequelize.STRING(100), // आदेशाचा क्रमांक
            allowNull: true,
        },

        order_date: {
            type: Sequelize.DATEONLY, // आदेशाची तारीख
            allowNull: true,
        },

        exemption_amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true, // वसुलीतून सूट
        },

        // Remaining
        remaining_amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true, //शिल्लक
        },

        remarks: {
            type: Sequelize.STRING(100),
            allowNull: true, // शेरा
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
module.exports = ps_namuna_11;
