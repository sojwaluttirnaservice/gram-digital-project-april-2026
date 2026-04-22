const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_13_post_list = sequelize.define(
    'ps_namuna_13_post_list',
    {
        id: {
            type: Sequelize.INTEGER,
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

        post_name: {
            // पदनाम
            type: Sequelize.STRING(50),
            allowNull: false,
        },

        post_count: {
            // पदाची संख्या
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        approved_post: {
            // मंजूर पदे
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        order_date: {
            // दिनांक
            type: Sequelize.DATEONLY,
            allowNull: false,
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
        tableName: 'ps_namuna_13_post_list',
        timestamps: true,
    }
);

module.exports = ps_namuna_13_post_list;
