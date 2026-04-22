const complaintsController = require("../../application/controllers/complaints/complaintsController");
const getRouter = require("../../application/utils/getRouter");
const { isUserLoggedIn } = require("../middleware");

const complaintsRouter = getRouter();

complaintsRouter.get("/form", complaintsController.renderComplaintsFormPage);

complaintsRouter.get("/list", complaintsController.renderComplaintsListPage);

complaintsRouter.get(
  "/c/:complaintId",
  complaintsController.renderComplaintPage
);

complaintsRouter.get(
  "/report",
  complaintsController.renderComplaintsReportPage
);

complaintsRouter.get(
    '/print/:applicationId',
    complaintsController.renderComplaintApplicationPage
)

complaintsRouter.put("/revoke", complaintsController.revokeComplaint);

complaintsRouter.post("/", complaintsController.registerComplaint);

complaintsRouter.put("/accept", complaintsController.acceptComplaint);

complaintsRouter.put("/reject", complaintsController.rejectComplaint);

complaintsRouter.put('/resolve', complaintsController.resolveComplaint)

complaintsRouter.put('/extend/resolution-date', complaintsController.extendResolutionDate)

module.exports = complaintsRouter;
