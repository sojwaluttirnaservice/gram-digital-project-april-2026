const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_arogya_camp_files = sequelize.define(
	'ps_arogya_camp_files',
	{
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		file_name: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		file_name_for_storage: {
			type: Sequelize.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		arogya_seva_kendra_id: {
			type: Sequelize.BIGINT,
			allowNull: true,
		},
	},
	{
		createdAt: false,
		updatedAt: false,
	}
)

module.exports = ps_arogya_camp_files
