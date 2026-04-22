let MeterModel = require('../model/MeterModel')
let HomeModel = require('../model/HomeModel')
const watertaxModel = require('../model/watertax/watertaxModel')

const fs = require('fs')
const asyncHandler = require('../utils/asyncHandler')
const { renderPage } = require('../utils/sendResponse')

let MeterController = {
    meterView: asyncHandler(async (req, res) => {
        let list = await HomeModel.getMeterList(res.pool)
        renderPage(res, 'user/meter/meter.pug', {
            list
        })
    }),

	meterListView: function (req, res) {
		var gp = {}
		HomeModel.getGpData(res.pool)
			.then((result) => {
				gp = result[0]
				return HomeModel.getMeterList(res.pool)
			})
			.then((result) => {
				res.render('user/meter/meter_list', {
					gp: gp,
					list: result,
				})
			})
			.catch((error) => {
				console.log(error)
				res.status(500).send({ call: 0, data: error })
			})
	},

	userMeterList: function (req, res) {
		var gp = {}
		HomeModel.getGpData(res.pool)
			.then((result) => {
				gp = result[0]
				return HomeModel.getUserMeterList(res.pool)
			})
			.then((result) => {
				res.render('user/meter/user_meter_list', {
					gp: gp,
					list: result,
				})
			})
			.catch((error) => {
				res.status(500).send({ call: 0, data: error })
			})
	},

	removeMeterBill: function (req, res) {
		var id = Number(req.params.id)
		HomeModel.removeMeterBill(res.pool, id)
			.then((result) => {
				res.redirect('/meter/user-meter-list')
			})
			.catch((error) => {
				res.status(500).send({ call: 0, data: error })
			})
	},

	addNewMeterView: async function (req, res) {
		var id = Number(req.params.id)
		var gp = {}

		var rates = []
		var meterUserDetails = []

		try {
			gp = await HomeModel.getGpData(res.pool)
			rates = await HomeModel.getMeterRate(res.pool)
			meterUserDetails = await HomeModel.getUserMeterDetails(res.pool, id)

			let _nextIdDetails

			if (meterUserDetails && meterUserDetails.length) {
				_nextIdDetails = await MeterModel.getNextIdDetails(res.pool, id)
			}

			if (meterUserDetails.length == 0) {
				res.redirect('/meter')
				return
			}

			const _lastMeterTaxDetails = await HomeModel.lastMeterTaxDetails(
				res.pool,
				meterUserDetails[0].id
			)

			console.log(_lastMeterTaxDetails)
			res.render('user/meter/add_user_meter', {
				gp: gp,
				meter: meterUserDetails[0],
				rates,
				lastMeterTaxDetails: _lastMeterTaxDetails[0],
				nextId:
					_nextIdDetails && _nextIdDetails.length ? _nextIdDetails[0].id : null,
				// type: _lastMeterTaxDetails.length == 0 ? 'new' : 'update',
			})
		} catch (error) {
			console.log(error)
			res.status(500).send({ call: 0, data: error })
		}
	},

	renderEditMeterView: async function (req, res) {
		var id = Number(req.params.id)
		var gp = {}

		var rates = []
		var meterUserDetails = []

		try {
			gp = await HomeModel.getGpData(res.pool)
			rates = await HomeModel.getMeterRate(res.pool)
			meterUserDetails = await HomeModel.getUserMeterDetails(res.pool, id)

			let _nextIdDetails

			if (meterUserDetails && meterUserDetails.length) {
				_nextIdDetails = await MeterModel.getNextIdDetails(res.pool, id)
			}

			if (meterUserDetails.length == 0) {
				res.redirect('/meter')
				return
			}

			const _lastMeterTaxDetails = await HomeModel.lastMeterTaxDetails(
				res.pool,
				meterUserDetails[0].id
			)

			console.log(_lastMeterTaxDetails)
			res.render('user/meter/edit-user-meter', {
				gp: gp,
				meter: meterUserDetails[0],
				rates,
				lastMeterTaxDetails: _lastMeterTaxDetails[0],
				nextId:
					_nextIdDetails && _nextIdDetails.length ? _nextIdDetails[0].id : null,
			})
		} catch (error) {
			console.log(error)
			res.status(500).send({ call: 0, data: error })
		}
	},

	renderMeterTaxFormPage: async (req, res) => {
		try {
			const { id } = req.params
			const _gp = await HomeModel.getGpData(res.pool)

			const _meterUserDetails = await HomeModel.getUserMeterDetails(
				res.pool,
				id
			)

			console.log(_meterUserDetails)

			let _lastMeterTaxDetails = []
			if (_meterUserDetails && _meterUserDetails.length != 0) {
				_lastMeterTaxDetails = await HomeModel.lastMeterTaxDetails(
					res.pool,
					_meterUserDetails[0].id
				)
			}
			// console.log(_meterUserDetails)
			// console.log(_lastMeterTaxDetails)
			let _nextIdDetails

			if (_meterUserDetails && _meterUserDetails.length) {
				_nextIdDetails = await MeterModel.getNextIdDetails(res.pool, id)
			}

			res.render('user/meter/meter-tax-form-page.pug', {
				gp: _gp[0],
				meterUserDetails:
					_meterUserDetails.length >= 1 ? _meterUserDetails[0] : null,
				lastMeterTaxDetails: _lastMeterTaxDetails[0] || null,
				nextId:
					_nextIdDetails && _nextIdDetails.length ? _nextIdDetails[0].id : null,
			})
		} catch (err) {
			console.log(`Error while rendering the page : ${err}`)
		}
	},

	saveMeterTaxDetails: async (req, res) => {
		try {
			const data = req.body

			const _existingLastMeterPaymentRecords =
				await MeterModel.existingLastMeterPaymentRecords(res.pool, data)

			const _savePaymentRecordResult =
				await MeterModel.saveNewMeterPaymentRecord(
					res.pool,
					data,
					_existingLastMeterPaymentRecords?.[0]
				)

			const _result = await MeterModel.saveMeterTaxDetails(res.pool, data)

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
			console.log(`Error while saving the tax details of meter  : ${err}`)
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
	fetchDistinctMonthYear: async (req, res) => {
		try {
			const { startFrom, isDescending } = req.query
			// console.log(startFrom)
			const _distinctMonthYear = await MeterModel.fetchDistinctMonthYear(
				res.pool,
				startFrom,
				isDescending == 'true' ? true : false
			)
			return res.status(200).json({
				success: true,
				status: 200,
				data: {
					distinctMonthYear: _distinctMonthYear,
					message: 'Your success message here',
				},
			})
		} catch (err) {
			console.log(`Error while fetching the distinct month and years : ${err}`)
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

	getValveNumbers: async (req, res) => {
		try {
			const { valveNumber } = req.query
			const _valveNumbers = await MeterModel.getValveNumbers(
				res.pool,
				valveNumber
			)
			return res.status(200).json({
				success: true,
				status: 200,
				data: {
					valveNumbers: _valveNumbers,
					message: 'Your success message here',
				},
			})
		} catch (err) {
			console.log(`Error while fetching the valve numbers : ${err}`)
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

	addNewUserView: function (req, res) {
		var gp = {}
		HomeModel.getGpData(res.pool)
			.then((result) => {
				gp = result[0]
				res.render('user/meter/add_new_user', {
					gp: gp,
					id: 0,
					update: {},
				})
			})
			.catch((error) => {
				res.status(500).send({ call: 0, data: error })
			})
	},
	getUpdateNewUserView: function (req, res) {
		var id = req.params.id

		var gp = {}
		HomeModel.getGpData(res.pool)
			.then((result) => {
				gp = result[0]
				return MeterModel.getUserInfo(res.pool, id)
			})
			.then((result) => {
				res.render('user/meter/add_new_user', {
					gp: gp,
					id: id,
					update: result[0],
				})
			})
			.catch((error) => {
				res.status(500).send({ call: 0, data: error })
			})
	},

	getUserInfoByNalConnectionNumber: async function (req, res) {
		try {
			const nal_connection_no = req.params.nal_connection_no

			const { searchMultiple } = req.query

			let _searchMultiple = searchMultiple && searchMultiple == 'true'
			// console.log('Search Mutiple', _searchMultiple)
			// Fetch gp data
			const _gp = await HomeModel.getGpData(res.pool)

			// Fetch user data using nal_connection_no
			const _usersData = await MeterModel.getUserInfoByNalConnectionNumber(
				res.pool,
				nal_connection_no,
				_searchMultiple
			)

			// Send response
			res.status(200).json({
				success: true,
				gp: _gp[0],
				userData: _usersData[0],
				usersData: _usersData,
			})
		} catch (error) {
			console.log(error)
			res.status(500).send({ call: 0, data: error })
		}
	},
	getUserInfoById: async function (req, res) {
		try {
			const id = req.params.id

			// Fetch gp data
			const { searchMultiple } = req.query

			let _searchMultiple = searchMultiple && searchMultiple == 'true'

			const _gp = await HomeModel.getGpData(res.pool)

			// Fetch user data usingid
			const _usersData = await MeterModel.getUserInfo(
				res.pool,
				id,
				_searchMultiple
			)

			// Send response
			return res.status(200).json({
				success: true,
				gp: _gp[0],
				userData: _usersData[0],
				usersData: _usersData,
			})
		} catch (error) {
			console.log(error)
			res.status(500).send({ call: 0, data: error })
		}
	},

	getUserInfoByOwnerName: async function (req, res) {
		try {
			const { name } = req.params

			// Fetch gp data
			const { searchMultiple } = req.query

			let _searchMultiple = searchMultiple && searchMultiple == 'true'

			const _gp = await HomeModel.getGpData(res.pool)

			// Fetch user data usingid
			const _usersData = await MeterModel.getUserInfoByOwnerName(
				res.pool,
				name,
				_searchMultiple
			)

			// Send response
			res.status(200).json({
				success: true,
				gp: _gp[0],
				userData: _usersData[0],
				usersData: _usersData,
			})
		} catch (error) {
			console.log(error)
			res.status(500).send({ call: 0, data: error })
		}
	},
	getUserInfoByMeterNumber: async function (req, res) {
		try {
			let meter_number = req.params.meter_number

			const { searchMultiple } = req.query

			let _searchMultiple = searchMultiple && searchMultiple == 'true'
			const _gp = await HomeModel.getGpData(res.pool)
			const _usersData = await MeterModel.getUserInfoByMeterNumber(
				res.pool,
				meter_number,
				searchMultiple
			)
			// 	console.log('------')
			// console.log(_usersData)
			return res.status(200).json({
				success: true,
				gp: _gp[0],
				userData: _usersData[0],
				usersData: _usersData,
			})
		} catch (err) {
			res.status(500).send({ call: 0, data: err })
		}
	},

	saveNewUser: function (req, res) {
		var data = req.body
		console.log(data)
		if (data.id == undefined) {
			MeterModel.saveNewMeterUser(res.pool, data)
				.then((result) => {
					res.send({ call: 1, data: result })
				})
				.catch((error) => {
					res.status(500).send({ call: 0, data: error })
				})
		} else {
			MeterModel.updateNewMeterUser(res.pool, data)
				.then((result) => {
					res.send({ call: 1, data: result })
				})
				.catch((error) => {
					res.status(500).send({ call: 0, data: error })
				})
		}
	},
	saveUpdateNewMeter: async function (req, res) {
		var data = req.body
		// console.log('Savinggg....')
		var dOne = data.mbl_amt_diposite_till_date.split('-')
		var dTwo = data.mbl_deyak_amt_fill_last_date.split('-')
		var dThree = data.mbl_deyak_date.split('-')

		data.mbl_amt_diposite_till_date = dOne[2] + '-' + dOne[1] + '-' + dOne[0]
		data.mbl_deyak_amt_fill_last_date = dTwo[2] + '-' + dTwo[1] + '-' + dTwo[0]
		data.mbl_deyak_date = dThree[2] + '-' + dThree[1] + '-' + dThree[0]
		if (req.files == null || req.files == undefined) {
			var fileOne = undefined
		} else {
			var fileOne = req.files.file1
		}

		// console.log('Savinggg..2..')

		try {
			const _exisingEntryForMonths = await MeterModel.existingEntryForMonths(
				res.pool,
				data
			)

			console.log('------doing------')
			console.log(_exisingEntryForMonths)
			console.log(
				data.mbl_water_usage_from,
				'---',
				data.mbl_water_usage_to,
				'---',
				data.user_id
			)
			// return res.status(202).json({
			// 	call: 0,
			// })
		} catch (error) {
			console.log(error)
		}

		// console.log('-------------')
		// console.log(data)
		// return;

		MeterModel.saveNewMeterCatalog(res.pool, data)

			.then((result) => {
				if (result.insertId == 0) {
					res.status(500).send({ call: 0, data: 'Insertion Issue' })
					return 999
				} else {
					if (fileOne !== undefined) {
						var file1_name = result.insertId + '_meter.jpeg'
						fileOne.mv('./public/meter_upload/' + file1_name, function (error) {
							if (error) {
								res.status(500).send({ call: 0, data: error })
								return 999
							} else {
								var updateData = {}
								updateData['mbl_meter_image'] = file1_name
								updateData['id'] = result.insertId
								return MeterModel.updateNewMeterCatalogImage(
									res.pool,
									updateData
								)
							}
						})
					} else {
						return { call: 1 }
					}
				}
			})
			.then((result) => {
				if (result !== 999) {
					res.status(200).send({ call: 1 })
				}
			})
			.catch((error) => {
				console.log(error)
				res.status(500).send({ call: 0, data: error })
			})
	},

	updateNewMeter: async (req, res) => {
		try {
			const data = req.body

			// console.log('Savinggg....')
			var dOne = data.mbl_amt_diposite_till_date.split('-')
			var dTwo = data.mbl_deyak_amt_fill_last_date.split('-')
			var dThree = data.mbl_deyak_date.split('-')

			data.mbl_amt_diposite_till_date = dOne[2] + '-' + dOne[1] + '-' + dOne[0]
			data.mbl_deyak_amt_fill_last_date =
				dTwo[2] + '-' + dTwo[1] + '-' + dTwo[0]
			data.mbl_deyak_date = dThree[2] + '-' + dThree[1] + '-' + dThree[0]
			if (req.files == null || req.files == undefined) {
				var fileOne = undefined
			} else {
				var fileOne = req.files.file1
			}

			// console.log('Savinggg..2..')

			try {
				const _exisingEntryForMonths = await MeterModel.existingEntryForMonths(
					res.pool,
					data,
					true
				)
				console.log('------doing------')
				console.log(_exisingEntryForMonths)
				console.log(
					data.mbl_water_usage_from,
					'---',
					data.mbl_water_usage_to,
					'---',
					data.user_id,
					'---',
					data.id
				)
				// return res.status(202).json({
				// 	call: 0,
				// })
			} catch (error) {
				console.log(error)
			}
			// console.log('-------------')
			// console.log(data)
			// return
			console.log('In update')

			// console.log(data)

			// return;

			const image_name = data.image_name

			if (fileOne && image_name) {
				const imagePath = `./public/meter_upload/${image_name}`
				if (fs.existsSync(imagePath)) {
					fs.unlinkSync(imagePath)
				}
			}

			MeterModel.updateNewMeterCatalog(res.pool, data)

				.then((result) => {
					console.log(result)
					if (data.id == 0) {
						res.status(500).send({ call: 0, data: 'Insertion Issue' })
						return 999
					} else {
						if (fileOne !== undefined) {
							var file1_name = data.id + '_meter.jpeg'
							fileOne.mv(
								'./public/meter_upload/' + file1_name,
								function (error) {
									if (error) {
										console.log(error)
										res.status(500).send({ call: 0, data: error })
										return 999
									} else {
										var updateData = {}
										updateData['mbl_meter_image'] = file1_name
										updateData['id'] = data.id
										return MeterModel.updateNewMeterCatalogImage(
											res.pool,
											updateData
										)
									}
								}
							)
						} else {
							return { call: 1 }
						}
					}
				})
				.then((result) => {
					if (result !== 999) {
						res.status(200).send({ call: 1 })
					}
				})
				.catch((error) => {
					console.log('In errr')
					console.log(error)
					res.status(500).send({ call: 0, data: error })
				})
		} catch (err) {
			console.log(`Error while updating the meter user: ${err}`)
		}
	},

	renderTapConnectionFormPage: async (req, res) => {
		try {
			const data = req.body
			const _gp = await HomeModel.getGpData(res.pool)
			res.render('user/meter/tap-connection-form.pug', {
				gp: _gp[0],
			})
		} catch (err) {
			console.log(`Error while  showing the tap connection form page: ${err}`)
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

	renderEditTapConnectionFormPage: async (req, res) => {
		try {
			const { id } = req.params
			const _gp = await HomeModel.getGpData(res.pool)

			const _tapConnection = await MeterModel.getTapConnectionDetails(
				res.pool,
				+id
			)
			res.render('user/meter/edit-tap-connection.pug', {
				gp: _gp[0],
				tapConnection: _tapConnection[0],
			})
		} catch (err) {
			console.log(
				`Error while  showing the  edit tap connection form page: ${err}`
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

	tapConnectionDetails: async (req, res) => {
		try {
			const { id } = req.body

			console.log(id)

			const _existingEntry = await watertaxModel.waterTaxDetails(res.pool, id)

			console.log(_existingEntry)
			const _tapConnection = await MeterModel.getTapConnectionDetails(
				res.pool,
				+id
			)

			return res.status(200).json({
				success: true,
				status: 200,
				data: {
					tapConnection: _tapConnection[0],
					alreadyExists: _existingEntry.length != 0 ? true : false,
					existingEntry: _existingEntry[0],
				},
			})
		} catch (err) {
			console.log(
				`Error while  showing the  edit tap connection form page: ${err}`
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

	saveTapConnection: async (req, res) => {
		try {
			const data = req.body

			const _result = await MeterModel.saveTapConnection(res.pool, data)

			console.log(_result)
			if (_result.affectedRows > 0) {
				return res.status(200).json({
					success: true,
					status: 200,
					data: {
						insertId: _result.insertId,
						message: 'Tap Connection saved succesfully',
					},
				})
			}
		} catch (err) {
			console.log(`Error while saving the tap connection  : ${err}`)
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

	updateTapConnection: async (req, res) => {
		try {
			const data = req.body
			const _result = await MeterModel.updateTapConnection(res.pool, data)

			if (_result.affectedRows >= 1) {
				return res.status(200).json({
					success: true,
					status: 200,
					data: {
						message: 'Tap Connection updated successfully',
					},
				})
			}
		} catch (err) {
			console.log(`Error while  updating the tap connection  : ${err}`)
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

	renderTapConnectionListPage: async (req, res) => {
		try {
			const _gp = await HomeModel.getGpData(res.pool)
			const _taplist = await MeterModel.tapConnectionList(res.pool)

			console.log(_taplist)

			res.render('user/meter/tap-connection-list.pug', {
				gp: _gp[0],
				taplist: _taplist,
			})
		} catch (err) {
			console.log(`Error while showing the tap connection list : ${err}`)
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
module.exports = MeterController
