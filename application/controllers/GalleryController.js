const galleryModel = require('../model/gallery/galleryModel');
const { deleteRedisData } = require('../utils/redis');
const { gpDataRedisKey, commonDataRedisKey } = require('../utils/redisKeys');
const generateUniqueFileName = require('../utils/generateFileName');
const { saveFile, deleteFile } = require('../utils/saveFile');
const asyncHandler = require('../utils/asyncHandler');
const { renderPage } = require('../utils/sendResponse');
const { sendApiResponse } = require('../utils/apiResponses');
const { UPLOAD_PATHS } = require('../config/uploadPaths');

const photoLimit = 100;

const GalleryController = {

    homeView: asyncHandler(async (req, res) => {
        const gallery = await galleryModel.getGalleryImageList(res.pool);
        const btnOff = gallery.length >= photoLimit;
        renderPage(res, 'user/gallery/gallery_list', {
            gallery,
            link: `/gp/asstes/images/gallery/`,
            btn: btnOff,
            photoLimit
        });
    }),

    renderGalleryPage: asyncHandler(async (req, res) => {
        const gallery = await galleryModel.getGalleryImageList(res.pool);
        renderPage(res, 'user/gallery/gallery-list-page.pug', {
            gallery,
            link: `/gp/asstes/images/gallery/`
        });
    }),

    addNewFile: asyncHandler(async (req, res) => {
        const galleryImageFile = req.files?.imageFile;
        const { g_image_title, g_image_desc } = req.body;

        if (!galleryImageFile) {
            return sendApiResponse(res, 400, false, "Please upload an image file");
        }

        const gallery = await galleryModel.getGalleryImageList(res.pool);
        if (gallery.length >= photoLimit) {
            return sendApiResponse(res, 400, false, `तुम्ही फक्त ${photoLimit} छायाचित्रे जोडू शकता.`);
        }

        const imageName = generateUniqueFileName(galleryImageFile, 'g-img-');
        const savePath = `${UPLOAD_PATHS.gallery.village}/${imageName}`;
        req.filesToCleanup.push(savePath);

        const isGalleryImageSaved = await saveFile(galleryImageFile, savePath);
        if (!isGalleryImageSaved) {
            return sendApiResponse(res, 500, false, "Unable to save the gallery image");
        }

        await galleryModel.saveNewGalleryImage(res.pool, { imageName, g_image_title, g_image_desc });

        await deleteRedisData(gpDataRedisKey);
        await deleteRedisData(commonDataRedisKey);

        return sendApiResponse(res, 200, true, "Saved successfully");
    }),

    editGalleryImage: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { g_image_title, g_image_desc } = req.body;
        const imageFile = req.files?.imageFile;

        const [existingImage] = await galleryModel.getById(res.pool, id);
        if (!existingImage) {
            return sendApiResponse(res, 404, false, "Image not found");
        }

        let imageName = null;
        if (imageFile) {
            imageName = generateUniqueFileName(imageFile, 'g-img-');
            const savePath = `${UPLOAD_PATHS.gallery.village}/${imageName}`;
            req.filesToCleanup.push(savePath);

            const isSaved = await saveFile(imageFile, savePath);
            if (!isSaved) {
                return sendApiResponse(res, 500, false, "Unable to save the gallery image");
            }

            // Delete old file if exists
            if (existingImage.g_image_name) {
                const oldPath = `${UPLOAD_PATHS.gallery.village}/${existingImage.g_image_name}`;
                await deleteFile(oldPath);
            }
        }

        await galleryModel.editGalleryImage(res.pool, id, {
            g_image_title,
            g_image_desc,
            imageName
        });

        await deleteRedisData(gpDataRedisKey);
        await deleteRedisData(commonDataRedisKey);

        return sendApiResponse(res, 200, true, "Updated successfully");
    }),

    removeImageFile: asyncHandler(async (req, res) => {
        const { id, image } = req.body;

        await galleryModel.removeImageFromList(res.pool, Number(id));
        await deleteRedisData(gpDataRedisKey);
        await deleteRedisData(commonDataRedisKey);

        if (image) {
            const deletePath = `${UPLOAD_PATHS.gallery.village}/${image}`;
            await deleteFile(deletePath);
        }

        return sendApiResponse(res, 200, true, "Removed successfully", image);
    })
};

module.exports = GalleryController;
