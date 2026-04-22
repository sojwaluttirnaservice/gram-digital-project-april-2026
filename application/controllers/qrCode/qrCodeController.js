const qrCodeModel = require("../../model/qrCode/qrCodeModel");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/sendResponse");
const { baseDir } = require("../createBaseDir");
const fs = require("fs");

const qrCodeController = {
  renderQrCodePage: asyncHandler(async (req, res) => {
    let existingQrCodes = await qrCodeModel.qrCodeList(res.pool);

    if (existingQrCodes.length == 0) {
      await qrCodeModel.createEntry(res.pool);
      existingQrCodes = await qrCodeModel.qrCodeList(res.pool);
    }
    renderPage(res, "master/qr-codes/qr-codes-page.pug", {
      qrCodes: existingQrCodes[0],
      basePath: "/new-gp-page/main-page/files/qr-codes",
    });
  }),

  renderQrCodePageVillage: asyncHandler(async (req, res) => {
    let existingQrCodes = await qrCodeModel.qrCodeList(res.pool);

    if (existingQrCodes.length == 0) {
      await qrCodeModel.createEntry(res.pool);
      existingQrCodes = await qrCodeModel.qrCodeList(res.pool);
    }
    renderPage(res, "master/qr-codes/qr-codes-page.pug", {
      qrCodes: existingQrCodes[0],
      isMasterPanel: false,
      basePath: "/new-gp-page/main-page/files/qr-codes",
    });
  }),

  saveBankrQrCode: async (req, res) => {
    try {
      const existingQrCodes = await qrCodeModel.qrCodeList(res.pool);

      if (existingQrCodes.length == 0) {
        await qrCodeModel.createEntry(res.pool);
      }

      if (!req.files || req.files.qrCodeImage) {
        return res.status(404).json({
          call: 2,
          error: "NO image found",
          message: "Please provide an image",
        });
      }

      const qrCodeDir = `${baseDir}/new-gp-page/main-page/files/qr-codes`;

      const { oldBankQrCodeImageName } = req.body;
      if (
        oldBankQrCodeImageName &&
        fs.existsSync(`${qrCodeDir}/${oldBankQrCodeImageName}`)
      ) {
        fs.unlinkSync(`${qrCodeDir}/${oldBankQrCodeImageName}`);
      }

      const bankQrCodeImage = req.files.bankQrCodeImage;

      const imageExtension = bankQrCodeImage.name.split(".").pop();
      const qrCodeImageName = `bank-qr-code-image.${imageExtension}`;

      const qrCodeImagePath = `${qrCodeDir}/${qrCodeImageName}`;

      return await bankQrCodeImage.mv(qrCodeImagePath, async (err) => {
        if (err) {
          console.log(`Error while moving image to qr code directory: ${err}`);
          return res.status(500).json({
            call: 0,
            error: err,
            message: "Internal Server Error",
          });
        } else {
          await qrCodeModel.updateBankQRCodeImageName(
            res.pool,
            qrCodeImageName
          );
          return res.status(200).json({
            call: 1,
            message: "Bank QR Code updated successfully",
            // qrCodeImagePath,
          });
        }
      });
    } catch (err) {
      console.log(`Error while saving the bank qr Code : ${err}`);
      return res.status(500).json({
        call: 0,
        error: err,
        message: "Internal Server Error",
      });
    }
  },

  toggleQrBankCodeVisbility: async (req, res) => {
    try {
      const { visibilityToSet } = req.query;

      const result = await qrCodeModel.toggleQrBankCodeVisbility(
        res.pool,
        visibilityToSet
      );

      if (result.affectedRows > 0) {
        return res.status(200).json({
          call: 1,
          message: "Visibility of Bank QR Code toggled successfully",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  saveBankrQrCodeWater: async (req, res) => {
    try {
      const existingQrCodes = await qrCodeModel.qrCodeList(res.pool);

      if (existingQrCodes.length == 0) {
        await qrCodeModel.createEntry(res.pool);
      }

      if (!req.files || req.files.qrCodeImageForWater) {
        return res.status(404).json({
          call: 2,
          error: "NO image found",
          message: "Please provide an image",
        });
      }

      const qrCodeDir = `${baseDir}/new-gp-page/main-page/files/qr-codes`;

      const { oldBankQrCodeImageNameForWater } = req.body;
      if (
        oldBankQrCodeImageNameForWater &&
        oldBankQrCodeImageNameForWater.trim() &&
        fs.existsSync(`${qrCodeDir}/${oldBankQrCodeImageNameForWater}`)
      ) {
        fs.unlinkSync(`${qrCodeDir}/${oldBankQrCodeImageNameForWater}`);
      }

      const bankQrCodeImageForWater = req.files.bankQrCodeImageForWater;

      const imageExtension = bankQrCodeImageForWater.name.split(".").pop();
      const qrCodeImageName = `bank-qr-code-water-image.${imageExtension}`;

      const qrCodeImagePath = `${qrCodeDir}/${qrCodeImageName}`;

      return await bankQrCodeImageForWater.mv(qrCodeImagePath, async (err) => {
        if (err) {
          console.log(`Error while moving image to qr code directory: ${err}`);
          return res.status(500).json({
            call: 0,
            error: err,
            message: "Internal Server Error",
          });
        } else {
          await qrCodeModel.updateBankQRCodeWaterImageName(
            res.pool,
            qrCodeImageName
          );
          return res.status(200).json({
            call: 1,
            message: "Bank QR Code WATER updated successfully",
            // qrCodeImagePath,
          });
        }
      });
    } catch (err) {
      console.log(`Error while saving the bank qr Code : ${err}`);
      return res.status(500).json({
        call: 0,
        error: err,
        message: "Internal Server Error",
      });
    }
  },

  toggleQrBankWaterCodeVisbility: async (req, res) => {
    try {
      const { visibilityToSet } = req.query;

      const result = await qrCodeModel.toggleQrBankCodeWaterVisbility(
        res.pool,
        visibilityToSet
      );

      if (result.affectedRows > 0) {
        return res.status(200).json({
          call: 1,
          message: "Visibility of Bank QR Water Code toggled successfully",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = qrCodeController;
