const pptController = require("../../application/controllers/ppt/pptController");
const getRouter = require("../../application/utils/getRouter");
const pptSlidesRouter = require("./pptSlidesRouter");

const pptRouter = getRouter();

pptRouter.get("/list", pptController.renderPptListPage);

pptRouter.get("/create", pptController.renderCreatePptPage);

pptRouter.get("/edit/:id", pptController.renderEditPptPage);

pptRouter.post("/", pptController.create);

pptRouter.put("/", pptController.update);

pptRouter.delete("/", pptController.delete);

pptRouter.get("/print/:id", pptController.renderPptPrintPage);

pptRouter.get("/download-pdf/:id", pptController.downloadPptPdf);

pptRouter.use("/slides", pptSlidesRouter);

module.exports = pptRouter;
