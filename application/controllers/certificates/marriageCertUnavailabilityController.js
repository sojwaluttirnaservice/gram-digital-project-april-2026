const marriageCertUnavailabilityModel = require("../../model/certifcates/marriageCertUnavailabilityModel");
const { sendApiResponse } = require("../../utils/apiResponses");
const AppError = require("../../utils/AppError");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/sendResponse");

const marriageCertUnavailabilityController = {
  renderUnavailabilityPage: asyncHandler(async (req, res) => {
    let marriageCertUnavailabilityCertificates =
      await marriageCertUnavailabilityModel.getList(res.pool);

    renderPage(
      res,
      "user/certificates/marriage-cert/marriage-cert-unavailability-certificate-page.pug",
      {
        title: 'विवाह नोंद अनुपलब्धता प्रमाणपत्र यादी',
        marriageCertUnavailabilityCertificates,
      },
    );
  }),

  renderUnavailabilityForm: asyncHandler(async (req, res) => {
    renderPage(
      res,
      "user/certificates/marriage-cert/marriage-cert-unavailability-certificate-form.pug",
      {marriageCertUnavailabilityCertificate: {}}
    );
  }),

  renderEditUnavailabilityForm: asyncHandler(async (req, res) => {
    const { id } = req.params;
    let [marriageCertUnavailabilityCertificate] =
      await marriageCertUnavailabilityModel.getCertificate(res.pool, id);

    renderPage(
      res,
      "user/certificates/marriage-cert/marriage-cert-unavailability-certificate-form.pug",
      {
        marriageCertUnavailabilityCertificate,
        isEdit: true
      },
    );
  }),

  addCertificate: asyncHandler(async (req, res) => {
    const data = req.body;

    if (!data) {
      throw new AppError("डेटा नाही पाठवला.", 400);
    }

    const _res = await marriageCertUnavailabilityModel.addCertificate(
      res.pool,
      data,
    );
    if (_res.affectedRows >= 1)
      return sendApiResponse(res, 201, true, "Certificate saved successfully.");
  }),

  updateCertificate: asyncHandler(async (req, res) => {
    const data = req.body;

    if (!data || !data.id) {
      throw new AppError("Data and ID are required.", 400);
    }

    const _res = await marriageCertUnavailabilityModel.updateCertificate(
      res.pool,
      data,
    );

    if (_res.affectedRows >= 1) {
      return sendApiResponse(
        res,
        200,
        true,
        "Certificate updated successfully.",
      );
    }
  }),

  deleteCertificate: asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
      throw new AppError("ID is required.", 400);
    }

    const _res = await marriageCertUnavailabilityModel.deleteCertificate(
      res.pool,
      id,
    );

    if (_res.affectedRows >= 1) {
      return sendApiResponse(
        res,
        200,
        true,
        "Certificate deleted successfully.",
      );
    }
  }),

  getList: asyncHandler(async (req, res) => {
    const _certificates = await marriageCertUnavailabilityModel.getList(
      res.pool,
    );
    return sendApiResponse(res, 200, true, "", _certificates);
  }),

  printUnavailabilityCertificate: asyncHandler(async (req, res) => {
    const { id } = req.params;
    let [marriageCertUnavailability] =
      await marriageCertUnavailabilityModel.getCertificate(res.pool, id);
    renderPage(
      res,
      "user/certificates/marriage-cert/marriage-cert-unavailability-certificate-print.pug",
      {
        title: 'विवाह नोंद अनुपलब्धता प्रिंट',
        marriageCertUnavailability,
        date: req.query?.date,
      },
    );
  }),

  renderMarriageCertUnavailabilityDetailsPage: asyncHandler(async (req, res) => {
 const { id } = req.params;
    let [marriageCertUnavailability] =
      await marriageCertUnavailabilityModel.getCertificate(res.pool, id);
    renderPage(
      res,
      "user/certificates/marriage-cert/marriage-cert-unavailability-certificate-details-page.pug",
      {
        title: 'विवाह नोंद अनुपलब्धता प्रिंट',
        marriageCertUnavailability,
        date: req.query?.date,
      },
    );     
  }),

  renderMarriageCertUnavailabilityReportPage: asyncHandler(async (req, res) => {
      let filters = req.query;

      let marriageCertUnavailabilityCertificates =
      await marriageCertUnavailabilityModel.getList(res.pool, filters);

      renderPage(res, 'user/certificates/marriage-cert/marriage-cert-unavailability-certificate-report-page.pug', {
       title: '',
       marriageCertUnavailabilityCertificates,
       ...filters 
      })
  }),
};

module.exports = marriageCertUnavailabilityController;
