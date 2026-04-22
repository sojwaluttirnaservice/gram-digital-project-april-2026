const { Router } = require('express');
const { checkForPoolConnection } = require('../middleware');
const namuna22Controller = require('../../application/controllers/namuna/namuna22Controller');

const namuna22Router = Router();

// Rendering pages
namuna22Router.get('/', checkForPoolConnection, namuna22Controller.renderNamuna22Page);

namuna22Router.get('/create', checkForPoolConnection, namuna22Controller.renderNamuna22CreatePage);

// Edit
namuna22Router.get('/edit/:id', checkForPoolConnection, namuna22Controller.renderEditNamuna22Page);

// Route to render the report page
// namuna22Router.get('/report', checkForPoolConnection, namuna22Controller.render);

// Route to render the print page
namuna22Router.get('/print', checkForPoolConnection, namuna22Controller.renderNamuna22Print);

// CRUD OPTIONS
// Route to insert a new entry
namuna22Router.post('/save', checkForPoolConnection, namuna22Controller.saveNamuna22Details);

// Route to update a specific entry by ID
namuna22Router.put('/update', checkForPoolConnection, namuna22Controller.updateNamuna22Details);

// Route to delete a specific entry by ID
namuna22Router.delete('/delete', checkForPoolConnection, namuna22Controller.deleteNamuna22Details);

// Route to fetch entries by month and year
namuna22Router.get(
    '/list',
    checkForPoolConnection,
    namuna22Controller.fetchAllNamuna22DetailsByMonthAndYear
);

module.exports = namuna22Router;
