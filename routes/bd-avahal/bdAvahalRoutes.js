const express = require("express");
const router = express.Router();

const middleware = require("../middleware");
const bdAvahal = require("../../application/controllers/bd-avahal/bdController");
const bdModel = require("../../application/model/bd-avahal/bdModel");

router.get("/", middleware.checkForPoolConnection, bdAvahal.bdAvahalView);

router.get("/list", middleware.checkForPoolConnection, bdAvahal.yearWiseList);

router.get(
  "/check-already-filled",
  middleware.checkForPoolConnection,
  bdAvahal.checkAlreadyFilled
);

router.get(
  "/new-bd-avahal",
  middleware.checkForPoolConnection,
  bdAvahal.newBDAvahal
);

router.get(
  '/edit-bd-avahal-view',
  middleware.checkForPoolConnection,
  bdAvahal.editBDAvahalView
)

router.put(
  '/update-bd-avahal',
  middleware.checkForPoolConnection,
  bdAvahal.postBDAvahal
)

//Post bd avahal

router.post(
  "/post-bd-avahal",
  middleware.checkForPoolConnection,
  bdAvahal.postBDAvahal
);

//Print BD avahal

router.get(
  '/print',
  middleware.checkForPoolConnection,
  bdAvahal.printBDAvahal,
)

router.delete(
  '/delete-avahal',
  middleware.checkForPoolConnection,
  bdAvahal.deleteBDAhaval
)


module.exports = router;
