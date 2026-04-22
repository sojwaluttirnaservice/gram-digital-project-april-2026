var ExportController = require("../application/controllers/ExportController");
const getRouter = require("../application/utils/getRouter");
var exportsRouter = getRouter();

exportsRouter.get("/eight-form", ExportController.exportFormEight);
exportsRouter.get("/nine-form", ExportController.exportFormNine);

exportsRouter.get("/form-eight", ExportController.exportFormEightNewFormat);

module.exports = exportsRouter;
