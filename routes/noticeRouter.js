var NoticeController = require("../application/controllers/NoticeController");
var express = require("express");
var middleware = require("./middleware");
var router = express.Router();

router.get(
  "/",
  middleware.checkForPoolConnection,
  NoticeController.mainListView,
);
router.get(
  "/manage",
  middleware.checkForPoolConnection,
  NoticeController.manageNotice,
);

router.post(
  "/save-new-notice",
  middleware.checkForPoolConnection,
  NoticeController.addNotice,
);

router.post(
  "/remove-notice",
  middleware.checkForPoolConnection,
  NoticeController.removeNotice,
);
module.exports = router;
