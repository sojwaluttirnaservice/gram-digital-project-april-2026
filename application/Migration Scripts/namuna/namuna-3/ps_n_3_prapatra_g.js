const Sequelize = require('sequelize');
const sequelize = require('../../../config/db-connect-migration');

const ps_n_3_prapatra_g = sequelize.define(
    'ps_n_3_prapatra_g',
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
        tableName: 'ps_n_3_prapatra_g',
        timestamps: true,
        comment: 'प्रपत्र (ग)',
    }
);

module.exports = ps_n_3_prapatra_g;

/** 
let data_list = [
    [
        { name: 'tax_name', value: 'इमारत जमीन कर' },
        { name: 'year_start_balance', value: '' },
        { name: 'requested_for_year', value: '' },
        { name: 'amount_to_be_collected', value: '' },
        { name: 'amount_collected', value: '' },
        { name: 'concession_amount', value: '' },

        { name: 'outstanding_previous_year_end', value: '' },
        { name: 'outstanding_current_year_end', value: '' },
        { name: 'total_at_year_end', value: '' },

        { name: 'cash_collection_ratio', value: '' },
        { name: 'collection_work_remark', value: '' }
    ],
    [
        // similar as above, the name attribute is same, values change
    ],
];

*/
