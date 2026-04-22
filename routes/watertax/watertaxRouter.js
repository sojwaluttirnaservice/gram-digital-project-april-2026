const express = require('express')
const middleware = require('../middleware')
const watertaxController = require('../../application/controllers/watertax/watertaxController')
const watertaxRouter = express.Router()

watertaxRouter.get(
	'/',
	middleware.checkForPoolConnection,
	watertaxController.renderWatertaxPage
)

watertaxRouter.post(
	'/save-watertax',
	middleware.checkForPoolConnection,
	watertaxController.saveWatertax
)

watertaxRouter.put(
    '/update-watertax',
    middleware.checkForPoolConnection,
    watertaxController.updateWatertax
)

watertaxRouter.get(
	'/watertax-print/:year1/:year2',
	middleware.checkForPoolConnection,
	watertaxController.printWatertax
)

module.exports = watertaxRouter
