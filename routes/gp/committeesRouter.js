const { cp } = require("fs-extra");
const committeesController = require("../../application/controllers/gp/committeesController");
const getRouter = require("../../application/utils/getRouter");

const committeesRouter = getRouter()


committeesRouter.get('/', committeesController.renderCommitteeListPage)

committeesRouter.get('/add', committeesController.renderAddCommiteePage)

committeesRouter.get('/edit/:committeeId', committeesController.renderEditCommiteePage)

committeesRouter.post('/', committeesController.addCommittee)

committeesRouter.put('/', committeesController.updateCommittee)

committeesRouter.delete('/', committeesController.deleteCommittee)

committeesRouter.get('/members/:committeeId', committeesController.renderCommitteeMembersListPage)

committeesRouter.get('/members/add/:committeeId', committeesController.renderAddCommitteeMemberPage)

committeesRouter.get('/members/edit/:memberId', committeesController.renderEditCommitteeMemberPage)

committeesRouter.delete('/members', committeesController.deleteCommitteeMember)

committeesRouter.post('/members', committeesController.addCommitteeMember)

committeesRouter.put('/members', committeesController.updateCommitteeMember)
// committeesRouter.get('/members')

module.exports = committeesRouter