const { Sequelize } = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_watertax = sequelize.define(
	'ps_watertax',
	{
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},

		tap_connection_id: {
			type: Sequelize.BIGINT,
			allowNull: false,
		},

		last_special_water_tax: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		current_special_water_tax: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		total_special_water_tax: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},

		last_general_water_tax: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		current_general_water_tax: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		total_general_water_tax: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
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

module.exports = ps_watertax
