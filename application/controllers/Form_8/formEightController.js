const ZPModel = require('../../model/ZPModel');
const asyncHandler = require('../../utils/asyncHandler');
const { renderPage } = require('../../utils/sendResponse');

const formEightController = {
  getEightPrintTab: asyncHandler(async (req, res) => {
    renderPage(res, 'user/form-8/formEightPrintTab', { title: 'नमुना ८ प्रिंट' })
  }),
};

module.exports = formEightController;
