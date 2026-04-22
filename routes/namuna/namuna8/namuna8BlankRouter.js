const namuna8BlankController = require("../../../application/controllers/namuna/namuna8/blank/namuna8BlankController");
const asyncHandler = require("../../../application/utils/asyncHandler");
const getRouter = require("../../../application/utils/getRouter");
const { renderPage } = require("../../../application/utils/sendResponse");

const namuna8BlankRouter = getRouter();


namuna8BlankRouter.get(
    '/',
    asyncHandler(async (req, res) => {
        renderPage(res, 'user/print/namuna8/blanks/namuna8Blank')
    }),
)

namuna8BlankRouter.get(
    '/o-image',
    namuna8BlankController.renderOImageBlankPrint
)

namuna8BlankRouter.get(
    '/form-8-image',
    namuna8BlankController.renderForm8ImageBlankPrint
)

module.exports = namuna8BlankRouter;
