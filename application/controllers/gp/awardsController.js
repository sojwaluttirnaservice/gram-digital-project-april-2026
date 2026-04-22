const awardsModel = require("../../model/gp/awardsModel");
const { sendApiResponse, sendApiError } = require("../../utils/apiResponses");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/sendResponse");

const awardsController = {
    // Render: Award List Page
    renderAwardListPage: asyncHandler(async (req, res) => {
        const awards = await awardsModel.getAll(res.pool);
        renderPage(res, 'user/gp/awards/awards-list-page.pug', {
            title: "पुरस्कार यादी",
            awards,
        });
    }),

    // Render: Add Award Form
    renderAddAwardPage: asyncHandler(async (req, res) => {
        renderPage(res, 'user/gp/awards/add-award-page.pug', {
            title: "पुरस्कार नोंदणी",
        });
    }),

    // Render: Edit Award Form
    renderEditAwardPage: asyncHandler(async (req, res) => {
        const { awardId } = req.params;

        if (!awardId || isNaN(awardId)) {
            return sendApiError(res, 400, false, 'अवैध पुरस्कार ID.');
        }

        const [award] = await awardsModel.getById(res.pool, awardId);

        if (!award) {
            return sendApiError(res, 404, false, 'पुरस्कार सापडला नाही.');
        }

        renderPage(res, 'user/gp/awards/edit-award-page.pug', {
            title: "पुरस्कार Edit",
            award
        });
    }),

    // API: Create Award
    save: asyncHandler(async (req, res) => {
        const { award_name, award_desc, award_year } = req.body;

        if (!award_name || !award_year) {
            return sendApiError(res, 400, false, 'कृपया पुरस्काराचे नाव आणि वर्ष प्रदान करा.');
        }

        const result = await awardsModel.add(res.pool, { award_name, award_desc, award_year });

        if (!result || result.affectedRows === 0) {
            return sendApiError(res, 500, false, 'पुरस्कार जतन करण्यात अयशस्वी.');
        }

        return sendApiResponse(res, 201, true, 'पुरस्कार यशस्वीरित्या जतन केला.');
    }),

    // API: Update Award
    update: asyncHandler(async (req, res) => {
        const { id, award_name, award_desc, award_year } = req.body;

        if (!id || isNaN(id)) {
            return sendApiError(res, 400, false, 'अवैध ID.');
        }

        if (!award_name || !award_year) {
            return sendApiError(res, 400, false, 'कृपया नाव आणि वर्ष प्रदान करा.');
        }

        const result = await awardsModel.update(res.pool, { id, award_name, award_desc, award_year });

        if (!result || result.affectedRows === 0) {
            return sendApiError(res, 404, false, 'अद्ययावत करण्यात अयशस्वी. पुरस्कार सापडला नाही.');
        }

        return sendApiResponse(res, 200, true, 'पुरस्कार यशस्वीरित्या अद्ययावत केला.');
    }),

    // API: Delete Award
    delete: asyncHandler(async (req, res) => {
        const { id } = req.body;

        if (!id || isNaN(id)) {
            return sendApiError(res, 400, false, 'अवैध पुरस्कार ID.');
        }

        const result = await awardsModel.delete(res.pool, id);

        if (!result || result.affectedRows === 0) {
            return sendApiError(res, 404, false, 'पुरस्कार हटवण्यात अयशस्वी.');
        }

        return sendApiResponse(res, 200, true, 'पुरस्कार यशस्वीरित्या हटविला.');
    }),
};

module.exports = awardsController;
