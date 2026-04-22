const HomeModel = require('../../model/HomeModel')
const MeterModel = require('../../model/MeterModel')
const ZPModel = require('../../model/ZPModel')
const watertaxModel = require('../../model/watertax/watertaxModel')
const MeterController = require('../MeterController')

const watertaxController = {
	renderWatertaxPage: async (req, res) => {
		try {
			const _gp = await HomeModel.getGpData(res.pool)

			res.render('user/watertax/watertax-form.pug', {
				gp: _gp[0],
			})
		} catch (err) {
			console.log(`Error while showing the water tax page : ${err}`)
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

	saveWatertax: async (req, res) => {
		try {
			const data = req.body

			const _updateResult = await MeterModel.updateTapWaterTax(res.pool, data)

			console.log(_updateResult)

			if (_updateResult.affectedRows == 0) {
				return res.status(500).json({
					success: false,
					status: 500,
					data: {
						message: 'Cannot update the tax',
					},
				})
			}

			const _result = await watertaxModel.saveWatertax(res.pool, data)

			if (_result.affectedRows >= 1) {
				return res.status(200).json({
					success: true,
					status: 200,
					data: {
						message: 'Saved the details successfully',
					},
				})
			}
		} catch (err) {
			console.log(`Error while saving the water tax details : ${err}`)
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

	updateWatertax: async (req, res) => {
		try {
			const data = req.body

			const _updateResult = await MeterModel.updateTapWaterTax(res.pool, data)

			console.log(_updateResult)

			if (_updateResult.affectedRows == 0) {
				return res.status(500).json({
					success: false,
					status: 500,
					data: {
						message: 'Cannot update the tax',
					},
				})
			}

			const _result = await watertaxModel.updateWatertax(res.pool, data)

			if (_result.affectedRows >= 1) {
				return res.status(200).json({
					success: true,
					status: 200,
					data: {
						message: 'Saved the details successfully',
					},
				})
			}
		} catch (err) {
			console.log(`Error while saving the water tax details : ${err}`)
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

	printWatertax: async (req, res) => {
		try {
			const { year1, year2 } = req.params

			const _zp = await ZPModel.getZpDetails(res.pool)
			const _watertax = await watertaxModel.allWatertax(res.pool)
			res.render('user/watertax/watertax-print.pug', {
				watertax: _watertax,
				zp: _zp[0],
				year1,
				year2,
			})
		} catch (err) {
			console.log(`Error while  showing the print page : ${err}`)
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

module.exports = watertaxController
