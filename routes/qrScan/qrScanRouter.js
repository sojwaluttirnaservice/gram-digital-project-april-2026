const express = require("express");
const { checkForPoolConnection } = require("../middleware");
const MarriageModel = require("../../application/model/MarriageModel");
const HomeModel = require("../../application/model/HomeModel");
const birthCertificateModel = require("../../application/model/certifcates/birthCertificateModel");
const deathCertificateModel = require("../../application/model/certifcates/deathCertificateModel");
const asyncHandler = require("../../application/utils/asyncHandler");
const { renderPage } = require("../../application/utils/sendResponse");
const CertificateModel = require("../../application/model/CertificateModel");
const { sendApiResponse } = require("../../application/utils/apiResponses");
const FormPrintModel = require("../../application/model/FormPrintModel");
const qrCodeModel = require("../../application/model/qrCode/qrCodeModel");
const TaxPaymentModel = require("../../application/model/isTaxPaid/TaxPaymentModel");

const qrScanRouter = express.Router();

qrScanRouter.get(
  "/marriage-certificate",
  checkForPoolConnection,
  async (req, res) => {
    try {
      const { id } = req.query;
      const marriageCertificateData = await MarriageModel.getSingleMarriageData(
        res.pool,
        {
          i: id,
        }
      );
      renderPage(res, "user/qr-scan/marriage-certificate", {
        certificate: marriageCertificateData[0],
      });
    } catch (err) {
      console.log("Error while getting marriage certificate information");
    }
  }
);

qrScanRouter.get(
  "/birth-certificate",
  checkForPoolConnection,
  async (req, res) => {
    try {

      const { id } = req.query;

      const _birthCertificate = await birthCertificateModel.fetchBirthCertificateById(res.pool, id);

      renderPage(res, "user/qr-scan/birth-certificate", {
        certificate: _birthCertificate[0],
      });
    } catch (err) {
      console.log("Error while getting marriage certificate information");
    }
  }
);


qrScanRouter.get(
  "/death-certificate",
  checkForPoolConnection,
  async (req, res) => {
    try {
      const { id } = req.query;
      const _deathCertificate = await deathCertificateModel.fetchDeathCertificateById(res.pool, id);
      renderPage(res, "user/qr-scan/death-certificate", {
        certificate: _deathCertificate[0],
      });
    } catch (err) {
      console.log("Error while getting marriage certificate information");
    }
  }
);

qrScanRouter.get('/niradhar-certificate',
  checkForPoolConnection,
  asyncHandler(async (req, res) => {
    const { id } = req.query
    const _niradharCertificate = await CertificateModel.getSingleCertificate(res.pool, { i: id });

    renderPage(res, "user/qr-scan/niradhar-certificate", {
      certificate: _niradharCertificate[0],
    });
  }),
)

qrScanRouter.get(
  // TAx payer samanya
  '/tps',
  checkForPoolConnection,
  asyncHandler(async (req, res) => {

    // samanya tax id from table ps_tax_payer_list_samanya, and form 8 user id
    const { sTaxId, f8UserId } = req.query

    let form8UserData = null

    const formResult = await FormPrintModel.formEightUser(res.pool, { id: f8UserId });

    if (formResult.length === 0) {
      return res.status(404).send({ message: 'Form 8 user Details Not Found' });
    }

    form8UserData = formResult[0];

    const samanyaTaxResult = await FormPrintModel.getSingleTaxPayerSamanya(
      res.pool,
      sTaxId
    );

    const _qrCodes = await qrCodeModel.qrCodeList(res.pool);

    const paymentHistory = await TaxPaymentModel.getPaymentDetailsByMalmattaAndPaymentFor(res.pool, form8UserData.feu_malmattaNo, 1);

    renderPage(res, 'user/qr-scan/tax-payer-samanya.pug',
      {
        form8UserData,
        samanyaTax: samanyaTaxResult[0],
        qrCodes: _qrCodes[0] || {},
        paymentHistory
      }
    )
  }),
)



qrScanRouter.get(
  '/tpw',
  checkForPoolConnection,
  asyncHandler(async (req, res) => {
    // samanya tax id from table ps_tax_payer_list_samanya, and form 8 user id
    const { wId: waterTaxId, f8U: f8UserId } = req.query

    let form8UserData = null

    const formResult = await FormPrintModel.formEightUser(res.pool, { id: f8UserId });

    if (formResult.length === 0) {
      return res.status(404).send({ message: 'Form 8 user Details Not Found' });
    }

    form8UserData = formResult[0];

    const waterTaxResult = await FormPrintModel.getSingleTaxPayerPani(
      res.pool,
      waterTaxId
    );

    const _qrCodes = await qrCodeModel.qrCodeList(res.pool);

    const paymentHistory = await TaxPaymentModel.getPaymentDetailsByMalmattaAndPaymentFor(res.pool, form8UserData.feu_malmattaNo, 2);

    renderPage(res, 'user/qr-scan/tax-payer-water.pug',
      {
        form8UserData,
        waterTax: waterTaxResult[0],
        qrCodes: _qrCodes[0] || {},
        paymentHistory
      }
    )
  }),
)

module.exports = qrScanRouter;
