const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_education_institute_list = sequelize.define(
	'ps_education_institute_list',
	{
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		institute_name: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		institute_image: {
			type: Sequelize.STRING(255),
		},
		institute_type: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	},
	{
		createdAt: false,
		updatedAt: false,
	}
)

module.exports = ps_education_institute_list
