const { Router } = require('express');
const { checkForPoolConnection } = require('../middleware');
const namuna11Controller = require('../../application/controllers/namuna/namuna11Controller');

const namuna11Router = Router();

// Rendering pages
namuna11Router.get('/', checkForPoolConnection, namuna11Controller.renderNamuna11Page);

namuna11Router.get('/create', checkForPoolConnection, namuna11Controller.renderNamuna11CreatePage);

// Edit
namuna11Router.get('/edit/:id', checkForPoolConnection, namuna11Controller.renderEditNamuna11Page);

// Route to render the report page
// namuna11Router.get('/report', checkForPoolConnection, namuna11Controller.render);

// Route to render the print page
namuna11Router.get('/print', checkForPoolConnection, namuna11Controller.renderNamuna11Print);

// CRUD OPTIONS
// Route to insert a new entry
namuna11Router.post('/save', checkForPoolConnection, namuna11Controller.saveNamuna11Details);

// Route to update a specific entry by ID
namuna11Router.put('/update', checkForPoolConnection, namuna11Controller.updateNamuna11Details);

// Route to delete a specific entry by ID
namuna11Router.delete('/delete', checkForPoolConnection, namuna11Controller.deleteNamuna11Details);

// Route to fetch entries by month and year
namuna11Router.get(
    '/list',
    checkForPoolConnection,
    namuna11Controller.fetchAllNamuna11DetailsByMonthAndYear
);

module.exports = namuna11Router;
