const express = require("express");
const middleware = require("../middleware");
const qrCodeController = require("../../application/controllers/qrCode/qrCodeController");
const getRouter = require("../../application/utils/getRouter");

const qrCodeRouter = getRouter()

qrCodeRouter.get(
  "/",
  qrCodeController.renderQrCodePage
);


qrCodeRouter.post(
  "/upload-bank-qr-code",
  qrCodeController.saveBankrQrCode
);

qrCodeRouter.post(
  "/toggle-bank-qr-code-visbility", 
  qrCodeController.toggleQrBankCodeVisbility
);
qrCodeRouter.post(
  "/upload-bank-qr-code-water",
  qrCodeController.saveBankrQrCodeWater
);

qrCodeRouter.post(
  "/toggle-bank-qr-code-water-visbility", 
  qrCodeController.toggleQrBankWaterCodeVisbility
);

module.exports = qrCodeRouter;
