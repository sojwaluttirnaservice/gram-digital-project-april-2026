

const namuna1Tapshil1VillageFundCollectionController = require('../../../../application/controllers/namuna/namuna1/collection/namuna1Tapshil1VillageFundCollectionController');
const getRouter = require('../../../../application/utils/getRouter');

const namuna1Tapshil1CollectionOfVillageFundsRouter = getRouter();

namuna1Tapshil1CollectionOfVillageFundsRouter.get(
    '/',
    namuna1Tapshil1VillageFundCollectionController.renderNamuna1Tapshil1CollectionOfVillageFundsPage
);

namuna1Tapshil1CollectionOfVillageFundsRouter.put(
    '/update-header-entry',
    namuna1Tapshil1VillageFundCollectionController.updateSingleVillageFundHeaderEntry
);

namuna1Tapshil1CollectionOfVillageFundsRouter.post(
    '/save',
    namuna1Tapshil1VillageFundCollectionController.saveVilageCollectionFundsEntries
);

namuna1Tapshil1CollectionOfVillageFundsRouter.post(
    '/save-single-fund-entry',
    namuna1Tapshil1VillageFundCollectionController.saveSingleVillageFundEntry
);

namuna1Tapshil1CollectionOfVillageFundsRouter.delete(
    '/delete-single-fund-entry',
    namuna1Tapshil1VillageFundCollectionController.deleteNamuna1VillageCollectionFundEntry
);

namuna1Tapshil1CollectionOfVillageFundsRouter.put(
    '/update-single-fund-entry',
    namuna1Tapshil1VillageFundCollectionController.updateSingleVillageFundEntry
);

namuna1Tapshil1CollectionOfVillageFundsRouter.post(
    '/update',
    namuna1Tapshil1VillageFundCollectionController.updateNamuna1VillageCollectionFundEntry
);

namuna1Tapshil1CollectionOfVillageFundsRouter.get(
    '/list',
    namuna1Tapshil1VillageFundCollectionController.renderNamuna1CreateUpdateEntriesPage
);

module.exports = namuna1Tapshil1CollectionOfVillageFundsRouter;
