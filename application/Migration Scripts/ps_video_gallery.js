const {literal, DATE, INTEGER, STRING, TINYINT } = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_video_gallery = sequelize.define(
	'ps_video_gallery',
	{
		id: {
			type: INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		video_link: {
			type: STRING(500),
			allowNull: false,
		},

		video_name: {
			type: STRING(100),
			allowNull: true
		},

		toShow: {
			type: TINYINT,
			allowNull: true,
			defaultValue: 1,
		},

        video_title: {
            type: STRING(200),
        },

        video_desc: {
            type: STRING(500),
        },

        createdAt: {
            type: DATE,
            defaultValue: literal('CURRENT_TIMESTAMP')
        },

        updatedAt: {
            type: DATE,
            defaultValue: literal('CURRENT_TIMESTAMP')
        }
	},
	{
        timestamps: true
	}
)

module.exports = ps_video_gallery
