const { myDate } = require('../../config/_responderSet')
const HomeModel = require('../../model/HomeModel')
const divyangaModel = require('../../model/divyanga/divyangaModel')
const fs = require('fs')
const path = require('path')
const util = require('util')
const CandidateController = require('../HomeController')
const krishiVidnyanModel = require('../../model/krishiVidnyanModel/krishiVidnyanModel')

const krishiVidnyanController = {
	krishiVidnyanView: async (req, res) => {
		try {
			let requiredDataObject = await CandidateController.getCommonData(req, res)
			let krishiVidnyanData = await krishiVidnyanModel.getKrishiVidnyanList(
				res.pool
			)
			console.log(krishiVidnyanData, 'data-')
			res.render('user/krishiVidnyan/krishiVidnyanView.pug', {
				...requiredDataObject,
				krishiVidnyanData,
			})
		} catch (error) {
			return res.status(500).json({
				call: 0,
				data: error.message,
			})
		}
	},
}

module.exports = krishiVidnyanController
