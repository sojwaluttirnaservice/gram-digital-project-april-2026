var FormNightModel = require('../model/FormNightModel')
let HomeModel = require('../model/HomeModel')
const ZPModel = require('../model/ZPModel')
var FromNightController = {
	homeView: function (req, res, next) {
		res.redirect('/')
	},

	getYadi: function (req, res, next) {
		ZPModel.getZpDetails(res.pool).then((gp_data) => {
			res.render('user/yadi_praman_patra', {
				gp: gp_data[0],
			})
		})
	},

	getFormNightView: (req, res, next) => {
		let data = req.params
		if (isNaN(data.id)) {
			return res.status(200).send({ call: 1, data: `Invalid Details Passed` })
		}

		FromNightController.getNightPreTaxationData(
			res.pool,
			data,
			(type, sendData) => {
				// console.log(sendData.data, 'sendData.data')
				switch (sendData.call) {
					case 1:
						sendData.data['sessionUser'] = req.session.User
						// res.render('user/form_9', sendData.data)



						// NOW I WILL USE THIS NEW MODIFIED FILE KEEPING PREVIOUS file form_9.pug as it is 
						res.render('user/form_9_copy', sendData.data)
						break
					case 2:
						res.status(200).send({ call: 1, data: 'Invalid Details' })
						break
					default:
						res.status(200).send(sendData)
						break
				}
			}
		)
	},

	// getFormNightViewCopy: (req, res, next) => {
	// 	let data = req.params
	// 	// console.log(data)

	// 	if (isNaN(data.id)) {
	// 		return res.status(200).send({ call: 1, data: `Invalid Details Passed` })
	// 	}

	// 	FromNightController.getNightPreTaxationData(
	// 		res.pool,
	// 		data,
	// 		(type, sendData) => {
	// 			// console.log(sendData.data, 'sendData.data')
	// 			switch (sendData.call) {
	// 				case 1:
	// 					sendData.data['sessionUser'] = req.session.User
	// 					// res.render('user/form_9', sendData.data)


	// 					// TEMPORARILY I WILL USE THE BELOW COPY OF THE ABOVE SAME PAGE

	// 					res.render('user/form_9_copy', sendData.data)
	// 					break
	// 				case 2:
	// 					res.status(200).send({ call: 1, data: 'Invalid Details' })
	// 					break
	// 				default:
	// 					res.status(200).send(sendData)
	// 					break
	// 			}
	// 		}
	// 	)
	// },

	getNightPreTaxationData: function (pool, data, callback) {
		let sendData = {
			user: {},
			jsUser: [],
			totalTaxData: [],
			totalTaxData_1: {},
			formNineSavedDetails: {},
			update: false,
			gp: {},
		}

		HomeModel.getGpData(pool)
			.then((_result) => {
				sendData.gp = _result[0]
				return FormNightModel.formEightUser(pool, data)
			})
			.then((result) => {
				if (result.length == 0) {
					callback(true, { call: 2 })
					return 999
				} else {
					sendData.user = result[0]
					sendData.jsUser = JSON.stringify(result)
					return FormNightModel.getTotalTaxData(pool, data)
				}
			})
			.then((result) => {
				console.log(result)
				if (result !== 999) {
					if (result.length == 0) {
						console.log('hererer')
						callback(true, { call: 3 })
						return 999
					} else {
						sendData.totalTaxData_1 = result[0]
						sendData.totalTaxData = JSON.stringify(result)
						return FormNightModel.getFormNineSavedDetails(pool, data)
					}
				}
			})
			.then((result) => {
				if (result !== 999) {
					if (result.length !== 0) {
						sendData.formNineSavedDetails = result[0]
						sendData.update = true
					}
					callback(true, { call: 1, data: sendData })
				}
			})
			.catch((error) => {
				callback(false, { call: 0, data: error })
			})
	},

	addNewFormNineEntry: function (req, res, next) {
		var data = req.body
		// console.log(data, 'update DATA')
		console.log(data.lastUpdateId, 'last update id')

		if (data.lastUpdateId == 0) {
			console.log('inside last updated id = 0')
			FormNightModel.preCheckFormNineDetails(res.pool, data)
				.then((result) => {
					if (result.length == 0) {
						console.log('inside thsi saveNewFormNineDetails')

						return FormNightModel.saveNewFormNineDetails(res.pool, data)
					} else {
						console.log('inside this else of saveNewFormNineDetails')
						res.status(200).send({ call: 2 })
						return 999
					}
				})
				.then((result) => {
					console.log("Updatin the ps_form_eight_total_taxation")
					data.lastUpdateId = result.insertId
					return FormNightModel.updateFormEightFromFormNine(res.pool, data)
				})
				.then((result) => {
					if (result !== 999) {
						res.status(200).send({ call: 1, data: result.insertId })
					}
				})
				.catch((error) => {
					console.log(error, 'error 1')
					res.status(500).send({ call: 0, data: error })
				})
		} else {
			console.log("in else block of this hehe")
			FormNightModel.updateFormNineDetails(res.pool, data)
				.then((result) => {
					console.log("updating ps_form_eight_total_taxation in Else block")
					return FormNightModel.updateFormEightFromFormNine(res.pool, data)
				})
				.then((result) => {
					return res.status(200).json({
						call: 1,
					})
				})
				.catch((error) => {
					console.log(error, 'error 2')
					res.status(500).send({ call: 0, data: error })
				})
		}
	},
}

module.exports = FromNightController
