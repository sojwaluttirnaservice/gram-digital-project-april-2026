const namuna5Controller = require("../../../application/controllers/namuna/remaining/namuna5Controller");
const namuna5PaniRouter = require("./namuna5PaniRouter");
const namuna5SamanyaRouter = require("./namuna5SamanyaRouter");
const asyncHandler = require("../../../application/utils/asyncHandler");
const getRouter = require("../../../application/utils/getRouter");
const { renderPage } = require("../../../application/utils/sendResponse");

const namuna5Router = getRouter();

namuna5Router.get("/print", namuna5Controller.renderNamuna5PrintPage);

namuna5Router.get("/c/print", namuna5Controller.renderNamuna5CPrintPage);

namuna5Router.get("/", asyncHandler(async (req, res) => {
   renderPage(res, "user/namuna/remaining/namuna5/5/namuna-5-page.pug") 
}),)

namuna5Router.use("/samanya", namuna5SamanyaRouter);

namuna5Router.use("/pani", namuna5PaniRouter);

module.exports = namuna5Router;
