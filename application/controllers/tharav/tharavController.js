const HomeModel = require('../../model/HomeModel')
const tharavModel = require('../../model/tharav/tharavModel')

const tharavController = {
	masikSabhaTharavView: async (req, res) => {
		let gp = {}
		HomeModel.getGpData(res.pool)
			.then((result) => {
				gp = result[0]
				return tharavModel.getTharavListByDescOrder(res.pool)
			})
			.then((tharavList) => {
				// console.log('gp details in tharavController : =', gp);
				res.render('user/tharav/masikSabhaTharav', {
					gp: gp,
					tharavList,
					isEdit:false
				})
			})
			.catch((err) => {
				res.status(500).send({
					call: 0,
					message: `Internal server error`,
					error: `Error : ${err}`,
				})
			})
	},

	getSabhaTharavDetails: async (req, res) => {
		const tharavId = req.query.printId

		let gp = {}

		HomeModel.getGpData(res.pool)
			.then((result) => {
				gp = result[0]
				return tharavModel.getSabhaTharavDetails(res.pool, tharavId)
			})
			.then((result) => {
				// console.log('REsutl  ==== ', result);
				return res.render('user/tharav/sabhaTharavPrintView', {
					call: 1,
					gp: gp,
					tharavDetails: result[0],
					message: 'Data fetched successfully',
				})
			})
			.catch((err) => {
				console.log('in errror ', err)
				return res.status(500).json({
					call: 0,
					message: `Internal server error`,
					error: `Error while fetching the data. Error: ${err}`,
				})
			})
	},
	saveSabhaTharavDetails: async (req, res) => {
		const { isUpdate, tharavId } = req.query
		try {
			const data = req.body
			console.log(data)
			console.log(isUpdate)
			const _result = await tharavModel.saveSabhaTharavDetails(
				res.pool,
				data,
				isUpdate == 'true',
				tharavId
			)

			if (_result.affectedRows >= 1) {
				return res.status(200).json({
					call: 1,
					result: _result,
					message: `Details ${isUpdate ? 'updated' : 'inserted'} successfully`,
				})
			}
		} catch (err) {
			console.log(' errror  while saving or updating the masik tharav', err)
			return res.status(500).json({
				call: 0,
				message: `Internal server error`,
				error: `Error while ${
					isUpdate ? 'updating' : 'saving'
				} the data. Error: ${err}`,
			})
		}
	},

	deleteSabhaTharavDetails: async (req, res) => {
		const { deleteId } = req.body
		console.log(deleteId)
		tharavModel
			.deleteSabhaTharavDetails(res.pool, deleteId)
			.then((result) => {
				return res.status(200).json({
					call: 1,
					message: 'Data deleted successfully',
				})
			})
			.catch((err) => {
				return res.status(500).json({
					call: 0,
					error: 'Internal server error:' + err,
				})
			})
	},
	addNewTharav: async (req, res) => {
		let gp = {}
		HomeModel.getGpData(res.pool)
			.then((result) => {
				gp = result[0]
				console.log('gp details in tharavController : =', gp)
				res.render('user/tharav/addMasikTharav', {
					gp: gp,
					isEdit: false,
				})
			})
			.catch((err) => {
				res.status(500).send({
					call: 0,
					message: `Internal server error`,
					error: `Error : ${err}`,
				})
			})
	},

	updateSabhaTharavDetailsView: async (req, res) => {
		const tharavId = req.query.tharavId

		let gp = {}
		HomeModel.getGpData(res.pool)
			.then((result) => {
				gp = result[0]
				return tharavModel.getSabhaTharavDetails(res.pool, tharavId)
			})
			.then((result) => {
				console.log('update', result)
				res.render('user/tharav/addMasikTharav', {
					gp: gp,
					isEdit: true,
					tharavDetails: result[0],
				})
			})
			.catch((err) => {
				res.status(500).send({
					call: 0,
					message: `Internal server error`,
					error: `Error : ${err}`,
				})
			})
	},
}

module.exports = tharavController
