const educationDetailsModel = require('../../model/education/educationDetailsModel')
const aanganwadiModel = require('../../model/gp/aanganwadiModel')
const ashaWorkersModel = require('../../model/gp/ashaWorkersModel')
const awardsModel = require('../../model/gp/awardsModel')
const committeesModel = require('../../model/gp/committeesModel')
const innovativeInitiativesModel = require('../../model/gp/innovativeInitiativesModel')
const waterConservationModel = require('../../model/gp/waterConservationModel')
const womenEmpowermentModel = require('../../model/gp/womenEmpowermentModel')
const womensSavingsGroupNamesModel = require('../../model/gp/womensSavingsGroupNamesModel')
const womensSavingsGroupsInitiativeModel = require('../../model/gp/womensSavingsGroupsInitiativeModel')
const zpSchoolPointsModel = require('../../model/gp/zpSchoolPointsModel')
const HomeModel = require('../../model/HomeModel')
const MasterModel = require('../../model/MasterModel')
const meetingsModel = require('../../model/zoom-meetings/meetingsModel')
const asyncHandler = require('../../utils/asyncHandler')
const { renderPage } = require('../../utils/sendResponse')
const CandidateController = require('../HomeController')
// let gpMemberList = JSON.parse(gp.gp_member)
// 				gpMemberList.forEach((el, i) => {
// 					if (el.post == 13) {
// 						currentMargadarshakData = el
// 					}
// 				})

