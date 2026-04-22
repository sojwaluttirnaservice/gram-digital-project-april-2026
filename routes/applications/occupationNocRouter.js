const occupationNocController = require("../../application/controllers/gpApplications/occupationNocController");
const getRouter = require("../../application/utils/getRouter");

const occupationNocRouter = getRouter();

// =========================
// GET ROUTES
// =========================

// form page
occupationNocRouter.get(
  '/form',
  occupationNocController.renderOccupationNocFormPage
);

// list page
occupationNocRouter.get(
  '/list',
  occupationNocController.renderOccupationNocListPage
);

// single application details page
occupationNocRouter.get(
  '/application/:applicationId',
  occupationNocController.renderOccupationNocDetailsPage
);

// print page
occupationNocRouter.get(
  '/card/:applicationId',
  occupationNocController.renderOccupationNocPrintPage
);

// =========================
// POST ROUTE
// =========================

// save new occupation NOC application
occupationNocRouter.post(
  '/',
  occupationNocController.saveOccupationNocApplication
);

// =========================
// PUT ROUTES (status updates)
// =========================

// accept / reject / revoke handled by single method based on status in body
occupationNocRouter.put(
  '/status',
  occupationNocController.updateOccupationNocStatus
);


occupationNocRouter.get(
    '/report',
    occupationNocController.renderOccupationNocReportPrintPage
)

module.exports = occupationNocRouter;
