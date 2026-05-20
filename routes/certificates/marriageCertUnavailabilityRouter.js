const marriageCertUnavailabilityController = require("../../application/controllers/certificates/marriageCertUnavailabilityController");
const getRouter = require("../../application/utils/getRouter");

const marriageCertUnavailabilityRouter = getRouter();

marriageCertUnavailabilityRouter.get(
  "/",
  marriageCertUnavailabilityController.renderUnavailabilityPage
);

marriageCertUnavailabilityRouter.get(
  "/form",
  marriageCertUnavailabilityController.renderUnavailabilityForm
);

marriageCertUnavailabilityRouter.get(
  "/edit/:id",
  marriageCertUnavailabilityController.renderEditUnavailabilityForm
);

marriageCertUnavailabilityRouter.post(
  "/",
  marriageCertUnavailabilityController.addCertificate
);

marriageCertUnavailabilityRouter.put(
  "/",
  marriageCertUnavailabilityController.updateCertificate
);

marriageCertUnavailabilityRouter.delete(
  "/:id",
  marriageCertUnavailabilityController.deleteCertificate
);

marriageCertUnavailabilityRouter.get(
  "/print/:id",
  marriageCertUnavailabilityController.printUnavailabilityCertificate
);

marriageCertUnavailabilityRouter.get(
  "/c/:id",
  marriageCertUnavailabilityController.renderMarriageCertUnavailabilityDetailsPage
);

marriageCertUnavailabilityRouter.get(
    '/report',
    marriageCertUnavailabilityController.renderMarriageCertUnavailabilityReportPage
)

module.exports = marriageCertUnavailabilityRouter;