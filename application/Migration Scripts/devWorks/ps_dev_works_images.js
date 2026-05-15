const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_dev_works_images = sequelize.define(
    'ps_dev_works_images',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        // this is foreignt key, refering the primary key of ps_fund_income_expense_details
        dev_works_id_fk: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'ps_dev_works',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },

        title: {
            type: Sequelize.STRING(120),
            allowNull: false,
        },

        desc: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },

        uploaded_image: {
            type: Sequelize.STRING(255),
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
        timestamps: true,
    }
);

module.exports = ps_dev_works_images;