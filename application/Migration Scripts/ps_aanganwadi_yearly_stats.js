const { INTEGER, STRING, BIGINT, DATE, literal } = require('sequelize');
const sequelize = require('../config/db-connect-migration');
const ps_aanganwadi_centers = require('./ps_aanganwadi_centers');

const ps_aanganwadi_yearly_stats = sequelize.define(
    'ps_aanganwadi_yearly_stats',
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
            comment: 'अंगणवाडी केंद्र ID (Foreign Key to ps_aanganwadi_centers)',
        },

        year_range: {
            type: STRING,
            allowNull: false,
            comment: 'वर्ष (e.g., 2023-24)',
        },

        createdAt: {
            type: DATE,
            defaultValue: literal('CURRENT_TIMESTAMP'),
            comment: 'निर्मितीची तारीख (Creation Timestamp)',
        },

        updatedAt: {
            type: DATE,
            defaultValue: literal('CURRENT_TIMESTAMP'),
            comment: 'शेवटचा अद्यतन (Last Updated Timestamp)',
        },
    },
    {
        timestamps: true,
        comment: 'अंगणवाडी वार्षिक माहिती (Year-wise stats for each center)',
    }
);

module.exports = ps_aanganwadi_yearly_stats;
