const womensSavingsGroupNamesModel = require("../../model/gp/womensSavingsGroupNamesModel");
const { sendApiResponse, sendApiError } = require("../../utils/apiResponses");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/sendResponse");

const womensSavingsGroupNamesController = {
    // View: Group Name List Page
    renderListPage: asyncHandler(async (req, res) => {
        const groups = await womensSavingsGroupNamesModel.getAll(res.pool);
        renderPage(res, 'user/gp/women-saving-group-names/group-name-list-page.pug', { groups });
    }),

    // View: Add Group Name Page
    renderAddPage: asyncHandler(async (req, res) => {
        renderPage(res, 'user/gp/women-saving-group-names/add-group-name-page.pug');
    }),

    // View: Edit Group Name Page
    renderEditPage: asyncHandler(async (req, res) => {
        const { groupId } = req.params;

        if (!groupId || isNaN(groupId)) {
            return sendApiError(res, 400, false, 'अवैध ID.');
        }

        const [group] = await womensSavingsGroupNamesModel.getById(res.pool, groupId);

        if (!group) {
            return sendApiError(res, 404, false, 'बचतगट सापडला नाही.');
        }

        renderPage(res, 'user/gp/women-saving-group-names/edit-group-name-page.pug', { group });
    }),

    // API: Save new group name
    save: asyncHandler(async (req, res) => {
        const { group_name, village_name } = req.body;

        if (!group_name || group_name.trim() === '') {
            return sendApiError(res, 400, false, 'बचतगटाचे नाव आवश्यक आहे.');
        }

        const result = await womensSavingsGroupNamesModel.add(res.pool, { group_name, village_name });

        if (!result || result.affectedRows === 0) {
            return sendApiError(res, 500, false, 'बचतगट जतन करण्यात अयशस्वी.');
        }

        return sendApiResponse(res, 201, true, 'बचतगट यशस्वीरित्या जतन केला.');
    }),

    // API: Update group name
    update: asyncHandler(async (req, res) => {
        const { id, group_name, village_name } = req.body;

        if (!id || isNaN(id)) {
            return sendApiError(res, 400, false, 'अवैध ID.');
        }

        if (!group_name || group_name.trim() === '') {
            return sendApiError(res, 400, false, 'बचतगटाचे नाव आवश्यक आहे.');
        }

        const result = await womensSavingsGroupNamesModel.update(res.pool, { id, group_name, village_name });

        if (!result || result.affectedRows === 0) {
            return sendApiError(res, 404, false, 'अद्ययावत करण्यात अयशस्वी.');
        }

        return sendApiResponse(res, 200, true, 'बचतगटाची माहिती अद्ययावत केली.');
    }),

    // API: Delete group name
    delete: asyncHandler(async (req, res) => {
        const { id } = req.body;

        if (!id || isNaN(id)) {
            return sendApiError(res, 400, false, 'अवैध ID.');
        }

        const result = await womensSavingsGroupNamesModel.delete(res.pool, id);

        if (!result || result.affectedRows === 0) {
            return sendApiError(res, 404, false, 'बचतगट हटवण्यात अयशस्वी.');
        }

        return sendApiResponse(res, 200, true, 'बचतगट यशस्वीरित्या हटविला.');
    }),
};

module.exports = womensSavingsGroupNamesController;
