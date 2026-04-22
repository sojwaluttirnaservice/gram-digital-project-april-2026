var MagniLekhController = require('../application/controllers/MagniLekhController');
var express = require('express');
var middleware = require('./middleware');
var router = express.Router();

router.get('/', middleware.checkForPoolConnection, MagniLekhController.allList);

router.post('/new-user', middleware.checkForPoolConnection, MagniLekhController.getSingleMagniList);

router.get(
    '/bulk-entry',
    middleware.checkForPoolConnection,
    MagniLekhController.renderMagniLekhBulkEntryPage
);

router.get(
    '/bulk-entries',
    middleware.checkForPoolConnection,
    MagniLekhController.getMagniLekhEntries
);

router.post(
    '/remove-user',
    middleware.checkForPoolConnection,
    MagniLekhController.removeFromMagniLekh
);
router.post('/add-user', middleware.checkForPoolConnection, MagniLekhController.addMagniLekh);

router.post('/add-users', middleware.checkForPoolConnection, MagniLekhController.addMagniLekhBulk);
router.post(
    '/get-auto-search',
    middleware.checkForPoolConnection,
    MagniLekhController.getMaginLekhSearch
);

module.exports = router;
