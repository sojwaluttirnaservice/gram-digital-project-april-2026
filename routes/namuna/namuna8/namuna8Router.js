const namuna8Controller = require("../../../application/controllers/namuna/namuna8/namuna8Controller");
const asyncHandler = require("../../../application/utils/asyncHandler");
const getRouter = require("../../../application/utils/getRouter");
const { renderPage } = require("../../../application/utils/sendResponse");
const namuna8BlankRouter = require("./namuna8BlankRouter");

const namuna8Router = getRouter()

namuna8Router.use('/blank', namuna8BlankRouter)

namuna8Router.get('/home-image-status', namuna8Controller.renderNamuna8HomeImageStatusPage)

module.exports = namuna8Router