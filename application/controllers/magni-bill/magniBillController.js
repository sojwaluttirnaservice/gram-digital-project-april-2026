const watertaxModel = require('../../model/watertax/watertaxModel');
const FormNineModel = require('../../model/FormNightModel');
const qrCodeModel = require('../../model/qrCode/qrCodeModel');
const { renderPage } = require('../../utils/sendResponse');

const magniBillController = {
	renderMagniBillPage: asyncHandler(async (req, res) => {
		renderPage(res, 'user/magni-bill/magni-bill-page.pug')
	}),

	printWatertaxMagniBill: asyncHandler(async (req, res) => {
		let { year1, year2, date, p, tp } = req.query;
		let y1 = year1.split('-')[0];
		let y2 = year2.split('-')[0];

		const _totalRecords = await watertaxModel.allWatertax(res.pool);
		const _watertaxPrintData = await watertaxModel.watertaxPrintData(
			res.pool,
			y1,
			y2,
			p,
			tp
		);
		renderPage(res, 'user/magni-bill/print-watertax-magni-bill.pug', {
			billStart: p * tp,
			totalRecords: _totalRecords.length,
			data: _watertaxPrintData,
			dataString: JSON.stringify(_watertaxPrintData),
			year1,
			year2,
			date,
			tp,
			p
		})
	}),
	printMagniBillOther: asyncHandler(async (req, res) => {
		let { year1, year2, date, p, tp } = req.query;
		let y1 = year1.split('-')[0];
		let y2 = year2.split('-')[0];

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

		renderPage(res, 'user/magni-bill/print-magni-bill-other', {
			billStart: p * tp,
			totalRecords: _totalRecords.length,
			data: _printData,
			dataString: JSON.stringify(_printData),
			year1,
			year2,
			date,
			tp,
			p
		});
	}),

	printQrCodeMagniBillOther: asyncHandler(async (req, res) => {
		let { year1, year2, date, p, tp } = req.query;
		let y1 = year1.split('-')[0];
		let y2 = year2.split('-')[0];

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

		renderPage(res, 'user/magni-bill/print-qr-code-magni-bill-other', {
			billStart: p * tp,
			totalRecords: _totalRecords.length,
			data: _printData,
			dataString: JSON.stringify(_printData),
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
			bankQrCodePath: '/new-gp-page/main-page/files/qr-codes'
		});
	}),

	print9CBankMagniBill: asyncHandler(async (req, res) => {
		let { year1, year2, date, p, tp, printFormat } = req.query;
		let y1 = year1.split('-')[0];
		let y2 = year2.split('-')[0];

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
		renderPage(res, 'user/magni-bill/print-9-c-bank-magni-bill-copy', {
			billStart: p * tp,
			totalRecords: _totalRecords.length,
			data: _printData,
			dataString: JSON.stringify(_printData),
			year1,
			year2,
			date,
			tp,
			p,
			qrCodes: bankQRCodeList[0] || {},
			basePath: '/new-gp-page/main-page/files/qr-codes',
			printFormat
		});
	}),

	print9CMagniBill: asyncHandler(async (req, res) => {
		let { year1, year2, date, p, tp } = req.query;
		let y1 = year1.split('-')[0];
		let y2 = year2.split('-')[0];

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

		renderPage(res, 'user/magni-bill/print-9-c-magni-bill', {
			billStart: p * tp,
			totalRecords: _totalRecords.length,
			data: _printData,
			dataString: JSON.stringify(_printData),
			year1,
			year2,
			date,
			tp,
			p,
			qrCodes: bankQRCodeList[0],
			basePath: '/new-gp-page/main-page/files/qr-codes'
		});
	})
};

module.exports = magniBillController;
