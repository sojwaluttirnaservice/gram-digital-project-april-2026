const express = require('express')
const divyangaController = require('../../application/controllers/divyangaController/divyangaController')
const getRouter = require('../../application/utils/getRouter')
const { isUserLoggedIn } = require('../middleware')

const divyangaRouter = getRouter()
divyangaRouter.get(
	'/divyanga-registration-view',
	divyangaController.getDivyangRegistrationView
)

divyangaRouter.get(
    '/edit/:applicationId',
    divyangaController.renderEditDivyangaApplicationPage
)

divyangaRouter.put(
    '/',
    divyangaController.updateDivyangaUser
)

divyangaRouter.get(
    '/approved',
    divyangaController.renderApprovedApplications
)

divyangaRouter.post(
	'/register-new-divyanga-user',
	divyangaController.registerNewDivyangaUser
)

divyangaRouter.get(
	'/applications',
    isUserLoggedIn,
	divyangaController.getDivyangaApplicationsListView
)

divyangaRouter.put(
	'/approve-divyanga-user-application-form',
    isUserLoggedIn,
	divyangaController.approveDivyangaApplication
)
divyangaRouter.put(
	'/reject-divyanga-user-application-form',
    isUserLoggedIn,
	divyangaController.rejectDivyangaApplication
)

divyangaRouter.post(
	'/check-divyanga-user-exists',
	divyangaController.checkIfDivyangaUserAlreadyExists
)

module.exports = divyangaRouter
