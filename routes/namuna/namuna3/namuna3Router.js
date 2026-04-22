const { Router } = require('express');
const { checkForPoolConnection } = require('../../middleware');
const { sendError, renderPage } = require('../../../application/utils/sendResponse');

// Models for Home
const HomeModel = require('../../../application/model/HomeModel');

// Models for namuna3
const prapatraBModel = require('../../../application/model/namuna/namuna3/prapatraBModel');
const womenChildrenWelfareModel = require('../../../application/model/namuna/namuna3/womenChildrenWelfareModel');
const backwardClassModel = require('../../../application/model/namuna/namuna3/backwardClassModel');
const oneBOtherIncomeModel = require('../../../application/model/namuna/namuna3/oneBOtherIncomeModel');
const transferredAmountModel = require('../../../application/model/namuna/namuna3/transferredAmountModel');
const stateAuxiliaryGrantsModel = require('../../../application/model/namuna/namuna3/stateAuxiliaryGrantsModel ');
const centralAuxiliaryGrantsModel = require('../../../application/model/namuna/namuna3/centralAuxiliaryGrantsModel');
const initialBalanceModel = require('../../../application/model/namuna/namuna3/initialBalanceModel');

// Routes for prapatraB
const prapatraBRouter = require('./routes/prapatraBRouter');
// Routes for womenChildrenWelfare
const womenChildrenWelfareRouter = require('./routes/womenChildrenWelfareRouter');
// Routes for backwardClass
const backwardClassRouter = require('./routes/backwardClassRouter');
// Routes for otherIncome
const otherIncomeRouter = require('./routes/otherIncomeRouter');
// Routes for transferredAmount
const transferredAmountRouter = require('./routes/transferredAmountRouter');
// Routes for stateAuxiliaryGrants
const stateAuxiliaryGrantsRouter = require('./routes/stateAuxiliaryGrantsRouter');
// Routes for centralAuxiliaryGrants
const centralAuxiliaryGrantsRouter = require('./routes/centralAuxiliaryGrantsRouter');
// Routes for initialBalance
const initialBalanceRouter = require('./routes/initialBalanceRouter');
const prapatraECurrentRouter = require('./routes/prapatraECurrentRouter');
const prapatraECurrentPageModel = require('../../../application/model/namuna/namuna3/prapatraECurrentPageModel');
const prapatraEECurrentPageModel = require('../../../application/model/namuna/namuna3/prapatraEECurrentPageModel');
const prapatraEECurrentRouter = require('./routes/prapatraEECurrentRouter');
const patrakJCleanlinessRouter = require('./routes/patrakJ/patrakJCleanlinessRouter');
const patrakJPublicInfra1Router = require('./routes/patrakJ/patrakJPublicInfra1Router');
const patrakJPublicInfra2Router = require('./routes/patrakJ/patrakJPublicInfra2Router');
const patrakJEducationCultureRouter = require('./routes/patrakJ/patrakJEducationCultureRouter');
const patrakJCleanlinessModel = require('../../../application/model/namuna/namuna3/patrakJ/patrakJCleanlinessModel');
const patrakJPublicInfra1Model = require('../../../application/model/namuna/namuna3/patrakJ/patrakJPublicInfra1Model');
const patrakJPublicInfra2Model = require('../../../application/model/namuna/namuna3/patrakJ/patrakJPublicInfra2Model');
const patrakJEducationCultureModel = require('../../../application/model/namuna/namuna3/patrakJ/patrakJEducationCultureModel');
const prapatraCATaxModel = require('../../../application/model/namuna/namuna3/prapatraCATaxModel');
const prapatraCATaxRouter = require('./routes/prapatraCATaxRouter');
const prapatraFRouter = require('./routes/prapatraFRouter');
const prapatraGRouter = require('./routes/prapatraGRouter');
const prapatraFModel = require('../../../application/model/namuna/namuna3/prapatraFModel');
const prapatraGModel = require('../../../application/model/namuna/namuna3/prapatraGModel');
const annualCollectionReportModel = require('../../../application/model/namuna/namuna3/annualCollectionReportModel');
const annualReportAddendumModel = require('../../../application/model/namuna/namuna3/annualReportAddendumModel');
const annualReportAddendumRouter = require('./routes/annualReportAddendumRouter');
const annualCollectionReportRouter = require('./routes/annualCollectionReportRouter');
const annualExpenditureReportRouter = require('./routes/annualExpenditureReportRouter');
const annualExpenditureReportModel = require('../../../application/model/namuna/namuna3/annualExpenditureReportModel');
const gpCostRevaluationRouter = require('./routes/gpCostRevaluationRouter');
const gpCostRevaluationModel = require('../../../application/model/namuna/namuna3/gpCostRevaluationModel');
const recieptBookReportModel = require('../../../application/model/namuna/namuna3/recieptBookReportModel');
const recieptBookReportRouter = require('./routes/recieptBookReportRouter');
const patrakGGPWaterSupplyRouter = require('./routes/patrakGGPWaterSupplyRouter');
const patrakGGPWaterSupplyModel = require('../../../application/model/namuna/namuna3/patrakGGPWaterSupplyModel');
const gpWaterSupplyFundModel = require('../../../application/model/namuna/namuna3/gpWaterSupplyFundModel');
const gpWaterSupplyFundRouter = require('./routes/gpWaterSupplyFundRouter');
const jPatrakMasikSabhaRouter = require('./routes/jPatrakMasikSabhaRouter');
const jPatrakMasikSabhaModel = require('../../../application/model/namuna/namuna3/jPatrakMasikSabhaModel');
const jPatrakModel = require('../../../application/model/namuna/namuna3/jPatrakModel');
const jPatrakRouter = require('./routes/jPatrakRouter');

