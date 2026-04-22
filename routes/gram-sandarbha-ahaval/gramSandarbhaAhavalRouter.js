const express = require('express')
const { checkForPoolConnection } = require('../middleware')
const gramSandarbhaAhavalController = require('../../application/controllers/gram-sandarbha-ahaval/gramSandarbhaAhavalController')

const router = express.Router()

router.get(
	`/gram-sandarbha-ahaval-view`,
	checkForPoolConnection,
	gramSandarbhaAhavalController.getGramSandarbhaAhavalView
)

router.get(
	'/gram-sandarbha-ahaval-form-view',
	checkForPoolConnection,
	gramSandarbhaAhavalController.getGramSandarbhaAhavalFormView
)

router.post(
	`/save-gram-sandarbha-ahaval`,
	checkForPoolConnection,
	gramSandarbhaAhavalController.saveGramSandarbhaAhaval
)

router.put(
	`/update-gram-sandarbha-ahaval`,
	checkForPoolConnection,
	gramSandarbhaAhavalController.updateGramSandarbhaAhaval
)

router.delete(
	`/delete-gram-sandarbha-ahaval`,
	checkForPoolConnection,
	gramSandarbhaAhavalController.deleteGramSandarbhaAhaval
)

module.exports = router
