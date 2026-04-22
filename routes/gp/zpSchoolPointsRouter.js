const zpSchoolPointsController = require("../../application/controllers/gp/zpSchoolPointsController");
const getRouter = require("../../application/utils/getRouter");

const zpSchoolPointsRouter = getRouter()



zpSchoolPointsRouter.get('/', zpSchoolPointsController.renderListPage)

zpSchoolPointsRouter.get('/add', zpSchoolPointsController.renderAddPage)

zpSchoolPointsRouter.get('/edit/:zpSchoolPointId', zpSchoolPointsController.renderEditPage)

zpSchoolPointsRouter.post('/', zpSchoolPointsController.save)

zpSchoolPointsRouter.put('/', zpSchoolPointsController.update)

zpSchoolPointsRouter.delete('/', zpSchoolPointsController.delete)


module.exports = zpSchoolPointsRouter