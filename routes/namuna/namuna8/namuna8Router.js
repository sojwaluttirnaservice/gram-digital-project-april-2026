const namuna8Controller = require("../../../application/controllers/namuna/namuna8/namuna8Controller");
const asyncHandler = require("../../../application/utils/asyncHandler");
const getRouter = require("../../../application/utils/getRouter");
const { renderPage } = require("../../../application/utils/sendResponse");
const namuna8BlankRouter = require("./namuna8BlankRouter");

const namuna8Router = getRouter()

namuna8Router.use('/blank', namuna8BlankRouter)
// THESE ARE THE RECIEPTS of Namuna 8 (which we print during the payment for namuna 8)
namuna8Router.get('/n-7-receipts', namuna8Controller.renderNamuna7ReceiptsPage)

namuna8Router.get('/home-image-status', namuna8Controller.renderNamuna8HomeImageStatusPage)

module.exports = namuna8Router