const rtiController = require("../../application/controllers/rti/rtiController");
const getRouter = require("../../application/utils/getRouter");

const rtiRouter = getRouter();

// Public route
rtiRouter.get('/info', rtiController.renderRtiInfoPage);

// Admin / Management routes
rtiRouter.get('/rti-management', rtiController.renderRtiManagementPage);
rtiRouter.post('/rti-management/upload', rtiController.uploadRtiDocument);
rtiRouter.post('/rti-management/delete', rtiController.deleteRtiDocument);

module.exports = rtiRouter;