const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_gram_ahaval_documents = sequelize.define(
	'ps_gram_ahaval_documents',
	{
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		document_name: {
			type: Sequelize.STRING(150),
			allowNull: false,
		},
		document_file_name: {
			type: Sequelize.STRING(700),
			allowNull: true,
			defaultValue: '',
		},
	},
	{
		createdAt: false,
		updatedAt: false,
	}
)

module.exports = ps_gram_ahaval_documents
