const gpApplicationsController = require("../../application/controllers/gpApplications/gpApplicationsController");
const asyncHandler = require("../../application/utils/asyncHandler");
const getRouter = require("../../application/utils/getRouter");
const { renderPage } = require("../../application/utils/sendResponse");
const constructionApplicationsRouter = require("./constructionApplicationsRouter");
const empDemandRouter = require("./empDemandRouter");
const f8FerfarRouter = require("./f8FerfarRouter");
const jobCardRouter = require("./jobCardRouter");
const occupationNocRouter = require("./occupationNocRouter");
const tahsilOfficeSevaRouter = require("./tahsilOfficeSevaRouter");

const gpApplicationsRouter = getRouter();

gpApplicationsRouter.get(
  "/",
  gpApplicationsController.renderGpApplicationsPage
);

// After the gram login
gpApplicationsRouter.get(
  "/inside",
  gpApplicationsController.renderGpApplicationsPageInside
);


gpApplicationsRouter.use('/f8-ferfar', f8FerfarRouter)

gpApplicationsRouter.use('/construction', constructionApplicationsRouter)

gpApplicationsRouter.use('/job-card', jobCardRouter)

gpApplicationsRouter.use('/emp-demand', empDemandRouter)

gpApplicationsRouter.use('/to-seva', tahsilOfficeSevaRouter)

gpApplicationsRouter.use('/occupation-noc', occupationNocRouter)

module.exports = gpApplicationsRouter;
