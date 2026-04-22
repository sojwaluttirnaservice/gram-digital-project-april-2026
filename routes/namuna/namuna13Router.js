const { Router } = require('express');
const namuna13Controller = require('../../application/controllers/namuna/namuna13Controller');
const { checkForPoolConnection } = require('../middleware');

const namuna13Router = Router();

// Rendering pages

namuna13Router.get('/', checkForPoolConnection, namuna13Controller.renderNamuna13Page);

namuna13Router.get('/create/:postId', checkForPoolConnection, namuna13Controller.renderCreateEntryPage);

// Route to insert a new entry
namuna13Router.post('/save', checkForPoolConnection, namuna13Controller.insertEntry);

// Edit
namuna13Router.get('/edit/:id', checkForPoolConnection, namuna13Controller.renderEditEmployeePage)

// Route to update a specific entry by ID
namuna13Router.put('/update', checkForPoolConnection, namuna13Controller.updateEntry);

// Route to delete a specific entry by ID
namuna13Router.delete('/delete', checkForPoolConnection, namuna13Controller.deleteEntry);

namuna13Router.get('/report', checkForPoolConnection, namuna13Controller.renderReportPage);


namuna13Router.get('/print', checkForPoolConnection, namuna13Controller.renderPrintPage);

// Route to fetch entries by month and year
namuna13Router.get(
    '/entries',
    checkForPoolConnection,
    namuna13Controller.fetchEntriesByMonthAndYear
);


// NAMUNA 13 POST


// RENDERING PAGES

namuna13Router.get('/post/create', checkForPoolConnection, namuna13Controller.renderCreatePostPage)

// CRUD
namuna13Router.post('/post/create', checkForPoolConnection, namuna13Controller.createPost)

namuna13Router.put('/post/update', checkForPoolConnection, namuna13Controller.updatePost)

namuna13Router.get('/post/list', checkForPoolConnection, namuna13Controller.getList)


// Edit
namuna13Router.get('/post/edit/:postId', checkForPoolConnection, namuna13Controller.renderEditPostPage)


namuna13Router.get('/list/:postId', checkForPoolConnection, namuna13Controller.renderEmployeeListPage)

namuna13Router.post('/list/:postId', checkForPoolConnection, namuna13Controller.getEmployeeList)

namuna13Router.delete('/post/delete', checkForPoolConnection, namuna13Controller.deletePost)


// Route to fetch entries by year
// namuna13Router.get('/entries/year', checkForPoolConnection, namuna13Controller.fetchNamuna13ByYear);

module.exports = namuna13Router;
