const { INTEGER, STRING, BIGINT } = require('sequelize');
const sequelize = require('../config/db-connect-migration');
const ps_aanganwadi_yearly_stats = require('./ps_aanganwadi_yearly_stats');

const ps_aanganwadi_agewise_children = sequelize.define(
    'ps_aanganwadi_agewise_children',
    {
        id: {
            type: INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            comment: 'प्राथमिक की (Primary Key)',
        },

        yearly_stat_id_fk: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: ps_aanganwadi_yearly_stats,
                key: 'id',
            },
            onDelete: 'CASCADE',
            comment: 'वार्षिक नोंद ID (Foreign Key to ps_aanganwadi_yearly_stats)',
        },


        // वयोगट
        min_age: {
            type: STRING(5),
            allowNull: false,
            comment: '',
        },

        max_age: {
            type: STRING(5),
            allowNull: false,
            comment: ''
        },

        child_count: {
            type: INTEGER,
            allowNull: false,
            comment: 'मुलांची संख्या (Number of children in the group)',
        },
    },
    {
        timestamps: false,
        comment: 'वयोगटानुसार मुलांची संख्या (Age group-wise children count)',
    }
);

module.exports = ps_aanganwadi_agewise_children;
