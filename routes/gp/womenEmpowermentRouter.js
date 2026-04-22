const womenEmpowermentController = require("../../application/controllers/gp/womenEmpowermentController");
const getRouter = require("../../application/utils/getRouter");

const womenEmpowermentRouter = getRouter()



womenEmpowermentRouter.get('/', womenEmpowermentController.renderListPage)

womenEmpowermentRouter.get('/add', womenEmpowermentController.renderAddPage)

womenEmpowermentRouter.get('/edit/:pointId', womenEmpowermentController.renderEditPage)

womenEmpowermentRouter.post('/', womenEmpowermentController.save)

womenEmpowermentRouter.put('/', womenEmpowermentController.update)

womenEmpowermentRouter.delete('/', womenEmpowermentController.delete)


module.exports = womenEmpowermentRouter