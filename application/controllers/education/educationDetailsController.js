const HomeModel = require('../../model/HomeModel')
const MasterModel = require('../../model/MasterModel')
const educationDetailsModel = require('../../model/education/educationDetailsModel')
const asyncHandler = require('../../utils/asyncHandler')
const { renderPage } = require('../../utils/sendResponse')
const CandidateController = require('../HomeController')

const educationDetailsController = {
	getSchoolCollegeListView: async (req, res) => {
		// let gp = {}
		let { institute_type } = req.query
		// console.log("Instituet type = ", institute_type);
		if (!institute_type) {
			institute_type = -1;
		}
		let allRequiredData = await CandidateController.getCommonData(req, res)
		educationDetailsModel
			.getSchoolCollegeList(res.pool, institute_type)
			.then((list) => {
				console.log('List = ', list)
				return res.render('user/education/school-college-list-view.pug', {
					...allRequiredData,
					institutesList: list,
					institute_type
				})
			})
			.catch((err) => {
				return res.status(500).json({
					call: 0,
					error: `Error : ${err}`,
					message: 'Internal server error',
				})
			})
	},

	getSingleEducationInstituteDetailsView: async function (req, res) {
		const { id, instituteName } = req.query
		// let gp = {}
		let instituteDetails = []
		let allRequiredData = await CandidateController.getCommonData(req, res)
		educationDetailsModel
			.getInstituteDetails(res.pool, id)
			.then((_instituteDetails) => {
				console.log('instituteDetails = ', _instituteDetails)
				instituteDetails = _instituteDetails[0]
				return educationDetailsModel.getInstituteStaffDetails(res.pool, id)
			})
			.then((instituteStaff) => {
				console.log('institute staff = ', instituteStaff)
				return res.render('user/education/institute-details-view.pug', {
					...allRequiredData,
					instituteDetails,
					instituteStaff,
				})
			})
			.catch((err) => {
				return res.status(500).json({
					call: 0,
					error: `Error : ${err}`,
					message: 'Internal server error',
				})
			})
	},

	getEducationInstituteGalleryView: async function (req, res) {




		try {

			const { id, instituteName } = req.query


			let allRequiredData = await CandidateController.getCommonData(req, res)

			const _instituteDetails = await MasterModel.getInstituteDetails(res.pool, id)

			const galleryPhotos = await MasterModel.getEducationInstituteGalleryPhotos(res.pool, id)

			return res.render('user/education/school-college-gallery-view.pug', {
				...allRequiredData,
				instituteDetails: _instituteDetails[0],
				galleryPhotos
			})

		} catch (err) {
			console.error('Error:', err);

			return res.status(500).json({
				call: 0,
				error: `Error : ${err}`,
				message: 'Internal server error',
			})
		}

		// OLD CODE BELOW, DONT DELETE, MIGHT NEED IT

		// const { id, instituteName } = req.query
		// // let gp = {}
		// let instituteDetails = []
		// let allRequiredData = await CandidateController.getCommonData(req, res)

		// educationDetailsModel
		// 	.getInstituteDetails(res.pool, id)
		// 	.then((_instituteDetails) => {
		// 		console.log('instituteDetails = ', _instituteDetails)
		// 		instituteDetails = _instituteDetails[0]
		// 		return educationDetailsModel.getEducationInstituteGalleryPhotos(
		// 			res.pool,
		// 			id
		// 		)
		// 	})
		// 	.then((galleryPhotos) => {
		// 		// console.log('gallery', galleryPhotos)
		// 		return res.render('user/education/school-college-gallery-view.pug', {
		// 			...allRequiredData,
		// 			instituteDetails,
		// 			galleryPhotos,
		// 		})
		// 	})
		// 	.catch((err) => {
		// 		console.log('error = ', err)
		// 		return res.status(500).json({
		// 			call: 0,
		// 			error: `Error : ${err}`,
		// 			message: 'Internal server error',
		// 		})
		// 	})
	},


	get_add_education_details_view: async (req, res) => {
		const educationInstituteList = await MasterModel.get_education_institute_list(res.pool)
		renderPage(res, 'master/add-education-details-view.pug', {
			educationInstituteList,
			isMasterPanel: false
		})

	},





	getGPEducationInstituteGalleryView: async (req, res) => {

		try {

			const { id, instituteName } = req.query


			const _instituteDetails = await MasterModel.getInstituteDetails(res.pool, id)

			const galleryPhotos = await MasterModel.getEducationInstituteGalleryPhotos(res.pool, id)

			return renderPage(res, 'master/master-institute-gallery-view.pug', {
				instituteDetails: _instituteDetails[0],
				galleryPhotos,
				isMasterPanel: false
			})

		} catch (err) {
			console.error('Error:', err);

			return res.status(500).json({
				call: 0,
				error: `Error : ${err}`,
				message: 'Internal server error',
			})
		}
	},


	getGPSingleEducationInstituteDetailsView: async (req, res) => {
		try {
			const { id, instituteName } = req.query

			const _instituteDetails = await MasterModel.getInstituteDetails(res.pool, id)

			const instituteStaff = await MasterModel.getInstituteStaffDetails(res.pool, id)

			return renderPage(res, 'master/master-institute-details-view.pug', {
				instituteDetails: _instituteDetails[0],
				instituteStaff,
				isMasterPanel: false,
			})
		} catch (err) {
			console.error('Error:', err);
			return res.status(500).json({
				call: 0,
				error: `Error : ${err}`,
				message: 'Internal server error',
			})
		}
	},

}

module.exports = educationDetailsController
