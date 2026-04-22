const express = require('express')
const { checkForPoolConnection } = require('../middleware')
const educationDetailsController = require('../../application/controllers/education/educationDetailsController')
const educationDetailsRouter = express.Router()

educationDetailsRouter.get(
	'/school-college-list-view',
	checkForPoolConnection,
	educationDetailsController.getSchoolCollegeListView
)

educationDetailsRouter.get(
	'/school-college-gallery-view',
	checkForPoolConnection,
	educationDetailsController.getEducationInstituteGalleryView
)

educationDetailsRouter.get(
	'/institute-details-view',
	checkForPoolConnection,
	educationDetailsController.getSingleEducationInstituteDetailsView
)



// for the pages inside the gram login

educationDetailsRouter.get(
	'/get-add-education-details',
	checkForPoolConnection,
	educationDetailsController.get_add_education_details_view
)


educationDetailsRouter.get(
	'/institute-gallery-view',
	checkForPoolConnection,
	educationDetailsController.getGPEducationInstituteGalleryView
)


educationDetailsRouter.get(
	'/gp-institute-details-view',
	checkForPoolConnection,
	educationDetailsController.getGPSingleEducationInstituteDetailsView
)

module.exports = educationDetailsRouter
