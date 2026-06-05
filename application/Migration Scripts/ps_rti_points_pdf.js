const Sequelize = require('sequelize');
const sequelize = require('../config/db-connect-migration');

const ps_rti_points_pdf = sequelize.define(
	'ps_rti_points_pdf',
	{
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		from_year: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		to_year: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		document_name: {
			type: Sequelize.STRING(255),
			allowNull: false
		},
		saved_path: {
			type: Sequelize.STRING(500),
			allowNull: false
		},
		description: {
			type: Sequelize.TEXT,
			allowNull: true
		},
		point_number: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	},
	{
		createdAt: false,
		updatedAt: false
	}
);

module.exports = ps_rti_points_pdf;
