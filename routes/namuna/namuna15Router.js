const { Router } = require('express');
const { checkForPoolConnection } = require('../middleware');
const namuna15Controller = require('../../application/controllers/namuna/namuna15Controller');

const namuna15Router = Router();

// Pages routes

namuna15Router.get('/', checkForPoolConnection, namuna15Controller.renderNamuna15Page);

namuna15Router.get('/print', checkForPoolConnection, namuna15Controller.renderNamuna15PrintPage);

namuna15Router.get('/report', checkForPoolConnection, namuna15Controller.renderNamuna15ReportPage);

namuna15Router.get('/edit', checkForPoolConnection, namuna15Controller.renderEditNamuna15Page);

// CRUD ROUTES
namuna15Router.post('/create-bulk', checkForPoolConnection, namuna15Controller.insertBulk);

namuna15Router.put('/update', checkForPoolConnection, namuna15Controller.updateNamuna15SingleEntry);

namuna15Router.put('/update-bulk', checkForPoolConnection, namuna15Controller.updateBulk);

namuna15Router.delete('/delete', checkForPoolConnection, namuna15Controller.deleteNamuna15SingleEntry);

namuna15Router.get('/fetch', checkForPoolConnection, namuna15Controller.fetchAll);

namuna15Router.get('/fetch/:id', checkForPoolConnection, namuna15Controller.fetchById);

module.exports = namuna15Router;
