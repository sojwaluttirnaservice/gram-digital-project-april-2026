const { Router } = require('express');
const { checkForPoolConnection } = require('../middleware');
const namuna20CController = require('../../application/controllers/namuna/namuna20CController');

const namuna20CRouter = Router();

// Rendering pages
namuna20CRouter.get('/', checkForPoolConnection, namuna20CController.renderNamuna20CPage);

namuna20CRouter.get(
    '/create',
    checkForPoolConnection,
    namuna20CController.renderNamuna20CCreatePage
);

// Edit
namuna20CRouter.get(
    '/edit/:id',
    checkForPoolConnection,
    namuna20CController.renderEditNamuna20CPage
);

// Route to render the report page
// namuna20CRouter.get('/report', checkForPoolConnection, namuna20CController.render);

// Route to render the print page
namuna20CRouter.get('/print', checkForPoolConnection, namuna20CController.renderNamuna20CPrint);

// CRUD OPTIONS
// Route to insert a new entry
namuna20CRouter.post('/save', checkForPoolConnection, namuna20CController.saveNamuna20CDetails);

// Route to update a specific entry by ID
namuna20CRouter.put('/update', checkForPoolConnection, namuna20CController.updateNamuna20CDetails);

// Route to delete a specific entry by ID
namuna20CRouter.delete(
    '/delete',
    checkForPoolConnection,
    namuna20CController.deleteNamuna20CDetails
);

// Route to fetch entries by month and year
namuna20CRouter.get(
    '/list',
    checkForPoolConnection,
    namuna20CController.fetchNamuna20cMeasurementDetailsByMonthAndYear
);

module.exports = namuna20CRouter;
