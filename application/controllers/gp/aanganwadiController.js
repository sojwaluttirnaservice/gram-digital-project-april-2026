const aanganwadiModel = require("../../model/gp/aanganwadiModel");
const { sendApiResponse, sendApiError } = require("../../utils/apiResponses");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/sendResponse");

const aanganwadiController = {
    // ----------------------- Center Pages -----------------------
    renderCentersListPage: asyncHandler(async (req, res) => {
        const centers = await aanganwadiModel.getAllCenters(res.pool);
        renderPage(res, 'user/gp/aanganwadi/centers-list-page.pug', {
            title: "अंगणवाडी केंद्रांची यादी",
            centers,
        });
    }),

    renderAddCenterPage: asyncHandler(async (req, res) => {
        renderPage(res, 'user/gp/aanganwadi/add-center-page.pug', {
            title: "नवीन अंगणवाडी केंद्र",
        });
    }),

    renderEditCenterPage: asyncHandler(async (req, res) => {
        const { centerId: id } = req.params;
        if (!id || isNaN(id)) return sendApiError(res, 400, false, "अवैध केंद्र ID");
        const [center] = await aanganwadiModel.getCenterById(res.pool, id);

        if (!center) return sendApiError(res, 404, false, "केंद्र सापडले नाही");

        let yearRanges = await aanganwadiModel.getYearlyStatsByCenterWithAgeWiseCount(res.pool, id)

        renderPage(res, 'user/gp/aanganwadi/edit-center-page.pug', {
            title: "केंद्र संपादन",
            center,
            yearRanges
        });
    }),

    // ----------------------- Center APIs -----------------------
    addCenter: asyncHandler(async (req, res) => {
        const result = await aanganwadiModel.addCenter(res.pool, req.body);
        if (!result.affectedRows) return sendApiError(res, 500, false, "जतन अयशस्वी");
        return sendApiResponse(res, 201, true, "केंद्र जतन झाले", { id: result.insertId });
    }),

    updateCenter: asyncHandler(async (req, res) => {
        const result = await aanganwadiModel.updateCenter(res.pool, req.body);
        if (!result.affectedRows) return sendApiError(res, 404, false, "केंद्र सापडले नाही");
        return sendApiResponse(res, 200, true, "केंद्र अद्ययावत झाले");
    }),

    deleteCenter: asyncHandler(async (req, res) => {
        const { id } = req.body;
        const result = await aanganwadiModel.deleteCenter(res.pool, id);
        if (!result.affectedRows) return sendApiError(res, 404, false, "हटवू शकले नाही");
        return sendApiResponse(res, 200, true, "केंद्र हटवले गेले");
    }),

    // ----------------------- Workers -----------------------
    renderWorkersListPage: asyncHandler(async (req, res) => {
        let { centerId } = req.params
        const [center] = await aanganwadiModel.getCenterById(res.pool, centerId);
        const workers = await aanganwadiModel.getWorkersByCenterId(res.pool, centerId);
        renderPage(res, 'user/gp/aanganwadi/aanganwadi-workers-list-page.pug', {
            title: "अंगणवाडी केंद्रांतील सेविकेंची यादी",
            center,
            workers,
        });
    }),

    renderAddWorkerPage: asyncHandler(async (req, res) => {
        let { centerId } = req.params
        const [center] = await aanganwadiModel.getCenterById(res.pool, centerId);

        renderPage(res, 'user/gp/aanganwadi/add-aanganwadi-worker-page.pug', {
            title: "नवीन अंगणवाडी सेविका",
            centerId,
            center
        });
    }),

    renderEditWorkerPage: asyncHandler(async (req, res) => {
        const { centerId: id, workerId } = req.params;
        if (!id || isNaN(id)) return sendApiError(res, 400, false, "अवैध केंद्र ID");
        const [center] = await aanganwadiModel.getCenterById(res.pool, id);

        if (!center) return sendApiError(res, 404, false, "केंद्र सापडले नाही");

        let [worker] = await aanganwadiModel.getWorkerById(res.pool, workerId)
        renderPage(res, 'user/gp/aanganwadi/edit-aanganwadi-worker-page.pug', {
            title: "केंद्र सेविका संपादन",
            center,
            worker,
            centerId: id
        });
    }),


    addWorker: asyncHandler(async (req, res) => {
        const result = await aanganwadiModel.addWorker(res.pool, req.body);
        if (!result.affectedRows) return sendApiError(res, 500, false, "सेविका/मदतनीस जतन अयशस्वी");
        return sendApiResponse(res, 201, true, "सेविका/मदतनीस जतन");
    }),

    updateWorker: asyncHandler(async (req, res) => {
        const result = await aanganwadiModel.updateWorker(res.pool, req.body);
        if (!result.affectedRows) return sendApiError(res, 404, false, "सेविका/मदतनीस सापडले नाही");
        return sendApiResponse(res, 200, true, "सेविका/मदतनीस अद्ययावत");
    }),

    deleteWorker: asyncHandler(async (req, res) => {
        const { id } = req.body;
        const result = await aanganwadiModel.deleteWorker(res.pool, id);
        if (!result.affectedRows) return sendApiError(res, 404, false, "हटवू शकले नाही");
        return sendApiResponse(res, 200, true, "सेविका/मदतनीस हटवले गेले");
    }),

    getWorkers: asyncHandler(async (req, res) => {
        const { centerId } = req.params;
        const workers = await aanganwadiModel.getWorkersByCenterId(res.pool, centerId);
        return sendApiResponse(res, 200, true, "कामगार मिळाले", workers);
    }),

    // ----------------------- Yearly Stats -----------------------
    addYearlyStat: asyncHandler(async (req, res) => {
        const result = await aanganwadiModel.addYearlyStat(res.pool, req.body);
        if (!result.affectedRows) return sendApiError(res, 500, false, "वर्ष जतन अयशस्वी");
        return sendApiResponse(res, 201, true, "वर्ष जतन झाले");
    }),

    updateYearlyStat: asyncHandler(async (req, res) => {
        const result = await aanganwadiModel.updateYearlyStat(res.pool, req.body);
        if (!result.affectedRows) return sendApiError(res, 404, false, "सापडले नाही");
        return sendApiResponse(res, 200, true, "अद्ययावत झाले");
    }),

    deleteYearlyStat: asyncHandler(async (req, res) => {
        const { id } = req.body;
        const result = await aanganwadiModel.deleteYearlyStat(res.pool, id);
        if (!result.affectedRows) return sendApiError(res, 404, false, "हटवू शकले नाही");
        return sendApiResponse(res, 200, true, "वर्ष हटवले गेले");
    }),

    getYearlyStats: asyncHandler(async (req, res) => {
        const { centerId } = req.params;
        const stats = await aanganwadiModel.getYearlyStatsByCenter(res.pool, centerId);
        return sendApiResponse(res, 200, true, "वर्ष माहिती मिळाली", stats);
    }),

    // ----------------------- Agewise Children -----------------------
    addChildEntry: asyncHandler(async (req, res) => {
        const result = await aanganwadiModel.addChildren(res.pool, req.body);
        if (!result.affectedRows) return sendApiError(res, 500, false, "नोंद जतन अयशस्वी");
        return sendApiResponse(res, 201, true, "नोंद जतन");
    }),

    updateChildEntry: asyncHandler(async (req, res) => {
        const result = await aanganwadiModel.updateChildren(res.pool, req.body);
        if (!result.affectedRows) return sendApiError(res, 404, false, "नोंद सापडली नाही");
        return sendApiResponse(res, 200, true, "नोंद अद्ययावत");
    }),

    deleteChildEntry: asyncHandler(async (req, res) => {
        const { id } = req.body;
        const result = await aanganwadiModel.deleteChildren(res.pool, id);
        if (!result.affectedRows) return sendApiError(res, 404, false, "हटवू शकले नाही");
        return sendApiResponse(res, 200, true, "नोंद हटवली");
    }),

    getChildEntries: asyncHandler(async (req, res) => {
        const { yearlyStatId } = req.params;
        const children = await aanganwadiModel.getChildrenByYearlyStatId(res.pool, yearlyStatId);
        return sendApiResponse(res, 200, true, "बालकांची माहिती मिळाली", children);
    }),
};

module.exports = aanganwadiController;
