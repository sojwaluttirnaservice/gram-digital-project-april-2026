const ashaWorkersController = require("../../application/controllers/gp/ashaWorkersController");
const getRouter = require("../../application/utils/getRouter");

const ashaWorkersRouter = getRouter()

ashaWorkersRouter.get('/', ashaWorkersController.renderListPage)

ashaWorkersRouter.get('/add', ashaWorkersController.renderAddPage)

ashaWorkersRouter.get('/edit/:ashaWorkerId', ashaWorkersController.renderEditPage)

ashaWorkersRouter.post('/', ashaWorkersController.save)

ashaWorkersRouter.put('/', ashaWorkersController.update)

ashaWorkersRouter.delete('/', ashaWorkersController.delete)

module.exports = ashaWorkersRouter