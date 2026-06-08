const { UPLOAD_PATHS } = require('../../config/uploadPaths');
const rtiModel = require('../../model/rti/rtiModel');
const { sendApiResponse } = require('../../utils/apiResponses');
const AppError = require('../../utils/AppError');
const asyncHandler = require('../../utils/asyncHandler');
const generateUniqueFileName = require('../../utils/generateFileName');
const { saveFile, deleteFile } = require('../../utils/saveFile');
const { renderPage } = require('../../utils/sendResponse');

const HomeModel = require('../../model/HomeModel');

const RTI_POINTS_MAP = {
	1: '१) संस्थेची रचना, कार्ये व कर्तव्ये',
	2: '२) अधिकारी व कर्मचाऱ्यांचे अधिकार व कर्तव्ये',
	3: '३) निर्णय घेण्याची प्रक्रिया',
	4: '४) कामकाजासाठी ठरवलेले निकष',
	5: '५) नियम, विनियम व अधिनियम',
	6: '६) संस्थेकडे असलेल्या कागदपत्रांची यादी',
	7: '७) धोरण निर्मितीत लोकसहभाग',
	8: '८) मंडळे, समित्या व त्यांची माहिती',
	9: '९) अधिकारी व कर्मचाऱ्यांची निर्देशिका',
	10: '१०) अधिकारी व कर्मचाऱ्यांचे वेतन',
	11: '११) अंदाजपत्रक व निधीची माहिती',
	12: '१२) अनुदान व अनुदानित योजना',
	13: '१३) सवलती, परवाने व लाभार्थी',
	14: '१४) इलेक्ट्रॉनिक स्वरूपातील माहिती',
	15: '१५) नागरिकांना माहिती मिळविण्याची सुविधा',
	16: '१६) सार्वजनिक माहिती अधिकारी (PIO) व अपील अधिकारी',
	17: '१७) इतर आवश्यक माहिती'
};

const HomeController = require('../HomeController');

const rtiController = {
	// Render public RTI Info Page
	renderRtiInfoPage: asyncHandler(async (req, res) => {
		// Fetch all uploaded RTI disclosures to render in the view
		const disclosures = await rtiModel.getAllDisclosures(res.pool);
		let allRequiredData = await HomeController.getCommonData(req, res);
		
		const sic_primary_email = allRequiredData.gp ? allRequiredData.gp.sic_primary_email : '';
		const sic_alt_email = allRequiredData.gp ? allRequiredData.gp.sic_alt_email : '';

		renderPage(res, 'user/rti/rti-info-page.pug', {
			...allRequiredData,
			disclosures,
			RTI_POINTS_MAP,
			sic_primary_email,
			sic_alt_email
		});
	}),

	// Render Admin Management Page
	renderRtiManagementPage: asyncHandler(async (req, res) => {
		const disclosures = await rtiModel.getAllDisclosures(res.pool);
		renderPage(res, 'user/rti/rti-management.pug', {
			disclosures,
			RTI_POINTS_MAP
		});
	}),

	// Handle PDF Upload
	uploadRtiDocument: asyncHandler(async (req, res) => {
		const { point_number, financial_year, description } = req.body;
		const documentFile = req.files?.document_file;

		if (!point_number || !financial_year) {
			throw new AppError('कृपया सर्व आवश्यक शेती/माहिती निवडा.', 400);
		}

		if (!documentFile) {
			throw new AppError('कृपया पीडीएफ फाईल निवडा.', 400);
		}

		if (!RTI_POINTS_MAP[point_number]) {
			throw new AppError('अवैध माहितीचा मुद्दा निवडला गेला आहे.', 400);
		}

		const [from_year, to_year] = financial_year.split('-').map(Number);
		if (!from_year || !to_year) {
			throw new AppError('अवैध आर्थिक वर्ष.', 400);
		}

		const fileName = generateUniqueFileName(documentFile, 'rti-point-');
		const destPath = `${UPLOAD_PATHS.files.rti}/${fileName}`;

		const isSaved = await saveFile(documentFile, destPath);
		if (!isSaved) {
			throw new AppError('फाईल सेव्ह करताना त्रुटी आली.', 500);
		}

		req.filesToCleanup = req.filesToCleanup || [];
		req.filesToCleanup.push(destPath);

		const savedPath = `/uploads/rti/${fileName}`;

		await rtiModel.saveNewDisclosure(res.pool, {
			from_year,
			to_year,
			document_name: RTI_POINTS_MAP[point_number],
			saved_path: savedPath,
			description: description || '',
			point_number: Number(point_number)
		});

		return sendApiResponse(
			res,
			201,
			true,
			'कागदपत्र यशस्वीरित्या अपलोड झाले.'
		);
	}),

	// Handle Delete Document
	deleteRtiDocument: asyncHandler(async (req, res) => {
		const { id } = req.body;

		if (!id) {
			throw new AppError('अवैध आयडी.', 400);
		}

		const [disclosure] = await rtiModel.getById(res.pool, id);
		if (!disclosure) {
			throw new AppError('कागदपत्र सापडले नाही.', 404);
		}

		await rtiModel.removeDisclosure(res.pool, id);

		// Delete file from disk
		const filePath = `./public${disclosure.saved_path}`;
		await deleteFile(filePath);

		return sendApiResponse(res, 200, true, 'कागदपत्र डिलीट करण्यात आले.');
	})
};

module.exports = rtiController;
