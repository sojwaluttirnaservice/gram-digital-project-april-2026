const { Router } = require('express');
const { checkForPoolConnection } = require('../middleware');
const namuna14Controller = require('../../application/controllers/namuna/namuna14Controller');



const namuna14Router = Router();

// Rendering pages
namuna14Router.get('/', checkForPoolConnection, namuna14Controller.renderNamuna14Page);

namuna14Router.get('/create', checkForPoolConnection, namuna14Controller.renderNamuna14CreatePage);

// Edit
namuna14Router.get('/edit/:id', checkForPoolConnection, namuna14Controller.renderEditNamuna14Page);

// Route to render the report page
// namuna14Router.get('/report', checkForPoolConnection, namuna14Controller.render);

// Route to render the print page
namuna14Router.get('/print', checkForPoolConnection, namuna14Controller.renderNamuna14Print);

// CRUD OPTIONS
// Route to insert a new entry
namuna14Router.post('/save', checkForPoolConnection, namuna14Controller.saveNamuna14Details);

// Route to update a specific entry by ID
namuna14Router.put('/update', checkForPoolConnection, namuna14Controller.updateNamuna14Details);

// Route to delete a specific entry by ID
namuna14Router.delete('/delete', checkForPoolConnection, namuna14Controller.deleteNamuna14Details);

// Route to fetch entries by month and year
namuna14Router.get(
    '/list',
    checkForPoolConnection,
    namuna14Controller.fetchAllNamuna14DetailsByMonthAndYear
);

module.exports = namuna14Router;
