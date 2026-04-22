const { Router } = require('express');

const { checkForPoolConnection } = require('../middleware');
const namuna17Controller = require('../../application/controllers/namuna/namuna17Controller');

const namuna17Router = Router();

// Rendering pages
namuna17Router.get('/', checkForPoolConnection, namuna17Controller.renderNamuna17Page);

namuna17Router.get('/create', checkForPoolConnection, namuna17Controller.renderNamuna17CreatePage);
// Route to insert a new entry
namuna17Router.post('/save', checkForPoolConnection, namuna17Controller.insertEntry);

// Edit
namuna17Router.get('/edit/:id', checkForPoolConnection, namuna17Controller.renderEditNamuna17Page);

// Route to update a specific entry by ID
namuna17Router.put('/update', checkForPoolConnection, namuna17Controller.updateEntry);

// Route to delete a specific entry by ID
namuna17Router.delete('/delete', checkForPoolConnection, namuna17Controller.deleteEntry);

// Route to render the report page
namuna17Router.get('/report', checkForPoolConnection, namuna17Controller.renderReportPage);

// Route to render the print page
namuna17Router.get('/print', checkForPoolConnection, namuna17Controller.renderPrintPage);

// Route to fetch entries by month and year
namuna17Router.get(
    '/list',
    checkForPoolConnection,
    namuna17Controller.fetchAllNamuna17Entries
);

module.exports = namuna17Router;
