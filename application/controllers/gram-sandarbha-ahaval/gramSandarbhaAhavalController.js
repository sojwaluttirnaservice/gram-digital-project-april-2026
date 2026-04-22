const ZPModel = require('../../model/ZPModel')
const gramSandarbhaAhavalModel = require('../../model/gram-sandarbha-ahaval/gramSandarbhaAhavalModel')

const gramSandarbhaAhavalController = {
	saveGramSandarbhaAhaval: async (req, res) => {
		try {
			const data = req.body
			console.log('Body = ', req.body)
			console.log('query = ', req.query)

			const _response = await gramSandarbhaAhavalModel.saveGramSandarbhaAhaval(
				res.pool,
				data
			)
			console.log(_response)
			return res.status(200).json({
				call: 1,
				message: `Gram Sandarbha Ahaval saved successfully`,
			})
		} catch (err) {
			console.log(`Error : ${err}`)
			return res.status(500).json({
				call: 0,
				error: err,
			})
		}
	},
	updateGramSandarbhaAhaval: async (req, res) => {
		try {
			const data = req.body
			const _response =
				await gramSandarbhaAhavalModel.updateGramSandarbhaAhaval(res.pool, data)

			if (_response.affectedRows >= 1) {
				return res.status(200).json({
					call: 1,
					message: `Gram Sandarbha Ahaval updated successfully`,
				})
			}
		} catch (err) {
			console.log(`Error while deleting gram sandarbha ahaval: ${err}`)
			return res.status(500).json({
				call: 0,
				error: err,
			})
		}
	},

	deleteGramSandarbhaAhaval: async (req, res) => {
		try {
			const { id } = req.query
			const _response =
				await gramSandarbhaAhavalModel.deleteGramSandarbhaAhaval(res.pool, id)

			if (_response.affectedRows >= 1) {
				return res.status(200).json({
					call: 1,
					message: `Gram Sandarbha Ahaval deleted successfully`,
				})
			}
		} catch (err) {
			console.log(`Error while deleting gram sandarbha ahaval: ${err}`)
			return res.status(500).json({
				call: 0,
				error: err,
			})
		}
	},

	getGramSandarbhaAhavalView: async (req, res) => {
		try {
			const _gp = await ZPModel.getZpDetails(res.pool)
			const _gramSandarbhaAhavalList =
				await gramSandarbhaAhavalModel.getGramSandarbhaAhavalList(res.pool)

			res.render(`user/gram-sandarbha-ahaval/gram-sandarbha-ahaval-view.pug`, {
				call: 1,
				gp: _gp[0],
				gramSandarbhaAhavalList: _gramSandarbhaAhavalList || [],
				message: `Gram Sandarbha Ahaval fetched successfully`,
			})
		} catch (err) {
			console.log(`Error : ${err}`)
			return res.status(500).json({
				call: 0,
				error: err,
			})
		}
	},

	getGramSandarbhaAhavalFormView: async (req, res) => {
		try {
			const { isEdit, id } = req.query
			const _isEdit = isEdit && isEdit == 'true'

			console.log(_isEdit)
			const _gp = await ZPModel.getZpDetails(res.pool)

			let _gramSandarbhaAhaval
			if (_isEdit && id) {
				_gramSandarbhaAhaval =
					await gramSandarbhaAhavalModel.getGramSandarbhaAhaval(res.pool, id)
			}

			// console.log(_gp[0])
			console.log(_gramSandarbhaAhaval, '-----')
			res.render(`user/gram-sandarbha-ahaval/gram-sandarbha-ahaval-form`, {
				call: 1,
				gp: _gp[0],
				isEdit: _isEdit ,
				gramSandarbhaAhaval: _gramSandarbhaAhaval ? _gramSandarbhaAhaval[0] : {},
				message: ``,
			})
		} catch (err) {
			console.log(`Error : ${err}`)
			return res.status(500).json({
				call: 0,
				error: err,
			})
		}
	},
}

module.exports = gramSandarbhaAhavalController
