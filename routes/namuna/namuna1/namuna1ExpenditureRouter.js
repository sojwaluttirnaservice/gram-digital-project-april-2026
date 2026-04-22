const { Router } = require('express');
const namuna1Tapshil1ExpenditureVillageFundsRouter = require('./expenditure/namuna1Tapshil1ExpenditureVillageFundsRouter');
const namuna1Tapshil2ExpenditureWaterFundRouter = require('./expenditure/namuna1Tapshil1ExpenditureWaterFundsRouter');
const namuna1OtherExpendituresRouter = require('./expenditure/namuna1OtherExpendituresRouter ');
const namuna1ExpenditureRouter = Router();

namuna1ExpenditureRouter.use('/village-funds', namuna1Tapshil1ExpenditureVillageFundsRouter);

namuna1ExpenditureRouter.use('/water-funds', namuna1Tapshil2ExpenditureWaterFundRouter);

namuna1ExpenditureRouter.use('/other-expenditures', namuna1OtherExpendituresRouter);

module.exports = namuna1ExpenditureRouter;
