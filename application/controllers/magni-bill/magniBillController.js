const ZPModel = require("../../model/ZPModel");
const watertaxModel = require("../../model/watertax/watertaxModel");
const FormNineModel = require("../../model/FormNightModel");
const qrCodeModel = require("../../model/qrCode/qrCodeModel");
const { renderPage } = require("../../utils/sendResponse");

const magniBillController = {
  renderMagniBillPage: async (req, res) => {
    try {
      const _gp = await ZPModel.getZpDetails(res.pool);

      res.render("user/magni-bill/magni-bill-page.pug", {
        gp: _gp[0],
      });
    } catch (err) {
      console.log(`Error while showing the magni bill page : ${err}`);
      return res.status(500).json({
        success: false,
        status: 500,
        data: {
          error: err,
          message: "Internal Server Error",
        },
      });
    }
  },

  printWatertaxMagniBill: async (req, res) => {
    try {
      let { year1, year2, date, p, tp } = req.query;
      let y1 = year1.split("-")[0];
      let y2 = year2.split("-")[0];

      const _zp = await ZPModel.getZpDetails(res.pool);
      const _totalRecords = await watertaxModel.allWatertax(res.pool);
      const _watertaxPrintData = await watertaxModel.watertaxPrintData(
        res.pool,
        y1,
        y2,
        p,
        tp
      );
      res.render("user/magni-bill/print-watertax-magni-bill.pug", {
        billStart: p * tp,
        totalRecords: _totalRecords.length,
        data: _watertaxPrintData,
        dataString: JSON.stringify(_watertaxPrintData),
        zp: _zp[0],
        year1,
        year2,
        date,
        tp,
        p,
      });
    } catch (err) {
      console.log(`Error while  : ${err}`);
      return res.status(500).json({
        success: false,
        status: 500,
        data: {
          error: err,
          message: "Internal Server Error",
        },
      });
    }
  },
  printMagniBillOther: async (req, res) => {
    try {
      let { year1, year2, date, p, tp } = req.query;
      let y1 = year1.split("-")[0];
      let y2 = year2.split("-")[0];

      const _zp = await ZPModel.getZpDetails(res.pool);
      const _totalRecords = await FormNineModel.getTotalPrintCount(
        res.pool,
        y1,
        y2
      );

      const _printData = await FormNineModel.getSamanyaPrintData(
        res.pool,
        y1,
        y2,
        p,
        tp
      );

      res.render("user/magni-bill/print-magni-bill-other", {
        billStart: p * tp,
        totalRecords: _totalRecords.length,
        data: _printData,
        dataString: JSON.stringify(_printData),
        zp: _zp[0],
        year1,
        year2,
        date,
        tp,
        p,
      });
    } catch (err) {
      console.log(`Error while showing the print page : ${err}`);
    }
  },

  printQrCodeMagniBillOther: async (req, res) => {
    try {
      let { year1, year2, date, p, tp } = req.query;
      let y1 = year1.split("-")[0];
      let y2 = year2.split("-")[0];

      const _zp = await ZPModel.getZpDetails(res.pool);
      const _totalRecords = await FormNineModel.getTotalPrintCount(
        res.pool,
        y1,
        y2
      );

      const _printData = await FormNineModel.getSamanyaPrintData(
        res.pool,
        y1,
        y2,
        p,
        tp
      );

      const bankQRCodeList = await qrCodeModel.qrCodeList(res.pool);

      res.render("user/magni-bill/print-qr-code-magni-bill-other", {
        billStart: p * tp,
        totalRecords: _totalRecords.length,
        data: _printData,
        dataString: JSON.stringify(_printData),
        zp: _zp[0],
        year1,
        year2,
        date,
        tp,
        p,

        bankQrCodeName:
          bankQRCodeList?.length > 0
            ? bankQRCodeList[0]?.bank_qr_code_image_name
            : null,
        showBankQrCode:
          bankQRCodeList?.length > 0
            ? bankQRCodeList[0]?.show_bank_qr_code_image
            : 0,
        bankQrCodePath: "/new-gp-page/main-page/files/qr-codes",
      });
    } catch (err) {
      console.log(`Error while showing the print page : ${err}`);
    }
  },

  print9CBankMagniBill: async (req, res) => {
    try {
      let { year1, year2, date, p, tp, printFormat } = req.query;
      let y1 = year1.split("-")[0];
      let y2 = year2.split("-")[0];

      const _zp = await ZPModel.getZpDetails(res.pool);
      const _totalRecords = await FormNineModel.getTotalPrintCount(
        res.pool,
        y1,
        y2
      );

      const _printData = await FormNineModel.getSamanyaPrintData(
        res.pool,
        y1,
        y2,
        p,
        tp
      );

      const bankQRCodeList = await qrCodeModel.qrCodeList(res.pool);

      //   original file => user/magni-bill/print-9-c-bank-magni-bill
      renderPage(res, "user/magni-bill/print-9-c-bank-magni-bill-copy", {
        billStart: p * tp,
        totalRecords: _totalRecords.length,
        data: _printData,
        dataString: JSON.stringify(_printData),
        zp: _zp[0],
        year1,
        year2,
        date,
        tp,
        p,
        qrCodes: bankQRCodeList[0] || {},
        basePath: "/new-gp-page/main-page/files/qr-codes",
        printFormat,
      });
    } catch (err) {
      console.log(
        `Error while loading the print 9 c bank magni bill page : ${err}`
      );
    }
  },

  print9CMagniBill: async (req, res) => {
    try {
      let { year1, year2, date, p, tp } = req.query;
      let y1 = year1.split("-")[0];
      let y2 = year2.split("-")[0];

      const _zp = await ZPModel.getZpDetails(res.pool);
      const _totalRecords = await FormNineModel.getTotalPrintCount(
        res.pool,
        y1,
        y2
      );

      const _printData = await FormNineModel.getSamanyaPrintData(
        res.pool,
        y1,
        y2,
        p,
        tp
      );

      const bankQRCodeList = await qrCodeModel.qrCodeList(res.pool);

      res.render("user/magni-bill/print-9-c-magni-bill", {
        billStart: p * tp,
        totalRecords: _totalRecords.length,
        data: _printData,
        dataString: JSON.stringify(_printData),
        zp: _zp[0],
        year1,
        year2,
        date,
        tp,
        p,
        qrCodes: bankQRCodeList[0],
        basePath: "/new-gp-page/main-page/files/qr-codes",
      });
    } catch (err) {
      console.log(
        `Error while loading the print 9 c  magni bill page : ${err}`
      );
    }
  },
};

module.exports = magniBillController;
