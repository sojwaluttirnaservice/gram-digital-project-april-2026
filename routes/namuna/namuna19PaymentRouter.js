

const { Router } = require('express');

const { checkForPoolConnection } = require('../middleware');
const namuna19PaymentController = require('../../application/controllers/namuna/namuna19PaymentController');
const namuna19PaymentRouter = Router();



namuna19PaymentRouter.get('/history', checkForPoolConnection, namuna19PaymentController.fetchNamuna19PaymentHistory)

namuna19PaymentRouter.get('/history/:employeeId', checkForPoolConnection, namuna19PaymentController.renderNamuna19PaymentHistoryOfEmployee);

namuna19PaymentRouter.get('/make', checkForPoolConnection, namuna19PaymentController.renderMakePaymentPage);

// namuna19PaymentRouter.get('/make/:employeeId', checkForPoolConnection, );

namuna19PaymentRouter.post('/make', checkForPoolConnection, namuna19PaymentController.saveNamuna19PaymentRecord)    

namuna19PaymentRouter.delete('/delete', checkForPoolConnection, namuna19PaymentController.deleteNamuna19PaymentRecord)



namuna19PaymentRouter.get('/print', checkForPoolConnection, namuna19PaymentController.printNamuna19PaymentRecord)


namuna19PaymentRouter.get('/attendance-print', checkForPoolConnection, namuna19PaymentController.printNamuna19AttendancePayment)
module.exports = namuna19PaymentRouter
