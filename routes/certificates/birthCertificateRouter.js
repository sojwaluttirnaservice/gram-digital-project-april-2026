const express = require('express')
const birthCertificateRouter = express.Router()
const { checkForPoolConnection } = require('../middleware')
const birthCertificateController = require('../../application/controllers/certificates/birthCertificateController')



birthCertificateRouter.get(
	'/',
	checkForPoolConnection,
	birthCertificateController.renderBirthCertificatesPage
)

birthCertificateRouter.get(
	'/birth-certificate-form',
	checkForPoolConnection,
	birthCertificateController.renderBirthCertificateForm
)

birthCertificateRouter.get(
	'/edit-birth-certificate-form/:id',
	checkForPoolConnection,
	birthCertificateController.renderEditBirthCertificateForm
)

birthCertificateRouter.get(
	'/birth-certificate-print',
	checkForPoolConnection,
	birthCertificateController.renderBirthCertificatePrint
)

// Route to save a birth certificate
birthCertificateRouter.post(
	'/save-birth-certificate',
	checkForPoolConnection,
	birthCertificateController.saveBirthCertificate
)

// Route to update a birth certificate
birthCertificateRouter.put(
	'/update-birth-certificate',
	checkForPoolConnection,
	birthCertificateController.updateBirthCertificate
)

// Route to delete a birth certificate
birthCertificateRouter.delete(
	'/delete-birth-certificate',
	checkForPoolConnection,
	birthCertificateController.deleteBirthCertificate
)

// Route to fetch all birth certificates
birthCertificateRouter.get(
	'/fetch-all-birth-certificates',
	checkForPoolConnection,
	birthCertificateController.fetchAllBirthCertificates
)

// Route to fetch birth certificates by month and year
birthCertificateRouter.get(
	'/fetch-by-month-year/:month/:year',
	checkForPoolConnection,
	birthCertificateController.fetchBirthCertificatesByMonthYear
)

// Route to fetch a single birth certificate by ID
birthCertificateRouter.get(
	'/fetch-by-id/:id',
	checkForPoolConnection,
	birthCertificateController.fetchBirthCertificateById
)

// Route to fetch birth certificates by name
birthCertificateRouter.get(
	'/fetch-by-name/:name',
	checkForPoolConnection,
	birthCertificateController.fetchBirthCertificatesByName
)

birthCertificateRouter.get(
	`/print-birth-certificate/:id`,
	checkForPoolConnection,
	birthCertificateController.printBirthCertificate
)

birthCertificateRouter.get(
	"/print-birth-certificate-report",
	checkForPoolConnection,
	birthCertificateController.printBirthCertificateRecords
)


module.exports = birthCertificateRouter
