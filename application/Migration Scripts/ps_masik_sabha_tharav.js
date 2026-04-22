const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_masik_sabha_tharav = sequelize.define(
	'ps_masik_sabha_tharav',
	{
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		
		sabha_number: {
			type: Sequelize.STRING(10),
			allowNull: true,
		},

		sabha_time: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		sabha_date: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		sabha_from_year: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		sabha_to_year: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		sabha_tharav_number: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		sabha_type: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		sabha_location: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		sabha_soochak: {
			// सूचक
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: '',
		},
		sabha_anumodak: {
			//अनुमोदक
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: '',
		},
		sabha_guests: {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: '',
		},
		sabha_subject: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		sabha_chairman: {
			//अध्यक्ष
			type: Sequelize.STRING,
			allowNull: false,
		},
		sabha_officer_name_post: {
			type: Sequelize.TEXT('long'),
		},
		// sabha_officer_post: {
		//     type: Sequelize.STRING,
		//     allowNull: true,
		//     defaultValue: '',
		// },
		sabha_officer_mobile: {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: '',
		},
		sabha_officer_email: {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: '',
		},
		sabha_subject_tharav: {
			type: Sequelize.TEXT('long'),
			allowNull: false,
		},
	},
	{
		createdAt: false,
		updatedAt: false,
	}
)

module.exports = ps_masik_sabha_tharav
