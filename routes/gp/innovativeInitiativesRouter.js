const innovativeInitiativesController = require("../../application/controllers/gp/innovativeInitiativesController");
const getRouter = require("../../application/utils/getRouter");

const innovativeInitiativesRouter = getRouter()

innovativeInitiativesRouter.get('/', innovativeInitiativesController.renderListPage)

innovativeInitiativesRouter.get('/add', innovativeInitiativesController.renderAddPage)

innovativeInitiativesRouter.get('/edit/:innovativeInitiativeId', innovativeInitiativesController.renderEditPage)

innovativeInitiativesRouter.post('/', innovativeInitiativesController.save)

innovativeInitiativesRouter.put('/', innovativeInitiativesController.update)

innovativeInitiativesRouter.delete('/', innovativeInitiativesController.delete)

module.exports = innovativeInitiativesRouter