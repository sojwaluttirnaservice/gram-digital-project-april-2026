const bplModel = require("../../model/certifcates/bplCertificateModel");
const { addCurrentTimeToDate } = require("../../utils/addCurrentTimeToDate");
const { sendApiError, sendApiResponse } = require("../../utils/apiResponses");
const AppError = require("../../utils/AppError");
const asyncHandler = require("../../utils/asyncHandler");
const generateUniqueFileName = require("../../utils/generateFileName");
const { saveFile, deleteFile } = require("../../utils/saveFile");
const { renderPage } = require("../../utils/sendResponse");
const { baseDir } = require("../createBaseDir");

const path = require("path");

const bplCertificateHolderImagesDir = `${baseDir}/uploads/images/certificates/bpl`;

const bplController = {

    // 1
    renderBplCertificateListPage: asyncHandler(async (req, res) => {
        let bplCertificates = await bplModel.getAll(res.pool);

        renderPage(res, "user/certificates/bpl-certificate/list-bpl-certificate-page.pug", {
            title: "BPL नोंदणी",
            bplCertificates
        });
    }),

    // 2
    renderSaveBplCertificatePage: asyncHandler(async (req, res) => {
        renderPage(res, "user/certificates/bpl-certificate/save-bpl-certificate-page.pug", {
            title: "BPL नोंदणी"
        });
    }),

    // 3
    renderEditBplCertificatePage: asyncHandler(async (req, res) => {
        const { bplCertificateId } = req.params;
        const [bplCertificate] = await bplModel.getById(res.pool, bplCertificateId);
        renderPage(res, "user/certificates/bpl-certificate/edit-bpl-certificate-page.pug", {
            title: "BPL अपडेट",
            bplCertificate
        });
    }),

    // 4
    renderPrintBplCertificatePage: asyncHandler(async (req, res) => {
        const { bplCertificateId } = req.params;
        const [bplCertificate] = await bplModel.getById(res.pool, bplCertificateId);
        console.log(bplCertificate)
        renderPage(res, "user/certificates/bpl-certificate/print-bpl-certificate-page.pug", {
            title: "BPL प्रमाणपत्र प्रिंट",
            bplCertificate
        });
    }),

    // 5
    save: asyncHandler(async (req, res) => {
        const imageFile = req.files?.image;
        const certificateData = req.body;

        if (!imageFile) {
            throw new AppError('कृपया छायाचित्र अपलोड करा.', 400)
        }

        const imageName = generateUniqueFileName(imageFile, 'bpl_cert_');
        const savePath = path.join(bplCertificateHolderImagesDir, imageName);
        const isSaved = await saveFile(imageFile, savePath);
        req.filesToCleanup.push(savePath)

        if (!isSaved) {
            throw new AppError('छायाचित्र जतन करता आले नाही.', 500)
        }

        certificateData.certificate_holder_image_name = imageName;
        let createdAt = addCurrentTimeToDate(certificateData.createdAt)
        const result = await bplModel.save(res.pool, {...certificateData, createdAt});

        if (!result.affectedRows) {
            throw new AppError('जतन करताना काहीतरी चुकले.', 500)
        }
        

        await bplModel.addFamilyMembers(res.pool, JSON.parse(certificateData.members || "[]"), result.insertId)
        return sendApiResponse(res, 201, true, 'नोंद यशस्वीरित्या जतन झाली.');  
    }),

    // 6
    update: asyncHandler(async (req, res) => {
        const certificateData = req.body;
        const imageFile = req.files?.image;

        const [existingData] = await bplModel.getById(res.pool, certificateData.id);
        if (!existingData) {
            return sendApiError(res, 404, false, 'नोंद सापडली नाही.');
        }

        let newImageName = existingData.certificate_holder_image_name;

        if (imageFile) {
            newImageName = generateUniqueFileName(imageFile, 'bpl_cert_');
            const newPath = path.join(bplCertificateHolderImagesDir, newImageName);
            const isSaved = await saveFile(imageFile, newPath);

            if (!isSaved) {
                return sendApiError(res, 500, false, 'नवीन छायाचित्र जतन करता आले नाही.');
            }

            // Delete old image only if a new one is saved
            if (existingData.certificate_holder_image_name) {
                const oldPath = path.join(bplCertificateHolderImagesDir, existingData.certificate_holder_image_name);
                await deleteFile(oldPath);
            }
        }

        certificateData.certificate_holder_image_name = newImageName;

        const result = await bplModel.update(res.pool, certificateData);
        if (result.affectedRows) {
            return sendApiResponse(res, 200, true, 'नोंद यशस्वीरित्या अद्ययावत झाली.');
        }

        return sendApiError(res, 500, false, 'अद्ययावत करताना काहीतरी चुकले.');
    }),


    // 7
    delete: asyncHandler(async (req, res) => {
        const { id: bplCertificateId } = req.body;
        const [existingData] = await bplModel.getById(res.pool, bplCertificateId);

        if (!existingData) {
            return sendApiError(res, 404, false, 'नोंद सापडली नाही.');
        }

        const result = await bplModel.delete(res.pool, bplCertificateId);
        if (result.affectedRows) {
            if (existingData.certificate_holder_image_name) {
                const imagePath = path.join(bplCertificateHolderImagesDir, existingData.certificate_holder_image_name);
                await deleteFile(imagePath);
            }
            return sendApiResponse(res, 200, true, 'नोंद यशस्वीरित्या हटवली.');
        }

        return sendApiError(res, 500, false, 'नोंद हटवता आली नाही.');
    }),

    // 8
    saveFamilyMember: asyncHandler(async (req, res) => {
        let familyMemberData = req.body;

        await bplModel.saveFamilyMember(res.pool, familyMemberData)

        return sendApiResponse(res, 200, true, 'सदस्य जतन झाला')
    }),

    // 9
    updateFamilyMember: asyncHandler(async (req, res) => {
        let familyMemberData = req.body;

        await bplModel.updateFamilyMember(res.pool, familyMemberData)

        return sendApiResponse(res, 200, true, 'सदस्य अपडेट झाला')
    }),

    // 10
    deleteFamilyMember: asyncHandler(async (req, res) => {
        let id = req.body.id

        if (!id) {
            return sendApiError(res, 400, false, 'कृपया वैध ID प्रदान करा.');
        }
        await bplModel.deleteFamilyMember(res.pool, id)

        return sendApiResponse(res, 200, true, 'डेलीट झाला')
    }),
};

module.exports = bplController;
