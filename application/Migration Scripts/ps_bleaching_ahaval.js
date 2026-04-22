const Sequelize = require('sequelize')

const sequelize = require('../config/db-connect-migration')

const ps_bleaching_ahaval = sequelize.define(
	'ps_bleaching_ahaval',
	{
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},

		month: {
			type: Sequelize.TINYINT,
		},
		year: {
			type: Sequelize.INTEGER,
		},
		date_from: {
			type: Sequelize.DATEONLY,
		},
		date_to: {
			type: Sequelize.DATEONLY,
		},
		gp_name: {
			type: Sequelize.STRING,
		},
		village_name: {
			type: Sequelize.STRING,
		},
		total_public_well_count: {
			type: Sequelize.INTEGER,
		},
		cleaned_well_count: {
			type: Sequelize.INTEGER,
		},
		well_cleaning_day: {
			type: Sequelize.STRING,
		},
		well_cleaner_name: {
			type: Sequelize.STRING,
		},
		hudda: {
			type: Sequelize.STRING,
		},
		well_cleaning_shera: {
			type: Sequelize.STRING,
		},

		month_start_quantity: {
			type: Sequelize.DOUBLE,
		},
		month_purchased_quantity: {
			type: Sequelize.DOUBLE,
		},
		current_month_used_quantity: {
			type: Sequelize.DOUBLE,
		},
		month_last_remaining_quantity: {
			type: Sequelize.DOUBLE,
		},
		bleaching_storage_shera: {
			type: Sequelize.STRING,
		},
	},
	{
		createdAt: false,
		updatedAt: false,
	}
)

module.exports = ps_bleaching_ahaval
