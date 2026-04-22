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
		},
		adk_max: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
		adk_arogya: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
		adk_diva: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
		cleaning_tax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
		education_tax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
		tree_tax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
		firebligate_tax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
	},
	{
		createdAt: false,
		updatedAt: false,
	}
)

module.exports = ps_arogya_diva_kar
