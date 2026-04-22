const express = require('express')
const { checkForPoolConnection } = require('../middleware')
const arogyaController = require('../../application/controllers/arogya/arogyaController')

const router = express.Router()

//Views
// outside
router.get(
	'/arogya-seva-kendra-list-view',
	checkForPoolConnection,
	arogyaController.arogyaSevaKendraListView
)

router.get(
	'/arogya-seva-kendra-details-view',
	checkForPoolConnection,
	arogyaController.arogyaSevaKendraDetailsView
)
router.get(
	'/arogya-seva-kendra-gallery-view',
	checkForPoolConnection,
	arogyaController.arogyaSevaKendraGalleryView
)

// INSIDE GRAM LOGIN VIEWS

router.get(
	'/gp-arogya-seva-kendra-list-view',
	checkForPoolConnection,
	arogyaController.getGPArogyaSevaKendraList
)


router.get(
	'/gp-arogya-seva-kendra-gallery-view',
	checkForPoolConnection,
	arogyaController.getGPArogyaSevaKendraGalleryView
)


router.get(
	'/gp-arogya-seva-information',
	checkForPoolConnection,
	arogyaController.gp_arogya_seva_mahiti_view
)
module.exports = router
