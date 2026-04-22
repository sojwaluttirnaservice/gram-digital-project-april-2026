const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_atikraman_notice = sequelize.define(
	'ps_atikraman_notice',
	{
		id: {
			type: Sequelize.BIGINT,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		outgoing_number: {
			type: Sequelize.BIGINT,
			allowNull: false,
		},

		date: {
			type: Sequelize.DATEONLY,
			allowNull: false,
		},

		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		malmatta_no: {
			type: Sequelize.STRING,
			allowNull: false,
		},
			
		address: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		east_landmark: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		west_landmark: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		north_landmark: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		south_landmark: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		road_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		created_at: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		},
		updated_at: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		},
	},
	{
		createdAt: false,
		updatedAt: false,
	}
)

module.exports = ps_atikraman_notice
