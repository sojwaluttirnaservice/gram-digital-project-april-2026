const { Router } = require('express');



const { checkForPoolConnection } = require('../middleware');
const namuna19EmployeeController = require('../../application/controllers/namuna/namuna19EmployeeController');

const namuna19EmployeeRouter = Router();

// Rendering pages
namuna19EmployeeRouter.get('/', checkForPoolConnection, namuna19EmployeeController.renderNamuna19EmployeePage);

namuna19EmployeeRouter.get('/create', checkForPoolConnection, namuna19EmployeeController.renderNamuna19EmployeeCreatePage);

// Route to insert a new entry
namuna19EmployeeRouter.post('/save', checkForPoolConnection, namuna19EmployeeController.insertEntry);

// Edit
namuna19EmployeeRouter.get('/edit/:id', checkForPoolConnection, namuna19EmployeeController.renderEditNamuna19EmployeePage);

// Route to update a specific entry by ID
namuna19EmployeeRouter.put('/update', checkForPoolConnection, namuna19EmployeeController.updateEntry);

// Route to delete a specific entry by ID
namuna19EmployeeRouter.delete('/delete', checkForPoolConnection, namuna19EmployeeController.deleteEntry);

// Route to render the report page
namuna19EmployeeRouter.get('/report', checkForPoolConnection, namuna19EmployeeController.renderReportPage);

// Route to render the print page
namuna19EmployeeRouter.get('/print', checkForPoolConnection, namuna19EmployeeController.renderPrintPage);

// Route to fetch entries by month and year
namuna19EmployeeRouter.get('/list', checkForPoolConnection, namuna19EmployeeController.fetchAllNamuna19EmployeeEntries);

module.exports = namuna19EmployeeRouter;
