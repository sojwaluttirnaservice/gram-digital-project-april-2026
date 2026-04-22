const getRouter = require("../../../../application/utils/getRouter");
const namuna5kPaniRouter = require("./namuna5kPaniRouter");
const namuna5kSamanyaRouter = require("./namuna5kSamanyaRouter");

const namuna5kRouter = getRouter();

namuna5kRouter.use('/samanya', namuna5kSamanyaRouter);

namuna5kRouter.use('/pani', namuna5kPaniRouter);

module.exports = namuna5kRouter;