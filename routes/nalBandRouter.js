var MagniLekhController = require("../application/controllers/MagniLekhController");
var express = require("express");
var middleware = require("./middleware");
var router = express.Router();

router.get(
  "/",
  middleware.checkForPoolConnection,
  MagniLekhController.nallBandAllList,
);

router.post(
  "/new-user",
  middleware.checkForPoolConnection,
  MagniLekhController.getSingleNalBandList,
);
router.post(
  "/remove-user",
  middleware.checkForPoolConnection,
  MagniLekhController.removeFromNalBand,
);
router.post(
  "/add-user",
  middleware.checkForPoolConnection,
  MagniLekhController.addNalBandUser,
);

router.post(
  "/get-auto-search",
  middleware.checkForPoolConnection,
  MagniLekhController.getAutoSearch,
);

module.exports = router;
