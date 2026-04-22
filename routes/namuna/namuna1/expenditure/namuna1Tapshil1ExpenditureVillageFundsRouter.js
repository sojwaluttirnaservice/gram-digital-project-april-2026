const { Router } = require('express');
const namuna1Tapshil1ExpenditureVillageFundsController = require('../../../../application/controllers/namuna/namuna1/expenditure/namuna1Tapshil1ExpenditureVillageFundsController');
const { checkForPoolConnection } = require('../../../middleware');

const namuna1Tapshil1ExpenditureVillageFundsRouter = Router();

// Render the main page for the fund (page)
namuna1Tapshil1ExpenditureVillageFundsRouter.get(
    '/',
    checkForPoolConnection,
    namuna1Tapshil1ExpenditureVillageFundsController.renderNamuna1Tapshil1ExpenditureVillageFundsPage
);

// Update the header entry for the fund
namuna1Tapshil1ExpenditureVillageFundsRouter.put(
    '/update-header-entry',
    checkForPoolConnection,
    namuna1Tapshil1ExpenditureVillageFundsController.updateSingleExpenditureVillageFundHeaderEntry
);

// Save multiple entries
namuna1Tapshil1ExpenditureVillageFundsRouter.post(
    '/save',
    checkForPoolConnection,
    namuna1Tapshil1ExpenditureVillageFundsController.saveExpenditureVillageFundEntries
);

// Save a single entry
namuna1Tapshil1ExpenditureVillageFundsRouter.post(
    '/save-single-village-fund-entry',
    checkForPoolConnection,
    namuna1Tapshil1ExpenditureVillageFundsController.saveSingleExpenditureVillageFundEntry
);

// Delete a single entry
namuna1Tapshil1ExpenditureVillageFundsRouter.delete(
    '/delete-single-village-fund-entry',
    checkForPoolConnection,
    namuna1Tapshil1ExpenditureVillageFundsController.deleteNamuna1ExpenditureVillageFundEntry
);

// Update a single entry
namuna1Tapshil1ExpenditureVillageFundsRouter.put(
    '/update-single-village-fund-entry',
    checkForPoolConnection,
    namuna1Tapshil1ExpenditureVillageFundsController.updateSingleExpenditureVillageFundEntry
);

// Update the entry
namuna1Tapshil1ExpenditureVillageFundsRouter.post(
    '/update',
    checkForPoolConnection,
    namuna1Tapshil1ExpenditureVillageFundsController.updateExpenditureVillageFundEntry
);

// List all entries and headers for updating
namuna1Tapshil1ExpenditureVillageFundsRouter.get(
    '/list',
    checkForPoolConnection,
    namuna1Tapshil1ExpenditureVillageFundsController.renderNamuna1CreateUpdateExpenditureVillageFundsPage
);

module.exports = namuna1Tapshil1ExpenditureVillageFundsRouter;
