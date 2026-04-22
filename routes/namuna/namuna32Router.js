const { Router } = require('express');
const { checkForPoolConnection } = require('../middleware');
const namuna32Controller = require('../../application/controllers/namuna/namuna32Controller');



const namuna32Router = Router();

// Rendering pages
namuna32Router.get('/', checkForPoolConnection, namuna32Controller.renderNamuna32Page);

namuna32Router.get('/create', checkForPoolConnection, namuna32Controller.renderNamuna32CreatePage);

// Edit
namuna32Router.get('/edit/:id', checkForPoolConnection, namuna32Controller.renderEditNamuna32Page);

// Route to render the report page
// namuna32Router.get('/report', checkForPoolConnection, namuna32Controller.render);

// Route to render the print page
namuna32Router.get('/print', checkForPoolConnection, namuna32Controller.renderNamuna32Print);

// CRUD OPTIONS
// Route to insert a new entry
namuna32Router.post('/save', checkForPoolConnection, namuna32Controller.saveNamuna32Details);

// Route to update a specific entry by ID
namuna32Router.put('/update', checkForPoolConnection, namuna32Controller.updateNamuna32Details);

// Route to delete a specific entry by ID
namuna32Router.delete('/delete', checkForPoolConnection, namuna32Controller.deleteNamuna32Details);

// Route to fetch entries by month and year
namuna32Router.get(
    '/list',
    checkForPoolConnection,
    namuna32Controller.fetchAllNamuna32DetailsByMonthAndYear
);

module.exports = namuna32Router;
