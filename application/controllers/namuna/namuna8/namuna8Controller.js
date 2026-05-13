const namuna8Model = require("../../../model/namuna/namuna8/namuna8Model");
const paymentModel = require("../../../model/payment-model/paymentModel");
const { sendApiResponse } = require("../../../utils/apiResponses");
const asyncHandler = require("../../../utils/asyncHandler");
const { renderPage } = require("../../../utils/sendResponse");

const namuna8Controller = {

    renderNamuna8HomeImageStatusPage: asyncHandler(async (req, res) => {
        let form8Users = await namuna8Model.getForm8Users(res.pool);

        renderPage(res, 'user/namuna/namuna8/image-status-page.pug', {
            form8Users
        })
    }),

    renderNamuna7ReceiptsPage: asyncHandler(async (req, res) => {
        // namuna 8 pavatee is considered as namuna 7
        // {month, year, fromYear, toYear} from queries
        let filters = req.query;

        let paymentRecieptsForn8PrintReceipts = await paymentModel.getCompletedPaymentsForNamuna8Receipts(res.pool, filters);

        renderPage(res, "user/form-8/n-7-receipts-report-page.pug", {
            paymentRecieptsForn8PrintReceipts,
            ...filters
        })
    }),

    renderNamuna8RecieptsListByMalmattaNumber: asyncHandler(async (req, res) => {
        let {malmatta: malmattaNumber} = req.query;
        let receipts = await paymentModel.getPaymentDetailsByMalmattaNumber(res.pool, malmattaNumber);

        renderPage(res, 'user/form-8/n-7-receipts-malmatta-dharak.pug', {
            title: 'नमुना ८ पावती',
            receipts
        })
    }),
}

module.exports = namuna8Controller