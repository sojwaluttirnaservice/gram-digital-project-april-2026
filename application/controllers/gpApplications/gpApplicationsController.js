const ferfarApplicationsModel = require("../../model/gpApplications/ferfarApplicationsModel");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/sendResponse");

const gpApplicationsController = {
  renderGpApplicationsPage: asyncHandler(async (req, res) => {
    renderPage(res, "user/gp-applications/gp-applications-list-page.pug");
  }),

  renderGpApplicationsPageInside: asyncHandler(async (req, res) => {
      renderPage(res, 'user/gp-applications/gp-applications-list-inside-page.pug')
  }),
};

module.exports = gpApplicationsController;
