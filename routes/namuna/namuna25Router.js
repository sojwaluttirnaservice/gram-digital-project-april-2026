const { Router } = require('express');
const { checkForPoolConnection } = require('../middleware');
const namuna25Controller = require('../../application/controllers/namuna/namuna25Controller');

const namuna25Router = Router();

// Rendering pages
namuna25Router.get('/', checkForPoolConnection, namuna25Controller.renderNamuna25Page);

namuna25Router.get('/create', checkForPoolConnection, namuna25Controller.renderNamuna25CreatePage);

// Edit
namuna25Router.get('/edit/:id', checkForPoolConnection, namuna25Controller.renderEditNamuna25Page);

// Route to render the report page
// namuna25Router.get('/report', checkForPoolConnection, namuna25Controller.render);

// Route to render the print page
namuna25Router.get('/print', checkForPoolConnection, namuna25Controller.renderNamuna25Print);

// CRUD OPTIONS
// Route to insert a new entry
namuna25Router.post('/save', checkForPoolConnection, namuna25Controller.saveNamuna25Details);

// Route to update a specific entry by ID
namuna25Router.put('/update', checkForPoolConnection, namuna25Controller.updateNamuna25Details);

// Route to delete a specific entry by ID
namuna25Router.delete('/delete', checkForPoolConnection, namuna25Controller.deleteNamuna25Details);

// Route to fetch entries by month and year
namuna25Router.get(
    '/list',
    checkForPoolConnection,
    namuna25Controller.fetchNamuna25InvestmentDetailsByMonthAndYear
);

module.exports = namuna25Router;
