const namuna2Model = require("../../../model/namuna/remaining/namuna2Model");
const { sendApiResponse } = require("../../../utils/apiResponses");
const asyncHandler = require("../../../utils/asyncHandler");
const { renderPage } = require("../../../utils/sendResponse");

const namuna2Controller = {

    /* ============================
           LIST PAGE
    ============================ */
    renderListPage: asyncHandler(async (req, res) => {

        // let namuna2Entries = await namuna2Model.list(res.pool);
        let namuna2Entries = await namuna2Model.listByGroup(res.pool)

        renderPage(res, 'user/namuna/remaining/namuna2/namuna-2-list-page.pug', { namuna2Entries });
    }),

    /* ============================
           CREATE PAGE
    ============================ */
    renderCreatePage: asyncHandler(async (req, res) => {
        renderPage(res, 'user/namuna/remaining/namuna2/namuna-2-create-page.pug', {});
    }),

    /* ============================
           EDIT PAGE
    ============================ */
    renderEditPage: asyncHandler(async (req, res) => {
        let { id } = req.params;

        // Validation
        if (!id || isNaN(id)) {
            return sendApiResponse(res, 400, false, "अवैध ID.");
        }

        let record = await namuna2Model.getById(res.pool, id);

        if (!record || record.length === 0) {
            return sendApiResponse(res, 404, false, "नमुना २ नोंद सापडली नाही.");
        }

        renderPage(res, 'user/namuna/remaining/namuna2/namuna-2-edit-page.pug', {
            namuna2Entry: record[0]
        });
    }),

    /* ============================
           PRINT PAGE
    ============================ */
    renderPrintPage: asyncHandler(async (req, res) => {
        let { fromYear, toYear } = req.query;

        // Validation
        if (!fromYear || !toYear) {
            return sendApiResponse(res, 400, false, "कृपया वर्षाची रेंज द्या.");
        }

        if (isNaN(fromYear) || isNaN(toYear)) {
            return sendApiResponse(res, 400, false, "वर्ष अवैध आहे.");
        }

        let namuna2Entries = await namuna2Model.getByYearRange(res.pool, fromYear, toYear);

        renderPage(res, 'user/namuna/remaining/namuna2/namuna-2-print-page.pug', { namuna2Entries, fromYear, toYear});
    }),

    /* ============================
           SAVE (CREATE)
    ============================ */
    save: asyncHandler(async (req, res) => {
        let data = req.body;

        // Basic validation
        if (!data || Object.keys(data).length === 0) {
            return sendApiResponse(res, 400, false, "रिकामी माहिती पाठवू शकत नाही.");
        }

        if (!data.month || !data.year) {
            return sendApiResponse(res, 400, false, "महिना आणि वर्ष आवश्यक आहे.");
        }

        await namuna2Model.save(res.pool, data);

        return sendApiResponse(res, 200, true, "नमुना २ जतन झाला आहे.");
    }),

    /* ============================
           UPDATE
    ============================ */
    update: asyncHandler(async (req, res) => {
        let { id } = req.body;
        let data = req.body;

        // ID validation
        if (!id || isNaN(id)) {
            return sendApiResponse(res, 400, false, "अवैध ID.");
        }

        // Body validation
        if (!data || Object.keys(data).length === 0) {
            return sendApiResponse(res, 400, false, "रिकामी माहिती पाठवू शकत नाही.");
        }

        // Ensure record exists
        let exists = await namuna2Model.getById(res.pool, id);
        if (!exists || exists.length === 0) {
            return sendApiResponse(res, 404, false, "नमुना २ नोंद सापडली नाही.");
        }

        await namuna2Model.update(res.pool, data, id);

        return sendApiResponse(res, 200, true, "नमुना २ अद्ययावत झाला आहे.");
    }),

    /* ============================
           DELETE
    ============================ */
    delete: asyncHandler(async (req, res) => {
        let { id } = req.body;

        // Validation
        if (!id || isNaN(id)) {
            return sendApiResponse(res, 400, false, "अवैध ID.");
        }

        // Check if exists
        let exists = await namuna2Model.getById(res.pool, id);
        if (!exists || exists.length === 0) {
            return sendApiResponse(res, 404, false, "डिलीट करण्यासाठी नोंद उपलब्ध नाही.");
        }

        await namuna2Model.delete(res.pool, id);

        return sendApiResponse(res, 200, true, "नमुना २ डिलीट झाला आहे.");
    }),
};

module.exports = namuna2Controller;
