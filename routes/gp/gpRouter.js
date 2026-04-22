const gpController = require("../../application/controllers/gp/gpController");
const getRouter = require("../../application/utils/getRouter");

const gpRouter = getRouter()

gpRouter.post('/gp-image', gpController.save)

module.exports = gpRouter