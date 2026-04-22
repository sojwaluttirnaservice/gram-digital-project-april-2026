const villageController = require('../../application/controllers/gaav/villageController')
const meetingsController = require('../../application/controllers/zoom-meetings/meetingsController')
const getRouter = require('../../application/utils/getRouter')

const villageRouter = getRouter()

villageRouter.get(
	'/',
	villageController.renderVillagePage
)

villageRouter.get(
	'/population',
	villageController.renderPopulationInfoPage
)

villageRouter.get(
	'/gp-info-print',
	villageController.renderGpInfoPrintPage
)

villageRouter.get(
	'/info',
	villageController.getVillageInfo
)

villageRouter.get(
	'/nagrik-nondani-view',
	villageController.getNagrikNondaniView
)

villageRouter.get(
	'/village-udyog-view',
	villageController.getVillageUdyogView
)

villageRouter.get(
	'/village-news',
	villageController.getVillageNewsView
)

villageRouter.get(
	'/online-guidance',
	villageController.getOnlineGuidanceView
)

villageRouter.get(
	'/vaidyakiy-madat-kaksha-view',
	villageController.getVaidyakiyMadatKakshaView
)

villageRouter.get(
	'/government-schemes-view',
	villageController.getGovernmentSchemeView
)


villageRouter.get(
	'/upload-gov-yojna',
	villageController.get_gov_yojna_upload_view
)

villageRouter.get(
	'/zoom-meetings-view',
	villageController.getZoomMeetingsView
)

villageRouter.get(
	'/get-add-job-related-view',
	villageController.get_add_job_related_view
)

villageRouter.get(
	'/get-add-gram-ahaval-documents-view',
	villageController.getAddGramAvhavalDocuementsView
)


villageRouter.get(
	'/gram-manager',
	villageController.gramManager
)

module.exports = villageRouter
