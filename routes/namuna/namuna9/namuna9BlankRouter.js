const namuna9BlankController = require("../../../application/controllers/Form_9/namuna9BlankController");
const getRouterWithSession = require("../../../application/utils/getRouterWithSession");

const namuna9BlankRouter = getRouterWithSession()

namuna9BlankRouter.get(
    '/menu',
    namuna9BlankController.renderNamuna9BlankPage
)

namuna9BlankRouter.get(
    '/samanya',
    namuna9BlankController.renderNamuna9BlankSamanyaPrint
)

namuna9BlankRouter.get(
    '/pani',
    namuna9BlankController.renderNamuna9BlankPaniPrint
)


module.exports = namuna9BlankRouter