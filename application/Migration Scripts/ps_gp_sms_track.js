const Sequelize = require('sequelize')

const sequelize = require('../config/db-connect-migration')

const ps_gp_sms_track = sequelize.define(
	'ps_gp_sms_track',
	{
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		reciever_mobile: {
			type: Sequelize.TEXT('long'),
			allowNull: false,
		},
		message: {
			type: Sequelize.TEXT,
			allowNull: false,
			defaultValue: '',
		},
		success: {
			type: Sequelize.TINYINT,
			allowNull: false,
			defaultValue: -1,
		},
		datetime: {
			type: Sequelize.DATE,
      allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			// defaultValue: NOW,
		},
		// time: {
		// 	type: TIME,
		// 	defaultValue: literal('CURRENT_TIME'),
		// },
		//-1 : Not sent, 0 fail, 1 success
	},
	{
		createdAt: false,
		updatedAt: false,
	}
)

module.exports = ps_gp_sms_track
