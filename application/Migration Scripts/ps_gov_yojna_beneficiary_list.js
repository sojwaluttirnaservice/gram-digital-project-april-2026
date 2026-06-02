const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_gov_yojna_beneficiary_list = sequelize.define(
	'ps_gov_yojna_beneficiary_list',
	{
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		yojana_id: {
			type: Sequelize.BIGINT,
			allowNull: false,
		},
		from_year: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		to_year: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		document_name: {
			type: Sequelize.STRING(255),
			allowNull: false,
			defaultValue: '',
		},
		document_desc: {
			type: Sequelize.STRING(500),
			allowNull: true,
		},
		file_name: {
			type: Sequelize.STRING(255),
			allowNull: false,
			defaultValue: '',
		},
		createdAt: {
			type: Sequelize.DATE,
			allowNull: true,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		},
		updatedAt: {
			type: Sequelize.DATE,
			allowNull: true,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		}
	},
	{
		timestamps: true
	}
)

module.exports = ps_gov_yojna_beneficiary_list
