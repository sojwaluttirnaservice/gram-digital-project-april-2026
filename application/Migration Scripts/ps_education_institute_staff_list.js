const Sequelize = require('sequelize')
const fs = require('fs')
const sequelize = require('../config/db-connect-migration')
const ps_education_institute_list = require('./ps_education_institute_list')
const ps_education_institute_staff_list = sequelize.define(
	'ps_education_institute_staff_list',
	{
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		institute_id: {
			// type: Sequelize.INTEGER,
			// allowNull: false,
			type: Sequelize.BIGINT,
			references: {
				model: ps_education_institute_list,
				key: 'id',
			},
			onDelete: 'CASCADE', // This option enables cascading delete
		},
		staff_name: {
			type: Sequelize.STRING(50),
			allowNull: false,
		},
		staff_designation: {
			type: Sequelize.STRING(50),
			allowNull: false,
			defaultValue: ''
		},
		staff_photo: {
			type: Sequelize.STRING(255),
		},
		staff_mob_no: {
			type: Sequelize.STRING(10),
			allowNull: false,
		},
		createdAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
		},

		updatedAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
		}
	},
	{
		timestamps: true
	},
)

module.exports = ps_education_institute_staff_list
