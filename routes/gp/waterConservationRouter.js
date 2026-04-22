const waterConservationController = require("../../application/controllers/gp/waterConservationController");
const getRouter = require("../../application/utils/getRouter");

const waterConservationRouter = getRouter()

waterConservationRouter.get('/', waterConservationController.renderListPage)

waterConservationRouter.get('/add', waterConservationController.renderAddPage)

waterConservationRouter.get('/edit/:waterConservationId', waterConservationController.renderEditPage)

waterConservationRouter.post('/', waterConservationController.save)

waterConservationRouter.put('/', waterConservationController.update)

waterConservationRouter.delete('/', waterConservationController.delete)

module.exports = waterConservationRouter