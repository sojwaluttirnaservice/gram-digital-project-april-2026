const HomeModel = require('../../model/HomeModel')
const MasterModel = require('../../model/MasterModel')
const arogyaModel = require('../../model/arogya/arogyaModel')
const { renderPage } = require('../../utils/sendResponse')
const CandidateController = require('../HomeController')

const arogyaController = {
	arogyaSevaKendraListView: async (req, res) => {
		let allRequiredData = await CandidateController.getCommonData(req, res)
		arogyaModel
			.getArogyaSevaKendraList(res.pool)
			.then((arogyaSevaKendraList) => {
				return res.render('user/arogya/arogya-seva-kendra-list-view.pug', {
					...allRequiredData,
					arogyaSevaKendraList,
				})
			})
			.catch((err) => {
				console.log('Error in displaynig page : ', err)
				return res.status(500).json({
					call: 0,
					message: 'Internal Server Error',
					error: `Error: ${err}`,
				})
			})
	},

	arogyaSevaKendraDetailsView: async (req, res) => {
		let { id, arogyaSevaKendra } = req.query
		let arogyaSevaKendraDetails = {}
		let allRequiredData = await CandidateController.getCommonData(req, res)
		arogyaModel
			.getArogyaSevaKendraDetails(res.pool, id)
			.then((_arogyaSevaKendraDetails) => {
				arogyaSevaKendraDetails = _arogyaSevaKendraDetails[0]
				return arogyaModel.getArogaySevakListForKendra(res.pool, id)
			})
			.then((arogyaSevakList) => {
				return res.render('user/arogya/arogya-seva-kendra-details-view.pug', {
					...allRequiredData,
					arogyaSevaKendraDetails,
					arogyaSevakList,
				})
			})
			.catch((err) => {
				console.log('Error in displaynig page : ', err)
				res.status(500).json({
					call: 0,
					message: 'Internal Server Error',
					error: `Error: ${err}`,
				})
			})
	},

	arogyaSevaKendraGalleryView: async (req, res) => {
		const { id, arogyaSevaKendraName } = req.query
		let gp = {}
		let arogyaSevaKendraDetails = []

		let allRequiredData = await CandidateController.getCommonData(req, res)
		arogyaModel.getArogyaSevaKendraDetails(res.pool, id)
			.then((_arogyaSevaKendraDetails) => {
				// console.log('arogyaSevakendraDetails = ', _arogyaSevaKendraDetails)
				arogyaSevaKendraDetails = _arogyaSevaKendraDetails[0]
				return arogyaModel.getArogyaSevaKendraGalleryPhotos(res.pool, id)
			})
			.then((galleryPhotos) => {
				// console.log('gallery', galleryPhotos)
				return res.render('user/arogya/arogya-seva-kendra-gallery-view.pug', {
					...allRequiredData,
					arogyaSevaKendraDetails,
					galleryPhotos,
				})
			})
			.catch((err) => {
				console.log('Error in displaynig page : ', err)
				res.status(500).json({
					call: 0,
					message: 'Internal Server Error',
					error: `Error: ${err}`,
				})
			})
	},


	getGPArogyaSevaKendraList: async (req, res) => {

		try {
			const arogyaSevaKendraList = await MasterModel.getArogyaSevaKendraList(res.pool)

			return renderPage(
				res,
				'master/arogya-seva-kendra/arogya-seva-kendra-list-view',
				{
					arogyaSevaKendraList,
					isMasterPanel: false
				}
			)
		} catch (err) {
			console.error('Error:', err);
			return res.status(500).json({
				call: 0,
				error: `Error : ${err}`,
			})
		}
	},





	getGPArogyaSevaKendraGalleryView: async (req, res) => {

		try {
			const { id, arogyaSevaKendraName } = req.query

			const _arogyaSevaKendraDetails = await MasterModel.getArogyaSevaKendraDetails(res.pool, id)


			const galleryPhotos = await MasterModel.getArogyaSevaKendraGalleryPhotos(res.pool, id)


			return renderPage(
				res,
				'master/arogya-seva-kendra/arogya-seva-kendra-gallery-view.pug',
				{
					arogyaSevaKendraDetails: _arogyaSevaKendraDetails[0],
					galleryPhotos,
					isMasterPanel: false
				}
			)
		} catch (err) {
			console.error('Error:', err);
			return res.status(500).json({
				call: 0,
				error: `Error : ${err}`,
				message: 'Internal server error',
			})
		}
	},



	// arogya seva information
	gp_arogya_seva_mahiti_view: async (req, res) => {
		try {
			let arogya_seva_kendra_id = req.query.id
			const arogya_camp_photos = await MasterModel.get_arogya_camp_files(res.pool, arogya_seva_kendra_id)
			const arogya_sevak_information = await MasterModel.get_arogya_sevak_information(res.pool)

			return renderPage(res, 'master/arogya-seva-information-view', {
				arogya_sevak_information,
				arogya_camp_photos,
				arogya_seva_kendra_id,
				isMasterPanel: false
			})
		} catch (err) {
			console.error('Error:', err);

			return res.status(500).json({
				call: 0,
				data: err,
			})
		}
	},


}

module.exports = arogyaController
