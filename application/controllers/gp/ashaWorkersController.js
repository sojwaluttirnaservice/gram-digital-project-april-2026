const ashaWorkersModel = require("../../model/gp/ashaWorkersModel");
const { sendApiResponse, sendApiError } = require("../../utils/apiResponses");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/sendResponse");

const ashaWorkersController = {
    renderListPage: asyncHandler(async (req, res) => {
        const workers = await ashaWorkersModel.getAll(res.pool);
        renderPage(res, 'user/gp/asha-workers/list-page.pug', {
            title: "आशा सेविका यादी",
            workers,
        });
    }),

    renderAddPage: asyncHandler(async (req, res) => {
        renderPage(res, 'user/gp/asha-workers/add-page.pug', {
            title: "आशा सेविका नोंदणी",
        });
    }),

    renderEditPage: asyncHandler(async (req, res) => {
        const { ashaWorkerId: id } = req.params;
        if (!id || isNaN(id)) return sendApiError(res, 400, false, 'अवैध ID');

        const [worker] = await ashaWorkersModel.getById(res.pool, id);
        if (!worker) return sendApiError(res, 404, false, 'सेविका सापडली नाही');

        renderPage(res, 'user/gp/asha-workers/edit-page.pug', {
            title: "सेविका Edit",
            worker
        });
    }),

    save: asyncHandler(async (req, res) => {
        const { name, village, mobile } = req.body;
        if (!name || !mobile) return sendApiError(res, 400, false, 'नाव व मोबाईल अनिवार्य');

        const result = await ashaWorkersModel.add(res.pool, { name, village, mobile });
        if (!result.affectedRows) return sendApiError(res, 500, false, 'सेविका जतन अयशस्वी');

        return sendApiResponse(res, 201, true, 'सेविका यशस्वीरित्या जतन झाली');
    }),

    update: asyncHandler(async (req, res) => {
        const { id, name, village, mobile } = req.body;
        if (!id || !name || !mobile) return sendApiError(res, 400, false, 'पूर्ण माहिती आवश्यक');

        const result = await ashaWorkersModel.update(res.pool, { id, name, village, mobile });
        if (!result.affectedRows) return sendApiError(res, 404, false, 'सेविका सापडली नाही');

        return sendApiResponse(res, 200, true, 'सेविका अद्ययावत झाली');
    }),

    delete: asyncHandler(async (req, res) => {
        const { id } = req.body;
        if (!id) return sendApiError(res, 400, false, 'ID आवश्यक');

        const result = await ashaWorkersModel.delete(res.pool, id);
        if (!result.affectedRows) return sendApiError(res, 404, false, 'हटवू शकलो नाही');

        return sendApiResponse(res, 200, true, 'सेविका हटवण्यात आली');
    }),
};

module.exports = ashaWorkersController;
