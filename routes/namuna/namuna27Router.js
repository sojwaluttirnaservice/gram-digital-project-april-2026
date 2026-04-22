const { Router } = require('express');
const { checkForPoolConnection } = require('../middleware');
const namuna27Controller = require('../../application/controllers/namuna/namuna27Controller');

const namuna27Router = Router();

// Rendering pages
namuna27Router.get('/', checkForPoolConnection, namuna27Controller.renderNamuna27Page);

namuna27Router.get('/create', checkForPoolConnection, namuna27Controller.renderNamuna27CreatePage);
// Edit
namuna27Router.get('/edit/:id', checkForPoolConnection, namuna27Controller.renderEditNamuna27Page);

// Route to render the report page
// namuna27Router.get('/report', checkForPoolConnection, namuna27Controller.render);

// Route to render the print page
namuna27Router.get('/print', checkForPoolConnection, namuna27Controller.renderNamuna27Print);
// CRUD OPTIONS
// Route to insert a new entry
namuna27Router.post('/save', checkForPoolConnection, namuna27Controller.saveNamuna27Objection);

// Route to update a specific entry by ID
namuna27Router.put('/update', checkForPoolConnection, namuna27Controller.updateNamuna27Objection);

// Route to delete a specific entry by ID
namuna27Router.delete(
    '/delete',
    checkForPoolConnection,
    namuna27Controller.deleteNamuna27Objection
);

// Route to fetch entries by month and year
namuna27Router.get(
    '/list',
    checkForPoolConnection,
    namuna27Controller.fetchNamuna27ObjectionsByMonthAndYear
);

module.exports = namuna27Router;
