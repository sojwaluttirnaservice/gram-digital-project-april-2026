const Sequelize = require('sequelize');
const sequelize = require('../config/db-connect-migration');

const ps_form_nine_form = sequelize.define(
	'ps_form_nine_form',
	{
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: Sequelize.BIGINT,
			allowNull: false
		},

		// EDUCATION
		lastEducationTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		currentEducationTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		totalEducationTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},

		// FIRE
		lastFireblegateTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		currentFireblegateTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		totalFireblegateTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},

		// CLEANING
		lastCleaningTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		currentCleaningTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		totalCleaningTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},

		// TREE
		lastTreeTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		currentTreeTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},
		totalTreeTax: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			defaultValue: 0
		},

		// BUILDING
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

		// DIVA
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

		// AROGYA
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

		// TAX FINE OR RELEASE
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
			type: Sequelize.DATEONLY
		},
		nal_band_notice_date: {
			type: Sequelize.DATEONLY
		},
		checkNo: {
			type: Sequelize.STRING
		}
	},
	{
		createdAt: false,
		updatedAt: false
	}
);

module.exports = ps_form_nine_form;
