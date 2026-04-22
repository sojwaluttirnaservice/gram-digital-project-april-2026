const { Router } = require('express');
const { checkForPoolConnection } = require('../middleware');
const namuna20Controller = require('../../application/controllers/namuna/namuna20Controller');

const namuna20Router = Router();

// Rendering pages
namuna20Router.get('/', checkForPoolConnection, namuna20Controller.renderNamuna20Page);

namuna20Router.get('/create', checkForPoolConnection, namuna20Controller.renderNamuna20CreatePage);

// Edit
namuna20Router.get('/edit/:id', checkForPoolConnection, namuna20Controller.renderEditNamuna20Page);

// Route to render the report page
// namuna20Router.get('/report', checkForPoolConnection, namuna20Controller.render);

// Route to render the print page
namuna20Router.get('/print', checkForPoolConnection, namuna20Controller.renderNamuna20Print);

// CRUD OPTIONS
// Route to insert a new entry
namuna20Router.post('/save', checkForPoolConnection, namuna20Controller.saveNamuna20Details);

// Route to update a specific entry by ID
namuna20Router.put('/update', checkForPoolConnection, namuna20Controller.updateNamuna20Details);

// Route to delete a specific entry by ID
namuna20Router.delete('/delete', checkForPoolConnection, namuna20Controller.deleteNamuna20Details);

// Route to fetch entries by month and year
namuna20Router.get(
    '/list',
    checkForPoolConnection,
    namuna20Controller.fetchAllNamuna20DetailsByMonthAndYear
);

module.exports = namuna20Router;
