const empDemandController = require("../../application/controllers/gpApplications/empDemandController");
const getRouter = require("../../application/utils/getRouter");

const empDemandRouter = getRouter()

// form route
empDemandRouter.get(
    '/form',
    empDemandController.renderEmpDemandFormPage
)

empDemandRouter.get(
    '/check', 
    empDemandController.checkIfAlreadyApplied
)

empDemandRouter.post(
    '/',
    empDemandController.saveEmpDemandForm
)

empDemandRouter.get(
    '/list',
    empDemandController.renderEmpDemandListPage
)

empDemandRouter.get(
    '/report',
    empDemandController.renderEmpDemandReportPage
)

empDemandRouter.get(
    '/application/:empDemandId',
    empDemandController.renderEmpDemandApplicationPrintPage
)

empDemandRouter.put(
    '/status',
    empDemandController.updateEmpDemandStatus
)

empDemandRouter.get(
    '/n-5/:empDemandId',
    empDemandController.renderEmpDemandNamuna5ListPage
)

empDemandRouter.post(
    '/n-5',
    empDemandController.saveEmpDemandN5Form
)

empDemandRouter.get(
    '/n-5/print/:n5DemandId',
    empDemandController.renderEmpDemandN5Print
)

module.exports = empDemandRouter