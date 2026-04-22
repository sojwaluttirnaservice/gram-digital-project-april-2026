const aanganwadiController = require("../../application/controllers/gp/aanganwadiController")
const getRouter = require("../../application/utils/getRouter")

const aanganwadiRouter = getRouter()


aanganwadiRouter.get('/', aanganwadiController.renderCentersListPage)

aanganwadiRouter.get('/add', aanganwadiController.renderAddCenterPage)

aanganwadiRouter.get('/edit/:centerId', aanganwadiController.renderEditCenterPage)

aanganwadiRouter.post('/', aanganwadiController.addCenter)

aanganwadiRouter.put('/', aanganwadiController.updateCenter)

aanganwadiRouter.delete('/', aanganwadiController.deleteCenter)

// YEAR RANGE --------------
aanganwadiRouter.post('/year-range', aanganwadiController.addYearlyStat)

aanganwadiRouter.put('/year-range', aanganwadiController.updateYearlyStat)

aanganwadiRouter.delete('/year-range', aanganwadiController.deleteYearlyStat)

// AGEWISE COUNT HERE ----------------------------
aanganwadiRouter.post('/agewise-count', aanganwadiController.addChildEntry)

aanganwadiRouter.put('/agewise-count', aanganwadiController.updateChildEntry)

aanganwadiRouter.delete('/agewise-count', aanganwadiController.deleteChildEntry)


// WORKERS ---------------------

aanganwadiRouter.get('/workers/:centerId', aanganwadiController.renderWorkersListPage)

aanganwadiRouter.get('/workers/:centerId/add', aanganwadiController.renderAddWorkerPage)

aanganwadiRouter.get('/workers/:centerId/edit/:workerId', aanganwadiController.renderEditWorkerPage)


aanganwadiRouter.post('/workers', aanganwadiController.addWorker)

aanganwadiRouter.put('/workers', aanganwadiController.updateWorker)

aanganwadiRouter.delete('/workers', aanganwadiController.deleteWorker)

module.exports = aanganwadiRouter