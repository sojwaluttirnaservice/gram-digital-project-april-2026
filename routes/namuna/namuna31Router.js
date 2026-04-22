const { Router } = require('express');
const { checkForPoolConnection } = require('../middleware');
const namuna31Controller = require('../../application/controllers/namuna/namuna31Controller');


const namuna31Router = Router();

// Rendering pages
namuna31Router.get('/', checkForPoolConnection, namuna31Controller.renderNamuna31Page);

namuna31Router.get('/create', checkForPoolConnection, namuna31Controller.renderNamuna31CreatePage);

// Edit
namuna31Router.get('/edit/:id', checkForPoolConnection, namuna31Controller.renderEditNamuna31Page);

// Route to render the report page
// namuna31Router.get('/report', checkForPoolConnection, namuna31Controller.render);

// Route to render the print page
namuna31Router.get('/print', checkForPoolConnection, namuna31Controller.renderNamuna31Print);

// CRUD OPTIONS
// Route to insert a new entry
namuna31Router.post('/save', checkForPoolConnection, namuna31Controller.saveNamuna31Details);

// Route to update a specific entry by ID
namuna31Router.put('/update', checkForPoolConnection, namuna31Controller.updateNamuna31Details);

// Route to delete a specific entry by ID
namuna31Router.delete('/delete', checkForPoolConnection, namuna31Controller.deleteNamuna31Details);

// Route to fetch entries by month and year
namuna31Router.get(
    '/list',
    checkForPoolConnection,
    namuna31Controller.fetchAllNamuna31DetailsByMonthAndYear
);

module.exports = namuna31Router;
