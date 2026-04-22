var NetworkServiceController = require("../application/controllers/NetworkServiceController");
var express = require("express");
var middleware = require("./middleware");
var router = express.Router();

router.get(
  "/",
  middleware.checkForPoolConnection,
  NetworkServiceController.networkServiceView,
);
router.get(
  "/remove/:id",
  middleware.checkForPoolConnection,
  NetworkServiceController.removeSMSFromList,
);

router.post(
  "/get-client-contact-list",
  middleware.checkForPoolConnection,
  NetworkServiceController.getClientContactList,
);

router.post(
  "/send-sms",
  middleware.checkForPoolConnection,
  NetworkServiceController.sendCommonSMS,
);

module.exports = router;
