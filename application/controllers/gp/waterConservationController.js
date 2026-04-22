const waterConservationModel = require("../../model/gp/waterConservationModel");
const { sendApiResponse, sendApiError } = require("../../utils/apiResponses");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/sendResponse");

const waterConservationController = {
    renderListPage: asyncHandler(async (req, res) => {
        const structures = await waterConservationModel.getAll(res.pool);
        renderPage(res, 'user/gp/water-conservation/list-page.pug', {
            title: "जल संधारण संरचना यादी",
            structures,
        });
    }),

    renderAddPage: asyncHandler(async (req, res) => {
        renderPage(res, 'user/gp/water-conservation/add-page.pug', {
            title: "जल संधारण संरचना नोंदणी",
        });
    }),

    renderEditPage: asyncHandler(async (req, res) => {
        const { waterConservationId: id } = req.params;
        if (!id || isNaN(id)) return sendApiError(res, 400, false, 'अवैध ID');

        const [structure] = await waterConservationModel.getById(res.pool, id);
        if (!structure) return sendApiError(res, 404, false, 'संरचना सापडली नाही');

        renderPage(res, 'user/gp/water-conservation/edit-page.pug', {
            title: "जल संरचना Edit",
            structure
        });
    }),

    save: asyncHandler(async (req, res) => {
        const { structure_name, village_name, taluka_name, structure_length_m, storage_capacity_cubic_m, description, contact_mobile, geo_latitude, geo_longitude } = req.body;

        if (!structure_name || !structure_length_m || !storage_capacity_cubic_m) {
            return sendApiError(res, 400, false, 'संरचना नाव, लांबी, क्षमता आवश्यक');
        }

        const result = await waterConservationModel.add(res.pool, {
            structure_name,
            village_name,
            taluka_name,
            structure_length_m,
            storage_capacity_cubic_m,
            description,
            contact_mobile,
            geo_latitude,
            geo_longitude
        });

        if (!result.affectedRows) return sendApiError(res, 500, false, 'जतन अयशस्वी');

        return sendApiResponse(res, 201, true, 'संरचना यशस्वीरित्या जतन झाली');
    }),

    update: asyncHandler(async (req, res) => {
        const { id, structure_name, village_name, taluka_name, structure_length_m, storage_capacity_cubic_m, description, contact_mobile, geo_latitude, geo_longitude } = req.body;

        if (!id || !structure_name || !structure_length_m || !storage_capacity_cubic_m) {
            return sendApiError(res, 400, false, 'संरचना नाव, लांबी, क्षमता आवश्यक');
        }

        const result = await waterConservationModel.update(res.pool, {
            id,
            structure_name,
            village_name,
            taluka_name,
            structure_length_m,
            storage_capacity_cubic_m,
            description,
            contact_mobile,
            geo_latitude,
            geo_longitude
        });

        if (!result.affectedRows) return sendApiError(res, 404, false, 'संरचना सापडली नाही');

        return sendApiResponse(res, 200, true, 'संरचना अद्ययावत केली');
    }),

    delete: asyncHandler(async (req, res) => {
        const { id } = req.body;
        if (!id) return sendApiError(res, 400, false, 'ID आवश्यक');

        const result = await waterConservationModel.delete(res.pool, id);
        if (!result.affectedRows) return sendApiError(res, 404, false, 'हटवू शकलो नाही');

        return sendApiResponse(res, 200, true, 'संरचना हटवण्यात आली');
    }),
};

module.exports = waterConservationController;
