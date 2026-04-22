const express = require('express')
const { checkForPoolConnection } = require('../middleware')

const updateForm8TableController = require('../../application/controllers/updateForm8Table/updateForm8TableController')

const updateForm8TableRouter = express.Router()

updateForm8TableRouter.post(
	'/update-form-8-data',
	checkForPoolConnection,
	updateForm8TableController.updateForm8Table
)

updateForm8TableRouter.get(
	'/update-form-8-data-view',
	checkForPoolConnection,
	updateForm8TableController.getUpdateForm8DataView
)

module.exports = updateForm8TableRouter