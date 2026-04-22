var ApplicationController = require("../application/controllers/ApplicationController");
const getRouter = require("../application/utils/getRouter");
var applicationRouter = getRouter()

applicationRouter.get(
  "/",
  ApplicationController.allList
);

applicationRouter.get(
    '/edit/:id',
    ApplicationController.renderEditApplicationPage
)

applicationRouter.get(
    '/report',
    ApplicationController.renderApplicationReportPage
)

applicationRouter.get(
  "/rejected",
  ApplicationController.allRejectedList
);
applicationRouter.get(
  "/accepted",
  ApplicationController.allAcceptedList
);
applicationRouter.post(
  "/send-application-message",
  ApplicationController.saveDocAndSendSMS
);

applicationRouter.get(
    "/application-prints",
    ApplicationController.renderApplicationPrintsReportPage
)

applicationRouter.put(
    '/update-doc-remark',
    ApplicationController.updateDocRemark
)

applicationRouter.post(
  "/get-user-details",
  ApplicationController.getQuickUserInfoByAadhar
);

applicationRouter.put(
    '/',
    ApplicationController.updateApplication
)

module.exports = applicationRouter;
