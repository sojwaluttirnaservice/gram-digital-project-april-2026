const jobCardController = require("../../application/controllers/gpApplications/jobCardController");
const getRouter = require("../../application/utils/getRouter");

const jobCardRouter = getRouter();

// =========================
// GET ROUTES
// =========================

// form page
jobCardRouter.get(
  '/form',
  jobCardController.renderJobCardFormPage
);

jobCardRouter.get(
    '/edit/:applicationId',
    jobCardController.renderEditJobCardApplicationPage
)

// list page
jobCardRouter.get(
  '/list',
  jobCardController.renderJobCardListPage
);

jobCardRouter.get(
    '/check',
    jobCardController.checkApplicationExistsByMobile
)

// single application details page
jobCardRouter.get(
  '/j/:applicationId',
  jobCardController.renderJobCardDetailsPage
);

jobCardRouter.get(
    '/card/:applicationId',
    jobCardController.renderJobCardPrintPage
)

// =========================
// POST ROUTE
// =========================

// save new job card application
jobCardRouter.post(
  '/',
  jobCardController.saveJobCardApplication
);

jobCardRouter.put(
    '/',
    jobCardController.updateJobCardApplication
)

// =========================
// PUT ROUTES (status updates)
// =========================

// accept / reject / revoke handled by single method based on status in body
jobCardRouter.put(
  '/status',
  jobCardController.updateJobCardStatus
);

jobCardRouter.get(
    '/report',
    jobCardController.renderJobCardReportPage
)
module.exports = jobCardRouter;
