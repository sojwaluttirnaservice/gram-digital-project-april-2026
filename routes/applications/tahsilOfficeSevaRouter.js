const tahsilOfficeSevaController = require("../../application/controllers/gpApplications/tahsilOfficeSevaController");
const getRouter = require("../../application/utils/getRouter");

const tahsilOfficeSevaRouter = getRouter();

// =========================
// GET ROUTES
// =========================

// form page
tahsilOfficeSevaRouter.get(
  "/form",
  tahsilOfficeSevaController.renderTahsilOfficeSevaFormPage
);

// tahsilOfficeSevaRouter.get(
//   "/edit/:applicationId",
//   tahsilOfficeSevaController.renderEditTahsilOfficeSevaApplicationPage
// );

// list page
tahsilOfficeSevaRouter.get(
  "/list",
  tahsilOfficeSevaController.renderTahsilOfficeSevaListPage
);

// tahsilOfficeSevaRouter.get(
//   "/check",
//   tahsilOfficeSevaController.checkApplicationExistsByMobile
// );

// single application page
tahsilOfficeSevaRouter.get(
  "/application/:applicationId",
  tahsilOfficeSevaController.renderTahsilOfficeSevaDetailsPage
);

tahsilOfficeSevaRouter.get(
  "/a/:applicationId",
  tahsilOfficeSevaController.renderTahsilOfficeSevaApplicationDetailsPage
);

// =========================
// POST ROUTE
// =========================

// save new application
tahsilOfficeSevaRouter.post(
  "/",
  tahsilOfficeSevaController.saveTahsilOfficeSevaApplication
);

// update application
tahsilOfficeSevaRouter.put(
  "/",
  tahsilOfficeSevaController.updateTahsilOfficeSevaApplication
);

// =========================
// PUT ROUTES (status updates)
// =========================

// accept / reject / revoke
tahsilOfficeSevaRouter.put(
  "/status",
  tahsilOfficeSevaController.updateTahsilOfficeSevaStatus
);

// report page
tahsilOfficeSevaRouter.get(
  "/report",
  tahsilOfficeSevaController.renderTahsilOfficeSevaReportPage
);

module.exports = tahsilOfficeSevaRouter;
