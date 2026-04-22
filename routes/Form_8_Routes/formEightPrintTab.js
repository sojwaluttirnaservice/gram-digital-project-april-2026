const express = require("express");
const router = express.Router();
const middleware = require("../middleware");

const formEightController = require("../../application/controllers/Form_8/formEightController");

router.get(
  "/formEightPrintTab",
  middleware.checkForPoolConnection,
  formEightController.getEightPrintTab,
);
module.exports = router;
