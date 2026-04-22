const express = require("express");
const middleware = require("./middleware");
const router = express.Router();
const KarVasuliAhawalController = require("../application/controllers/KarVasuliAhawalController");

router.get(
  "/",
  middleware.checkForPoolConnection,
  KarVasuliAhawalController.allList
);

router.get(
  "/list",
  middleware.checkForPoolConnection,
  KarVasuliAhawalController.yearWiseList
);

router.get(
  "/print-kar-wasuli",
  middleware.checkForPoolConnection,
  KarVasuliAhawalController.printKarVasuli
);

router.get(
  "/new",
  middleware.checkForPoolConnection,
  KarVasuliAhawalController.newView
);

// checking if vasuli of the selected month is already filled or not.
router.post(
  "/checkFilledDetails",
  middleware.checkForPoolConnection,
  KarVasuliAhawalController.checkFilledDetails
);

router.get(
  "/newKarVasuliAvahalView",
  middleware.checkForPoolConnection,
  KarVasuliAhawalController.newKarVasuliAvahalView
);

router.get(
  "/editKarVasuliAvahalView/:id",
  middleware.checkForPoolConnection,
  KarVasuliAhawalController.editKarVasuliAvahalView
);

router.post(
  "/postNewKarVasuliAvahal",
  middleware.checkForPoolConnection,
  KarVasuliAhawalController.postNewKarVasuliAvahal
);

router.put(
  "/updateKarVasuliAvahal",
  middleware.checkForPoolConnection,
  KarVasuliAhawalController.updateKarVasuliAvahal
);
// delete kar vasuli
router.post(
  "/delete-kar-wasuli",
  middleware.checkForPoolConnection,
  KarVasuliAhawalController.deleteKarVasuli
);

module.exports = router;
