const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')
const ps_arogya_seva_kendra = require('./ps_arogya_seva_kendra')

const ps_arogya_sevak_information = sequelize.define(
	'ps_arogya_sevak_information',
	{
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		arogya_person_name: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		arogya_person_mobile_no: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		arogya_person_time: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		arogya_person_photo: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		designation: {
			type: Sequelize.STRING(255),
			allowNull: false,
			defaultValue: '',
		},
		join_date: {
			type: Sequelize.STRING(10),
			allowNull: false,
			defaultValue: '00/00/0000'
		},
		//Added new on 13 jan
		arogya_kendra_id: {
			type: Sequelize.BIGINT,
			allowNull: true,
			references: {
				model: ps_arogya_seva_kendra,
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL',
		},
	},
	{
		createdAt: false,
		updatedAt: false,
	}
)

module.exports = ps_arogya_sevak_information
