const { INTEGER, STRING, BIGINT, TEXT, DATE, literal } = require('sequelize')
const sequelize = require('../config/db-connect-migration')
const ps_tap_connection = sequelize.define(
	'ps_tap_connection',
	{
		id: {
			type: BIGINT,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},

		name: {
			type: STRING,
			allowNull: false,
		},

		tap_owner_number: {
			type: STRING,
		},

		mobile: {
			type: STRING,
			allowNull: false,
		},

		malmatta_no: {
			type: STRING,
			allowNull: false,
		},

		address: {
			type: STRING,
			allowNull: false,
		},

		valve_number: {
			type: STRING,
			allowNull: false,
		},

		last_special_water_tax: {
			type: INTEGER,
			allowNull: false,
		},

		last_general_water_tax: {
			type: INTEGER,
			allowNull: false,
		},

		created_at: {
			type: DATE,
			defaultValue: literal('CURRENT_TIMESTAMP'),
		},
	},
	{
		createdAt: false,
		updatedAt: false,
	}
)
module.exports = ps_tap_connection

