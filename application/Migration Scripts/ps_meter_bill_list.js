const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_meter_bill_list = sequelize.define(
	'ps_meter_bill_list',
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
		mbl_meter_image: {
			type: Sequelize.STRING(512),
			allowNull: false,
		},
		mbl_nal_number: {
			type: Sequelize.STRING(10),
			allowNull: false,
		},
		mbl_deyak_number: {
			type: Sequelize.STRING(10),
			allowNull: false,
		},
		mbl_deyak_date: {
			type: Sequelize.DATEONLY,
			allowNull: false,
		},
		mbl_amt_before_mudat: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
		mbl_valve_number: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
		mbl_deyak_amt_fill_last_date: {
			type: Sequelize.DATEONLY,
			allowNull: false,
		},
		mbl_ward_number: {
			type: Sequelize.STRING(20),
			allowNull: false,
		},
		mbl_user_meter_number: {
			type: Sequelize.STRING(20),
			allowNull: false,
		},
		mbl_user_number: {
			type: Sequelize.STRING(20),
			allowNull: false,
		},
		mbl_nal_usage_type: {
			type: Sequelize.STRING(50),
			allowNull: false,
		},
		mbl_user_name: {
			type: Sequelize.STRING(150),
			allowNull: false,
		},
		mbl_user_mobile_no: {
			type: Sequelize.STRING(150),
			allowNull: false,
		},
		mbl_water_unit: {
			type: Sequelize.STRING(150),
			allowNull: false,
		},
		mbl_water_usage_from: {
			type: Sequelize.DATEONLY,
			allowNull: false,
		},
		mbl_water_usage_to: {
			type: Sequelize.DATEONLY,
			allowNull: false,
		},

		mbl_total_water_usage: {
			type: Sequelize.DOUBLE,
			allowNull: true,
		},

		mbl_meter_reading_start: {
			type: Sequelize.STRING(20),
			allowNull: false,
		},
		mbl_meter_reading_end: {
			type: Sequelize.STRING(20),
			allowNull: false,
		},
		mbl_total_unit: {
			type: Sequelize.STRING(20),
			allowNull: false,
		},
		mbl_rate: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
		mbl_water_amt: {
			type: Sequelize.STRING(20),
			allowNull: false,
		},
		mbl_last_backlock: {
			type: Sequelize.STRING(20),
			allowNull: false,
		},
		mbl_final_total_amt: {
			type: Sequelize.STRING(20),
			allowNull: false,
		},
		mbl_before_date_amt_to_fill: {
			type: Sequelize.STRING(20),
			allowNull: false,
		},
		mbl_after_date_amt_to_fill: {
			type: Sequelize.STRING(20),
			allowNull: false,
		},
		mbl_amt_diposite_till_date: {
			type: Sequelize.DATEONLY,
			allowNull: false,
		},
		inserted_on: {
			type: Sequelize.DATEONLY,
			allowNull: false,
		},

		mbl_payment_date: {
			type: Sequelize.DATEONLY,
		},
		mbl_amount_paid: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
		},
		mbl_is_payment_done: {
			type: Sequelize.TINYINT,
			defaultValue: 0,
		},
		mbl_is_fine_relief_given: {
			type: Sequelize.TINYINT,
			defaultValue: 0,
		},
		mbl_amount_payable: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
		},
	},
	{
		createdAt: false,
		updatedAt: false,
	}
)

module.exports = ps_meter_bill_list
