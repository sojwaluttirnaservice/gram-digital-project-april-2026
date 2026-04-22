const express = require("express");
const router = express.Router();
const middleware = require("../middleware");

const formNineController = require("../../application/controllers/Form_9/formNineController");

router.get(
  "/formNinePrintTab",
  middleware.checkForPoolConnection,
  formNineController.getNinePrintTab,
);
module.exports = router;
