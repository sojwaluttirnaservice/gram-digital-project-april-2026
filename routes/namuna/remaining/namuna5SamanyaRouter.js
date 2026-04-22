const namuna5SamanyaController = require("../../../application/controllers/namuna/remaining/namuna5SamanyaController");
const getRouter = require("../../../application/utils/getRouter");

const namuna5SamanyaRouter = getRouter();

namuna5SamanyaRouter.get(
  "/list",
  namuna5SamanyaController.renderNamuna5ExpenditureListPage,
);

namuna5SamanyaRouter.get(
  "/form",
  namuna5SamanyaController.renderNamuna5ExpenditureFormPage,
);

namuna5SamanyaRouter.post(
    '/',
    namuna5SamanyaController.save
)

namuna5SamanyaRouter.get(
    '/print',
    namuna5SamanyaController.renderNamuna5ExpenditureSamanyaPrintPage
)

namuna5SamanyaRouter.get(
    '/reasons',
    namuna5SamanyaController.renderNamuna5SamanyaReasonsPage
)

namuna5SamanyaRouter.post(
    '/reasons',
    namuna5SamanyaController.saveNamuna5SamanyaReason
)

module.exports = namuna5SamanyaRouter;
