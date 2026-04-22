const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_15 = sequelize.define(
    'ps_namuna_15',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        from_year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        to_year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        // तारीख
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false, // तारीख
        },
        
        // प्रारंभिक शिल्लक
        initial_quantity: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true, // प्रारंभिक शिल्लक
        },

        // मिळालेल्या वस्तुंची नाव
        received_item_name: {
            type: Sequelize.STRING(255),
            allowNull: true, // मिळालेल्या वस्तुंची नाव
        },

        // वस्तूंची संख्या किंवा परिमाण
        item_quantity: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true, // वस्तूंची संख्या किंवा परिमाण
        },

        // एकूण
        total: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true, // एकूण
        },

        // कोणास दिले किंवा कोणत्या प्रयोजनाकरिता
        purpose_or_receiver: {
            type: Sequelize.STRING(255),
            allowNull: true, // कोणास दिले किंवा कोणत्या प्रयोजनाकरिता
        },

        // दिलेल्या वस्तुंची संख्या किंवा परिणाम
        issued_item_quantity: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true, // दिलेल्या वस्तुंची संख्या किंवा परिणाम
        },

        // शिल्लक
        remaining_quantity: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true, // शिल्लक
        },

        // वस्तु देणाऱ्या अधिकाऱ्यांचे नाव
        issuing_officer_name: {
            type: Sequelize.STRING(255),
            allowNull: true, // वस्तु देणाऱ्या अधिकाऱ्यांचे नाव
        },

        // वस्तु घेणाऱ्या अधिकाऱ्याचे नाव
        receiving_officer_name: {
            type: Sequelize.STRING(255),
            allowNull: true, // वस्तु घेणाऱ्या अधिकाऱ्याचे नाव
        },

        // REMARKS
        remarks: {
            type: Sequelize.STRING(255),
            allowNull: true, // REMARKS
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
module.exports = ps_namuna_15;
