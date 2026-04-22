var TaxPayerController = require("../application/controllers/TaxPayerController");
var express = require("express");
var middleware = require("./middleware");
const getRouter = require("../application/utils/getRouter");
let taxPayerRouter = getRouter()

taxPayerRouter.get(
  "/",
  middleware.isUserLoggedIn,
  TaxPayerController.getListView,
);
taxPayerRouter.get(
  "/new/samanya/:id",
  TaxPayerController.getTaxPayerSamanyaView,
);
taxPayerRouter.get(
  "/new/samanya-payment/:id",
  TaxPayerController.getPaymentDetails,
);

// pani payment for the user
taxPayerRouter.get(
  "/pani-payment/:id",
  TaxPayerController.getPaymentDetailsWater,
);

// this is for the gram login
taxPayerRouter.get(
  "/new/pani/:id",
  TaxPayerController.getTaxPayerPaniView,
);

taxPayerRouter.get(
  "/new/pay-list/:id",
  TaxPayerController.getPayList,
);

taxPayerRouter.post(
  "/saveNewPay",
  TaxPayerController.saveNewPay,
);
taxPayerRouter.post(
  "/saveNewWaterPay",
  TaxPayerController.saveNewWaterPay,
);
taxPayerRouter.post(
  "/get-auto-search",
  TaxPayerController.getAutoSearch,
);
taxPayerRouter.post(
  "/create/orderId",
  TaxPayerController.createPaymentID,
);
taxPayerRouter.post(
  "/check/callback",
  TaxPayerController.callback,
);


taxPayerRouter.post(
    '/samanya',
    TaxPayerController.saveSamanyaTaxPaymentWithPaidTaxDetails
)


taxPayerRouter.post(
    '/water',
    TaxPayerController.saveWaterTaxPaymentWithPaidTaxDetails
)

module.exports = taxPayerRouter;
