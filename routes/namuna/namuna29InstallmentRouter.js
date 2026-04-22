const { Router } = require('express');
const { checkForPoolConnection } = require('../middleware');
const namuna29Controller = require('../../application/controllers/namuna/namuna29Controller');


const namuna29InstallmentRouter = Router();

// Rendering pages
// namuna29InstallmentRouter.get('/', checkForPoolConnection, namuna29Controller.renderNamuna29Page);

namuna29InstallmentRouter.get('/create/:loanId', checkForPoolConnection, namuna29Controller.renderNamuna29CreateInstallmentPage);

// Edit
namuna29InstallmentRouter.get('/edit/:id', checkForPoolConnection, namuna29Controller.renderEditNamuna29InstallmentPage);

// Route to render the report page
namuna29InstallmentRouter.get('/history/:loanId', checkForPoolConnection, namuna29Controller.renderNamuna29HistoryPage);

// Route to render the print page
// namuna29InstallmentRouter.get('/print', checkForPoolConnection, namuna29Controller.renderNamuna29Print);

// CRUD OPTIONS
// Route to insert a new entry
namuna29InstallmentRouter.post('/save', checkForPoolConnection, namuna29Controller.saveNamuna29InstallmentDetails);

// Route to update a specific entry by ID
namuna29InstallmentRouter.put('/update', checkForPoolConnection, namuna29Controller.updateNamuna29InstallmentDetails);

// Route to delete a specific entry by ID
namuna29InstallmentRouter.delete('/delete', checkForPoolConnection, namuna29Controller.deleteNamuna29InstallmentDetails);

// Route to fetch entries by month and year
// namuna29InstallmentRouter.get(
//     '/list',
//     checkForPoolConnection,
//     namuna29Controller.fetchAllNamuna29DetailsByMonthAndYear
// );

module.exports = namuna29InstallmentRouter;