// 				requiredDataObject = {
// 					...requiredDataObject,
// 					currentMargadarshakData: currentMargadarshakData
// 						? currentMargadarshakData
// 						: '',
// 					link: `/gp/asstes/images/gallery/`,
// 				}
const villageController = {


	renderVillagePage: asyncHandler(async (req, res) => {
		renderPage(res, 'user/village/village-page.pug')
	}),


	renderPopulationInfoPage: asyncHandler(async (req, res) => {
		let subVillages = await HomeModel.getGpCount(res.pool)
		let awards = await awardsModel.getAll(res.pool)
		let initiatives = await womensSavingsGroupsInitiativeModel.getAll(res.pool)
		let groups = await womensSavingsGroupNamesModel.getAll(res.pool)


		let womenEmpowermentPoints = await womenEmpowermentModel.getAll(res.pool)
		let zpSchoolPoints = await zpSchoolPointsModel.getAll(res.pool)

		let structures = await waterConservationModel.getAll(res.pool)
		let workers = await ashaWorkersModel.getAll(res.pool)

		let committees = await committeesModel.getAllCommitteesWithMembers(res.pool)

		let [gp] = await HomeModel.getGpData(res.pool)

		let gpMembers = gp && gp.gp_member ? JSON.parse(gp.gp_member) : []

		let mainGpMembers = []
		let gpWorkers = []

		let innovativeInitiatives = await innovativeInitiativesModel.getAll(res.pool)

		let institutesWithStaff = await educationDetailsModel.getInstitutesWithStaffList(res.pool)


		let employementAssistants = gpMembers.filter((member) => {
			return member.p_name == 'रोजगार सेवक'
		})

		gpMembers.forEach(member => {
			const { s_name } = member;
			const mainRoles = ['मुख्य सदस्य', 'उपसदस्य', 'उप सदस्य', 'पदाधिकारी'];

			if (mainRoles.includes(s_name)) {
				mainGpMembers.push(member);
			} else if (s_name === 'कर्मचारी वर्ग') {
				gpWorkers.push(member);
			}
		})


		let aanganwadiCenters = await aanganwadiModel.getAanganwadiCentersWithWorkersAndYearlyStats(res.pool)

		let totalChildCount = 0;
		aanganwadiCenters.forEach((center, index) => {
			// console.log('===== 1. ================')

			if (center) {
				// console.log("***********CENTER NAME *****************")
				console.log(center)

				if (center.yearly_stats) {
					// console.log("============AGEWISE COUNT =====================")
					center.yearly_stats.forEach((stat) => {

						totalChildCount += stat?.agewise_children?.length || 0
					})
				}
			}
			// console.log('===== ends 1. ================')

		})


		// console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
		// console.log(totalChildCount)
		// console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')


		renderPage(res, 'user/village/population-info-page.pug', {
			subVillages,
			awards,
			initiatives,
			groups,

			womenEmpowermentPoints,
			zpSchoolPoints,

			structures,
			workers,
			committees,

			gpMembers,
			mainGpMembers,
			gpWorkers,

			innovativeInitiatives,
			employementAssistants,

			institutesWithStaff,
			aanganwadiCenters
		})
	}),


	renderGpInfoPrintPage: asyncHandler(async (req, res) => {
		let subVillages = await HomeModel.getGpCount(res.pool)
		let awards = await awardsModel.getAll(res.pool)
		let initiatives = await womensSavingsGroupsInitiativeModel.getAll(res.pool)
		let groups = await womensSavingsGroupNamesModel.getAll(res.pool)


		let womenEmpowermentPoints = await womenEmpowermentModel.getAll(res.pool)
		let zpSchoolPoints = await zpSchoolPointsModel.getAll(res.pool)

		let structures = await waterConservationModel.getAll(res.pool)
		let workers = await ashaWorkersModel.getAll(res.pool)

		let committees = await committeesModel.getAllCommitteesWithMembers(res.pool)

		let [gp] = await HomeModel.getGpData(res.pool)

		let gpMembers = gp && gp.gp_member ? JSON.parse(gp.gp_member) : []

		let mainGpMembers = []
		let gpWorkers = []

		let innovativeInitiatives = await innovativeInitiativesModel.getAll(res.pool)

		let institutesWithStaff = await educationDetailsModel.getInstitutesWithStaffList(res.pool)


		let employementAssistants = gpMembers.filter((member) => {
			return member.p_name == 'रोजगार सेवक'
		})

		gpMembers.forEach(member => {
			const { s_name } = member;
			const mainRoles = ['मुख्य सदस्य', 'उपसदस्य', 'उप सदस्य', 'पदाधिकारी'];

			if (mainRoles.includes(s_name)) {
				mainGpMembers.push(member);
			} else if (s_name === 'कर्मचारी वर्ग') {
				gpWorkers.push(member);
			}
		})


		let aanganwadiCenters = await aanganwadiModel.getAanganwadiCentersWithWorkersAndYearlyStats(res.pool)

		let totalChildCount = 0;
		aanganwadiCenters.forEach((center, index) => {
			if (center) {
				if (center.yearly_stats) {
					center.yearly_stats.forEach((stat) => {
						totalChildCount += stat?.agewise_children?.length || 0
					})
				}
			}
		})


		renderPage(res, 'user/village/gp-info-print-page.pug', {
			title: 'ग्रामपंचायत टिपणी प्रिंट',
			subVillages,
			awards,
			initiatives,
			groups,

			womenEmpowermentPoints,
			zpSchoolPoints,

			structures,
			workers,
			committees,

			gpMembers,
			mainGpMembers,
			gpWorkers,

			innovativeInitiatives,
			employementAssistants,

			institutesWithStaff,
			aanganwadiCenters
		})
	}),

    getVillageInfo: asyncHandler(async (req, res) => {
       let requiredDataObject = await CandidateController.getCommonData(req, res);
       renderPage(res, `user/gaav-and-others/village-info.pug`, requiredDataObject) 
    }),


    getNagrikNondaniView: asyncHandler(async (req, res) => {
        let requiredDataObject = await CandidateController.getCommonData(req, res)
        let currentMargadarshakData
        let gpMemberList = JSON.parse(requiredDataObject.gp.gp_member)
        gpMemberList.forEach((el, i) => {
            if (el.post == 13) {
                currentMargadarshakData = el
            }
        })

        requiredDataObject = {
            ...requiredDataObject,
            currentMargadarshakData: currentMargadarshakData
                ? currentMargadarshakData
                : '',
            link: `/gp/asstes/images/gallery/`,
        }

        const _total_registrations = await HomeModel.getNagrikCount(res.pool)
        renderPage(res, `user/gaav-and-others/nagrik-nondani.pug`, {
            ...requiredDataObject,
            total_registrations: _total_registrations[0].member_count,
        })
    }),

	getVillageUdyogView: async (req, res) => {
		try {
			let requiredDataObject = await CandidateController.getCommonData(req, res)
			res.render(`user/gaav-and-others/village-udyog.pug`, requiredDataObject)
		} catch (err) {
			console.log(err)
		}
	},
	getVillageNewsView: async (req, res) => {
		try {
			let requiredDataObject = await CandidateController.getCommonData(req, res)
			res.render(`user/gaav-and-others/village-news.pug`, requiredDataObject)
		} catch (err) {
			console.log(err)
		}
	},

	getOnlineGuidanceView: async (req, res) => {
		try {
			let requieredData = await CandidateController.getCommonData(req, res)
			let meetings = await meetingsModel.getAllZoomMeetings(res.pool, true)

			res.render('user/gaav-and-others/online-guidance.pug', {
				...requieredData,
				meetings,
			})
		} catch (err) {
			console.log('Error while showing the view : ', err)
			return res.status(500).json({
				call: 0,
				error: err,
				message: 'Error while fetching all zoom meetings',
			})
		}
	},
	getVaidyakiyMadatKakshaView: async (req, res) => {
		try {
			let requiredDataObject = await CandidateController.getCommonData(req, res)
			res.render(
				`user/gaav-and-others/vaidyakiy-madat-kaksha.pug`,
				requiredDataObject
			)
		} catch (err) {
			console.log(err)
		}
	},

	getGovernmentSchemeView: async (req, res) => {
		try {
			let requiredDataObject = await CandidateController.getCommonData(req, res)
			res.render(
				`user/gaav-and-others/goverment-schemes.pug`,
				requiredDataObject
			)
		} catch (err) {
			console.log('Error whle showing the goverment schems view')
		}
	},

	get_gov_yojna_upload_view: asyncHandler(async (req, res) => {
		const filesList = await MasterModel.get_gov_yojna_file_name_list(res.pool);
		renderPage(res, 'master/gov-yojna-upload-view.pug', {
			filesList,
			isMasterPanel: false
		})
	}),

	getZoomMeetingsView: async (req, res) => {
		try {
			const meetings = await meetingsModel.getAllZoomMeetings(res.pool)
			renderPage(res, 'master/zoom-meetings/zoom-meetings-view.pug', {
				meetings,
				isMasterPanel: false
			})
		} catch (err) {
			console.error('Error:', err);
			return res.status(500).json({
				call: 0,
				error: err,
				message: 'Error while fetching all zoom meetings',
			})
		}
	},



	get_add_job_related_view: asyncHandler(async (req, res) => {
		const jobDetails = await MasterModel.get_job_related_details(res.pool)
		renderPage(res, 'master/job-related-upload-view.pug', {
			jobDetails,
			isMasterPanel: false
		})
	}),


	getAddGramAvhavalDocuementsView: async (req, res) => {
		try {
			const gram_ahaval_documents = await MasterModel.getGramAvhavalDocuements(
				res.pool
			)
			renderPage(
				res,
				'master/gram-ahaval-documents/gram-ahaval-document-upload-view.pug',
				{
					gram_ahaval_documents,
					isMasterPanel: false
				}
			)
		} catch (err) {
			console.log(`Error : ${err}`)
			return res.status(500).json({
				call: 0,
				error: err,
			})
		}
	},


	gramManager: async (req, res) => {

		try {
			const video_gallery = await MasterModel.getVideoGalleryData(res.pool)

			renderPage(res, 'master/gram_panchayet.pug', {
				video_gallery,
				isMasterPanel: false
			})

		} catch (err) {
			console.error('Error:', err);
			res.send({ call: 0, data: err })
		}
	},

}

module.exports = villageController
