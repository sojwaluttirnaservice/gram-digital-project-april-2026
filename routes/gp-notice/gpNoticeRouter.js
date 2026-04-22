const express = require('express')
const gpNoticeController = require('../../application/controllers/gpNotice/gpNoticeController')
const { checkForPoolConnection } = require('../middleware')
const gpNoticeRouter = express.Router()

// Existing routes
gpNoticeRouter.get(
	'/',
	checkForPoolConnection,
	gpNoticeController.renderGpNoticePage
)
gpNoticeRouter.get(
	'/gp-atikraman-notice-form',
	checkForPoolConnection,
	gpNoticeController.renderGpAtikramanNoticeForm
)

gpNoticeRouter.get(
	'/edit-gp-atikraman-notice-form/:id',
	checkForPoolConnection,
	gpNoticeController.renderEditGpAtikramanNoticeForm
)

gpNoticeRouter.get(
	'/gp-atikraman-notice-list',
	checkForPoolConnection,
	gpNoticeController.renderGpAtikramanNoticeList
)

gpNoticeRouter.get(
	'/gp-atikraman-notice-print/:id',
	checkForPoolConnection,
	gpNoticeController.renderGpAtikramanNoticePrint
)

gpNoticeRouter.get(
	'/gp-panchnama-notice-print/:id',
	checkForPoolConnection,
	gpNoticeController.renderGpPanchnamaNoticePrint
)

// New routes for save, update, and delete operations
gpNoticeRouter.post(
	'/save-gp-atikraman-notice',
	checkForPoolConnection,
	gpNoticeController.saveGpAtikramanNotice
)

gpNoticeRouter.put(
	'/update-gp-atikraman-notice',
	checkForPoolConnection,
	gpNoticeController.updateGpAtikramanNotice
)

gpNoticeRouter.delete(
	'/delete-gp-atikraman-notice',
	checkForPoolConnection,
	gpNoticeController.deleteGpAtikramanNotice
)

module.exports = gpNoticeRouter
