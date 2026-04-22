const awardsController = require("../../application/controllers/gp/awardsController");
const getRouter = require("../../application/utils/getRouter");

const awardsRouter = getRouter()


awardsRouter.get('/', awardsController.renderAwardListPage)

awardsRouter.get('/add', awardsController.renderAddAwardPage)

awardsRouter.get('/edit/:awardId', awardsController.renderEditAwardPage)

awardsRouter.post('/', awardsController.save)

awardsRouter.put('/', awardsController.update)

awardsRouter.delete('/', awardsController.delete)

module.exports = awardsRouter