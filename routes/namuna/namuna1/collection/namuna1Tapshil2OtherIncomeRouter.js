
const namuna1Tapshil2OtherIncomeController = require('../../../../application/controllers/namuna/namuna1/collection/namuna1Tapshil2OtherIncomeController');
const getRouter = require('../../../../application/utils/getRouter');


const namuna1Tapshil2OtherIncomeRouter = getRouter();

namuna1Tapshil2OtherIncomeRouter.get(
    '/',
    namuna1Tapshil2OtherIncomeController.renderNamuna1Tapshil2OtherIncomePage
);

namuna1Tapshil2OtherIncomeRouter.put(
    '/update-header-entry',
    namuna1Tapshil2OtherIncomeController.updateSingleOtherIncomeHeaderEntry
);

namuna1Tapshil2OtherIncomeRouter.post(
    '/save',
    namuna1Tapshil2OtherIncomeController.saveOtherIncomeEntries
);

namuna1Tapshil2OtherIncomeRouter.post(
    '/save-single-fund-entry',
    namuna1Tapshil2OtherIncomeController.saveSingleOtherIncomeEntry
);

namuna1Tapshil2OtherIncomeRouter.delete(
    '/delete-single-fund-entry',
    namuna1Tapshil2OtherIncomeController.deleteNamuna1OtherIncomeEntry
);

namuna1Tapshil2OtherIncomeRouter.put(
    '/update-single-fund-entry',
    namuna1Tapshil2OtherIncomeController.updateNamuna1OtherIncomeEntry
);

namuna1Tapshil2OtherIncomeRouter.post(
    '/update',
    namuna1Tapshil2OtherIncomeController.updateNamuna1OtherIncomeEntry
);

namuna1Tapshil2OtherIncomeRouter.get(
    '/list',
    namuna1Tapshil2OtherIncomeController.renderNamuna1CreateUpdateEntriesPage
);

module.exports = namuna1Tapshil2OtherIncomeRouter;
