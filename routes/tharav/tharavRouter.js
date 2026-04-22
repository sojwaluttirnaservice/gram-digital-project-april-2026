var express = require('express');
var middleware = require('../middleware');
const tharavController = require('../../application/controllers/tharav/tharavController');
const router = express.Router();

router.get(
    '/masikSabhaTharav',
    middleware.checkForPoolConnection,
    tharavController.masikSabhaTharavView
);
router.get(`/new`, middleware.checkForPoolConnection, tharavController.addNewTharav);

router.post(
    '/save-sabha-tharav-details',
    middleware.checkForPoolConnection,
    tharavController.saveSabhaTharavDetails
);

router.delete(
    `/delete-sabha-tharav-details`,
    middleware.checkForPoolConnection,
    tharavController.deleteSabhaTharavDetails
)

router.get(
    '/get-sabha-tharav-print-view',
    middleware.checkForPoolConnection,
    tharavController.getSabhaTharavDetails
)

router.get('/update-view',
middleware.checkForPoolConnection,
tharavController.updateSabhaTharavDetailsView)

module.exports = router;
