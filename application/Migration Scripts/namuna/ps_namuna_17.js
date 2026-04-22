const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_17 = sequelize.define(
    'ps_namuna_17',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        // Name of the person
        person_name: {
            type: Sequelize.STRING(255), // व्यक्तीचे नाव
            allowNull: false,
        },

        // Name of the company
        company_name: {
            type: Sequelize.STRING(255), // कंपनीचे नाव
            allowNull: false,
        },

        // Order number
        order_number: {
            type: Sequelize.STRING(100), // आदेश क्रमांक
            allowNull: false,
        },

        // Description of the work
        work_description: {
            type: Sequelize.TEXT, // कामाचे विवरण
            allowNull: false,
        },

        // Payment amount
        payment_amount: {
            type: Sequelize.DECIMAL(10, 2), // भरण्याची रक्कम
            allowNull: false,
        },

        // Date
        date: {
            type: Sequelize.DATEONLY, // दिनांक
            allowNull: false,
        },

        // Remarks
        remarks: {
            type: Sequelize.STRING(255), // टीप
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
        timestamps: true,
    }
);

module.exports = ps_namuna_17;
