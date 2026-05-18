const { UPLOAD_PATHS } = require("../../config/uploadPaths");

const fundIncomeExpenseModel = require("../../model/fundIncomeExpense/fundIncomeExpenseModel");

const { sendApiResponse } = require("../../utils/apiResponses");
const AppError = require("../../utils/AppError");
const asyncHandler = require("../../utils/asyncHandler");

const generateUniqueFileName = require("../../utils/generateFileName");

const { saveFile, deleteFile } = require("../../utils/saveFile");

const { renderPage } = require("../../utils/sendResponse");



const fundIncomeExpenseController = {

    /* =========================================================
        RENDER PAGES
    ========================================================= */

    renderFundIncomeExpenseListPage: asyncHandler(async (req, res) => {

        let fundIncomeExpenseList =
            await fundIncomeExpenseModel.fetchAll(res.pool)
        renderPage(res, 'user/funds-income-expenses/funds-income-expenses-list-page.pug', {
            title: 'Fund Income Expense List',
            fundIncomeExpenseList,
        })
    }),


    renderFundIncomeExpenseOutsideListPage: asyncHandler(async (req, res) => {
        let fundIncomeExpenseList =
            await fundIncomeExpenseModel.fetchAll(res.pool)

        renderPage(res, 'user/funds-income-expenses/funds-income-expenses-outside-list-page.pug', {
            title: 'Fund Income Expense List',
            fundIncomeExpenseList,
        })
    }),



    renderAddFundIncomeExpensePage: asyncHandler(async (req, res) => {

        renderPage(res, 'user/funds-income-expenses/funds-income-expenses-form-page.pug', {
            title: 'Add Fund Income Expense',
        })
    }),



    renderEditFundIncomeExpensePage: asyncHandler(async (req, res) => {

        let { id } = req.params

        let fundIncomeExpenseDetails =
            await fundIncomeExpenseModel.fetchById(
                res.pool,
                id
            )

        if (fundIncomeExpenseDetails.length <= 0) {

            return renderPage(res, '', {
                title: 'Fund Income Expense Not Found',
                error: true,
                message: 'Record not found',
            })
        }

        fundIncomeExpenseDetails =
            fundIncomeExpenseDetails[0]

        let images =
            await fundIncomeExpenseModel.fetchImagesByFundId(
                res.pool,
                id
            )

        renderPage(res, 'user/funds-income-expenses/funds-income-expenses-form-page.pug', {
            title: 'Edit Fund Income Expense',
            isEdit: true,
            fundIncomeExpenseDetails,
            // images,
        })
    }),

    renderFundIncomeExpenseImagesPage: asyncHandler(async (req, res) => {

        let { fundId } = req.params

        let fundIncomeExpenseDetails =
            await fundIncomeExpenseModel.fetchById(
                res.pool,
                fundId
            )

        if (fundIncomeExpenseDetails.length <= 0) {

            return renderPage(res, '', {
                title: 'Record Not Found',
                error: true,
                message: 'Record not found',
            })
        }

        fundIncomeExpenseDetails =
            fundIncomeExpenseDetails[0]

        let images =
            await fundIncomeExpenseModel.fetchImagesByFundId(
                res.pool,
                fundId
            )

        renderPage(
            res,
            'user/funds-income-expenses/funds-income-expenses-images-page.pug',
            {
                title: 'Fund Images',
                fundIncomeExpenseDetails,
                images,
            }
        )
    }),

    renderFundIncomeExpenseImagesOutsidePage: asyncHandler(async (req, res) => {

        let { fundId } = req.params

        let fundIncomeExpenseDetails =
            await fundIncomeExpenseModel.fetchById(
                res.pool,
                fundId
            )

        if (fundIncomeExpenseDetails.length <= 0) {

            return renderPage(res, '', {
                title: 'Record Not Found',
                error: true,
                message: 'Record not found',
            })
        }

        fundIncomeExpenseDetails =
            fundIncomeExpenseDetails[0]

        let images =
            await fundIncomeExpenseModel.fetchImagesByFundId(
                res.pool,
                fundId
            )

        renderPage(
            res,
            'user/funds-income-expenses/funds-income-expenses-images-outside-page.pug',
            {
                title: 'Fund Images',
                fundIncomeExpenseDetails,
                images,
            }
        )
    }),

    /* =========================================================
        SAVE
    ========================================================= */

    save: asyncHandler(async (req, res) => {

        let fundExpenseData = req.body

        /* -------------------------------
            DUPLICATE CHECK
        ------------------------------- */

        let duplicate =
            await fundIncomeExpenseModel.checkDuplicateFinancialYear(
                res.pool,
                fundExpenseData
            )

        if (duplicate.length > 0) {

            return sendApiResponse(
                res,
                409,
                false,
                "Financial year already exists"
            )
        }

        /* -------------------------------
            DOCUMENT
        ------------------------------- */

        let document = req.files?.document

        if (document) {

            let docName =
                generateUniqueFileName(
                    document,
                    'fund-income-expense'
                )

            let dest =
                `${UPLOAD_PATHS.funds.documents}/${docName}`

            await saveFile(document, dest)

            fundExpenseData.uploaded_document = docName
        }

        await fundIncomeExpenseModel.save(
            res.pool,
            fundExpenseData
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

        let fundExpenseData = req.body

        let { id } = fundExpenseData

        let oldData =
            await fundIncomeExpenseModel.fetchById(
                res.pool,
                id
            )

        if (oldData.length <= 0) {
            throw new AppError("Record not found", 404)
        }

        oldData = oldData[0]

        /* -------------------------------
            DUPLICATE CHECK
        ------------------------------- */

        let duplicate =
            await fundIncomeExpenseModel.checkDuplicateFinancialYear(
                res.pool,
                fundExpenseData
            )

        if (duplicate.length > 0) {
            throw new AppError("Financial year already exists", 409)
        }

        /* -------------------------------
            DOCUMENT
        ------------------------------- */

        let document = req.files?.document

        if (document) {

            if (oldData.uploaded_document) {

                await deleteFile(
                    `${UPLOAD_PATHS.funds.documents}/${oldData.uploaded_document}`
                )
            }

            let docName =
                generateUniqueFileName(
                    document,
                    'fund-income-expense'
                )

            let dest =
                `${UPLOAD_PATHS.funds.documents}/${docName}`

            await saveFile(document, dest)

            fundExpenseData.uploaded_document = docName
        }
        else {

            fundExpenseData.uploaded_document =
                oldData.uploaded_document
        }

        await fundIncomeExpenseModel.update(
            res.pool,
            fundExpenseData
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
            await fundIncomeExpenseModel.fetchById(
                res.pool,
                id
            )

        if (!oldData) {
            throw new AppError("Record not found", 404)
        }


        /* -------------------------------
            DELETE DOCUMENT
        ------------------------------- */

        if (oldData.uploaded_document) {

            await deleteFile(
                `${UPLOAD_PATHS.funds.documents}/${oldData.uploaded_document}`
            )
        }

        /* -------------------------------
            DELETE IMAGE FILES
        ------------------------------- */

        let images =
            await fundIncomeExpenseModel.fetchImagesByFundId(
                res.pool,
                id
            )

        if (images.length > 0) {

            for (let image of images) {

                if (image.uploaded_image) {

                    await deleteFile(
                        `${UPLOAD_PATHS.funds.images}/${image.uploaded_image}`
                    )
                }
            }
        }

        /* -------------------------------
            DELETE IMAGE DB RECORDS
        ------------------------------- */

        await fundIncomeExpenseModel.deleteAllImagesByFundId(
            res.pool,
            id
        )

        /* -------------------------------
            DELETE MAIN RECORD
        ------------------------------- */

        await fundIncomeExpenseModel.delete(
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
            await fundIncomeExpenseModel.fetchById(
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
            await fundIncomeExpenseModel.fetchAll(
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
                'fund-income-expense-image'
            )

        let dest =
            `${UPLOAD_PATHS.funds.images}/${imageName}`

        await saveFile(image, dest)

        imageData.uploaded_image = imageName

        await fundIncomeExpenseModel.saveImage(
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
            await fundIncomeExpenseModel.fetchImageById(
                res.pool,
                imageData.id
            )

        if (!oldImage) {
            throw new AppError("Image Not found", 404)
        }

        let image = req.files?.image

        if (image) {

            if (oldImage.uploaded_image) {

                await deleteFile(
                    `${UPLOAD_PATHS.funds.images}/${oldImage.uploaded_image}`
                )
            }

            let imageName =
                generateUniqueFileName(
                    image,
                    'fund-income-expense-image'
                )

            let dest =
                `${UPLOAD_PATHS.funds.images}/${imageName}`

            await saveFile(image, dest)

            imageData.uploaded_image = imageName
        }
        else {

            imageData.uploaded_image =
                oldImage.uploaded_image
        }

        await fundIncomeExpenseModel.updateImage(
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
            await fundIncomeExpenseModel.fetchImageById(
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
                `${UPLOAD_PATHS.funds.images}/${image.uploaded_image}`
            )
        }

        await fundIncomeExpenseModel.deleteImage(
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



    fetchImagesByFundId: asyncHandler(async (req, res) => {

        let { fundId } = req.params

        let images =
            await fundIncomeExpenseModel.fetchImagesByFundId(
                res.pool,
                fundId
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

module.exports = fundIncomeExpenseController