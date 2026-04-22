const Sequelize = require('sequelize');
const sequelize = require('../../../config/db-connect-migration');

const ps_n_3_annual_collection_report = sequelize.define(
    'ps_n_3_annual_collection_report',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: 'आइडी (Unique identifier for each record)', // Marathi comment
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            comment: 'वर्ष (Year of the record)',
        },

        data_list: {
            type: Sequelize.TEXT('long'),
            allowNull: true,
            comment: 'Contains data in the format of jsonarray',
        },

        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'निर्मितीची तारीख',
        },

        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'अद्यतनाची तारीख',
        },
    },
    {
        tableName: 'ps_n_3_annual_collection_report',
        timestamps: true,
        comment: 'वार्षिक जमेचा अहवाल',
    }
);

module.exports = ps_n_3_annual_collection_report;