const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_krishi_vidnyan_file_list = sequelize.define(
	'ps_krishi_vidnyan_file_list',
	{
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		file_name: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		type: {
			type: Sequelize.INTEGER,
		},
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		},
		updatedAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		},
	},
	{
		createdAt: false,
		updatedAt: false,
	}
)

module.exports = ps_krishi_vidnyan_file_list
