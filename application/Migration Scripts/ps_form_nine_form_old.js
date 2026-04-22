const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_form_nine_form_old = sequelize.define(
  "ps_form_nine_form_old",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: { type: Sequelize.BIGINT, allowNull: false },
    lastBuildingTax: { type: Sequelize.DOUBLE, allowNull: false },
    currentBuildingTax: { type: Sequelize.DOUBLE, allowNull: false },
    totalBuildingTax: { type: Sequelize.DOUBLE, allowNull: false },
    lastDivaTax: { type: Sequelize.DOUBLE, allowNull: false },
    currentDivaTax: { type: Sequelize.DOUBLE, allowNull: false },
    totalDivaTax: { type: Sequelize.DOUBLE, allowNull: false },
    lastArogyaTax: { type: Sequelize.DOUBLE, allowNull: false },
    currentArogyaTax: { type: Sequelize.DOUBLE, allowNull: false },
    totalArogyaTax: { type: Sequelize.DOUBLE, allowNull: false },
    lastTaxFine: { type: Sequelize.DOUBLE, allowNull: false },
    lastYearTaxFine: { type: Sequelize.DOUBLE, allowNull: false },
    lastTaxRelief: { type: Sequelize.DOUBLE, allowNull: false },
    totalTax: { type: Sequelize.DOUBLE, allowNull: false },
    totalSampurnaTax: { type: Sequelize.DOUBLE, allowNull: false },
    lastSpacialWaterTax: { type: Sequelize.DOUBLE, allowNull: false },
    currentSpacialWaterTax: { type: Sequelize.DOUBLE, allowNull: false },
    totalSpacialWaterTax: { type: Sequelize.DOUBLE, allowNull: false },
    lastGenealWaterTax: { type: Sequelize.DOUBLE, allowNull: false },
    currentGenealWaterTax: { type: Sequelize.DOUBLE, allowNull: false },
    totalGenealWaterTax: { type: Sequelize.DOUBLE, allowNull: false },
    totalWaterTax: { type: Sequelize.DOUBLE, allowNull: false },
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
    created_date: { type: Sequelize.DATEONLY, allowNull: false },
    modify_date: { type: Sequelize.DATEONLY, allowNull: false },
    magni_lekh_date: { type: Sequelize.DATEONLY, defaultValue: null },
    nal_band_notice_date: { type: Sequelize.DATEONLY, defaultValue: null },
    working_year_from: { type: Sequelize.TEXT("long"), defaultValue: null },
    working_year_to: { type: Sequelize.TEXT("long"), defaultValue: null },
  },
  {
    createdAt: false,
    modifiedAt: false,
  },
);
module.exports = ps_form_nine_form_old;
