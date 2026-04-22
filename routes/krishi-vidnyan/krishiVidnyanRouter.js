const express = require('express')
const { checkForPoolConnection } = require('../middleware')
const krishiVidnyanController = require('../../application/controllers/krishiVidnyanController/krishiVidnyanController')

const router = express.Router()

//Views
router.get(
	'/',
	checkForPoolConnection,
	krishiVidnyanController.krishiVidnyanView
)

module.exports = router
