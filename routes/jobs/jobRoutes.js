const express = require('express')
const { checkForPoolConnection } = require('../middleware')
const jobController = require('../../application/controllers/job/jobController')

const router = express.Router()

router.get(
	'/job-related-view',
	checkForPoolConnection,
	jobController.getJobRelatedView
)

module.exports = router
