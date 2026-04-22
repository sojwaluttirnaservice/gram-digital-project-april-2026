var MarriageController = require("../application/controllers/MarriageController");
var middleware = require("./middleware");
const getRouter = require("../application/utils/getRouter");
const marriageRouter = getRouter();

marriageRouter.get(
  "/",
  middleware.checkForPoolConnectionWithSession,
  MarriageController.allList,
);

marriageRouter.get("/form", MarriageController.renderMarriageFormPage);

marriageRouter.get(
  "/add-new",
  middleware.checkForPoolConnectionWithSession,
  MarriageController.addNewEntryView,
);


marriageRouter.post(
    '/',
    MarriageController.saveMarriageRegistrationApplication
);

marriageRouter.put(
    '/status',
    MarriageController.updateStatus
)

marriageRouter.get(
    '/list',
    MarriageController.renderMarriageListPage
)

marriageRouter.post("/saveNewDetails", MarriageController.saveNewEntryView);

marriageRouter.get(
  "/edit-marriage/:id",
  middleware.checkForPoolConnectionWithSession,
  MarriageController.editMarriage,
);

marriageRouter.post(
  "/update-edit-marriage",
  MarriageController.updateEditMarriage,
);
marriageRouter.post("/remove-marriage", MarriageController.removeMarriage);

marriageRouter.get(
  "/marriage-register-report-print",
  MarriageController.renderMarriageRegisterReport,
);
module.exports = marriageRouter;
