const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_arogya_diva_kar = sequelize.define(
	'ps_arogya_diva_kar',
	{
		id: {
			type: Sequelize.BIGINT,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		adk_min: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0,
		},
		adk_max: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0,
		},
		adk_arogya: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0,
		},
		adk_diva: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0,
		},
		cleaning_tax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0,
		},
		education_tax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0,
		},
		tree_tax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0,
		},
		firebligate_tax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0,
		},
	},
	{
		timestamps: true, // enables createdAt and updatedAt
	}
)

module.exports = ps_arogya_diva_kar