const express = require('express');
const router = express.Router();
const getRouter = require('../../application/utils/getRouter');

const paymentRoutes = getRouter()

// var mid = require('./middleware');
// var commenMiddleware = mid.middleware;
// var indexController = require('../application/controllers/indexConroller');

const paymentController = require('../../application/controllers/Payment-controller/paymentController');
const asyncHandler = require('../../application/utils/asyncHandler');
const { renderPage } = require('../../application/utils/sendResponse');

paymentRoutes.get(
    '/online',
    asyncHandler(async (req, res) => {
        renderPage(res, "user/payments/payments-page.pug")
    }),
)

paymentRoutes.post(
  '/save',
  paymentController.savePaymentDetails
)

paymentRoutes.post(
    '/save-by-user',
    paymentController.savePaymentDetailsByUser
)

paymentRoutes.post(
    '/save-by-user-water',
    paymentController.savePaymentDetailsByUserWater
)

paymentRoutes.get(
    '/list/samanya',
    paymentController.renderPaymentsListSamanya
)

paymentRoutes.get(
    '/list/pani',
    paymentController.renderPaymentsListPani
)

paymentRoutes.put(
    '/status',
    paymentController.updatePaymentStatus
)

paymentRoutes.put(
    '/status-water',
    paymentController.updatePaymentStatusWater
)

paymentRoutes.get(
    '/history',
    paymentController.renderPaymentHistoryPage
)

paymentRoutes.get(
    '/u/history',
    paymentController.renderPaymentHistoryPageForUser
)

// paymentRoutes.get(
//   '/payment',
//   commenMiddleware.redirectToHome,
//   indexController.makePayment
// );

// paymentRoutes.get(
//   '/payment-challan',
//   commenMiddleware.redirectToHome,
//   indexController.makeChalanPayment
// );

// paymentRoutes.post(
//   '/api/payment/order',
//   commenMiddleware.redirectToHome,
//   indexController.getPlacePaymentOrder
// );
// paymentRoutes.post(
//   '/verify-details',
//   commenMiddleware.redirectToHome,
//   indexController.getVerifyDetails
// );
// paymentRoutes.post(
//   '/api/payment/verify',
//   commenMiddleware.redirectToHome,
//   indexController.getPlacePaymentOrderVerify
// );

// paymentRoutes.post(
//   '/api/payment/verifyDemo',
//   commenMiddleware.redirectToHome,
//   [
//     mid.transactionImgId.fields(mid.translationArray),
//     commenMiddleware.checkForPoolConnection
//   ],
//   indexController.getPlacePaymentOrderVerifyDemo
// );

// paymentRoutes.post(
//   '/api/save-payment-callan-details',
//   commenMiddleware.redirectToHome,
//   indexController.savePaymentCallanDetail
// );

// paymentRoutes.get(
//   '/api/payment/request-order/:r/:f',
//   commenMiddleware.redirectToHome,
//   indexController.requestOrder
// );

// paymentRoutes.post(
//   '/payment/verify-sol-payment',
//   commenMiddleware.redirectToHome,
//   indexController.verifyPayment
// );
module.exports = paymentRoutes;
