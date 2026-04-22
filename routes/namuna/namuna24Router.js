const { Router } = require('express');
const { checkForPoolConnection } = require('../middleware');
const namuna24Controller = require('../../application/controllers/namuna/namuna24Controller');


const namuna24Router = Router();

// Rendering pages
namuna24Router.get('/', checkForPoolConnection, namuna24Controller.renderNamuna24Page);

namuna24Router.get('/create', checkForPoolConnection, namuna24Controller.renderNamuna24CreatePage);

// Edit
namuna24Router.get('/edit/:id', checkForPoolConnection, namuna24Controller.renderEditNamuna24Page);

// Route to render the report page
// namuna24Router.get('/report', checkForPoolConnection, namuna24Controller.render);

// Route to render the print page
namuna24Router.get('/print', checkForPoolConnection, namuna24Controller.renderNamuna24Print);

// CRUD OPTIONS
// Route to insert a new entry
namuna24Router.post('/save', checkForPoolConnection, namuna24Controller.saveNamuna24Details);

// Route to update a specific entry by ID
namuna24Router.put('/update', checkForPoolConnection, namuna24Controller.updateNamuna24Details);

// Route to delete a specific entry by ID
namuna24Router.delete('/delete', checkForPoolConnection, namuna24Controller.deleteNamuna24Details);

// Route to fetch entries by month and year
namuna24Router.get(
    '/list',
    checkForPoolConnection,
    namuna24Controller.fetchAllNamuna24DetailsByMonthAndYear
);

module.exports = namuna24Router;
