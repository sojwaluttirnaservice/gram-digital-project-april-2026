const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_form_nine_form = sequelize.define(
  "ps_form_nine_form",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },

    // EDUCATION
    lastEducationTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    currentEducationTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    totalEducationTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },

    // FIRE
    lastFireblegateTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    currentFireblegateTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    totalFireblegateTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },

    // CLEANING
    lastCleaningTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    currentCleaningTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    totalCleaningTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },

    // TREE
    lastTreeTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    currentTreeTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    totalTreeTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },

    // BUILDING

    lastBuildingTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    currentBuildingTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    totalBuildingTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },

    // DIVA
    lastDivaTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    currentDivaTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    totalDivaTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },

    // AROGYA
    lastArogyaTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    currentArogyaTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    totalArogyaTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },

    // TAX FINE OR RELEASE
    lastTaxFine: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    lastYearTaxFine: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    lastTaxRelief: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    
    totalTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    totalSampurnaTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    lastSpacialWaterTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    currentSpacialWaterTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    totalSpacialWaterTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    lastGenealWaterTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    currentGenealWaterTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    totalGenealWaterTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    totalWaterTax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    addToMagniLekh: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: "0",
    },
    addNalBandNotice: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: "0",
    },
    created_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    modify_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    magni_lekh_date: {
      type: Sequelize.DATEONLY,
    },
    nal_band_notice_date: {
      type: Sequelize.DATEONLY,
    },
    checkNo: {
      type: Sequelize.STRING,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = ps_form_nine_form;
