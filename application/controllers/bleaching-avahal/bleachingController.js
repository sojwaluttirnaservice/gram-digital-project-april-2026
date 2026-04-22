const bleachingModel = require('../../model/bleaching-avahal/bleachingModel')
const HomeModel = require('../../model/HomeModel')

let bleachingController = {
	allList: async (_, res) => {
		let gp = {}
		let gpData = await HomeModel.getGpData(res.pool)
		gp: gpData[0]

		let monthWiseList = await bleachingModel.getMonthWiseList(res.pool)

		let years = monthWiseList.map((el) => {
			return el.year
		})
		let uniqueYears = [...new Set(years)]

		return res.render(
			'user/gp-ahaval/bleaching-avahal/bleaching-avahal-list.pug',
			{
				gp: gp,
				years: uniqueYears,
			}
		)
	},

	yearWiseList: async (req, res) => {
		try {
			let yearWiseList = await bleachingModel.yearWiseList(
				res.pool,
				req.query.year
			)

			if (yearWiseList.length !== 0) {
				return res.status(200).json({
					call: 1,
					yearWiseList,
				})
			}
		} catch (error) {
			return res.status(500).json({
				call: 0,
				data: error,
			})
		}
	},

	checkAlreadyFilled: async (req, res) => {
		let { month, year } = req.query
		try {
			let response = await bleachingModel.checkAlreadyFilled(
				res.pool,
				month,
				year
			)
			console.log(response.length)
			if (response.length === 0) {
				return res.status(200).json({
					call: 2, // not filled
				})
			}
			return res.status(200).json({
				call: 1, // filled
			})
		} catch (error) {
			return res.status(500).json({
				call: 0,
				data: error,
			})
		}
	},

	newBleachingAvahal: async function (req, res) {
		let { month, year } = req.query

		let gp = {}

		let gpDetails = await HomeModel.getGpData(res.pool)
		gp = gpDetails[0]

		// 03Jan2024 -by sj
		// month is 1 based indexing

		// if (month == '04') {
		//     res.render('user/gp-ahaval/bleaching-avahal/bleaching-avahal-gramsevak', {
		//         gp: gp,
		//     });
		// }

		let previousData = await bleachingModel.getPreviousLatestBleachingData(
			res.pool
		)
		// console.log(gp)
		console.log(previousData)

		if (previousData.length === 0) {
			res.render('user/gp-ahaval/bleaching-avahal/bleaching-avahal-gramsevak', {
				gp: gp,
			})
			return
		}

		res.render('user/gp-ahaval/bleaching-avahal/bleaching-avahal-gramsevak', {
			gp: gp,
			previousData: previousData[0],
		})
	},

	editBleachingAvahalView: async function (req, res) {
		let { month, year, id } = req.query

		let gp = {}

		let gpDetails = await HomeModel.getGpData(res.pool)
		gp = gpDetails[0]

		let details = await bleachingModel.getPreviousKarVasuliAvahalData(
			res.pool,
			Number(month),
			year
		)

		// console.log(details);
		res.render('user/gp-ahaval/bleaching-avahal/bleaching-avahal-gramsevak', {
			gp: gp,
			data: details[0],
			isEdit: true,
		})
	},

	postBleachingAvahal: async (req, res) => {
		try {
			let data = req.body
			console.log(data)
			const _existingRecord = await bleachingModel.checkAlreadyFilled(
				res.pool,
				data.month,
				data.year
			)

			console.log(_existingRecord)

			if (_existingRecord.length) {
				return res.status(409).json({
					call: 3,
				})
			}

			let response = await bleachingModel.postBleachingAvahal(res.pool, data)

			if (response.affectedRows === 1) {
				return res.status(201).json({
					call: 1,
				})
			}
		} catch (error) {
			console.log(`Error while saving the the bleaching ahaval: ${error}`)
			return res.status(500).json({
				call: 0,
				data: error,
			})
		}
	},

	updateBleachingAvahal: async (req, res) => {
		let data = req.body
		const { id } = req.query
		console.log(data)
		try {
			const _existingRecord = await bleachingModel.checkAlreadyFilled(
				res.pool,
				data.month,
				data.year
			)
			console.log(id)
			console.log(_existingRecord)

			if (_existingRecord.length && _existingRecord[0].id != id) {
				return res.status(409).json({
					call: 3,
				})
			}

			let response = await bleachingModel.updateBleachingAvahal(
				res.pool,
				data,
				id
			)
			// console.log('udaing conroller , ', response.affectedRows)

			if (response.affectedRows === 1) {
				return res.status(201).json({
					call: 1,
					message: 'Data updated successfully',
				})
			}
		} catch (error) {
			return res.status(500).json({
				call: 0,
				error: error,
			})
		}
	},

	printBleachingAvahal: async (req, res) => {
		let { month, year } = req.query
		let gp
		try {
			let gpDetails = await HomeModel.getGpData(res.pool)
			gp = gpDetails[0]
			// console.log(gp);
			let response = await bleachingModel.getBleachingAvahalData(
				res.pool,
				month,
				year
			)
			// console.log(response[0])
			console.log(gp)

			res.render(
				'user/gp-ahaval/bleaching-avahal/bleaching-avahal-gramsevak-print',
				{
					gp,
					data: response[0],
				}
			)
		} catch (error) {
			return res.status(500).json({
				call: 0,
				data: error,
			})
		}
	},

	deleteBleachingAvahal: async (req, res) => {
		let { month, year } = req.query
		try {
			let response = await bleachingModel.deleteBleachingAvahal(
				res.pool,
				month,
				year
			)
			if (response.affectedRows === 1) {
				res.status(201).json({
					call: 1, // succsssfully deleted
				})
			}
		} catch (error) {
			return res.status(500).json({
				call: 0,
				data: error,
			})
		}
	},
}

module.exports = bleachingController
