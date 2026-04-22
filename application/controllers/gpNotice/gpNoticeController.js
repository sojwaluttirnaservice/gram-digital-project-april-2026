const HomeModel = require('../../model/HomeModel')
const gpNoticeModel = require('../../model/gpNotice/gpNoticeModel')

const gpNoticeController = {
	renderGpNoticePage: async (req, res) => {
		try {
			const data = req.body
			const _gp = await HomeModel.getGpData(res.pool)
			res.render('user/gp-notice/gp-notice-page.pug', {
				gp: _gp[0],
			})
		} catch (err) {
			console.log(`Error while showing the gp notice page : ${err}`)
			return res.status(500).json({
				success: false,
				status: 500,
				data: {
					error: err,
					message: 'Internal Server Error',
				},
			})
		}
	
	},

	renderGpAtikramanNoticeForm: async (req, res) => {
		try {
			const data = req.body
			const _gp = await HomeModel.getGpData(res.pool)
			res.render('user/gp-notice/gp-atikraman-notice-form.pug', {
				gp: _gp[0],
			})
		} catch (err) {
			console.log(`Error while showing the gp notice form page : ${err}`)
			return res.status(500).json({
				success: false,
				status: 500,
				data: {
					error: err,
					message: 'Internal Server Error',
				},
			})
		}
	},

	renderEditGpAtikramanNoticeForm: async (req, res) => {
		try {
			const { id } = req.params
			const _gp = await HomeModel.getGpData(res.pool)
			const _gpAtikramanNotice = await gpNoticeModel.fetchAtikramanNotice(
				res.pool,
				id
			)

			res.render('user/gp-notice/edit-gp-atikraman-notice-form.pug', {
				gp: _gp[0],
				gpAtikramanNotice: _gpAtikramanNotice[0],
			})
		} catch (err) {
			console.log(`Error while showing the edit gp notice form page : ${err}`)
			return res.status(500).json({
				success: false,
				status: 500,
				data: {
					error: err,
					message: 'Internal Server Error',
				},
			})
		}
	},

	renderGpAtikramanNoticeList: async (req, res) => {
		try {
			const _gp = await HomeModel.getGpData(res.pool)

			const _gpAtikramanNoticeList =
				await gpNoticeModel.fetchAllAtikramanNotices(res.pool)
			res.render('user/gp-notice/gp-atikraman-notice-list.pug', {
				gp: _gp[0],
				gpAtikramanNoticeList: _gpAtikramanNoticeList,
			})
		} catch (err) {
			console.log(`Error while showing the gp notice list page : ${err}`)
			return res.status(500).json({
				success: false,
				status: 500,
				data: {
					error: err,
					message: 'Internal Server Error',
				},
			})
		}
	},

	renderGpAtikramanNoticePrint: async (req, res) => {
		try {
			const { id } = req.params
			const _gp = await HomeModel.getGpData(res.pool)
			const _gpAtikramanNotice = await gpNoticeModel.fetchAtikramanNotice(
				res.pool,
				id
			)
			res.render('user/gp-notice/gp-atikraman-notice-print.pug', {
				gp: _gp[0],
				gpAtikramanNotice: _gpAtikramanNotice[0],
			})
		} catch (err) {
			console.log(
				`Error while showing the gp atikraman notice print page : ${err}`
			)
			return res.status(500).json({
				success: false,
				status: 500,
				data: {
					error: err,
					message: 'Internal Server Error',
				},
			})
		}
	},

	renderGpPanchnamaNoticePrint: async (req, res) => {
		try {
			const { id } = req.params
			const _gp = await HomeModel.getGpData(res.pool)
			const _gpAtikramanNotice = await gpNoticeModel.fetchAtikramanNotice(
				res.pool,
				id
			)
			res.render('user/gp-notice/gp-panchnama-notice-print.pug', {
				gp: _gp[0],
				gpAtikramanNotice: _gpAtikramanNotice[0],
			})
		} catch (err) {
			console.log(
				`Error while showing the gp panchnama notice print page : ${err}`
			)
			return res.status(500).json({
				success: false,
				status: 500,
				data: {
					error: err,
					message: 'Internal Server Error',
				},
			})
		}
	},

	saveGpAtikramanNotice: async (req, res) => {
		try {
			const data = req.body
			const _result = await gpNoticeModel.saveGpAtikramanNotice(res.pool, data)

			if (_result.affectedRows >= 1) {
				await gpNoticeModel.updateGpAtikramanNoticeOutgoingNumber(
					res.pool,
					_result.insertId
				)
				return res.status(200).json({
					success: true,
					status: 200,
					data: {
						message: 'Your success message here',
						id: _result.insertId,
					},
				})
			}
		} catch (err) {
			console.log(`Error while saving the gp atikraman notice : ${err}`)
			return res.status(500).json({
				success: false,
				status: 500,
				data: {
					error: err,
					message: 'Internal Server Error',
				},
			})
		}
	},

	updateGpAtikramanNotice: async (req, res) => {
		try {
			const data = req.body
			const _result = await gpNoticeModel.updateGpAtikramanNotice(
				res.pool,
				data
			)
			if (_result.affectedRows >= 1) {
				return res.status(200).json({
					success: true,
					status: 200,
					data: {
						message: 'Your success message here',
					},
				})
			}
		} catch (err) {
			console.log(`Error while updating the gp atikraman notice : ${err}`)
			return res.status(500).json({
				success: false,
				status: 500,
				data: {
					error: err,
					message: 'Internal Server Error',
				},
			})
		}
	},
	deleteGpAtikramanNotice: async (req, res) => {
		try {
			const data = req.body
			const _result = await gpNoticeModel.deleteGpAtikramanNotice(
				res.pool,
				data
			)

			if (_result.affectedRows >= 1) {
				return res.status(200).json({
					success: true,
					status: 200,
					data: {
						message: 'Your success message here',
					},
				})
			}
		} catch (err) {
			console.log(`Error while deleting the gp atikraman notice : ${err}`)
			return res.status(500).json({
				success: false,
				status: 500,
				data: {
					error: err,
					message: 'Internal Server Error',
				},
			})
		}
	},
}

module.exports = gpNoticeController
