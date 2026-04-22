const { Router } = require('express');

const namuna19Controller = require('../../application/controllers/namuna/namuna19Controller');
const { checkForPoolConnection } = require('../middleware');
const namuna19EmployeeRouter = require('./namuna19EmployeeRouter');
const namuna19PaymentRouter = require('./namuna19PaymentRouter');

const namuna19Router = Router();

namuna19Router.use('/employees', namuna19EmployeeRouter);

namuna19Router.use('/payment', namuna19PaymentRouter);

// Rendering pages
namuna19Router.get('/', checkForPoolConnection, namuna19Controller.renderNamuna19Page);


module.exports = namuna19Router;
