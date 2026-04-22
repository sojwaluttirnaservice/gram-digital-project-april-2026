const getRouter = require('../application/utils/getRouter')
var printRouter = getRouter()
// controller import
const FromPrintController = require('../application/controllers/FromPrintController')

// router import
const blankCertificatesRouter = require('./blankCertificatesRouter')

printRouter.get(
    '/', 
    FromPrintController.homeView
)

printRouter.get(
	'/form-8',
	FromPrintController.printFromEight
)

printRouter.get(
	'/form-8-image',
	FromPrintController.printFromEightImage
)

printRouter.get(
	'/form-8-w/o-image',
	FromPrintController.printFormEightSinglePlain
)
printRouter.get(
	'/form-8All-kar-nihay-yadi-and-other/:year1/:year2',
	FromPrintController.printpPageForm8KarNihayYadiAndOther
)

printRouter.get(
	'/form-8All-kar-nihay-yadi/:year1/:year2',
	FromPrintController.printpPageForm8KarNihayYadi
)


printRouter.get(
	'/form-8All/:year1/:year2',
	FromPrintController.printForm8All
)
printRouter.get(
	'/form-8All',
	FromPrintController.printForm8AllMalmattaDharakList
)

printRouter.get(
	'/form-8-pratidnyapatra',
	FromPrintController.form8Pratidnyapatra
)

printRouter.get(
	'/form-9-all/:year1/:year2',
	FromPrintController.printFromNineAll
)
printRouter.get(
	"/form-9-all-samanya/:year1/:year2",
	FromPrintController.printFormNineAllSamanya
)

printRouter.get(
	"/form-9-all-samanya-total/:year1/:year2",
	FromPrintController.printFormNineAllSamanyaTotal
)


printRouter.get(
	'/form-8-all',
	FromPrintController.printFormEightAll
)

printRouter.get(
	'/form-8-all-image',
	FromPrintController.printFormEightAllImage
)

printRouter.get(
	'/form-8-QR',
	FromPrintController.printFormEightAllQR
)

//Print ferfar month wise
//Code yet to write

printRouter.get(
	'/card-print',
	FromPrintController.cardPrint
)

printRouter.get(
	'/form-9-samanya/:year1/:year2',
	FromPrintController.printFromNineSamanya
)


printRouter.get(
	'/form-9-samanya-other/:year1/:year2',
	FromPrintController.printFromNineSamanyaOther
)


printRouter.get(
	'/form-9-samanya-kar/:year1/:year2',
	FromPrintController.printFromNineSamanyaKar
)

printRouter.get(
	'/printSamanyKarMagniDemand/:year1/:year2',
	FromPrintController.printSamanyKarMagniDemand
)
printRouter.get(
	'/printPaniKarMagniDemand/:year1/:year2',
	FromPrintController.printPaniKarMagniDemand
)
printRouter.get(
	'/printSamanyaChaluKarMagniDemand/:year1/:year2',
	FromPrintController.printSamanyaChaluKarMagniDemand
)
printRouter.get(
	'/printPaniChaluKarMagniDemand/:year1/:year2',
	FromPrintController.printPaniChaluKarMagniDemand
)

printRouter.get(
	'/form-9-pageNusar-samanya/:year1/:year2',
	FromPrintController.printForm9PagenusarSamanya
)

printRouter.get(
	'/form-9-pageNusar-pani/:year1/:year2',
	FromPrintController.printForm9PagenusarPani
)

printRouter.get(
	'/form-9-pani/:year1/:year2',
	FromPrintController.printFromNinePani
)

printRouter.get(
	'/magni-bill',
	FromPrintController.printMagniBill
)

printRouter.get(
	'/bank-qr-code-magni-bill',
	FromPrintController.bankQRCodeMagniBill
)

printRouter.get(
	'/magni-lekh',
	FromPrintController.printMagniLekh
)
printRouter.get(
	'/nal-band-notice',
	FromPrintController.printNalBandNotice
)
printRouter.get(
	'/marriage',
	FromPrintController.printMarriage
)
printRouter.get(
	'/no-dues-certificate',
	FromPrintController.noDuesCertificate
)

printRouter.get(
	'/certificate-of-niradhar',
	FromPrintController.certificateOfNiradhar
)
printRouter.get(
	'/self-declaration',
	FromPrintController.printSelfDeclaration
)

printRouter.get(
	'/page-form-no-seven',
	FromPrintController.pageFormNoSeven
)

// this route is for specific form 8 user
printRouter.get(
	'/tax-payer/samanya',
	FromPrintController.taxPayerSamanyaPrint
)

// and this one will be for all form8 user present in the पावती 
// provide month or year params in the req.query
printRouter.get('/tax-payer/all-samanya',
	FromPrintController.taxPayerSamanyaPrintMonthOrYearWise
)

printRouter.get(
	'/tax-payer/pani',
	FromPrintController.taxPayerPaniPrint
)

printRouter.get(
	'/tax-payer/all-pani',
	FromPrintController.taxPayerPaniPrintMonthOrYearWise
)

printRouter.get('/tax-payer/all-pani',
	FromPrintController.taxPayerPaniPrintMonthOrYearWise
)

// same as above /all-samanya, but this one is for water
printRouter.get(
	'/gp-ahaval-kar-vasuli',
	FromPrintController.gpAhavalKarVasul
)

printRouter.get(
	'/page-meter-bill',
	FromPrintController.printPageMeterBill
)
printRouter.get(
	'/page-meter-pani-nondani-bill',
	FromPrintController.printMeterPaniNondaniBill
)
//printRouter.get()

// print blank certificates
printRouter.use('/blankCertificate', blankCertificatesRouter)

// PAYMENT CERTIFICATE PRINT
printRouter.get(
	'/certificate-payment-recipt',
	FromPrintController.printCertificatePaymentRecipt
)

module.exports = printRouter
