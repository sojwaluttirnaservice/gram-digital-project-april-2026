const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_arogya_seva_kendra = sequelize.define(
	'ps_arogya_seva_kendra',
	{
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		arogya_seva_kendra_name: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		arogya_seva_kendra_image_name: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		arogya_seva_kendra_description: {
			type: Sequelize.STRING(1000),
			allowNull: false,
		},
        arogya_seva_kendra_address: {
            type: Sequelize.STRING(400),
			allowNull: false,
        },
        arogya_seva_kendra_mobile: {
            type: Sequelize.STRING(15),
			allowNull: false,
            defaultValue: ''
        },
        arogya_seva_kendra_email: {
            type: Sequelize.STRING(50),
			allowNull: true,
            defaultValue: ''
        },
		arogya_seva_kendra_time: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		arogya_seva_kendra_adhikari_name: {
			type: Sequelize.STRING(300),
			defaultValue: ''
		},
		created_at: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		},
		updated_at: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		},
	},
	{
		createdAt: false,
		updatedAt: false,
	}
)

module.exports = ps_arogya_seva_kendra
