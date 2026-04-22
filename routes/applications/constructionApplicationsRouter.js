const constructionApplicationsController = require("../../application/controllers/gpApplications/constructionApplicationsController")
const getRouter = require("../../application/utils/getRouter")

const constructionApplicationsRouter = getRouter()

// 
constructionApplicationsRouter.get(
    '/form',
    constructionApplicationsController.renderConstructionAppliationFormPage
)

// list
constructionApplicationsRouter.get(
    '/list',
    constructionApplicationsController.renderConstructionApplicationsListPage
)

// report
constructionApplicationsRouter.get(
    '/report',
    constructionApplicationsController.renderConstructionApplicationsReportPage
)

// print
constructionApplicationsRouter.get(
    '/print/:applicationId',
    constructionApplicationsController.renderConstructionApplicationPrintPage
)

constructionApplicationsRouter.get


// qr code page
constructionApplicationsRouter.get(
    '/c/:applicationId',
    constructionApplicationsController.renderConstructionApplicationPage
)

// post, put,
constructionApplicationsRouter.post(
    '/',
    constructionApplicationsController.saveConstructionApplication
)

constructionApplicationsRouter.put(
    '/accept',
    constructionApplicationsController.acceptConstructionApplication
)

constructionApplicationsRouter.put(
    '/reject',
    constructionApplicationsController.rejectConstructionApplication
)

constructionApplicationsRouter.put(
    '/revoke',
    constructionApplicationsController.revokeConstructionApplication
)

constructionApplicationsRouter.put(
    '/resolve',
    constructionApplicationsController.resolveConstructionApplication
)

constructionApplicationsRouter.get(
    "/cert/:applicationId",
    constructionApplicationsController.renderConstructionCertificatePrint
)

module.exports = constructionApplicationsRouter