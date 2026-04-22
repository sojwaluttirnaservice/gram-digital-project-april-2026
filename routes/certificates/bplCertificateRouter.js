const bplController = require("../../application/controllers/certificates/bplCertificateController");
const getRouter = require("../../application/utils/getRouter");

const bplCertificateRouter = getRouter()

bplCertificateRouter.get('/list', bplController.renderBplCertificateListPage)

bplCertificateRouter.get('/save', bplController.renderSaveBplCertificatePage)

bplCertificateRouter.get('/edit/:bplCertificateId', bplController.renderEditBplCertificatePage)

bplCertificateRouter.get('/print/:bplCertificateId', bplController.renderPrintBplCertificatePage)

bplCertificateRouter.post('/', bplController.save)

bplCertificateRouter.put('/', bplController.update)

bplCertificateRouter.delete('/', bplController.delete)


bplCertificateRouter.post('/family-member', bplController.saveFamilyMember)

bplCertificateRouter.put('/family-member', bplController.updateFamilyMember)

bplCertificateRouter.delete('/family-member', bplController.deleteFamilyMember)

module.exports = bplCertificateRouter



