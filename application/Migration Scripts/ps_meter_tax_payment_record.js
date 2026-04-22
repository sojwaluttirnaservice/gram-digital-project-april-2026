const { Sequelize } = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_meter_tax_payment_record = sequelize.define(
	'ps_meter_tax_payment_record',
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

		water_usage_from_date: {
			type: Sequelize.DATEONLY,
		},

		water_usage_to_date: {
			type: Sequelize.DATEONLY,
		},

		amount_paid: {
			type: Sequelize.INTEGER,
		},

		amount_payable: {
			type: Sequelize.INTEGER,
		},

		unpaid_amount: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
		},

		payment_date: {
			type: Sequelize.DATEONLY,
		},

		payment_mode: {
			type: Sequelize.ENUM('Online', 'Offline'),
			allowNull: false,
		},

		payment_details: {
			type: Sequelize.STRING,
		},

		entry_time: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		},
	},
	{
		createdAt: false,
		updatedAt: false,
	}
)

module.exports = ps_meter_tax_payment_record
