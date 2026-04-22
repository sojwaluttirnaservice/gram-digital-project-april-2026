var MeterController = require('../application/controllers/MeterController')
const getRouter = require('../application/utils/getRouter')
var meterRouter = getRouter()

meterRouter.get('/', MeterController.meterView)

meterRouter.get(
	'/meter-list',
	MeterController.meterListView
)
meterRouter.get(
	'/user-meter-list',
	MeterController.userMeterList
)

meterRouter.get(
	'/add-new-meter/:id',
	MeterController.addNewMeterView
)

meterRouter.get(
	'/edit-new-meter/:id',
	MeterController.renderEditMeterView
)

meterRouter.get(
	'/remove-meter/:id',
	MeterController.removeMeterBill
)

meterRouter.put(
	'/update-new-meter',
	MeterController.updateNewMeter
)

meterRouter.get(
	'/add-new-user',
	MeterController.addNewUserView
)
meterRouter.get(
	'/add-new-user/:id',
	MeterController.getUpdateNewUserView
)

//New routes for search
meterRouter.get(
	'/user-info-by-nal-connection/:nal_connection_no',
	MeterController.getUserInfoByNalConnectionNumber
)

meterRouter.get(
	'/user-info-by-meter-number/:meter_number',
	MeterController.getUserInfoByMeterNumber
)

meterRouter.get(
	'/user-info-by-id/:id',
	MeterController.getUserInfoById
)

meterRouter.get(
	'/user-info-by-name/:name',
	MeterController.getUserInfoByOwnerName
)

meterRouter.post(
	'/save-update-new-user',
	MeterController.saveNewUser
)

meterRouter.post(
	'/save-new-meter',
	MeterController.saveUpdateNewMeter
)

meterRouter.get(
	'/meter-tax-form/:id',
	MeterController.renderMeterTaxFormPage
)

meterRouter.post(
	'/save-meter-tax-details',
	MeterController.saveMeterTaxDetails
)

//DATES RELATED TO

meterRouter.get(
	'/fetch-distinct-month-year',
	MeterController.fetchDistinctMonthYear

)

meterRouter.get(
	'/valve-numbers',
	MeterController.getValveNumbers
)

// nal nondani or tap connection only

meterRouter.get(
	'/tap-connection-form',
	MeterController.renderTapConnectionFormPage
)

meterRouter.post(
	'/save-tap-connection',
	MeterController.saveTapConnection
)

meterRouter.get(
	'/tap-connection-list',
	MeterController.renderTapConnectionListPage
)

meterRouter.get(
	'/edit-tap-connection/:id',
	MeterController.renderEditTapConnectionFormPage
)

meterRouter.post(
	'/tap-connection-details',
	MeterController.tapConnectionDetails
)

meterRouter.put(
	'/update-tap-connection',
	MeterController.updateTapConnection
)

module.exports = meterRouter
