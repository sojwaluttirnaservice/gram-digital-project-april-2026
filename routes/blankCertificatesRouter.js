const express = require('express')
const router = express.Router()

// middleware import
const middleware = require('./middleware')

// controller import
const blankCertificateController = require('../application/controllers/Blank_Certificates/blankCertificatesController')

// get home page
router.get(
	'/',
	middleware.checkForPoolConnection,
	blankCertificateController.getBlankCertificateView
)

// get form 8 प्रतिज्ञा पत्र
router.get(
	'/formEightPratidnayaPatra',
	middleware.checkForPoolConnection,
	blankCertificateController.formEightPratidnayaPatra
)

// GET मागणी बिल EMPTY PRINT
router.get(
	'/magniBill',
	middleware.checkForPoolConnection,
	blankCertificateController.magniBill
)

// GET मागणी लेख EMPTY PRINT
router.get(
	'/magniLekh',
	middleware.checkForPoolConnection,
	blankCertificateController.magniLekh
)

// GET नमुना ९ सामान्य EMPTY PRINT
router.get(
	'/formNineSamanya',
	middleware.checkForPoolConnection,
	blankCertificateController.formNineSamanya
)

// GET नमुना ९ पाणी EMPTY PRINT
router.get(
	'/formNinePani',
	middleware.checkForPoolConnection,
	blankCertificateController.formNinePani
)

// GET नळ CONNECTION NOTICE
router.get(
	'/nal-connection-notice',
	middleware.checkForPoolConnection,
	blankCertificateController.nalConnectionNotice
)

// GET FORM 8 BLANK PRINT
router.get(
	'/form-8-blank-print',
	middleware.checkForPoolConnection,
	blankCertificateController.formEightBlankPrint
)

router.get(
	'/darpatrak-pramanpatra',
	middleware.checkForPoolConnection,
	blankCertificateController.darpatrakPramanpatra
)

// Blank Header
router.get(
	'/blankHeaderPrint',
	middleware.checkForPoolConnection,
	blankCertificateController.blankHeaderPrint
)

// Tharavpramanptra
router.get(
	'/tharav-pramanpatra',
	middleware.checkForPoolConnection,
	blankCertificateController.tharavPramanpatra
)

//New Certicactse
router.get(
	'/namuna-9-samanya-header',
	middleware.checkForPoolConnection,
	blankCertificateController.renderNamuna9SamanyaHeader
)

router.get(
	'/namuna-9-panipatti-tharav',
	middleware.checkForPoolConnection,
	blankCertificateController.renderNamuna9PanipattiTharav
)

router.get(
	'/namuna-9-pani-header',
	middleware.checkForPoolConnection,
	blankCertificateController.renderNamuna9PaniHeader
)

router.get(
	'/namuna-9-samanya-kar-pramanpatra-tharav',
	middleware.checkForPoolConnection,
	blankCertificateController.renderNamuna9SamanyaKarPramanpatraTharav
)

router.get(
	'/namuna-8-header',
	middleware.checkForPoolConnection,
	blankCertificateController.renderNamuna8Header
)




router.get(
	'/n-9-pending-taxes',
	middleware.checkForPoolConnection,
	blankCertificateController.renderBlankNamuna9PendingTaxesPage
)

module.exports = router
