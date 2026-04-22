const { Router } = require('express');
const { checkForPoolConnection } = require('../middleware');
const namuna29Controller = require('../../application/controllers/namuna/namuna29Controller');
const namuna29InstallmentRouter = require('./namuna29InstallmentRouter');

const namuna29Router = Router();

// Rendering pages
namuna29Router.get('/', checkForPoolConnection, namuna29Controller.renderNamuna29Page);

namuna29Router.get('/create', checkForPoolConnection, namuna29Controller.renderNamuna29CreatePage);

// Edit
namuna29Router.get('/edit/:id', checkForPoolConnection, namuna29Controller.renderEditNamuna29Page);

// Route to render the report page
// namuna29Router.get('/report', checkForPoolConnection, namuna29Controller.render);

// Route to render the print page
namuna29Router.get('/print', checkForPoolConnection, namuna29Controller.renderNamuna29Print);

// CRUD OPTIONS
// Route to insert a new entry
namuna29Router.post('/save', checkForPoolConnection, namuna29Controller.saveNamuna29Details);

// Route to update a specific entry by ID
namuna29Router.put('/update', checkForPoolConnection, namuna29Controller.updateNamuna29Details);

// Route to delete a specific entry by ID
namuna29Router.delete('/delete', checkForPoolConnection, namuna29Controller.deleteNamuna29Details);

// Route to fetch entries by month and year
namuna29Router.get(
    '/list',
    checkForPoolConnection,
    namuna29Controller.fetchAllNamuna29DetailsByMonthAndYear
);

// INSTALLMENTS ROUTER
namuna29Router.use('/installment', namuna29InstallmentRouter);

module.exports = namuna29Router;
