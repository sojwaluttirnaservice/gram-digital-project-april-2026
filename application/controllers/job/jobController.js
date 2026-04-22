const HomeModel = require('../../model/HomeModel')
const jobModel = require('../../model/job/jobModel')
const CandidateController = require('../HomeController')

const jobController = {
	getJobRelatedView: async (req, res) => {
		let gp = {}
		try {
			let requiredData = await CandidateController.getCommonData(req, res)

			jobModel
				.getAllNonExpiredJobs(res.pool)

				.then((jobs) => {
					return res.render('user/jobs/job-related-view.pug', {
						...requiredData,
						jobs,
					})
				})
				.catch((err) => {
					return res.status(500).json({
						call: 0,
						error: err,
					})
				})
		} catch (err) {
			console.log('Error while showing job related view : ', err)
		}
	},
}

module.exports = jobController