const namuna3Router = Router();

namuna3Router.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const _gp = await HomeModel.getGpData(res.pool);
        renderPage(res, 'user/namuna/namuna3/namuna-3-page.pug', { gp: _gp[0] });
    } catch (err) {
        return sendError(res, 500, 0, `Error while rendering the namuna 3 page : ${err}`, err);
    }
});

//
namuna3Router.use('/prapatra-b', prapatraBRouter);

namuna3Router.use('/prapatra-f', prapatraFRouter);

namuna3Router.use('/prapatra-g', prapatraGRouter);

namuna3Router.use('/wc-welfare', womenChildrenWelfareRouter);

namuna3Router.use('/backward-class', backwardClassRouter);

namuna3Router.use('/prapatra-c-a-tax', prapatraCATaxRouter);

namuna3Router.use('/other-income', otherIncomeRouter);

namuna3Router.use('/transferred-amount', transferredAmountRouter);

namuna3Router.use('/state-auxiliary-grants', stateAuxiliaryGrantsRouter);

namuna3Router.use('/central-auxiliary-grants', centralAuxiliaryGrantsRouter);

namuna3Router.use('/initial-balance', initialBalanceRouter);

namuna3Router.use('/prapatra-e-current', prapatraECurrentRouter);

namuna3Router.use('/prapatra-ee-current', prapatraEECurrentRouter);

// पत्रक जे
namuna3Router.use('/patrak-j-cleanliness', patrakJCleanlinessRouter);
namuna3Router.use('/patrak-j-p-infra-1', patrakJPublicInfra1Router);
namuna3Router.use('/patrak-j-p-infra-2', patrakJPublicInfra2Router);
namuna3Router.use('/patrak-j-edu-culture', patrakJEducationCultureRouter);


// 
namuna3Router.use('/annual-report-addendum', annualReportAddendumRouter)

namuna3Router.use('/j-patrak', jPatrakRouter)
namuna3Router.use('/j-patrak-masik-sabha', jPatrakMasikSabhaRouter)


namuna3Router.use('/annual-collection-report', annualCollectionReportRouter)
namuna3Router.use('/annual-expenditure-report', annualExpenditureReportRouter)

namuna3Router.use('/gp-cost-revaluation', gpCostRevaluationRouter)



namuna3Router.use('/reciept-book-report', recieptBookReportRouter)

namuna3Router.use('/gp-water-supply-fund', gpWaterSupplyFundRouter)

namuna3Router.use('/patrak-g-gp-water-supply', patrakGGPWaterSupplyRouter)


