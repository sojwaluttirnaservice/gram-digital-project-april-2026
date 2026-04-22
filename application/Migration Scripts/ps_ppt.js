const { INTEGER, STRING, DATE, TEXT, ENUM, literal, TINYINT } = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_ppt = sequelize.define(
    'ps_ppt',
    {
        id: {
            type: INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Primary Key - PPT ID',
        },

        title: {
            type: STRING(200),
            allowNull: false,
            comment: 'Presentation main title',
        },

        subtitle: {
            type: STRING(250),
            allowNull: true,
            defaultValue: '',
            comment: 'Presentation subtitle',
        },

        description: {
            type: TEXT,
            allowNull: true,
            comment: 'Short description about the presentation',
        },

        cover_image: {
            type: STRING(500),
            allowNull: true,
            comment: 'Cover image file path or URL',
        },

        theme_name: {
            type: STRING(100),
            allowNull: true,
            defaultValue: 'default',
            comment: 'Selected theme for presentation',
        },

        status: {
            type: ENUM('DRAFT', 'PUBLISHED'),
            allowNull: false,
            defaultValue: 'PUBLISHED',
            comment: 'Presentation status',
        },

        total_slides: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: 'Total number of slides in this presentation',
        },
        
        is_visible: {
            type: TINYINT,
            defaultValue: 1,
            comment: 'This might be need to show the ppt or not'
        },

        page_1_image: {
            type: STRING(255),
            allowNull: false,
        },

        page_2_image: {
            type: STRING(255),
            allowNull: false,
        },

        page_3_image: {
            type: STRING(255),
            allowNull: false,
        },

        remaining_pages_header_image: {
            type: STRING(255),
            allowNull: false,
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
        tableName: 'ps_ppt',
        comment: 'Dynamic PPT Master Table',
    }
)

module.exports = ps_ppt