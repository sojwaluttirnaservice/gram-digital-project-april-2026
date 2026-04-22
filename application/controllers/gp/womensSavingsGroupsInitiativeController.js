const womensSavingsGroupsInitiativeModel = require("../../model/gp/womensSavingsGroupsInitiativeModel");
const { sendApiResponse, sendApiError } = require("../../utils/apiResponses");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/sendResponse");

const womensSavingsGroupsInitiativeController = {
    // View: List Page
    renderListPage: asyncHandler(async (req, res) => {
        const initiatives = await womensSavingsGroupsInitiativeModel.getAll(res.pool);
        renderPage(res, 'user/gp/women-saving-groups/initiative-list-page.pug', { initiatives });
    }),

    // View: Add Page
    renderAddPage: asyncHandler(async (req, res) => {
        renderPage(res, 'user/gp/women-saving-groups/add-initiative-page.pug');
    }),

    // View: Edit Page
    renderEditPage: asyncHandler(async (req, res) => {
        const { pointId: initiativeId } = req.params;

        if (!initiativeId || isNaN(initiativeId)) {
            return sendApiError(res, 400, false, 'अवैध ID.');
        }

        const [initiative] = await womensSavingsGroupsInitiativeModel.getById(res.pool, initiativeId);

        if (!initiative) {
            return sendApiError(res, 404, false, 'नोंद सापडली नाही.');
        }

        renderPage(res, 'user/gp/women-saving-groups/edit-initiative-page.pug', { initiative });
    }),

    // API: Add new initiative
    save: asyncHandler(async (req, res) => {
        const { point_desc } = req.body;

        if (!point_desc || point_desc.trim() === '') {
            return sendApiError(res, 400, false, 'महत्वाचा मुद्दा आवश्यक आहे.');
        }

        const result = await womensSavingsGroupsInitiativeModel.add(res.pool, { point_desc });

        if (!result || result.affectedRows === 0) {
            return sendApiError(res, 500, false, 'मुद्दा जतन करण्यात अयशस्वी.');
        }

        return sendApiResponse(res, 201, true, 'मुद्दा जतन केला.');
    }),

    // API: Update initiative
    update: asyncHandler(async (req, res) => {
        const { id, point_desc } = req.body;

        if (!id || isNaN(id)) {
            return sendApiError(res, 400, false, 'अवैध ID.');
        }

        if (!point_desc || point_desc.trim() === '') {
            return sendApiError(res, 400, false, 'महत्वाचा मुद्दा आवश्यक आहे.');
        }

        const result = await womensSavingsGroupsInitiativeModel.update(res.pool, { id, point_desc });

        if (!result || result.affectedRows === 0) {
            return sendApiError(res, 404, false, 'नोंद अद्ययावत करण्यात अयशस्वी.');
        }

        return sendApiResponse(res, 200, true, 'नोंद यशस्वीरित्या अद्ययावत केली.');
    }),

    // API: Delete initiative
    delete: asyncHandler(async (req, res) => {
        const { id } = req.body;

        if (!id || isNaN(id)) {
            return sendApiError(res, 400, false, 'अवैध ID.');
        }

        const result = await womensSavingsGroupsInitiativeModel.delete(res.pool, id);

        if (!result || result.affectedRows === 0) {
            return sendApiError(res, 404, false, 'नोंद हटवण्यात अयशस्वी.');
        }

        return sendApiResponse(res, 200, true, 'नोंद हटवली गेली आहे.');
    })
};

module.exports = womensSavingsGroupsInitiativeController;
