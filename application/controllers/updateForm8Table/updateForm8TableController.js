const updateForm8TableModel = require('../../model/updataDatabase/updateForm8TableModel')
const ZPModel = require('../../model/ZPModel')

const updateForm8TableController = {
	updateForm8Table: async (req, res) => {
		try {
			const { dataArray } = req.body
			console.log(`dataArray -- ${dataArray}`)

			const promises = []

			dataArray.forEach((el, i) => {
				promises.push(
					updateForm8TableModel.updateForm8Data(res.pool, JSON.parse(el))
				)
			})

			Promise.all(promises).then((result) => {
				// console.log(result)
				return res.status(200).json({
					call: 1,
				})
			})
		} catch (err) {
			console.log(`Error : ${err}`)
		}
	},

	getUpdateForm8DataView: async (req, res) => {
		try {
			const _gp = await ZPModel.getZpDetails(res.pool)
			const _form8Users = await updateForm8TableModel.getForm8Users(res.pool)

			// console.log('form 8 users = ', _form8Users)
			res.render('user/updateDatabaseTable/update-form-8-table.pug', {
				f8users: _form8Users,
				gp: _gp[0],
			})
		} catch (err) {
			console.log(`Error : ${err}`)
		}
	},
}


module.exports = updateForm8TableController
