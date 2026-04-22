const express = require('express');
const marriageRegistrationController = require('../../application/controllers/marriage-avahal/marriageRegistrationController');
const middleware = require('../middleware');

const router = express.Router();

//View page
router.get(
    '/',
    middleware.checkForPoolConnection,
    marriageRegistrationController.marriageAvahalView
);

router.get(
    '/new-marriage-registration',
    middleware.checkForPoolConnection,
    marriageRegistrationController.newMarriageRegistrationAvahal
);

//new marriage registration
router.post(
    '/post-new-marriage-registration',
    middleware.checkForPoolConnection,
    marriageRegistrationController.newMarriageRegistration
);

// UNDER 18 MARRIAGE REG
router.post(
    '/post-new-under-18-marriage-registration',
    middleware.checkForPoolConnection,
    marriageRegistrationController.under18MarriageRegistration
);

// GET FILLED DETAILS
// YEARS
router.post(
    '/get-filled-years',
    middleware.checkForPoolConnection,
    marriageRegistrationController.getFilledYears
);

// MONTHS
router.post(
    '/get-filled-months',
    middleware.checkForPoolConnection,
    marriageRegistrationController.getDistinctMonths
);

// GET AVAHAL DATA
router.post(
    '/get-avahal-data',
    middleware.checkForPoolConnection,
    marriageRegistrationController.getAvahalData
);

// PRINT MARRIAGE AVAHAL
router.get(
    '/print-marriage-avahal',
    middleware.checkForPoolConnection,
    marriageRegistrationController.printMarraigeAvahal
);

// DELETE ENTRY
router.post(
    '/delete-entry',
    middleware.checkForPoolConnection,
    marriageRegistrationController.deleteEntry
);

//Edit views

router.get(
    '/edit-marriage-entry-view',
    middleware.checkForPoolConnection,
    marriageRegistrationController.editViewForMarriageRegistration
);

router.get(
    '/edit-under-18-marriage-entry-view',
    middleware.checkForPoolConnection,
    marriageRegistrationController.editViewForMarriageRegistration
);

router.post(
    '/update-single-marriage-registration-avahal-entry',
    middleware.checkForPoolConnection,
    marriageRegistrationController.updateSingleMarriageRegistrationEntry
);

module.exports = router;
