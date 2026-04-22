const { Router } = require('express');
const { checkForPoolConnection } = require('../middleware');
const namuna5CController = require('../../application/controllers/namuna/namuna5CController');

const namuna5CRouter = Router();

namuna5CRouter.get('/print', checkForPoolConnection, namuna5CController.renderNamuna5CPrint);

module.exports = namuna5CRouter;
