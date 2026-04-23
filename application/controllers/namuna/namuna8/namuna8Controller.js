const namuna8Model = require("../../../model/namuna/namuna8/namuna8Model");
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
}

module.exports = namuna8Controller