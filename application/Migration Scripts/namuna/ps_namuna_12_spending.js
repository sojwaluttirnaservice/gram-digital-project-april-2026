const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_12_spending = sequelize.define(
    'ps_namuna_12_spending',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        item_name_or_goods_name: {
            type: Sequelize.STRING(150),
            allowNull: false,
            // मागविलेल्या वस्तूचे/मालाचे नाव
        },

        approval_number: {
            type: Sequelize.STRING(50),
            allowNull: false,
            // Marathi: मंजूरी क्रमांक
            // English: Approval number
        },

        approval_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            // Marathi: मंजुरी दिनांक
            // English: Approval date
        },

        quantity_or_weight: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            // Marathi: नग/वजन
            // English: Quantity/Weight
        },

        rate: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            // Marathi: दर
            // English: Rate
        },

        unit: {
            type: Sequelize.STRING(50),
            allowNull: false,
            // Marathi: युनिट
            // English: Unit
        },

        //quantity * rate
        total_amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            // Marathi: एकूण रक्कम
            // English: Total amount, previous expense
        },

        total_amount_previous_expense: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            // Marathi: एकूण रक्कम पूर्वीचा खर्च
            // English: Total amount, previous expense
        },

        // Foreign key , ps_namuna_12_main's id
        main_namuna_12_id_fk: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            // Marathi: रेकॉर्ड तयार करण्याची तारीख
            // English: Record creation date
        },

        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            // Marathi: रेकॉर्ड अद्यतनाची तारीख
            // English: Record update date
        },
    },
    {
        timestamps: true,
        comment: 'आकस्मिक खर्चाचे प्रमाणक',
    }
);

module.exports = ps_namuna_12_spending;
