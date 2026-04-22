const { Router } = require('express');
const { checkForPoolConnection } = require('../middleware');
const namuna28Controller = require('../../application/controllers/namuna/namuna28Controller');


const namuna28Router = Router();

// Rendering pages
namuna28Router.get('/', checkForPoolConnection, namuna28Controller.renderNamuna28Page);

namuna28Router.get('/create', checkForPoolConnection, namuna28Controller.renderNamuna28CreatePage);

// Edit
namuna28Router.get('/edit/:id', checkForPoolConnection, namuna28Controller.renderEditNamuna28Page);

// Route to render the report page
// namuna28Router.get('/report', checkForPoolConnection, namuna28Controller.render);

// Route to render the print page
namuna28Router.get('/print', checkForPoolConnection, namuna28Controller.renderNamuna28Print);

// CRUD OPTIONS
// Route to insert a new entry
namuna28Router.post('/save', checkForPoolConnection, namuna28Controller.saveNamuna28Details);

// Route to update a specific entry by ID
namuna28Router.put('/update', checkForPoolConnection, namuna28Controller.updateNamuna28Details);

// Route to delete a specific entry by ID
namuna28Router.delete('/delete', checkForPoolConnection, namuna28Controller.deleteNamuna28Details);

// Route to fetch entries by month and year
namuna28Router.get(
    '/list',
    checkForPoolConnection,
    namuna28Controller.fetchAllNamuna28DetailsByMonthAndYear
);

module.exports = namuna28Router;
