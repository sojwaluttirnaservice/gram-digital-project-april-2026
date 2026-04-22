const unavailabilityCertificateModel = require("../../model/certifcates/unavailabilityCertificateModel");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/sendResponse");

const unavailabilityCertificateController = {
  renderUnavailabilityPage: asyncHandler(async (req, res) => {
    let unavailabilityCertificates =
      await unavailabilityCertificateModel.getList(res.pool);

    renderPage(
      res,
      "user/certificates/unavailability-certificate/unavailability-certificate-page.pug",
      {
        unavailabilityCertificates,
      },
    );
  }),

  renderUnavailabilityForm: asyncHandler(async (req, res) => {
    renderPage(
      res,
      "user/certificates/unavailability-certificate/unavailability-certificate-form.pug",
    );
  }),

  renderEditUnavailabilityForm: asyncHandler(async (req, res) => {
    const { id } = req.params;
    let [unavailabilityCertificate] =
      await unavailabilityCertificateModel.getCertificate(res.pool, id);

    renderPage(
      res,
      "user/certificates/unavailability-certificate/edit-unavailability-certificate-form.pug",
      {
        unavailabilityCertificate,
      },
    );
  }),

  addCertificate: async (req, res) => {
    try {
      const data = req.body;

      if (!data) {
        return res.status(400).json({ call: 0, message: "Data is required." });
      }

      const _res = await unavailabilityCertificateModel.addCertificate(
        res.pool,
        data,
      );

      if (_res.affectedRows >= 1) {
        return res
          .status(200)
          .json({ success: true, message: "Certificate added successfully." });
      }
    } catch (err) {
      console.log(`Error while adding the unavailability certificate: ${err}`);
      return res.status(500).json({
        success: false,
        message: "Error while adding the certificate.",
      });
    }
  },

  updateCertificate: async (req, res) => {
    console.log("in update");
    try {
      const data = req.body;

      if (!data || !data.id) {
        return res
          .status(400)
          .json({ success: false, message: "Data and ID are required." });
      }

      const _res = await unavailabilityCertificateModel.updateCertificate(
        res.pool,
        data,
      );

      if (_res.affectedRows >= 1) {
        return res.status(200).json({
          success: true,
          message: "Certificate updated successfully.",
        });
      }
    } catch (err) {
      console.log(
        `Error while updating the unavailability certificate: ${err}`,
      );
      return res.status(500).json({
        success: false,
        message: "Error while updating the certificate.",
      });
    }
  },

  deleteCertificate: async (req, res) => {
    try {
      const { id } = req.body;

      if (!id) {
        return res
          .status(400)
          .json({ sucess: false, message: "ID is required." });
      }

      const _res = await unavailabilityCertificateModel.deleteCertificate(
        res.pool,
        id,
      );

      if (_res.affectedRows >= 1) {
        return res.status(200).json({
          success: true,
          message: "Certificate deleted successfully.",
        });
      }
    } catch (err) {
      console.log(
        `Error while deleting the unavailability certificate: ${err}`,
      );
      return res.status(500).json({
        success: false,
        message: "Error while deleting the certificate.",
      });
    }
  },

  getList: async (req, res) => {
    try {
      const _certificates = await unavailabilityCertificateModel.getList(
        res.pool,
      );
      return res.status(200).json({ success: true, data: _certificates });
    } catch (err) {
      console.log(`Error while fetching the certificate list: ${err}`);
      return res.status(500).json({
        success: false,
        message: "Error while fetching the certificate list.",
      });
    }
  },

  printUnavailabilityCertificate: asyncHandler(async (req, res) => {
    const { id } = req.params;
    let [unavailabilityCertificate] =
      await unavailabilityCertificateModel.getCertificate(res.pool, id);
    renderPage(
      res,
      "user/certificates/unavailability-certificate/unavailability-certificate-print.pug",
      {
        unavailabilityCertificate,
        date: req.query?.date,
      },
    );
  }),
};

module.exports = unavailabilityCertificateController;
