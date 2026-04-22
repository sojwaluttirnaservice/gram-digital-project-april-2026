const namuna1Tapshil3SanctionedAmountController = require('../../../../application/controllers/namuna/namuna1/collection/namuna1Tapshil3SanctionedAmountController');
const getRouter = require('../../../../application/utils/getRouter');

const namuna1Tapshil3SanctionedAmountRouter = getRouter();

// Render the main page for the sanctioned amount (page)
namuna1Tapshil3SanctionedAmountRouter.get(
    '/',
    namuna1Tapshil3SanctionedAmountController.renderNamuna1Tapshil3SanctionedAmountPage
);

// Update the header entry for sanctioned amount
namuna1Tapshil3SanctionedAmountRouter.put(
    '/update-header-entry',
    namuna1Tapshil3SanctionedAmountController.updateSingleSanctionedAmountHeaderEntry
);

// Save multiple sanctioned amount entries
namuna1Tapshil3SanctionedAmountRouter.post(
    '/save',
    namuna1Tapshil3SanctionedAmountController.saveSanctionedAmountEntries
);

// Save a single sanctioned amount entry
namuna1Tapshil3SanctionedAmountRouter.post(
    '/save-single-fund-entry',
    namuna1Tapshil3SanctionedAmountController.saveSingleSanctionedAmountEntry
);

// Delete a single sanctioned amount entry
namuna1Tapshil3SanctionedAmountRouter.delete(
    '/delete-single-fund-entry',
    namuna1Tapshil3SanctionedAmountController.deleteNamuna1SanctionedAmountEntry
);

// Update a single sanctioned amount entry
namuna1Tapshil3SanctionedAmountRouter.put(
    '/update-single-fund-entry',
    namuna1Tapshil3SanctionedAmountController.updateNamuna1SanctionedAmountEntry
);

// Update the sanctioned amount entry
namuna1Tapshil3SanctionedAmountRouter.post(
    '/update',
    namuna1Tapshil3SanctionedAmountController.updateNamuna1SanctionedAmountEntry
);

// List all sanctioned amount entries and headers for updating
namuna1Tapshil3SanctionedAmountRouter.get(
    '/list',
    namuna1Tapshil3SanctionedAmountController.renderNamuna1CreateUpdateSanctionedAmountPage
);

module.exports = namuna1Tapshil3SanctionedAmountRouter;

