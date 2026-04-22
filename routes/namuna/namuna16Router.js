const { Router } = require('express');

const { checkForPoolConnection } = require('../middleware');
const namuna16Controller = require('../../application/controllers/namuna/namuna16Controller');

const namuna16Router = Router();

// Rendering pages
namuna16Router.get('/', checkForPoolConnection, namuna16Controller.renderNamuna16Page);

// Route to insert a new entry
namuna16Router.post('/save', checkForPoolConnection, namuna16Controller.insertEntry);

// Edit
namuna16Router.get('/edit/:id', checkForPoolConnection, namuna16Controller.renderEditNamuna16Page);

// Route to update a specific entry by ID
namuna16Router.put('/update', checkForPoolConnection, namuna16Controller.updateEntry);

// Route to delete a specific entry by ID
namuna16Router.delete('/delete', checkForPoolConnection, namuna16Controller.deleteEntry);


namuna16Router.get('/report', checkForPoolConnection, namuna16Controller.renderReportPage);

namuna16Router.get('/print', checkForPoolConnection, namuna16Controller.renderPrintPage);

// Route to fetch entries by month and year
namuna16Router.get(
    '/entries',
    checkForPoolConnection,
    namuna16Controller.fetchEntriesByMonthAndYear
);

module.exports = namuna16Router;
