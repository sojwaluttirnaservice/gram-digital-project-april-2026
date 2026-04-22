const innovativeInitiativesModel = require("../../model/gp/innovativeInitiativesModel");
const { sendApiResponse, sendApiError } = require("../../utils/apiResponses");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/sendResponse");

const innovativeInitiativesController = {
    // Render: List Page
    renderListPage: asyncHandler(async (req, res) => {
        const initiatives = await innovativeInitiativesModel.getAll(res.pool);
        renderPage(res, 'user/gp/innovative-initiatives/innovative-initiatives-list-page.pug', {
            title: "नावीन्य उपक्रम यादी",
            initiatives,
        });
    }),

    // Render: Add Form
    renderAddPage: asyncHandler(async (req, res) => {
        renderPage(res, 'user/gp/innovative-initiatives/add-innovative-initiative-page.pug', {
            title: "नावीन्य उपक्रम नोंदणी",
        });
    }),

    // Render: Edit Form
    renderEditPage: asyncHandler(async (req, res) => {
        const { innovativeInitiativeId: id } = req.params;

        if (!id || isNaN(id)) {
            return sendApiError(res, 400, false, 'अवैध ID.');
        }

        const [initiative] = await innovativeInitiativesModel.getById(res.pool, id);

        if (!initiative) {
            return sendApiError(res, 404, false, 'नावीन्य उपक्रम सापडला नाही.');
        }

        renderPage(res, 'user/gp/innovative-initiatives/edit-innovative-initiative-page.pug', {
            title: "नावीन्य उपक्रम Edit",
            initiative,
        });
    }),

    // API: Save
    save: asyncHandler(async (req, res) => {
        const { initiative_name } = req.body;

        if (!initiative_name) {
            return sendApiError(res, 400, false, 'कृपया नावीन्य उपक्रमाचे नाव प्रदान करा.');
        }

        const result = await innovativeInitiativesModel.add(res.pool, { initiative_name });

        if (!result || result.affectedRows === 0) {
            return sendApiError(res, 500, false, 'नावीन्य उपक्रम जतन करण्यात अयशस्वी.');
        }

        return sendApiResponse(res, 201, true, 'नावीन्य उपक्रम यशस्वीरित्या जतन केला.');
    }),

    // API: Update
    update: asyncHandler(async (req, res) => {
        const { id, initiative_name } = req.body;

        if (!id || isNaN(id)) {
            return sendApiError(res, 400, false, 'अवैध ID.');
        }

        if (!initiative_name) {
            return sendApiError(res, 400, false, 'कृपया नाव प्रदान करा.');
        }

        const result = await innovativeInitiativesModel.update(res.pool, { id, initiative_name });

        if (!result || result.affectedRows === 0) {
            return sendApiError(res, 404, false, 'नावीन्य उपक्रम अद्ययावत करण्यात अयशस्वी.');
        }

        return sendApiResponse(res, 200, true, 'नावीन्य उपक्रम यशस्वीरित्या अद्ययावत केला.');
    }),

    // API: Delete
    delete: asyncHandler(async (req, res) => {
        const { id } = req.body;

        if (!id || isNaN(id)) {
            return sendApiError(res, 400, false, 'अवैध ID.');
        }

        const result = await innovativeInitiativesModel.delete(res.pool, id);

        if (!result || result.affectedRows === 0) {
            return sendApiError(res, 404, false, 'नावीन्य उपक्रम हटवण्यात अयशस्वी.');
        }

        return sendApiResponse(res, 200, true, 'नावीन्य उपक्रम यशस्वीरित्या हटविला.');
    }),
};

module.exports = innovativeInitiativesController;
