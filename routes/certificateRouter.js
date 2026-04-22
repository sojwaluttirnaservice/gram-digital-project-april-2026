var CertificateController = require('../application/controllers/CertificateController');
const getRouter = require('../application/utils/getRouter');
const middleware = require('./middleware');
const certificateRouter = getRouter();

certificateRouter.get(
  '/',
  middleware.checkForPoolConnectionWithSession,
  CertificateController.allList
);
certificateRouter.get(
  '/add-new',
  middleware.checkForPoolConnectionWithSession,
  CertificateController.addNewEntryView
);

certificateRouter.post(
  '/',
  CertificateController.saveNewThakbakiNiradharEntry
);

certificateRouter.post(
  '/post-edit-data',
  CertificateController.updateCertificateData
);

certificateRouter.post(
  '/remove-certificate',
  CertificateController.removeCertificate
);

certificateRouter.get(
  '/edit-certificate',
  CertificateController.editCertificate
);

module.exports = certificateRouter;
