const Sequelize = require('sequelize');
const sequelize = require('../config/db-connect-migration');

const ps_kar_vasuli_avahal = sequelize.define(
    'ps_kar_vasuli_avahal',
    {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        month: {
            type: Sequelize.STRING('15'),
        },

        year: {
            type: Sequelize.STRING(4),
        },

        // total demand (building) (last , current)
        totalDemandBuildingLast: {
            type: Sequelize.INTEGER,
        },
        totalDemandBuildingCurrent: {
            type: Sequelize.INTEGER,
        },
        totalDemandBuilding: {
            type: Sequelize.INTEGER,
        },

        // last month recovery (building) (last , current)
        lastMonthRecoveryLast: {
            type: Sequelize.INTEGER,
        },
        lastMonthRecoveryCurrent: {
            type: Sequelize.INTEGER,
        },
        lastMonthRecoveryTotal: {
            type: Sequelize.INTEGER,
        },

        // current month recovery (building) (last, current)
        currentMonthRecoveryLast: {
            type: Sequelize.INTEGER,
        },
        currentMonthRecoveryCurrent: {
            type: Sequelize.INTEGER,
        },
        currentMonthRecoveryTotal: {
            type: Sequelize.INTEGER,
        },

        // total recovery (building) (last, current)
        totalRecoveryRecoveryLast: {
            type: Sequelize.INTEGER,
        },
        totalRecoveryRecoveryCurrent: {
            type: Sequelize.INTEGER,
        },
        totalRecoveryRecoveryTotal: {
            type: Sequelize.INTEGER,
        },

        // total remaining recovery (building) (last, current)
        totalRemainRecoveryLast: {
            type: Sequelize.INTEGER,
        },
        totalRemainRecoveryCurrent: {
            type: Sequelize.INTEGER,
        },
        totalRemainRecoveryTotal: {
            type: Sequelize.INTEGER,
        },

        // vasuli percentage (building)

        buildingRecoveryPercentage: {
            type: Sequelize.INTEGER,
        },

        // -------------------------------- //

        // total demand (diva)
        totalDemanDivaLast: {
            type: Sequelize.INTEGER,
        },
        totalDemanDivaCurrent: {
            type: Sequelize.INTEGER,
        },
        totalDemandDiva: {
            type: Sequelize.INTEGER,
        },

        // last month recovery (diva)
        lastMonthDivaLast: {
            type: Sequelize.INTEGER,
        },
        lastMonthDivaCurrent: {
            type: Sequelize.INTEGER,
        },
        lastMonthDivaTotal: {
            type: Sequelize.INTEGER,
        },

        // current month recovery (diva)
        currentMonthDivaLast: {
            type: Sequelize.INTEGER,
        },
        currentMonthDivaCurrent: {
            type: Sequelize.INTEGER,
        },
        currentMonthDivaTotal: {
            type: Sequelize.INTEGER,
        },

        // total recovery (diva)
        totalRecoveryDivaLast: {
            type: Sequelize.INTEGER,
        },
        totalRecoveryDivaCurrent: {
            type: Sequelize.INTEGER,
        },
        totalRecoveryDivaTotal: {
            type: Sequelize.INTEGER,
        },

        // total remaing recovery (diva)
        totalRemainDivaLast: {
            type: Sequelize.INTEGER,
        },
        totalRemainDivaCurrent: {
            type: Sequelize.INTEGER,
        },
        totalRemainDivaTotal: {
            type: Sequelize.INTEGER,
        },

        // vasuli percentage (diva)

        divaRecoveryPercentage: {
            type: Sequelize.INTEGER,
        },
        // -------------------------------------- //

        // total demand (arogya)
        totalDemandArogyaLast: {
            type: Sequelize.INTEGER,
        },
        totalDemandArogyaCurrent: {
            type: Sequelize.INTEGER,
        },
        totalDemandArogya: {
            type: Sequelize.INTEGER,
        },

        // last month recovery (arogya)
        lastMonthArogyaLast: {
            type: Sequelize.INTEGER,
        },
        lastMonthArogyaCurrent: {
            type: Sequelize.INTEGER,
        },
        lastMonthArogyaTotal: {
            type: Sequelize.INTEGER,
        },

        // current month recovery (arogya)
        currentMonthArogyaLast: {
            type: Sequelize.INTEGER,
        },
        currentMonthArogyaCurrent: {
            type: Sequelize.INTEGER,
        },
        currentMonthArogyaTotal: {
            type: Sequelize.INTEGER,
        },

        // total recovery (arogya)
        totalRecoveryArogyaLast: {
            type: Sequelize.INTEGER,
        },
        totalRecoveryArogyaCurrent: {
            type: Sequelize.INTEGER,
        },
        totalRecoveryArogyaTotal: {
            type: Sequelize.INTEGER,
        },

        // total remaing recovery (arogya)
        totalRemainArogyaLast: {
            type: Sequelize.INTEGER,
        },
        totalRemainArogyaCurrent: {
            type: Sequelize.INTEGER,
        },
        totalRemainArogyaTotal: {
            type: Sequelize.INTEGER,
        },

        // vasuli percentage (arogya)
        arogyaRecoveryPercentage: {
            type: Sequelize.INTEGER,
        },
        // -------------------------------------- //

        // total demand (other)
        totalDemandOtherLast: {
            type: Sequelize.INTEGER,
        },
        totalDemandOtherCurrent: {
            type: Sequelize.INTEGER,
        },
        totalDemandOther: {
            type: Sequelize.INTEGER,
        },

        // last month recovery (other)
        lastMonthOtherLast: {
            type: Sequelize.INTEGER,
        },
        lastMonthOtherCurrent: {
            type: Sequelize.INTEGER,
        },
        lastMonthOtherTotal: {
            type: Sequelize.INTEGER,
        },

        // current month recovery (other)
        currentMonthOtherLast: {
            type: Sequelize.INTEGER,
        },
        currentMonthOtherCurrent: {
            type: Sequelize.INTEGER,
        },
        currentMonthOtherTotal: {
            type: Sequelize.INTEGER,
        },

        // total recovery (other)
        totalRecoveryOtherLast: {
            type: Sequelize.INTEGER,
        },
        totalRecoveryOtherCurrent: {
            type: Sequelize.INTEGER,
        },
        totalRecoveryOtherTotal: {
            type: Sequelize.INTEGER,
        },

        // total remaing recovery (other)
        totalRemainOtherLast: {
            type: Sequelize.INTEGER,
        },
        totalRemainOtherCurrent: {
            type: Sequelize.INTEGER,
        },
        totalRemainOtherTotal: {
            type: Sequelize.INTEGER,
        },

        // vasuli percentage (other)
        otherRecoveryPercentage: {
            type: Sequelize.INTEGER,
        },

        // -------------------------------------- //

        // total demand (total)
        totalDemandLast: {
            type: Sequelize.INTEGER,
        },
        totalDemandCurrent: {
            type: Sequelize.INTEGER,
        },
        totalDemandAll: {
            type: Sequelize.INTEGER,
        },

        // last month recovery (total)
        lastMonthTotalLast: {
            type: Sequelize.INTEGER,
        },
        lastMonthTotalCurrent: {
            type: Sequelize.INTEGER,
        },
        lastMonthAll: {
            type: Sequelize.INTEGER,
        },

        // current month recovery (total)
        currentMonthTotalLast: {
            type: Sequelize.INTEGER,
        },
        currentMonthTotalCurrent: {
            type: Sequelize.INTEGER,
        },
        currentMonthAll: {
            type: Sequelize.INTEGER,
        },

        // total recovery (total)
        totalRecoveryTotalLast: {
            type: Sequelize.INTEGER,
        },
        totalRecoveryTotalCurrent: {
            type: Sequelize.INTEGER,
        },
        totalRecoveryAll: {
            type: Sequelize.INTEGER,
        },

        // total remaing recovery (total)
        totalRemainTotalLast: {
            type: Sequelize.INTEGER,
        },
        totalRemainTotalCurrent: {
            type: Sequelize.INTEGER,
        },
        totalRemainAll: {
            type: Sequelize.INTEGER,
        },

        // vasuli percentage (a total)
        aRecoveryPercentage: {
            type: Sequelize.INTEGER,
        },
        // -------------------------------------- //

        // total demand (general water tax)
        totalDemandGeneralWaterTaxLast: {
            type: Sequelize.INTEGER,
        },
        totalDemandGeneralWaterTaxCurrent: {
            type: Sequelize.INTEGER,
        },
        totalDemandGeneralTotalWaterTax: {
            type: Sequelize.INTEGER,
        },

        // last month recovery (general water tax)
        lastMonthGeneralWaterTaxLast: {
            type: Sequelize.INTEGER,
        },
        lastMonthGeneralWaterTaxCurrent: {
            type: Sequelize.INTEGER,
        },
        lastMonthGeneralTotalWaterTax: {
            type: Sequelize.INTEGER,
        },

        // current month recovery (general water tax)
        currentMonthGeneralWaterTaxLast: {
            type: Sequelize.INTEGER,
        },
        currentMonthGeneralWaterTaxCurrent: {
            type: Sequelize.INTEGER,
        },
        currentMonthGeneralTotalWaterTax: {
            type: Sequelize.INTEGER,
        },

        // total recovery (general water tax)
        totalRecoveryGeneralWaterTaxLast: {
            type: Sequelize.INTEGER,
        },
        totalRecoveryGeneralWaterTaxCurrent: {
            type: Sequelize.INTEGER,
        },
        totalRecoveryGeneralTotalWaterTax: {
            type: Sequelize.INTEGER,
        },

        // total remaing recovery (general water tax)
        totalRemainGeneralWaterTaxLast: {
            type: Sequelize.INTEGER,
        },
        totalRemainGeneralWaterTaxCurrent: {
            type: Sequelize.INTEGER,
        },
        totalRemainGeneralTotalWaterTax: {
            type: Sequelize.INTEGER,
        },

        // vasuli percentage (general water tax)
        generalRecoveryPercentage: {
            type: Sequelize.INTEGER,
        },

        // -------------------------------------- //
        // total demand (special water tax)
        totalDemandSpecialWaterTaxLast: {
            type: Sequelize.INTEGER,
        },
        totalDemandSpecialWaterTaxCurrent: {
            type: Sequelize.INTEGER,
        },
        totalDemandSpecialTotalWaterTax: {
            type: Sequelize.INTEGER,
        },

        // last month recovery (special water tax)
        lastMonthSpecialWaterTaxLast: {
            type: Sequelize.INTEGER,
        },
        lastMonthSpecialWaterTaxCurrent: {
            type: Sequelize.INTEGER,
        },
        lastMonthSpecialTotalWaterTax: {
            type: Sequelize.INTEGER,
        },

        // current month recovery (special water tax)
        currentMonthSpecialWaterTaxLast: {
            type: Sequelize.INTEGER,
        },
        currentMonthSpecialWaterTaxCurrent: {
            type: Sequelize.INTEGER,
        },
        currentMonthSpecialTotalWaterTax: {
            type: Sequelize.INTEGER,
        },

        // total recovery (special water tax)
        totalRecoverySpecialWaterTaxLast: {
            type: Sequelize.INTEGER,
        },
        totalRecoverySpecialWaterTaxCurrent: {
            type: Sequelize.INTEGER,
        },
        totalRecoverySpecialTotalWaterTax: {
            type: Sequelize.INTEGER,
        },

        // total remaing recovery (special water tax)
        totalRemainSpecialWaterTaxLast: {
            type: Sequelize.INTEGER,
        },
        totalRemainSpecialWaterTaxCurrent: {
            type: Sequelize.INTEGER,
        },
        totalRemainSpecialTotalWaterTax: {
            type: Sequelize.INTEGER,
        },

        // vasuli percentage (special water tax)
        specialRecoveryPercentage: {
            type: Sequelize.INTEGER,
        },

        // -------------------------------------- //

        // total demand (total water tax)
        totalDemandLastTotalWaterTax: {
            type: Sequelize.INTEGER,
        },
        totalDemandCurrentTotalWaterTax: {
            type: Sequelize.INTEGER,
        },
        totalDemandWaterTaxAll: {
            type: Sequelize.INTEGER,
        },

        // last month recovery (total water tax)
        lastMonthLastTotalWaterTax: {
            type: Sequelize.INTEGER,
        },
        lastMonthCurrentTotalWaterTax: {
            type: Sequelize.INTEGER,
        },
        lastMonthWaterTaxAll: {
            type: Sequelize.INTEGER,
        },

        // current month recovery (total water tax)
        currentMonthLastTotalWaterTax: {
            type: Sequelize.INTEGER,
        },
        currentMonthCurrentTotalWaterTax: {
            type: Sequelize.INTEGER,
        },
        currentMonthWaterTaxAll: {
            type: Sequelize.INTEGER,
        },

        // total recovery (total water tax)
        totalRecoveryLastTotalWaterTax: {
            type: Sequelize.INTEGER,
        },
        totalRecoveryCurrentTotalWaterTax: {
            type: Sequelize.INTEGER,
        },
        totalRecoveryWaterTaxAll: {
            type: Sequelize.INTEGER,
        },

        // total remaing recovery (total water tax)
        totalRemainLastTotalWaterTax: {
            type: Sequelize.INTEGER,
        },
        totalRemainCurrentTotalWaterTax: {
            type: Sequelize.INTEGER,
        },
        totalRemainWaterTaxAll: {
            type: Sequelize.INTEGER,
        },

        // vasuli percentage (total water tax)
        bRecoveryPercentage: {
            type: Sequelize.INTEGER,
        },

        // -------------------------------------- //
        // total demand (A + B Total)
        totalDemandLastABTotal: {
            type: Sequelize.INTEGER,
        },
        totalDemandCurrentABTotal: {
            type: Sequelize.INTEGER,
        },
        totalDemandAllAB: {
            type: Sequelize.INTEGER,
        },

        // last month recovery (A + B Total)
        lastMonthLastABTotal: {
            type: Sequelize.INTEGER,
        },
        lastMonthCurrentABTotal: {
            type: Sequelize.INTEGER,
        },
        lastMonthAllAB: {
            type: Sequelize.INTEGER,
        },

        // current month recovery (A + B Total)
        currentMonthLastABTotal: {
            type: Sequelize.INTEGER,
        },
        currentMonthCurrentABTotal: {
            type: Sequelize.INTEGER,
        },
        currentMonthAllAB: {
            type: Sequelize.INTEGER,
        },

        // total recovery (A + B Total)
        totalRecoveryLastABTotal: {
            type: Sequelize.INTEGER,
        },
        totalRecoveryCurrentABTotal: {
            type: Sequelize.INTEGER,
        },
        totalRecoveryAllAB: {
            type: Sequelize.INTEGER,
        },

        // total remaing recovery (A + B Total)
        totalRemainLastABTotal: {
            type: Sequelize.INTEGER,
        },
        totalRemainCurrentABTotal: {
            type: Sequelize.INTEGER,
        },
        totalRemainAllAB: {
            type: Sequelize.INTEGER,
        },

        // vasuli percentage (A + B Total)
        abRecoveryPercentage: {
            type: Sequelize.INTEGER,
        },
        // -------------------------------------- //
    },
    {
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = ps_kar_vasuli_avahal;
