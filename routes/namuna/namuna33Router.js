const { Router } = require('express');
const { checkForPoolConnection } = require('../middleware');
const namuna33Controller = require('../../application/controllers/namuna/namuna33Controller');

const namuna33Router = Router();

// Rendering pages
namuna33Router.get('/', checkForPoolConnection, namuna33Controller.renderNamuna33Page);

namuna33Router.get('/create', checkForPoolConnection, namuna33Controller.renderNamuna33CreatePage);

// Edit
namuna33Router.get('/edit/:id', checkForPoolConnection, namuna33Controller.renderEditNamuna33Page);

// Route to render the report page
// namuna33Router.get('/report', checkForPoolConnection, namuna33Controller.render);

// Route to render the print page
namuna33Router.get('/print', checkForPoolConnection, namuna33Controller.renderNamuna33Print);
// CRUD OPTIONS
// Route to insert a new entry
namuna33Router.post('/save', checkForPoolConnection, namuna33Controller.saveNamuna33TreeDetails);

// Route to update a specific entry by ID
namuna33Router.put('/update', checkForPoolConnection, namuna33Controller.updateNamuna33TreeDetails);

// Route to delete a specific entry by ID
namuna33Router.delete(
    '/delete',
    checkForPoolConnection,
    namuna33Controller.deleteNamuna33TreeDetails
);

// Route to fetch entries by month and year
namuna33Router.get(
    '/list',
    checkForPoolConnection,
    namuna33Controller.fetchNamuna33TreeDetailsByMonthAndYear
);

module.exports = namuna33Router;
