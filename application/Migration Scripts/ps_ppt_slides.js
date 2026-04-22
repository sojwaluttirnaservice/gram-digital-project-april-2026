 const { INTEGER, STRING, DATE, TEXT, ENUM, JSON, literal } = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_ppt_slides = sequelize.define(
    'ps_ppt_slides',
    {
        id: {
            type: INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Primary Key - Slide ID',
        },

        ppt_id_fk: {
            type: INTEGER,
            allowNull: false,
            comment: 'Foreign Key referencing ps_ppt.id',
        },

        slide_order: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 1,
            comment: 'Slide sequence number',
        },

        slide_type: {
            type: ENUM('cover', 'content', 'comparison', 'gallery'),
            allowNull: false,
            defaultValue: 'content',
            comment: 'Type of slide layout',
        },

        slide_title: {
            type: STRING(200),
            allowNull: true,
            comment: 'Slide title',
        },

        slide_subtitle: {
            type: STRING(250),
            allowNull: true,
            defaultValue: '',
            comment: 'Slide subtitle',
        },

        slide_description: {
            type: TEXT,
            allowNull: true,
            comment: 'Main content text of slide',
        },

        before_images: {
            type: JSON,
            allowNull: true,
            comment: 'Array of before image URLs',
        },

        after_images: {
            type: JSON,
            allowNull: true,
            comment: 'Array of after image URLs',
        },

        createdAt: {
            type: DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP'),
            comment: 'Record creation time',
        },

        updatedAt: {
            type: DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP'),
            comment: 'Record last update time',
        },
    },
    {
        timestamps: true,
        tableName: 'ps_ppt_slides',
        comment: 'Dynamic PPT Slides Table',
    }
)

module.exports = ps_ppt_slides 