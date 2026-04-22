const getRouter = require('../../application/utils/getRouter')
const deathCertificateRouter = getRouter(); 
const deathCertificateController = require('../../application/controllers/certificates/deathCertificateController')



deathCertificateRouter.get(
	'/',
	deathCertificateController.renderDeathCertificatesPage
)

deathCertificateRouter.get(
	'/death-certificate-form',
	deathCertificateController.renderDeathCertificateForm
)

deathCertificateRouter.get(
	'/edit-death-certificate-form/:id',
	deathCertificateController.renderEditDeathCertificateForm
)

deathCertificateRouter.get(
	'/death-certificate-print',
	deathCertificateController.renderDeathCertificatePrint
)

// Route to save a death certificate
deathCertificateRouter.post(
	'/save-death-certificate',
	deathCertificateController.saveDeathCertificate
)

// Route to update a death certificate
deathCertificateRouter.put(
	'/update-death-certificate',
	deathCertificateController.updateDeathCertificate
)

// Route to delete a death certificate
deathCertificateRouter.delete(
	'/delete-death-certificate',
	deathCertificateController.deleteDeathCertificate
)

// Route to fetch all death certificates
deathCertificateRouter.get(
	'/fetch-all-death-certificates',
	deathCertificateController.fetchAllDeathCertificates
)

// Route to fetch death certificates by month and year
deathCertificateRouter.get(
	'/fetch-by-month-year/:month/:year',
	deathCertificateController.fetchDeathCertificatesByMonthYear
)

// Route to fetch a single death certificate by ID
deathCertificateRouter.get(
	'/fetch-by-id/:id',
	deathCertificateController.fetchDeathCertificateById
)

// Route to fetch death certificates by name
deathCertificateRouter.get(
	'/fetch-by-name/:name',
	deathCertificateController.fetchDeathCertificatesByName
)

deathCertificateRouter.get(
	`/print-death-certificate/:id`,
	deathCertificateController.printDeathCertificate
)


deathCertificateRouter.get(
	"/print-death-certificate-report",
	deathCertificateController.printDeathCertificateRecords
)


module.exports = deathCertificateRouter
