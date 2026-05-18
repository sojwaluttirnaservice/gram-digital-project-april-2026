const { UPLOAD_PATHS } = require("../../config/uploadPaths")

const devWorksModel = require("../../model/devWorks/devWorksModel")

const { sendApiResponse } = require("../../utils/apiResponses")
const AppError = require("../../utils/AppError")
const asyncHandler = require("../../utils/asyncHandler")

const generateUniqueFileName = require("../../utils/generateFileName")

const { saveFile, deleteFile } = require("../../utils/saveFile")

const { renderPage } = require("../../utils/sendResponse")



const devWorksController = {

    /* =========================================================
        RENDER PAGES
    ========================================================= */

    renderDevWorksListPage: asyncHandler(async (req, res) => {

        let devWorksList =
            await devWorksModel.fetchAll(res.pool)

        renderPage(
            res,
            'user/dev-works/dev-works-list-page.pug',
            {
                title: 'Development Works List',
                devWorksList,
            }
        )
    }),



    renderDevWorksOutsideListPage: asyncHandler(async (req, res) => {

        let devWorksList =
            await devWorksModel.fetchAll(res.pool)

        renderPage(
            res,
            'user/dev-works/dev-works-outside-list-page.pug',
            {
                title: 'Development Works List',
                devWorksList,
            }
        )
    }),



    renderAddDevWorksPage: asyncHandler(async (req, res) => {

        renderPage(
            res,
            'user/dev-works/dev-works-form-page.pug',
            {
                title: 'Add Development Work',
            }
        )
    }),



    renderEditDevWorksPage: asyncHandler(async (req, res) => {

        let { id } = req.params

        let devWorksDetails =
            await devWorksModel.fetchById(
                res.pool,
                id
            )

        if (devWorksDetails.length <= 0) {

            return renderPage(res, '', {
                title: 'Development Work Not Found',
                error: true,
                message: 'Record not found',
            })
        }

        devWorksDetails =
            devWorksDetails[0]

        let images =
            await devWorksModel.fetchImagesByDevWorkId(
                res.pool,
                id
            )

        renderPage(
            res,
            'user/dev-works/dev-works-form-page.pug',
            {
                title: 'Edit Development Work',
                devWorksDetails,
                images,
            }
        )
    }),



    renderDevWorksImagesPage: asyncHandler(async (req, res) => {

        let { devWorkId } = req.params

        let devWorksDetails =
            await devWorksModel.fetchById(
                res.pool,
                devWorkId
            )

        if (devWorksDetails.length <= 0) {

            return renderPage(res, '', {
                title: 'Record Not Found',
                error: true,
                message: 'Record not found',
            })
        }

        devWorksDetails =
            devWorksDetails[0]

        let images =
            await devWorksModel.fetchImagesByDevWorkId(
                res.pool,
                devWorkId
            )

        renderPage(
            res,
            'user/dev-works/dev-works-images-page.pug',
            {
                title: 'Development Work Images',
                devWorksDetails,
                images,
            }
        )
    }),



    renderDevWorksImagesOutsidePage: asyncHandler(async (req, res) => {

        let { devWorkId } = req.params

        let devWorksDetails =
            await devWorksModel.fetchById(
                res.pool,
                devWorkId
            )

        if (devWorksDetails.length <= 0) {

            return renderPage(res, '', {
                title: 'Record Not Found',
                error: true,
                message: 'Record not found',
            })
        }

        devWorksDetails =
            devWorksDetails[0]

        let images =
            await devWorksModel.fetchImagesByDevWorkId(
                res.pool,
                devWorkId
            )

        renderPage(
            res,
            'user/dev-works/dev-works-images-outside-page.pug',
            {
                title: 'Development Work Images',
                devWorksDetails,
                images,
            }
        )
    }),



    /* =========================================================
        SAVE
    ========================================================= */

    save: asyncHandler(async (req, res) => {

        let devWorkData = req.body

        let duplicate =
            await devWorksModel.checkDuplicateFinancialYear(
                res.pool,
                devWorkData
            )

        if (duplicate.length > 0) {

            return sendApiResponse(
                res,
                409,
                false,
                "Financial year already exists"
            )
        }

        let document = req.files?.document

        if (document) {

            let docName =
                generateUniqueFileName(
                    document,
                    'dev-work'
                )

            let dest =
                `${UPLOAD_PATHS.devWorks.documents}/${docName}`

            await saveFile(document, dest)

            devWorkData.uploaded_document = docName
        }

        await devWorksModel.save(
            res.pool,
            devWorkData
        )

        return sendApiResponse(
            res,
            201,
            true,
            "Saved"
        )
    }),



    /* =========================================================
        UPDATE
    ========================================================= */

    update: asyncHandler(async (req, res) => {

        let devWorkData = req.body

        let { id } = devWorkData

        let oldData =
            await devWorksModel.fetchById(
                res.pool,
                id
            )

        if (oldData.length <= 0) {

            return sendApiResponse(
                res,
                404,
                false,
                "Record not found"
            )
        }

        oldData = oldData[0]

        let duplicate =
            await devWorksModel.checkDuplicateFinancialYear(
                res.pool,
                devWorkData
            )

        if (duplicate.length > 0) {

            return sendApiResponse(
                res,
                409,
                false,
                "Financial year already exists"
            )
        }

        let document = req.files?.document

        if (document) {

            if (oldData.uploaded_document) {

                await deleteFile(
                    `${UPLOAD_PATHS.devWorks.documents}/${oldData.uploaded_document}`
                )
            }

            let docName =
                generateUniqueFileName(
                    document,
                    'dev-work'
                )

            let dest =
                `${UPLOAD_PATHS.devWorks.documents}/${docName}`

            await saveFile(document, dest)

            devWorkData.uploaded_document = docName
        }
        else {

            devWorkData.uploaded_document =
                oldData.uploaded_document
        }

        await devWorksModel.update(
            res.pool,
            devWorkData
        )

        return sendApiResponse(
            res,
            200,
            true,
            "Updated successfully"
        )
    }),



    /* =========================================================
        DELETE
    ========================================================= */

    delete: asyncHandler(async (req, res) => {

        let { id } = req.params

        let [oldData] =
            await devWorksModel.fetchById(
                res.pool,
                id
            )

        if (!oldData) {
            throw new AppError("Record Not Found", 404)
        }

        if (oldData.uploaded_document) {

            await deleteFile(
                `${UPLOAD_PATHS.devWorks.documents}/${oldData.uploaded_document}`
            )
        }

        let images =
            await devWorksModel.fetchImagesByDevWorkId(
                res.pool,
                id
            )

        if (images.length > 0) {

            for (let image of images) {

                if (image.uploaded_image) {

                    await deleteFile(
                        `${UPLOAD_PATHS.devWorks.images}/${image.uploaded_image}`
                    )
                }
            }
        }

        await devWorksModel.deleteAllImagesByDevWorkId(
            res.pool,
            id
        )

        await devWorksModel.delete(
            res.pool,
            id
        )

        return sendApiResponse(
            res,
            200,
            true,
            "Deleted successfully"
        )
    }),



    /* =========================================================
        FETCH
    ========================================================= */

    fetchById: asyncHandler(async (req, res) => {

        let { id } = req.params

        let details =
            await devWorksModel.fetchById(
                res.pool,
                id
            )

        if (details.length <= 0) {

            return sendApiResponse(
                res,
                404,
                false,
                "Record not found"
            )
        }

        details = details[0]

        return sendApiResponse(
            res,
            200,
            true,
            "Data fetched",
            details
        )
    }),



    fetchAll: asyncHandler(async (req, res) => {

        let filters = req.query

        let data =
            await devWorksModel.fetchAll(
                res.pool,
                filters
            )

        return sendApiResponse(
            res,
            200,
            true,
            "Data fetched",
            data
        )
    }),



    /* =========================================================
        IMAGES
    ========================================================= */

    saveImage: asyncHandler(async (req, res) => {

        let imageData = req.body

        let image = req.files?.image

        if (!image) {

            return sendApiResponse(
                res,
                400,
                false,
                "Image is required"
            )
        }

        let imageName =
            generateUniqueFileName(
                image,
                'dev-work-image'
            )

        let dest =
            `${UPLOAD_PATHS.devWorks.images}/${imageName}`

        await saveFile(image, dest)

        imageData.uploaded_image = imageName

        await devWorksModel.saveImage(
            res.pool,
            imageData
        )

        return sendApiResponse(
            res,
            201,
            true,
            "Image saved successfully"
        )
    }),



    updateImage: asyncHandler(async (req, res) => {

        let imageData = req.body

        let [oldImage] =
            await devWorksModel.fetchImageById(
                res.pool,
                imageData.id
            )

        if (!oldImage) {
            throw new AppError("Image Not Found", 404)
        }

        let image = req.files?.image

        if (image) {

            if (oldImage.uploaded_image) {

                await deleteFile(
                    `${UPLOAD_PATHS.devWorks.images}/${oldImage.uploaded_image}`
                )
            }

            let imageName =
                generateUniqueFileName(
                    image,
                    'dev-work-image'
                )

            let dest =
                `${UPLOAD_PATHS.devWorks.images}/${imageName}`

            await saveFile(image, dest)

            imageData.uploaded_image = imageName
        }
        else {

            imageData.uploaded_image =
                oldImage.uploaded_image
        }

        await devWorksModel.updateImage(
            res.pool,
            imageData
        )

        return sendApiResponse(
            res,
            200,
            true,
            "Image updated successfully"
        )
    }),



    deleteImage: asyncHandler(async (req, res) => {

        let { id } = req.params

        let image =
            await devWorksModel.fetchImageById(
                res.pool,
                id
            )

        if (image.length <= 0) {

            return sendApiResponse(
                res,
                404,
                false,
                "Image not found"
            )
        }

        image = image[0]

        if (image.uploaded_image) {

            await deleteFile(
                `${UPLOAD_PATHS.devWorks.images}/${image.uploaded_image}`
            )
        }

        await devWorksModel.deleteImage(
            res.pool,
            id
        )

        return sendApiResponse(
            res,
            200,
            true,
            "Image deleted successfully"
        )
    }),



    fetchImagesByDevWorkId: asyncHandler(async (req, res) => {

        let { devWorkId } = req.params

        let images =
            await devWorksModel.fetchImagesByDevWorkId(
                res.pool,
                devWorkId
            )

        return sendApiResponse(
            res,
            200,
            true,
            "Images fetched",
            images
        )
    }),

}

module.exports = devWorksController