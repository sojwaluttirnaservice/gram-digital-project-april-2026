const { Router } = require('express');
const { checkForPoolConnection } = require('../middleware');
const namuna30Controller = require('../../application/controllers/namuna/namuna30Controller');

const namuna30Router = Router();

// Rendering pages
namuna30Router.get('/', checkForPoolConnection, namuna30Controller.renderNamuna30Page);

namuna30Router.get('/create', checkForPoolConnection, namuna30Controller.renderNamuna30CreatePage);

// Edit
namuna30Router.get('/edit/:id', checkForPoolConnection, namuna30Controller.renderEditNamuna30Page);

// Route to render the report page
// namuna30Router.get('/report', checkForPoolConnection, namuna30Controller.render);

// Route to render the print page
namuna30Router.get('/print', checkForPoolConnection, namuna30Controller.renderNamuna30Print);

// CRUD OPTIONS
// Route to insert a new entry
namuna30Router.post('/save', checkForPoolConnection, namuna30Controller.saveNamuna30Details);

// Route to update a specific entry by ID
namuna30Router.put('/update', checkForPoolConnection, namuna30Controller.updateNamuna30Details);

// Route to delete a specific entry by ID
namuna30Router.delete('/delete', checkForPoolConnection, namuna30Controller.deleteNamuna30Details);

// Route to fetch entries by month and year
namuna30Router.get(
    '/list',
    checkForPoolConnection,
    namuna30Controller.fetchNamuna30DetailsByMonthAndYear
);

module.exports = namuna30Router;
