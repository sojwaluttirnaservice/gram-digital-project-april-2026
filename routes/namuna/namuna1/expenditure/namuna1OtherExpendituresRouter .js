const { Router } = require('express');

const { checkForPoolConnection } = require('../../../middleware');
const namuna1OtherExpendituresController = require('../../../../application/controllers/namuna/namuna1/expenditure/namuna1OtherExpendituresController');

const namuna1OtherExpendituresRouter = Router();

// Rendering pages
namuna1OtherExpendituresRouter.get(
    '/',
    checkForPoolConnection,
    namuna1OtherExpendituresController.renderNamuna1OtherExpendituresPage
);

// Route to render the page to create a new entry
namuna1OtherExpendituresRouter.get(
    '/create',
    checkForPoolConnection,
    namuna1OtherExpendituresController.renderNamuna1OtherExpendituresCreatePage
);

// Edit
namuna1OtherExpendituresRouter.get(
    '/edit/:id',
    checkForPoolConnection,
    namuna1OtherExpendituresController.renderEditNamuna1OtherExpendituresPage
);

// Route to render the print page (if applicable)
namuna1OtherExpendituresRouter.get(
    '/print',
    checkForPoolConnection,
    namuna1OtherExpendituresController.renderNamuna1OtherExpendituresPrint
);

// CRUD OPTIONS
// Route to save a new entry
namuna1OtherExpendituresRouter.post(
    '/save',
    checkForPoolConnection,
    namuna1OtherExpendituresController.saveNamuna1OtherExpenditures
);

// Route to update a specific entry by ID
namuna1OtherExpendituresRouter.put(
    '/update',
    checkForPoolConnection,
    namuna1OtherExpendituresController.updateNamuna1OtherExpenditures
);

// Route to delete a specific entry by ID
namuna1OtherExpendituresRouter.delete(
    '/delete',
    checkForPoolConnection,
    namuna1OtherExpendituresController.deleteNamuna1OtherExpenditures
);

// Route to fetch entries by month and year
// namuna1OtherExpendituresRouter.get(
//     '/list',
//     checkForPoolConnection,
//     namuna1OtherExpendituresController.fetchAllNamuna1OtherExpendituresByMonthAndYear
// );

module.exports = namuna1OtherExpendituresRouter;
