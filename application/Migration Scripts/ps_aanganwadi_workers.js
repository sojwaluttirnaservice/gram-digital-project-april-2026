const { STRING, BIGINT, ENUM, INTEGER } = require('sequelize');
const sequelize = require('../config/db-connect-migration');
const ps_aanganwadi_centers = require('./ps_aanganwadi_centers');

const ps_aanganwadi_workers = sequelize.define(
    'ps_aanganwadi_workers',
    {
        id: {
            type: INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            comment: 'प्राथमिक की (Primary Key)',
        },

        center_id_fk: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: ps_aanganwadi_centers,
                key: 'id',
            },
            onDelete: 'CASCADE',
            comment: 'अंगणवाडी केंद्र आयडी (Foreign Key to aanganwadi_centers)',
        },

        name: {
            type: STRING,
            allowNull: false,
            comment: 'कर्मचारी नाव (Worker Name - सेविका किंवा मदतनीस)',
        },

        role: {
            type: ENUM('सेविका', 'मदतनीस'),
            allowNull: false,
            comment: 'भूमिका (Role - Sevika or Madatnis)',
        },
    },
    {
        timestamps: false,
        comment: 'अंगणवाडी कर्मचारी माहिती (Sevika/Madatnis Information)',
    }
);

module.exports = ps_aanganwadi_workers;
