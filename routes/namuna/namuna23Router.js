const { Router } = require('express');
const { checkForPoolConnection } = require('../middleware');
const namuna23Controller = require('../../application/controllers/namuna/namuna23Controller');


const namuna23Router = Router();

// Rendering pages
namuna23Router.get('/', checkForPoolConnection, namuna23Controller.renderNamuna23Page);

namuna23Router.get('/create', checkForPoolConnection, namuna23Controller.renderNamuna23CreatePage);

// Edit
namuna23Router.get('/edit/:id', checkForPoolConnection, namuna23Controller.renderEditNamuna23Page);

// Route to render the report page
// namuna23Router.get('/report', checkForPoolConnection, namuna23Controller.render);

// Route to render the print page
namuna23Router.get('/print', checkForPoolConnection, namuna23Controller.renderNamuna23Print);

// CRUD OPTIONS
// Route to insert a new entry
namuna23Router.post('/save', checkForPoolConnection, namuna23Controller.saveNamuna23Details);

// Route to update a specific entry by ID
namuna23Router.put('/update', checkForPoolConnection, namuna23Controller.updateNamuna23Details);

// Route to delete a specific entry by ID
namuna23Router.delete('/delete', checkForPoolConnection, namuna23Controller.deleteNamuna23Details);

// Route to fetch entries by month and year
namuna23Router.get(
    '/list',
    checkForPoolConnection,
    namuna23Controller.fetchAllNamuna23DetailsByMonthAndYear
);

module.exports = namuna23Router;
