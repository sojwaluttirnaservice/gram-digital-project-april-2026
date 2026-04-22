const asyncHandler = require("../../application/utils/asyncHandler");
const getRouter = require("../../application/utils/getRouter");
const { renderPage } = require("../../application/utils/sendResponse");

const rtiRouter = getRouter();

rtiRouter.get('/info', asyncHandler(async (req, res) => {
    renderPage(res, 'user/rti/rti-info-page.pug');
}),)


module.exports = rtiRouter