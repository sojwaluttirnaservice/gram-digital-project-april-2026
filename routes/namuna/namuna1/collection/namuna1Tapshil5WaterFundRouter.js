const { Router } = require('express');
const { checkForPoolConnection } = require('../../../middleware');
const namuna1Tapshil5WaterFundController = require('../../../../application/controllers/namuna/namuna1/collection/namuna1Tapshil5WaterFundController');

const namuna1Tapshil5WaterFundRouter = Router();

// Render the main page for the water fund (page)
namuna1Tapshil5WaterFundRouter.get(
    '/',
    checkForPoolConnection,
    namuna1Tapshil5WaterFundController.renderNamuna1Tapshil5WaterFundPage
);

// Update the header entry for water fund
namuna1Tapshil5WaterFundRouter.put(
    '/update-header-entry',
    checkForPoolConnection,
    namuna1Tapshil5WaterFundController.updateSingleWaterFundHeaderEntry
);

// Save multiple water fund entries
namuna1Tapshil5WaterFundRouter.post(
    '/save',
    checkForPoolConnection,
    namuna1Tapshil5WaterFundController.saveWaterFundEntries
);

// Save a single water fund entry
namuna1Tapshil5WaterFundRouter.post(
    '/save-single-water-fund-entry',
    checkForPoolConnection,
    namuna1Tapshil5WaterFundController.saveSingleWaterFundEntry
);

// Delete a single water fund entry
namuna1Tapshil5WaterFundRouter.delete(
    '/delete-single-water-fund-entry',
    checkForPoolConnection,
    namuna1Tapshil5WaterFundController.deleteNamuna1WaterFundEntry
);

// Update a single water fund entry
namuna1Tapshil5WaterFundRouter.put(
    '/update-single-water-fund-entry',
    checkForPoolConnection,
    namuna1Tapshil5WaterFundController.updateSingleWaterFundEntry
);

// Update the water fund entry
namuna1Tapshil5WaterFundRouter.post(
    '/update',
    checkForPoolConnection,
    namuna1Tapshil5WaterFundController.updateNamuna1WaterFundEntry
);

// List all water fund entries and headers for updating
namuna1Tapshil5WaterFundRouter.get(
    '/list',
    checkForPoolConnection,
    namuna1Tapshil5WaterFundController.renderNamuna1CreateUpdateWaterFundPage
);

module.exports = namuna1Tapshil5WaterFundRouter;

