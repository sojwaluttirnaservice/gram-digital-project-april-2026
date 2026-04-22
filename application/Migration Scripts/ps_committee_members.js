const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_committee_members = sequelize.define(
    "ps_committee_members",

    {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        committee_id_fk: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'ps_committees',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },

        profile_image_name: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        member_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        member_post: {
            type: Sequelize.STRING,
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
        timestamps: true
    },
);

module.exports = ps_committee_members;
