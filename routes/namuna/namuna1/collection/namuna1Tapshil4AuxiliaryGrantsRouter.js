const namuna1Tapshil4AuxiliaryGrantsController = require('../../../../application/controllers/namuna/namuna1/collection/namuna1Tapshil4AuxiliaryGrantsController');
const getRouter = require('../../../../application/utils/getRouter');

const namuna1Tapshil4AuxiliaryGrantsRouter = getRouter();

// Render the main page for the auxiliary grants (page)
namuna1Tapshil4AuxiliaryGrantsRouter.get(
    '/',
    namuna1Tapshil4AuxiliaryGrantsController.renderNamuna1Tapshil4AuxiliaryGrantsPage
);

// Update the header entry for auxiliary grants
namuna1Tapshil4AuxiliaryGrantsRouter.put(
    '/update-header-entry',
    namuna1Tapshil4AuxiliaryGrantsController.updateSingleAuxiliaryGrantsHeaderEntry
);

// Save multiple auxiliary grants entries
namuna1Tapshil4AuxiliaryGrantsRouter.post(
    '/save',
    namuna1Tapshil4AuxiliaryGrantsController.saveAuxiliaryGrantsEntries
);

// Save a single auxiliary grants entry
namuna1Tapshil4AuxiliaryGrantsRouter.post(
    '/save-single-fund-entry',
    namuna1Tapshil4AuxiliaryGrantsController.saveSingleAuxiliaryGrantsEntry
);

// Delete a single auxiliary grants entry
namuna1Tapshil4AuxiliaryGrantsRouter.delete(
    '/delete-single-fund-entry',
    namuna1Tapshil4AuxiliaryGrantsController.deleteNamuna1AuxiliaryGrantsEntry
);

// Update a single auxiliary grants entry
namuna1Tapshil4AuxiliaryGrantsRouter.put(
    '/update-single-fund-entry',
    namuna1Tapshil4AuxiliaryGrantsController.updateNamuna1AuxiliaryGrantsEntry
);

// Update the auxiliary grants entry
namuna1Tapshil4AuxiliaryGrantsRouter.post(
    '/update',
    namuna1Tapshil4AuxiliaryGrantsController.updateNamuna1AuxiliaryGrantsEntry
);

// List all auxiliary grants entries and headers for updating
namuna1Tapshil4AuxiliaryGrantsRouter.get(
    '/list',
    namuna1Tapshil4AuxiliaryGrantsController.renderNamuna1CreateUpdateAuxiliaryGrantsPage
);

module.exports = namuna1Tapshil4AuxiliaryGrantsRouter;
