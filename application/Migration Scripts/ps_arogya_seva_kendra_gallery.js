const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_arogya_seva_kendra_gallery = sequelize.define(
	'ps_arogya_seva_kendra_gallery',
	{
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		gallery_image_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		arogya_seva_kendra_id: {
			type: Sequelize.BIGINT,
			allowNull: true,
		},
		created_at: {
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

module.exports = ps_arogya_seva_kendra_gallery
