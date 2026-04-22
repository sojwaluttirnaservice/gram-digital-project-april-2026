const { checkForPoolConnection } = require('../middleware');
const namuna12Controller = require('../../application/controllers/namuna/namuna12Controller');
const getRouter = require('../../application/utils/getRouter');



const namuna12Router = getRouter()

// Rendering pages
namuna12Router.get('/', namuna12Controller.renderNamuna12Page);

namuna12Router.get('/create', namuna12Controller.renderNamuna12CreatePage);

// Edit
// Not updated the below function
namuna12Router.get('/edit/:id', namuna12Controller.renderEditNamuna12Page);

// Route to render the report page
// namuna12Router.get('/report', namuna12Controller.render);

// Route to render the print page
namuna12Router.get('/print', namuna12Controller.renderNamuna12Print);

// CRUD OPTIONS
// Route to insert a new entry
namuna12Router.post('/save', namuna12Controller.saveNamuna12Details);

// Route to update a specific entry by ID
// Not updated the below function
namuna12Router.put('/update', namuna12Controller.updateNamuna12Details);

namuna12Router.post('/save-spending-entry', namuna12Controller.saveSpendingEntry)

namuna12Router.put('/update-spending-entry', namuna12Controller.updateSpendingEntry)

namuna12Router.delete('/delete-spending-entry', namuna12Controller.deleteSpendingEntry)

// Route to delete a specific entry by ID
namuna12Router.delete('/delete', namuna12Controller.deleteNamuna12Details);

// Route to fetch entries by month and year
namuna12Router.get(
    '/list',

    namuna12Controller.fetchAllNamuna12DetailsByMonthAndYear
);

module.exports = namuna12Router;
