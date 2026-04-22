const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_form_eight_total_taxation = sequelize.define(
	'ps_form_eight_total_taxation',
	{
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: Sequelize.BIGINT,
			allowNull: false,
		},
		total_building_work: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
		total_open_plot: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
		total_area: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
		building_tax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
		open_area_tax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
		other_tex: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
		water_tax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
		dava_kar: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
		arogya_kar: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},

		cleaning_tax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},

		tree_tax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},

		fireblegate_tax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},

		education_tax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},

		total_tax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
		created_date: {
			type: Sequelize.DATEONLY,
			allowNull: false,
		},
	},
	{ createdAt: false, updatedAt: false }
)

module.exports = ps_form_eight_total_taxation
