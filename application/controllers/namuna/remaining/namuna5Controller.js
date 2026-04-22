const asyncHandler = require("../../../utils/asyncHandler");
const { renderPage } = require("../../../utils/sendResponse");

const namuna5Controller = {
  renderNamuna5PrintPage: asyncHandler(async (req, res) => {
    renderPage(
      res,
      "user/namuna/remaining/namuna5/main/namuna-5-print-page.pug",
      {
        title: "",
        namuna5Entries: []
      }
    );
  }),

  renderNamuna5CPrintPage: asyncHandler(async (req, res) => {
    renderPage(
      res,
      "user/namuna/remaining/namuna5/5c/namuna-5-c-print-page.pug",
      {
        title: "",
        namuna5CEntries: [],
      }
    );
  }),
};

module.exports = namuna5Controller;
