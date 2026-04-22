const express = require("express");
const middleware = require("../middleware");
const magniBillController = require("../../application/controllers/magni-bill/magniBillController");
const mangiBillRouter = express.Router();

mangiBillRouter.get(
  "/",
  middleware.checkForPoolConnection,
  magniBillController.renderMagniBillPage
);

mangiBillRouter.get(
  "/print-watertax-magni-bill",
  middleware.checkForPoolConnection,
  magniBillController.printWatertaxMagniBill
);

mangiBillRouter.get(
  "/print-magni-bill-other",
  middleware.checkForPoolConnection,
  magniBillController.printMagniBillOther
);

mangiBillRouter.get(
  "/print-bank-qr-code-magni-bill-other",
  middleware.checkForPoolConnection,
  magniBillController.printQrCodeMagniBillOther
);

mangiBillRouter.get(
  "/print-9-c-bank-magni-bill",
  middleware.checkForPoolConnection,
  magniBillController.print9CBankMagniBill
);

mangiBillRouter.get(
  "/print-9-c-magni-bill",
  middleware.checkForPoolConnection,
  magniBillController.print9CMagniBill
);

module.exports = mangiBillRouter;
