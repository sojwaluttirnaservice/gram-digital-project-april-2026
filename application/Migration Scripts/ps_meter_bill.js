const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_meter_bill = sequelize.define(
	'ps_meter_bill',
	{
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		mb_owner_name: { type: Sequelize.STRING(100), allowNull: false },
		mb_owner_mobile: { type: Sequelize.DOUBLE, allowNull: false },
		mb_owner_address: { type: Sequelize.TEXT('long'), allowNull: false },
		mb_nal_connection_no: { type: Sequelize.STRING(50), allowNull: false },
		mb_meter_connection_no: { type: Sequelize.STRING(50), allowNull: false },
		mb_wall_number: { type: Sequelize.STRING(50), allowNull: false },
		mb_owner_number: { type: Sequelize.STRING(50), allowNull: false },
		mb_zone_number: { type: Sequelize.STRING(50), allowNull: false },
	},
	{
		createdAt: false,
		updatedAt: false,
	}
)

module.exports = ps_meter_bill
