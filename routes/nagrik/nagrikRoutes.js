const nagrikController = require('../../application/controllers/nagrik/nagrikController')
const getRouter = require('../../application/utils/getRouter')

const nagrikRouter = getRouter()

nagrikRouter.get(
	'/report',
	nagrikController.renderNagrikNondaniReportView
)

nagrikRouter.get(
    '/report-print',
    nagrikController.renderNagrikNondaiReportPrintPage
)

nagrikRouter.get(
    '/edit/:id',
    nagrikController.renderNagrikNondaniEditPage
)

nagrikRouter.put(
    "/",
    nagrikController.updateNagrikDetails
)

module.exports = nagrikRouter
