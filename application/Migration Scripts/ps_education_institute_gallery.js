const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_education_institute_gallery = sequelize.define(
	'ps_education_institute_gallery',
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
		institute_id: {
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

module.exports = ps_education_institute_gallery
