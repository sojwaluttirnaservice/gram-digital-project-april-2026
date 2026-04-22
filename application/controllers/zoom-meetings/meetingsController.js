const meetingsModel = require('../../model/zoom-meetings/meetingsModel')
const CandidateController = require('../HomeController')
const fs = require('fs')

const meetingsController = {
	getZoomMeetingsView: async (req, res) => {
		meetingsModel
			.getAllZoomMeetings(res.pool)
			.then((_meetings) => {
				// console.log(_meetings)
				res.render('master/zoom-meetings/zoom-meetings-view.pug', {
					meetings: _meetings,
				})
			})
			.catch((err) => {
				return res.status(500).json({
					call: 0,
					error: err,
					message: 'Error while fetching all zoom meetings',
				})
			})
	},

	createNewMeetingRecord: async (req, res) => {
		try {
			let data = req.body
			let online_guide_photo
			let fileExtension
			if (req.files) {
				online_guide_photo = req.files.online_guide_photo
				fileExtension = data.fileExtension
			}

			// console.log('DATA ', data)
			// console.log('DATA 2 = ', req.files)
			// return;
			const _result = await meetingsModel.createNewMeetingRecord(res.pool, data)

			if (!online_guide_photo && _result.affectedRows === 1) {
				return res.status(200).json({
					call: 1,
					message: 'Record created successfully',
				})
			}

			let insertId = _result.insertId

			let destDir = `./public/new-gp-page/main-page/files/zoom-meeting-guide`

			if (!fs.existsSync(destDir)) {
				fs.mkdirSync(destDir, { recursive: true })
			}

			let fileName = `zoom-meeting-guide-${insertId}.${fileExtension}`

			let filePath = `${destDir}/${fileName}`

			online_guide_photo.mv(filePath, async (err) => {
				if (!err) {
					const _response = await meetingsModel.updateZoomMeetingGuideImageName(
						res.pool,
						fileName,
						insertId
					)
					if (_response.affectedRows === 1) {
						return res.status(200).json({
							call: 1,
							message: 'Record created successfully',
						})
					}
				}
			})
		} catch (err) {
			console.log(`Error while saving zoom meeting record : ${err}`)
			return res.status(500).json({
				call: 0,
				error: `Error : ${err}`,
				message: 'Error while creating the record',
			})
		}
	},

	updateMeetingRecord: async (req, res) => {
		try {
			let data = req.body
			let oldFileName = data.oldFileName

			let online_guide_photo
			let fileExtension
			if (req.files) {
				online_guide_photo = req.files.online_guide_photo
				fileExtension = data.fileExtension
			}
			let destDir = `./public/new-gp-page/main-page/files/zoom-meeting-guide`
			let oldFilePath = `${destDir}/${oldFileName}`
			if (online_guide_photo) {
				if (oldFileName && fs.existsSync(oldFilePath)) {
					fs.unlinkSync(oldFilePath)
				}

				let newFileName = `zoom-meeting-guide-${data.id}.${fileExtension}`
				let newImageFilePath = `${destDir}/${newFileName}`
				online_guide_photo.mv(newImageFilePath, async (err) => {
					if (!err) {
						const _result = await meetingsModel.updateMeetingRecord(
							res.pool,
							data,
							newFileName
						)
						if (_result.affectedRows === 1) {
							return res.status(200).json({
								call: 1,
								message: 'Record updated successfully',
							})
						}
					}
				})
			} else {
				const _result = await meetingsModel.updateMeetingRecord(
					res.pool,
					data,
					oldFileName
				)
				if (_result.affectedRows === 1) {
					return res.status(200).json({
						call: 1,
						message: 'Record updated successfully',
					})
				}
			}
		} catch (err) {
			console.log(`Error while updating zoom meeting record : ${err}`)
			return res.status(500).json({
				call: 0,
				error: `Error : ${err}`,
				message: 'Error while updating the record',
			})
		}
	},

	addRecordingLink: async (req, res) => {
		let { recording_link, id } = req.body
		meetingsModel
			.addRecordingLink(res.pool, recording_link, id)
			.then((_result) => {
				if (_result.affectedRows === 1) {
					return res.status(200).json({
						call: 1,
						message: 'Link added successfully',
					})
				}
			})
			.catch((err) => {
				return res.status(500).json({
					call: 0,
					error: `Error : ${err}`,
					message: 'Error while adding  the recording link',
				})
			})
	},
	deleteMeetingRecord: async (req, res) => {
		try {
			let { id, fileName } = req.query

			let destDir = `./public/new-gp-page/main-page/files/zoom-meeting-guide`
			let filePath = `${destDir}/${fileName}`

			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath)
			}

			const _result = await meetingsModel.deleteMeetingRecord(res.pool, id)

			if (_result.affectedRows === 1) {
				return res.status(200).json({
					call: 1,
					message: 'Record deleted successfully',
				})
			}
		} catch (err) {
			console.error('Error while deleting meeting record : ', err)
			return res.status(500).json({
				call: 0,
				error: `Error : ${err}`,
				message: 'Error while deleting the record',
			})
		}
	},
}

module.exports = meetingsController
