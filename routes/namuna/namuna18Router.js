const { Router } = require('express');


const namuna18Controller = require('../../application/controllers/namuna/namuna18Controller');
const { checkForPoolConnection } = require('../middleware');

const namuna18Router = Router();

// Rendering pages
namuna18Router.get('/', checkForPoolConnection, namuna18Controller.renderNamuna18Page);

namuna18Router.get('/create', checkForPoolConnection, namuna18Controller.renderNamuna18CreatePage);

// Route to insert a new entry
namuna18Router.post('/save', checkForPoolConnection, namuna18Controller.insertEntry);

// Edit
namuna18Router.get('/edit/:id', checkForPoolConnection, namuna18Controller.renderEditNamuna18Page);

// Route to update a specific entry by ID
namuna18Router.put('/update', checkForPoolConnection, namuna18Controller.updateEntry);

// Route to delete a specific entry by ID
namuna18Router.delete('/delete', checkForPoolConnection, namuna18Controller.deleteEntry);

// Route to render the report page
namuna18Router.get('/report', checkForPoolConnection, namuna18Controller.renderReportPage);

// Route to render the print page
namuna18Router.get('/print', checkForPoolConnection, namuna18Controller.renderPrintPage);

// Route to fetch entries by month and year
namuna18Router.get('/list', checkForPoolConnection, namuna18Controller.fetchAllNamuna18Entries);

module.exports = namuna18Router;
