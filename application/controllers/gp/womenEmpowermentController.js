const womenEmpowermentModel = require("../../model/gp/womenEmpowermentModel");
const { sendApiResponse, sendApiError } = require("../../utils/apiResponses");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/sendResponse");

const womenEmpowermentController = {
    // View: List Page
    renderListPage: asyncHandler(async (req, res) => {
        const points = await womenEmpowermentModel.getAll(res.pool);
        renderPage(res, 'user/gp/women-empowerment/list-page.pug', { points });
    }),

    // View: Add Page
    renderAddPage: asyncHandler(async (req, res) => {
        renderPage(res, 'user/gp/women-empowerment/add-page.pug');
    }),

    // View: Edit Page
    renderEditPage: asyncHandler(async (req, res) => {
        const { pointId } = req.params;

        if (!pointId || isNaN(pointId)) {
            return sendApiError(res, 400, false, 'अवैध ID.');
        }

        const [point] = await womenEmpowermentModel.getById(res.pool, pointId);

        if (!point) {
            return sendApiError(res, 404, false, 'नोंद सापडली नाही.');
        }

        renderPage(res, 'user/gp/women-empowerment/edit-page.pug', { point });
    }),

    // API: Add
    save: asyncHandler(async (req, res) => {
        const { point_desc } = req.body;

        if (!point_desc || point_desc.trim() === '') {
            return sendApiError(res, 400, false, 'मुद्दा आवश्यक आहे.');
        }

        const result = await womenEmpowermentModel.add(res.pool, { point_desc });

        if (!result || result.affectedRows === 0) {
            return sendApiError(res, 500, false, 'मुद्दा जतन करण्यात अयशस्वी.');
        }

        return sendApiResponse(res, 201, true, 'मुद्दा यशस्वीरित्या जतन केला.');
    }),

    // API: Update
    update: asyncHandler(async (req, res) => {
        const { id, point_desc } = req.body;

        if (!id || isNaN(id)) {
            return sendApiError(res, 400, false, 'अवैध ID.');
        }

        if (!point_desc || point_desc.trim() === '') {
            return sendApiError(res, 400, false, 'मुद्दा आवश्यक आहे.');
        }

        const result = await womenEmpowermentModel.update(res.pool, { id, point_desc });

        if (!result || result.affectedRows === 0) {
            return sendApiError(res, 404, false, 'नोंद अद्ययावत करण्यात अयशस्वी.');
        }

        return sendApiResponse(res, 200, true, 'नोंद यशस्वीरित्या अद्ययावत केली.');
    }),

    // API: Delete
    delete: asyncHandler(async (req, res) => {
        const { id } = req.body;

        if (!id || isNaN(id)) {
            return sendApiError(res, 400, false, 'अवैध ID.');
        }

        const result = await womenEmpowermentModel.delete(res.pool, id);

        if (!result || result.affectedRows === 0) {
            return sendApiError(res, 404, false, 'नोंद हटवण्यात अयशस्वी.');
        }

        return sendApiResponse(res, 200, true, 'नोंद हटवली गेली आहे.');
    })
};

module.exports = womenEmpowermentController;
