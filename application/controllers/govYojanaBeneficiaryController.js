const govYojanaBeneficiaryModel = require('../model/govYojana/govYojanaBeneficiaryModel');
const govYojanaModel = require('../model/govYojana/govYojanaModel');
const asyncHandler = require('../utils/asyncHandler');
const { renderPage } = require('../utils/sendResponse');
const generateUniqueFileName = require('../utils/generateFileName');
const { saveFile, deleteFile } = require('../utils/saveFile');
const { sendApiResponse } = require('../utils/apiResponses');
const AppError = require('../utils/AppError');
const { UPLOAD_PATHS } = require('../config/uploadPaths');

const govYojanaBeneficiaryController = {
	getBeneficiaryListView: asyncHandler(async (req, res) => {
		const yojanaId = req.query.yojanaId;
		if (!yojanaId) {
			throw new AppError('योजना आयडी आवश्यक आहे.', 400);
		}
		const [yojanaDetails] = await govYojanaModel.getById(
			res.pool,
			yojanaId
		);
		if (!yojanaDetails) {
			throw new AppError('योजना आढळली नाही.', 404);
		}
		const beneficiaryLists = await govYojanaBeneficiaryModel.listByYojanaId(
			res.pool,
			yojanaId
		);
		renderPage(res, 'master/gov-yojna-beneficiary-view.pug', {
			title: 'शासकीय योजना लाभार्थी यादी',
			yojanaDetails,
			beneficiaryLists
		});
	}),

	createBeneficiaryList: asyncHandler(async (req, res) => {
		const data = req.body;
		const file = req.files?.file;

		if (!file) {
			throw new AppError('दस्तऐवज फाइल आवश्यक आहे.', 400);
		}

		const fileName = generateUniqueFileName(file, 'gov-beneficiary-');
		const dest = `${UPLOAD_PATHS.files.govYojanaBeneficiary}/${fileName}`;

		if (req.filesToCleanup) {
			req.filesToCleanup.push(dest);
		}

		const isSaved = await saveFile(file, dest);
		if (!isSaved) {
			throw new AppError('फाइल जतन करण्यात अक्षम.', 500);
		}

		data.file_name = fileName;
		await govYojanaBeneficiaryModel.create(res.pool, data);
		return sendApiResponse(
			res,
			201,
			true,
			'लाभार्थी यादी यशस्वीरित्या जोडली गेली.'
		);
	}),

	updateBeneficiaryList: asyncHandler(async (req, res) => {
		const data = req.body;
		const file = req.files?.file;

		if (file) {
			const fileName = generateUniqueFileName(file, 'gov-beneficiary-');
			const dest = `${UPLOAD_PATHS.files.govYojanaBeneficiary}/${fileName}`;

			if (req.filesToCleanup) {
				req.filesToCleanup.push(dest);
			}

			const isSaved = await saveFile(file, dest);
			if (!isSaved) {
				throw new AppError('नवीन फाइल जतन करण्यात अक्षम.', 500);
			}

			data.file_name = fileName;

			const [oldRecord] = await govYojanaBeneficiaryModel.getById(
				res.pool,
				data.id
			);
			if (oldRecord && oldRecord.file_name) {
				const oldFilePath = `${UPLOAD_PATHS.files.govYojanaBeneficiary}/${oldRecord.file_name}`;
				await deleteFile(oldFilePath);
			}
		}

		await govYojanaBeneficiaryModel.update(res.pool, data);
		return sendApiResponse(
			res,
			200,
			true,
			'लाभार्थी यादी यशस्वीरित्या अद्यतनित केली गेली.'
		);
	}),

	deleteBeneficiaryList: asyncHandler(async (req, res) => {
		const { id } = req.body;
		const [record] = await govYojanaBeneficiaryModel.getById(res.pool, id);
		if (!record) {
			throw new AppError('नोंद आढळली नाही.', 404);
		}

		await govYojanaBeneficiaryModel.delete(res.pool, id);

		if (record.file_name) {
			const filePath = `${UPLOAD_PATHS.files.govYojanaBeneficiary}/${record.file_name}`;
			await deleteFile(filePath);
		}

		return sendApiResponse(
			res,
			200,
			true,
			'लाभार्थी यादी यशस्वीरित्या हटविली गेली.'
		);
	})
};

module.exports = govYojanaBeneficiaryController;
