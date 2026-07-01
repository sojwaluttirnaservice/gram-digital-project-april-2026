const Sequelize = require('sequelize');
const sequelize = require('../config/db-connect-migration');

const ps_form_nine_form_old = sequelize.define(
	'ps_form_nine_form_old',
	{
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		user_id: {
			type: Sequelize.BIGINT,
			allowNull: false
		},
		lastBuildingTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		currentBuildingTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		totalBuildingTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		lastDivaTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		currentDivaTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		totalDivaTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		lastArogyaTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		currentArogyaTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		totalArogyaTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		lastTaxFine: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		lastYearTaxFine: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		lastTaxRelief: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		totalTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		totalSampurnaTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		lastSpacialWaterTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		currentSpacialWaterTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		totalSpacialWaterTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		lastGenealWaterTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		currentGenealWaterTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		totalGenealWaterTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		totalWaterTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		addToMagniLekh: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		addNalBandNotice: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		created_date: {
			type: Sequelize.DATEONLY,
			allowNull: false
		},
		modify_date: {
			type: Sequelize.DATEONLY,
			allowNull: false
		},
		magni_lekh_date: {
			type: Sequelize.DATEONLY,
			defaultValue: null
		},
		nal_band_notice_date: {
			type: Sequelize.DATEONLY,
			defaultValue: null
		},
		working_year_from: {
			type: Sequelize.TEXT('long'),
			defaultValue: null
		},
		working_year_to: {
			type: Sequelize.TEXT('long'),
			defaultValue: null
		},
		updatedAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
		}
	},
	{
		createdAt: false,
		modifiedAt: false
	}
);

module.exports = ps_form_nine_form_old;
