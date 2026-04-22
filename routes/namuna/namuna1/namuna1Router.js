const { Router } = require('express');
const namuna1CollectionRouter = require('./namuna1CollectionRouter');
const namuna1ExpenditureRouter = require('./namuna1ExpenditureRouter');
const namuna1Controller = require('../../../application/controllers/namuna/namuna1/namuna1Controller');
const middleware = require('../../middleware');
const namuna1Router = Router();

//HANDLES ROUTES OF NAMUNA 1 FOR COLLECTION(जमा) RELATED THINGS
namuna1Router.use('/collection', namuna1CollectionRouter);

//HANDLES ROUTES OF NAMUNA 1 FOR EXPENDITURE(खर्च) RELATED THINGS
namuna1Router.use('/expenditure', namuna1ExpenditureRouter);

namuna1Router.get('/', middleware.checkForPoolConnection, namuna1Controller.renderNamuna1Page);

namuna1Router.get(
    '/print',
    middleware.checkForPoolConnection,
    namuna1Controller.renderNamuna1PrintPage
);

module.exports = namuna1Router;
