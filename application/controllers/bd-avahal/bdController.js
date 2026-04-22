const HomeModel = require('../../model/HomeModel')
const ZPModel = require('../../model/ZPModel')
const bdModel = require('../../model/bd-avahal/bdModel')
// require("/u");

const bdAvahalController = {
	bdAvahalView: async function (req, res) {
		let gp = {}
		let gpData = await HomeModel.getGpData(res.pool)
		gp = gpData[0]

		let yearsList = await bdModel.getFilledYears(res.pool)
		let years = yearsList.map((year) => {
			return year.year
		})

		return res.render('user/gp-ahaval/bd-avahal/bd-avahal-list.pug', {
			gp,
			years,
		})
	},

	bdAhavalList: async (req, res) => {
		let gp = {}

		let gpData = await ZPModel.getZpDetails(res.pool)
		// console.log(gpData);
		gp = gpData[0]
		return res.render('user/gp-ahaval/bd-avahal/bd-avahal-list.pug', {
			gp,
		})
	},

	checkAlreadyFilled: async (req, res) => {
		let { month, year } = req.query
		try {
			let response = await bdModel.checkAlreadyFilled(res.pool, month, year)

			if (response.length === 0) {
				return res.status(200).json({
					call: 2, // not filled
				})
			}

			return res.status(200).json({
				call: 1, //filled
			})
		} catch (err) {
			return res.status(500).json({
				call: 0,
				data: err,
			})
		}
	},

	newBDAvahal: async (req, res) => {
		let { month, year } = req.query
		try {
			let gpDetails = await HomeModel.getGpData(res.pool)
			let gp = gpDetails[0]
			res.render('user/gp-ahaval/bd-avahal/bd-avahal-gramsevak.pug', {
				gp,
			})
		} catch (err) {
			console.log(err)
			return res.status(500).json({
				call: 0,
				data: err,
			})
		}
	},

	editBDAvahalView: async (req, res) => {
		let { month, year, isEdit } = req.query

		try {
			let gpDetails = await HomeModel.getGpData(res.pool)
			let gp = gpDetails[0]

			let bdAvahalDetails = await bdModel.getBDAvahalData(res.pool, month, year)
			console.log(bdAvahalDetails[0])
			res.render('user/gp-ahaval/bd-avahal/bd-avahal-gramsevak.pug', {
				gp,
				isEdit,
				data: bdAvahalDetails[0],
			})
		} catch (err) {
			console.log(err)
			return res.status(500).json({
				call: 0,
				data: err,
			})
		}
	},

	postBDAvahal: async (req, res) => {
		try {
			let data = req.body
			// console.log(data);

			let { month, year, id, isUpdate } = req.query

			let response = await bdModel.postBDAvahal(res.pool, data, isUpdate, id)

			if (response.affectedRows >= 1) {
				return res.status(201).json({
					call: 1,
				})
			}
		} catch (err) {
			console.log('ERror while updating ', err)
			return res.status(500).json({
				call: 0,
				data: err,
			})
		}
	},

	printBDAvahal: async (req, res) => {
		let { month, year } = req.query
		let zp

		try {
			let response = await bdModel.getBDAvahalData(res.pool, month, year)

			let gpDetails = await HomeModel.getGpData(res.pool)
			zp = gpDetails[0]
			res.render('user/gp-ahaval/bd-avahal/bd-avahal-gramsevak-print.pug', {
				zp,
				data: response[0],
			})
		} catch (err) {
			console.log(err)
			return res.status(500).json({
				call: 0,
				data: err,
			})
		}
	},

	yearWiseList: async (req, res) => {
		let yearWiseList = await bdModel.yearWiseList(res.pool, req.query.year)

		if (yearWiseList !== 0) {
			return res.status(200).json({
				call: 1,
				yearWiseList,
			})
		}
	},

	deleteBDAhaval: async (req, res) => {
		let { month, year } = req.query

		try {
			let response = await bdModel.deleteBDAvahal(res.pool, month, year)

			if (response.affectedRows === 1) {
				return res.status(201).json({
					call: 1, // successfully deleted
				})
			}
		} catch (err) {
			console.log(err)
			return res.status(500).json({
				call: 0,
				data: err,
			})
		}
	},
}

module.exports = bdAvahalController
