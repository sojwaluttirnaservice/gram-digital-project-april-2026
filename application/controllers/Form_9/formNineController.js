const ZPModel = require("../../model/ZPModel");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/sendResponse");

const formNineController = {
  getNinePrintTab: asyncHandler(async (req, res) => {
    renderPage(res, "user/form-9/formNinePrintTab");
  }),
};

module.exports = formNineController;
