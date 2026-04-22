const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_zoom_meetings = sequelize.define(
	'ps_zoom_meetings',
	{
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		meeting_title: {
            type: Sequelize.STRING(300),
			allowNull: false,
		},
        meeting_description: {
            type: Sequelize.STRING(700),
            allowNull: true,
            defaultValue: '',
        },
		meeting_date: {
			type: Sequelize.STRING(12),
			allowNull: false,
		},
		meeting_time: {
			type: Sequelize.STRING(15),
			allowNull: false,
		},
		meeting_link: {
			type: Sequelize.STRING(1000),
			allowNull: true,
			defaultValue: '',
		},
		online_guide_name: {
			type: Sequelize.STRING(100),
			allowNull: true,
			defaultValue: '',
		},
		online_guide_image_name: {
			type: Sequelize.STRING(200),
			allowNull: true,
			defaultValue: '',
		},
		recording_link: {
			type: Sequelize.STRING(1000),
			allowNull: true,
			defaultValue: '',
		},
		created_at: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		},
	},
	{
		createdAt: false,
		updatedAt: false,
	}
)

module.exports = ps_zoom_meetings
