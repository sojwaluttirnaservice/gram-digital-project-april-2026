const f8FerfarController = require("../../application/controllers/gpApplications/f8FerfarController");
const getRouter = require("../../application/utils/getRouter");

const f8FerfarRouter = getRouter()


f8FerfarRouter.get(
    '/list',
    f8FerfarController.renderFerfarApplicationsList
)

f8FerfarRouter.get(
    '/register',
    f8FerfarController.renderGpPropertyFerfarFormPage
)

f8FerfarRouter.post(
    '/register',
    f8FerfarController.registerGpPropertyFerfarForm
)

f8FerfarRouter.get(
    '/print/:applicationId',
    f8FerfarController.renderFerfarApplicationPrint
)

f8FerfarRouter.put(
    '/revoke',
    f8FerfarController.revokeFerfarApplication
)

f8FerfarRouter.put(
    '/accept',
    f8FerfarController.acceptFerfarApplication
)

f8FerfarRouter.put(
    '/reject',
    f8FerfarController.rejectFerfarApplication
)

f8FerfarRouter.put(
    '/resolve',
    f8FerfarController.resolveFerfarApplication
)

f8FerfarRouter.get(
    '/report',
    f8FerfarController.renderFerfarReportPage
)

f8FerfarRouter.get(
    '/f/:applicationId',
    f8FerfarController.renderFerfarApplicationDetailsPage
)

module.exports = f8FerfarRouter