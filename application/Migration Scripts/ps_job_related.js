const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_job_related = sequelize.define(
	'ps_job_related',
	{
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		job_title: {
			type: Sequelize.STRING(150),
			allowNull: false,
		},
		job_description: {
			type: Sequelize.STRING(700),
			allowNull: true,
			defaultValue: '',
		},
		expiry_date: {
			type: Sequelize.STRING(12),
			allowNull: false,
		},
		link: {
			type: Sequelize.STRING(1000),
			allowNull: true,
			defaultValue: '',
		},
		file_name: {
			type: Sequelize.STRING(255),
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

module.exports = ps_job_related
