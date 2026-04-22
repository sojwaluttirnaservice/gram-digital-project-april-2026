const HomeModel = require('../../model/HomeModel')
var ZPModel = require('../../model/ZPModel')
const asyncHandler = require('../../utils/asyncHandler')
var FormNineModel = require('../../model/FormNightModel');
const FormPrintModel = require('../../model/FormPrintModel');

const blankCertificateController = {
	getBlankCertificateView: async function (req, res, next) {
		try {
			const gp_data = await getGpDetails(res)
			if (gp_data) {
				res.render('user/blankCertificates/blankCertificates.pug', {
					gp: gp_data,
				})
			}
		} catch (error) {
			return sendError(res, error)
		}
	},

	formEightPratidnayaPatra: async function (req, res) {
		try {
			let gp = await getGpDetails(res)
			res.render('user/blankCertificates/formEightPratidnayaPatra', { gp })
		} catch (error) {
			return sendError(res, error)
		}
	},

	magniBill: async function (_, res) {
		try {
			res.render('user/blankCertificates/pageMagniBill.pug')
		} catch (error) {
			return sendError(res, error)
		}
	},

	magniLekh: function (_, res) {
		try {
			res.render('user/blankCertificates/pageMagniLekh.pug')
		} catch (error) {
			return sendError(res, error)
		}
	},

	formNineSamanya: async function (_, res) {
		try {
			const _gp = await HomeModel.getGpData(res.pool)
			res.render('user/blankCertificates/pageFormNineSamanya.pug', { gp: _gp[0] })
		} catch (error) {
			return sendError(res, error)
		}
	},

	formNinePani: async function (_, res) {
		try {
			const _gp = await HomeModel.getGpData(res.pool)
			res.render('user/blankCertificates/pageFormNinePani.pug', {
				gp: _gp[0]
			})
		} catch (error) {
			return sendError(res, error)
		}
	},

	nalConnectionNotice: function (_, res) {
		try {
			res.render('user/blankCertificates/nalConnectionNotice.pug')
		} catch (err) {
			return sendError(res, err)
		}
	},

	formEightBlankPrint: async function (_, res) {
		try {
			const gp = await getGpDetails(res)
			res.render('user/blankCertificates/formEightBlankPrint.pug', {
				gp: gp,
			})
		} catch (err) {
			console.log('Error : ', err)
		}
	},

	darpatrakPramanpatra: async function (req, res) {
		try {
			let { y1, y2 } = req.query
			const gp = await getGpDetails(res)
			const gpMembers = JSON.parse(gp.gp_member)

			let sarpanch
			let upSarpanch
			let gramsevak

			gpMembers.forEach((member) => {
				let postName = member.p_name
				let memberName = member.name

				switch (postName) {
					case 'सरपंच':
						sarpanch = memberName
						break
					case 'उपसरपंच':
						upSarpanch = memberName
						break
					case 'ग्रामपंचायत अधिकारी':
						gramsevak = memberName
						break
				}
			})

			const arogyaDivaKar = await HomeModel.getAarogyaDivaKarList(res.pool)
			const bandhkamPrakar = await HomeModel.getBahandkamPrakarList(res.pool)

			console.log(bandhkamPrakar)

			res.render('user/blankCertificates/darpatrakPramanpatra.pug', {
				gp: gp,
				sarpanch,
				upSarpanch,
				gramsevak,
				arogyaDivaKar,
				bandhkamPrakar,
				y1,
				y2,
			})
		} catch (err) {
			console.log('Error : ', err)
		}
	},

	tharavPramanpatra: async function (req, res) {
		try {
			let { y1, y2 } = req.query

			const gp = await getGpDetails(res)
			const gpMembers = JSON.parse(gp.gp_member)

			let sarpanch
			let upSarpanch
			let gramsevak

			gpMembers.forEach((member) => {
				let postName = member.p_name
				let memberName = member.name

				switch (postName) {
					case 'सरपंच':
						sarpanch = memberName
						break
					case 'उपसरपंच':
						upSarpanch = memberName
						break
					case 'ग्रामपंचायत अधिकारी':
						gramsevak = memberName
						break
				}
			})

			const arogyaDivaKar = await HomeModel.getAarogyaDivaKarList(res.pool)
			const bandhkamPrakar = await HomeModel.getBahandkamPrakarList(res.pool)

			res.render('user/blankCertificates/tharavPramanpatra.pug', {
				gp: gp,
				sarpanch,
				upSarpanch,
				gramsevak,
				arogyaDivaKar,
				bandhkamPrakar,
				y1,
				y2,
			})
		} catch (err) {
			console.log('Error : ', err)
			return res.status({
				call: 0,
				message: 'Not found',
			})
		}
	},

	renderNamuna9SamanyaHeader: async function (req, res) {
		try {
			let { y1, y2 } = req.query

			const gp = await getGpDetails(res)
			const gpMembers = JSON.parse(gp.gp_member)

			let sarpanch
			let upSarpanch
			let gramsevak

			gpMembers.forEach((member) => {
				let postName = member.p_name
				let memberName = member.name

				switch (postName) {
					case 'सरपंच':
						sarpanch = memberName
						break
					case 'उपसरपंच':
						upSarpanch = memberName
						break
					case 'ग्रामपंचायत अधिकारी':
						gramsevak = memberName
						break
				}
			})

			res.render('user/blankCertificates/namuna-9-samanya-header.pug', {
				gp: gp,
				sarpanch,
				upSarpanch,
				gramsevak,
				y1,
				y2,
			})
		} catch (err) {
			console.log('Error : ', err)
			return res.status({
				call: 0,
				message: 'Not found',
			})
		}
	},

	renderNamuna9PanipattiTharav: async function (req, res) {
		try {
			let { y1, y2 } = req.query
			const gp = await getGpDetails(res)
			const gpMembers = JSON.parse(gp.gp_member)

			// Initialize variables for members
			let sarpanch
			let upSarpanch
			let gramsevak

			// Extract relevant members
			gpMembers.forEach((member) => {
				let postName = member.p_name
				let memberName = member.name

				switch (postName) {
					case 'सरपंच':
						sarpanch = memberName
						break
					case 'उपसरपंच':
						upSarpanch = memberName
						break
					case 'ग्रामपंचायत अधिकारी':
						gramsevak = memberName
						break
				}
			})

			// Render the Pug file
			res.render('user/blankCertificates/namuna-9-panipatti-tharav.pug', {
				gp: gp,
				sarpanch,
				upSarpanch,
				gramsevak,
				y1,
				y2,
			})
		} catch (err) {
			console.log('Error: ', err)
			return res.status(500).json({
				call: 0,
				message: 'Internal Server Error',
			})
		}
	},

	renderNamuna9PaniHeader: async function (req, res) {
		try {
			let { y1, y2 } = req.query
			const gp = await getGpDetails(res)
			const gpMembers = JSON.parse(gp.gp_member)

			// Initialize variables for members
			let sarpanch
			let upSarpanch
			let gramsevak

			// Extract relevant members
			gpMembers.forEach((member) => {
				let postName = member.p_name
				let memberName = member.name

				switch (postName) {
					case 'सरपंच':
						sarpanch = memberName
						break
					case 'उपसरपंच':
						upSarpanch = memberName
						break
					case 'ग्रामपंचायत अधिकारी':
						gramsevak = memberName
						break
				}
			})

			// Render the Pug file
			res.render('user/blankCertificates/namuna-9-pani-header.pug', {
				gp: gp,
				sarpanch,
				upSarpanch,
				gramsevak,
				y1,
				y2,
			})
		} catch (err) {
			console.log('Error: ', err)
			return res.status(500).json({
				call: 0,
				message: 'Internal Server Error',
			})
		}
	},

	renderNamuna9SamanyaKarPramanpatraTharav: async function (req, res) {
		try {
			let { y1, y2 } = req.query
			const gp = await getGpDetails(res)
			const gpMembers = JSON.parse(gp.gp_member)

			// Initialize variables for members
			let sarpanch
			let upSarpanch
			let gramsevak

			// Extract relevant members
			gpMembers.forEach((member) => {
				let postName = member.p_name
				let memberName = member.name

				switch (postName) {
					case 'सरपंच':
						sarpanch = memberName
						break
					case 'उपसरपंच':
						upSarpanch = memberName
						break
					case 'ग्रामपंचायत अधिकारी':
						gramsevak = memberName
						break
				}
			})

			// Render the Pug file
			res.render(
				'user/blankCertificates/namuna-9-samanya-kar-pramanpatra-tharav.pug',
				{
					gp: gp,
					sarpanch,
					upSarpanch,
					gramsevak,
					y1,
					y2,
				}
			)
		} catch (err) {
			console.log('Error: ', err)
			return res.status(500).json({
				call: 0,
				message: 'Internal Server Error',
			})
		}
	},

	renderNamuna8Header: async function (req, res) {
		try {
			let { y1, y2 } = req.query
			const gp = await getGpDetails(res)
			const gpMembers = JSON.parse(gp.gp_member)

			// Initialize variables for members
			let sarpanch
			let upSarpanch
			let gramsevak

			// Extract relevant members
			gpMembers.forEach((member) => {
				let postName = member.p_name
				let memberName = member.name

				switch (postName) {
					case 'सरपंच':
						sarpanch = memberName
						break
					case 'उपसरपंच':
						upSarpanch = memberName
						break
					case 'ग्रामपंचायत अधिकारी':
						gramsevak = memberName
						break
				}
			})

			// Render the Pug file
			res.render('user/blankCertificates/namuna-8-header.pug', {
				gp: gp,
				sarpanch,
				upSarpanch,
				gramsevak,
				y1,
				y2,
			})
		} catch (err) {
			console.log('Error: ', err)
			return res.status(500).json({
				call: 0,
				message: 'Internal Server Error',
			})
		}
	},

	blankHeaderPrint: async function (_, res) {
		try {
			const gp = await getGpDetails(res)
			res.render('user/blankCertificates/blankHeaderPrint.pug', {
				gp: gp,
			})
		} catch (error) {
			console.log('Error : ', error)
		}
	},




	renderBlankNamuna9PendingTaxesPage: asyncHandler(async (req, res) => {
		const _gp = await HomeModel.getGpData(res.pool)

		let data = await FormPrintModel.allForm8Users(res.pool, 'malmatta')
		res.render('user/blankCertificates/namuna-9-pending-taxes-print.pug', {
			zp: _gp[0],
			data,
			year: {}
		})
	}),
}

async function getGpDetails(res) {
	let gp = await ZPModel.getZpDetails(res.pool)
	return gp[0]
}

function sendError(res, error) {
	return res.status(500).json({
		call: 0,
		data: error,
	})
}

module.exports = blankCertificateController
