const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_kar_wasuli_ahawal = sequelize.define(
  "ps_kar_wasuli_ahawal",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
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
    lastYearTaxFine: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: "0",
    },
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
    month: { type: Sequelize.INTEGER, allowNull: false },
    created_date: { type: Sequelize.DATEONLY, allowNull: false },
    modify_date: { type: Sequelize.DATEONLY, allowNull: false },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = ps_kar_wasuli_ahawal;
