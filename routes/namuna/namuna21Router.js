const { Router } = require('express');
const { checkForPoolConnection } = require('../middleware');
const namuna21Controller = require('../../application/controllers/namuna/namuna21Controller');

const namuna21Router = Router();

// Rendering pages
namuna21Router.get('/', checkForPoolConnection, namuna21Controller.renderNamuna21Page);

namuna21Router.get('/create', checkForPoolConnection, namuna21Controller.renderNamuna21CreatePage);

// Edit
namuna21Router.get('/edit/:id', checkForPoolConnection, namuna21Controller.renderEditNamuna21Page);

// Route to render the report page
// namuna21Router.get('/report', checkForPoolConnection, namuna21Controller.render);

// Route to render the print page
namuna21Router.get('/print', checkForPoolConnection, namuna21Controller.renderNamuna21Print);

// CRUD OPTIONS
// Route to insert a new entry
namuna21Router.post('/save', checkForPoolConnection, namuna21Controller.saveNamuna21Details);

// Route to update a specific entry by ID
namuna21Router.put('/update', checkForPoolConnection, namuna21Controller.updateNamuna21Details);

// Route to delete a specific entry by ID
namuna21Router.delete('/delete', checkForPoolConnection, namuna21Controller.deleteNamuna21Details);

// Route to fetch entries by month and year
namuna21Router.get(
    '/list',
    checkForPoolConnection,
    namuna21Controller.fetchAllNamuna21DetailsByMonthAndYear
);

module.exports = namuna21Router;
