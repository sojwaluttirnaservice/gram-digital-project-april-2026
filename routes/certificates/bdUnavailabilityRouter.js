const unavailabilityCertificateController = require("../../application/controllers/certificates/unavailabilityCertificateController");
const getRouter = require("../../application/utils/getRouter");

const bdUnavailabilityRouter = getRouter();

bdUnavailabilityRouter.get(
  "/",
  unavailabilityCertificateController.renderUnavailabilityPage
);

bdUnavailabilityRouter.get(
  "/form",
  unavailabilityCertificateController.renderUnavailabilityForm
);

bdUnavailabilityRouter.get(
  "/edit-form/:id",
  unavailabilityCertificateController.renderEditUnavailabilityForm
);

bdUnavailabilityRouter.post(
  "/save-unavailability-certificate",
  unavailabilityCertificateController.addCertificate
);

bdUnavailabilityRouter.put(
  "/update-unavailability-certificate",
  unavailabilityCertificateController.updateCertificate
);

bdUnavailabilityRouter.delete(
  "/delete",
  unavailabilityCertificateController.deleteCertificate
);

bdUnavailabilityRouter.get(
  "/print/:id",
  unavailabilityCertificateController.printUnavailabilityCertificate
);

module.exports = bdUnavailabilityRouter;
