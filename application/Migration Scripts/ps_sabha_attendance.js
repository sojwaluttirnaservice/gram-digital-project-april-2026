const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_sabha_attendance = sequelize.define(
	'ps_sabha_attendance',
	{
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		sabha_month: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		sabha_year: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		sabasad_name: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		m_bhatta: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		is_present: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	},
	{
		createdAt: false,
		updatedAt: false,
	}
)

module.exports = ps_sabha_attendance
