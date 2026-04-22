
const Sequelize = require('sequelize');
const sequelize = require('../../../config/db-connect-migration');

const ps_n_3_reciept_book_details = sequelize.define(
    'ps_n_3_reciept_book_details',
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


        // --------------------------

        reciept_books: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'पावती पुस्तके',
        },

        namuna_10: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'नमुना १०'
        },

        namuna_7: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'नमुना ७'
        },

        kondwada_number: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'कोंडवाडा क्रमांक'
        },

        // --------------------------

        gp_fund: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'ग्राम निधी'
        },

        gp_water_fund: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'ग्राम.पं. पाणी पुरवठा'
        },

        s_g_r_y: { //सं. ग्रा. रो. यो.
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'सं. ग्रा. रो. यो.'
        },

        b_v_a: { // बा.वि. आ
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'बा.वि. आ'
        },

        // द. व. सु. यो.
        d_v_s_y: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'द. व. सु. यो.'
        },

        // --------------------------

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
        tableName: 'ps_n_3_reciept_book_details',
        timestamps: true,
        comment: 'पावती पुस्तक विवरण',
    }
);

module.exports = ps_n_3_reciept_book_details;


const data_list = [

    [
        { name: 'gp_member_name', value: '' },
        { name: 'post', value: '' },

        { name: 'class', value: '' },
        { name: 'age', value: '' },
        { name: 'education', value: '' },
    ],
    
    [
        // ...
    ]
]