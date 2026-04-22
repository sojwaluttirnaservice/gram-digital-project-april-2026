const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_committees = sequelize.define(
    "ps_committees",
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        committee_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        resolution_number: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        resolution_date: {
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

module.exports = ps_committees;