namuna3Router.get('/print', checkForPoolConnection, async (req, res) => {
    try {
        const _gp = await HomeModel.getGpData(res.pool);

        const { year } = req.query;

        // Print page 1
        let _prapatraB = await prapatraBModel.getByYear(res.pool, year);

        let _prapatraF = await prapatraFModel.getByYear(res.pool, year)
        let _prapatraG = await prapatraGModel.getByYear(res.pool, year)


        //  page 3

        let _wcWelfare = await womenChildrenWelfareModel.getByYear(res.pool, year);
        let _backwardClass = await backwardClassModel.getByYear(res.pool, year);

        // page 4

        let _prapatraCATax = await prapatraCATaxModel.getByYear(res.pool, year);
        let _otherIncome = await oneBOtherIncomeModel.getByYear(res.pool, year);

        // page 5
        let _transferredAmount = await transferredAmountModel.getByYear(res.pool, year);
        let _stateAuxiliaryGrants = await stateAuxiliaryGrantsModel.getByYear(res.pool, year);

        // page 6

        let _centralAuxiliaryGrants = await centralAuxiliaryGrantsModel.getByYear(res.pool, year);
        let _initialBalance = await initialBalanceModel.getByYear(res.pool, year);

        // page 7
        let _prapatraECurrent = await prapatraECurrentPageModel.getByYear(res.pool, year);

        // page 8
        let _prapatraEECurrent = await prapatraEECurrentPageModel.getByYear(res.pool, year);

        // पत्रक जे

        let _patrakJCleanliness = await patrakJCleanlinessModel.getByYear(res.pool, year);

        let _patrakJPublicInfra1 = await patrakJPublicInfra1Model.getByYear(res.pool, year);

        let _patrakJPublicInfra2 = await patrakJPublicInfra2Model.getByYear(res.pool, year);

        let _patrakJEducationCulture = await patrakJEducationCultureModel.getByYear(res.pool, year);



        // वार्षिक अहवाल पुरवणी 
        let _annualReportAddendum = await annualReportAddendumModel.getByYear(res.pool, year)


        let _jPatrak = await jPatrakModel.getByYear(res.pool, year)

        let _jPatrakMasikSabha = await jPatrakMasikSabhaModel.getByYear(res.pool, year)
        // जमे खर्चेचा अहवाल
        // जमा
        let _annualCollectionReport = await annualCollectionReportModel.getByYear(res.pool, year)

        // खर्च
        let _annualExpenditureReport = await annualExpenditureReportModel.getByYear(res.pool, year)

        let _gpWaterSupplyFund = await gpWaterSupplyFundModel.getByYear(res.pool, year)

        let _patrakGGPWaterSupply = await patrakGGPWaterSupplyModel.getByYear(res.pool, year)

        let _gpCostRevaluation = await gpCostRevaluationModel.getByYear(res.pool, year)

        let _recieptBookReport = await recieptBookReportModel.getByYear(res.pool, year)


        renderPage(res, 'user/namuna/namuna3/namuna-3-print.pug', {
            // Print page 1
            prapatraB: _prapatraB[0] || {},

            //  page 3
            wcWelfare: _wcWelfare[0] || {},
            backwardClass: _backwardClass[0] || {},

            // page 4
            prapatraCATax: _prapatraCATax[0] || {},
            otherIncome: _otherIncome[0] || {},
            // page 5
            transferredAmount: _transferredAmount[0] || {},
            stateAuxiliaryGrants: _stateAuxiliaryGrants[0] || {},

            // page 6

            centralAuxiliaryGrants: _centralAuxiliaryGrants[0] || {},
            initialBalance: _initialBalance[0] || {},

            // page 7
            prapatraECurrent: _prapatraECurrent[0] || {},

            // page 8
            prapatraEECurrent: _prapatraEECurrent[0] || {},

            // पत्रक जे चालू
            patrakJCleanliness: _patrakJCleanliness[0] || {},
            patrakJPublicInfra1: _patrakJPublicInfra1[0] || {},
            patrakJPublicInfra2: _patrakJPublicInfra2[0] || {},
            patrakJEducationCulture: _patrakJEducationCulture[0] || {},

            prapatraF: _prapatraF[0] || {},
            prapatraG: _prapatraG[0] || {},

            // वार्षिक अहवाल पुरवणी 

            annualReportAddendum: _annualReportAddendum[0] || {},



            jPatrak: _jPatrak[0] || {},
            jPatrakMasikSabha: _jPatrakMasikSabha[0] || {},

            // जमे खर्चेचा अहवाल
            // जमा
            annualCollectionReport: _annualCollectionReport[0] || {},
            // खर्च
            annualExpenditureReport: _annualExpenditureReport[0] || {},


            gpWaterSupplyFund: _gpWaterSupplyFund[0] || {},
            // 

            patrakGGPWaterSupply: _patrakGGPWaterSupply[0] || {},

            gpCostRevaluation: _gpCostRevaluation[0] || {},


            recieptBookReport: _recieptBookReport[0] || {}


        });
    } catch (err) {
        return sendError(
            res,
            500,
            0,
            `Error while rendering the namuna 3 print page : ${err}`,
            err
        );
    }
});

module.exports = namuna3Router;
