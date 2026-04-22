const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_gram_sandarbha_ahaval = sequelize.define(
	'ps_gram_sandarbha_ahaval',
	{
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},

		malmatta_owner_name: {
			type: Sequelize.STRING(100),
			allowNull: false,
			defaultValue: ''
		},

		malmatta_no: {
			type: Sequelize.INTEGER,
			allowNull: false,
            defaultValue: 0,
		},
		survey_number: {
			type: Sequelize.INTEGER,
			allowNull: false,
            defaultValue: 0,
		},
		year_from: {
			type: Sequelize.INTEGER,
			allowNull: false,
            defaultValue: 0,
		},
		year_to: {
			type: Sequelize.INTEGER,
			allowNull: false,
            defaultValue: 0,
		},
		area_sq_feet: {
			type: Sequelize.BIGINT,
			allowNull: false,
            defaultValue: 0,
		},
		area_sq_meter: {
			type: Sequelize.BIGINT,
			allowNull: true,
            defaultValue: 0,
		},

		tax_rate: {
			type: Sequelize.INTEGER,
			allowNull: true,
			defaultValue: 0,
		},
		// कर आकारणी
		taxation: {
			type: Sequelize.BIGINT,
			allowNull: false,
            defaultValue: 0,
		},
		year_difference: {
			type: Sequelize.INTEGER,
			allowNull: false,
            defaultValue: 0,
		},
		total_taxation: {
			type: Sequelize.BIGINT,
            defaultValue: 0,
		},
		shera: {
			type: Sequelize.STRING(100),
            allowNull: true,
            defaultValue: ''
		},
	},
	{
		createdAt: false,
		updatedAt: false,
	}
)

module.exports = ps_gram_sandarbha_ahaval
