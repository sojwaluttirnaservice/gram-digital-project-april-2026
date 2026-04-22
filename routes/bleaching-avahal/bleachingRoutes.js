const express = require('express');
const router = express.Router();
const middleware = require('../middleware');

const bleachingController = require('../../application/controllers/bleaching-avahal/bleachingController');

router.get('/', middleware.checkForPoolConnection, bleachingController.allList);

router.get('/list', middleware.checkForPoolConnection, bleachingController.yearWiseList);

router.get(
    '/check-already-filled',
    middleware.checkForPoolConnection,
    bleachingController.checkAlreadyFilled
);

router.get(
    '/new-bleaching-avahal',
    middleware.checkForPoolConnection,
    bleachingController.newBleachingAvahal
);

// POST BLEACHING AVAHAL DATA
router.post(
    '/post-bleaching-avahal',
    middleware.checkForPoolConnection,
    bleachingController.postBleachingAvahal
);

//UPDATE

router.post(
  '/update-bleaching-avahal',
  middleware.checkForPoolConnection,
  bleachingController.updateBleachingAvahal
)

// PRINT BLEACHING AVAHAL
router.get('/print', middleware.checkForPoolConnection, bleachingController.printBleachingAvahal);

//EDIT VIEW
router.get(
    `/edit-bleaching-avahal-view`,
    middleware.checkForPoolConnection,
    bleachingController.editBleachingAvahalView
);

// DELETE BLEACHING AVAHAL
router.post(
    '/delete-avahal',
    middleware.checkForPoolConnection,
    bleachingController.deleteBleachingAvahal
);

module.exports = router;
