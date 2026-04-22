const gpModel = require("../../model/gp/gpModel");
const HomeModel = require("../../model/HomeModel");
const { sendApiError, sendApiResponse } = require("../../utils/apiResponses");
const asyncHandler = require("../../utils/asyncHandler");
const generateUniqueFileName = require("../../utils/generateFileName");
const { saveFile, deleteFile } = require("../../utils/saveFile");
const { baseDir } = require("../createBaseDir");

const gpController = {
    // doing both at the same time
    save: asyncHandler(async (req, res) => {

        const gpImage = req.files?.gpImage

        if (!gpImage) {
            return sendApiError(res, 404, false, 'ग्रामपंचायतीचा फोटो अपलोड करा.')
        }

        let gpImageDir = `${baseDir}/uploads/images/gp/main`

        let fileName = generateUniqueFileName(gpImage, 'mainGpImg')

        let savePath = `${gpImageDir}/${fileName}`
        let isSaved = await saveFile(gpImage, savePath)


        const [gp] = await HomeModel.getGpData(res.pool)

        if (!isSaved) {
            return sendApiError(res, 404, false, 'ग्रामपंचायतीचा फोटो अपलोड नाही झाला.')
        }

        // delte the odl image nanow


        let deletePath = `${gpImageDir}/${gp.gp_image_name}`

        await deleteFile(deletePath)

        await gpModel.updateGpImage(res.pool, fileName)

        return sendApiResponse(res, 200, true, 'ग्रामपंचायतीचा फोटो अपलोड झाला.')
    }),
}


module.exports = gpController