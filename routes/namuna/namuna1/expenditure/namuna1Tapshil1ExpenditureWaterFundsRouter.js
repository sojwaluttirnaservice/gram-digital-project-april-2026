const { Router } = require('express');

const { checkForPoolConnection } = require('../../../middleware');
const namuna1Tapshil2ExpenditureWaterFundController = require('../../../../application/controllers/namuna/namuna1/expenditure/namuna1Tapshil1ExpenditureWaterFundsController');

const namuna1Tapshil2ExpenditureWaterFundRouter = Router();

// Render the main page for the expenditure water fund (page)
namuna1Tapshil2ExpenditureWaterFundRouter.get(
    '/',
    checkForPoolConnection,
    namuna1Tapshil2ExpenditureWaterFundController.renderNamuna1ExpenditureWaterFundPage
);

// Update the header entry for the expenditure water fund
namuna1Tapshil2ExpenditureWaterFundRouter.put(
    '/update-header-entry',
    checkForPoolConnection,
    namuna1Tapshil2ExpenditureWaterFundController.updateSingleExpenditureWaterFundHeaderEntry
);

// Save multiple entries for the expenditure water fund
namuna1Tapshil2ExpenditureWaterFundRouter.post(
    '/save',
    checkForPoolConnection,
    namuna1Tapshil2ExpenditureWaterFundController.saveExpenditureWaterFundEntries
);

// Save a single expenditure water fund entry
namuna1Tapshil2ExpenditureWaterFundRouter.post(
    '/save-single-water-fund-entry',
    checkForPoolConnection,
    namuna1Tapshil2ExpenditureWaterFundController.saveSingleExpenditureWaterFundEntry
);

// Delete a single expenditure water fund entry
namuna1Tapshil2ExpenditureWaterFundRouter.delete(
    '/delete-single-water-fund-entry',
    checkForPoolConnection,
    namuna1Tapshil2ExpenditureWaterFundController.deleteNamuna1ExpenditureWaterFundEntry
);

// Update a single expenditure water fund entry
namuna1Tapshil2ExpenditureWaterFundRouter.put(
    '/update-single-water-fund-entry',
    checkForPoolConnection,
    namuna1Tapshil2ExpenditureWaterFundController.updateSingleExpenditureWaterFundEntry
);

// Update the entry
namuna1Tapshil2ExpenditureWaterFundRouter.put(
    '/update',
    checkForPoolConnection,
    namuna1Tapshil2ExpenditureWaterFundController.updateExpenditureWaterFundEntry
);

// List all entries and headers for updating
namuna1Tapshil2ExpenditureWaterFundRouter.get(
    '/list',
    checkForPoolConnection,
    namuna1Tapshil2ExpenditureWaterFundController.renderNamuna1CreateUpdateExpenditureWaterFundPage
);

module.exports = namuna1Tapshil2ExpenditureWaterFundRouter;
