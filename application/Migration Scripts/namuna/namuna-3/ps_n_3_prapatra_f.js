const Sequelize = require('sequelize');
const sequelize = require('../../../config/db-connect-migration');

const ps_n_3_prapatra_f = sequelize.define(
    'ps_n_3_prapatra_f',
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
        tableName: 'ps_n_3_prapatra_f',
        timestamps: true,
        comment: 'प्रपत्र (फ)',
    }
);

module.exports = ps_n_3_prapatra_f;

/** 
let data_list = [
    [
        {
            name: 'ps_samitit_dept',
            value: 'सामान्य निधी',
        },

        {
            name: 'gram_panchayat_name',
            value: '',
        },

        {
            name: 'intitial_balance',
            value: '',
        },

        {
            name: 'gram_panchayat_name',
            value: '',
        },

        {
            name: 'income_excluding_the_initial_balance',
            value: '',
        },

        {
            name: 'income_including_the_initial_balance',
            value: '',
        },

        {
            name: 'total_expenses',
            value: '',
        },

        {
            name: 'final_remaining_balance',
            value: '',
        },

        {
            name: 'remarks',
            value: '',
        },
    ],

    [
        // similar as above, the name attribute is same, values change
    ],
];

*/
