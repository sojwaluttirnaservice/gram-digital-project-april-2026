const { Router } = require('express');
const namuna1Tapshil1CollectionOfVillageFundsRouter = require('./collection/namuna1Tapshil1CollectionOfVillageFundsRouter');
const namuna1Tapshil2OtherIncomeRouter = require('./collection/namuna1Tapshil2OtherIncomeRouter');
const namuna1Tapshil3SanctionedAmountRouter = require('./collection/namuna1Tapshil3SanctionedAmountRouter');
const namuna1Tapshil4AuxiliaryGrantsRouter = require('./collection/namuna1Tapshil4AuxiliaryGrantsRouter');
const namuna1Tapshil5WaterFundRouter = require('./collection/namuna1Tapshil5WaterFundRouter');
const namuna1CollectionRouter = Router();

// तपशिल १ (जमा ग्रामनिधी)
namuna1CollectionRouter.use('/village-funds', namuna1Tapshil1CollectionOfVillageFundsRouter);

// तपशिल २ (करेत्तर उत्त्पन्न)
namuna1CollectionRouter.use('/other-income', namuna1Tapshil2OtherIncomeRouter);

// तपशिल ३ अभिहस्तांतरीत रकमा
namuna1CollectionRouter.use('/sanctioned-amount', namuna1Tapshil3SanctionedAmountRouter);

// तपशिल ४ (राज्यशासन सहाय्यक अनुदाने जमा)
namuna1CollectionRouter.use('/auxiliary-grants', namuna1Tapshil4AuxiliaryGrantsRouter);

// तपशिल ५ (ग्राम पाणी पुरवठा निधी)
namuna1CollectionRouter.use('/water-funds', namuna1Tapshil5WaterFundRouter);

module.exports = namuna1CollectionRouter;
