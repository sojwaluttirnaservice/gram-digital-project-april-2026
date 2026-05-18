const { UPLOAD_PATHS } = require("../../application/config/uploadPaths");
const govYojanaModel = require("../../application/model/govYojana/govYojanaModel");
const { sendApiResponse } = require("../../application/utils/apiResponses");
const AppError = require("../../application/utils/AppError");
const asyncHandler = require("../../application/utils/asyncHandler");
const generateUniqueFileName = require("../../application/utils/generateFileName");
const getRouter = require("../../application/utils/getRouter");
const { saveFile, deleteFile } = require("../../application/utils/saveFile");
const { renderPage } = require("../../application/utils/sendResponse");

const govYojanaRouter = getRouter();

govYojanaRouter.get(
  "/list",
  asyncHandler(async (req, res) => {
    let govYojanaList = await govYojanaModel.list(res.pool);
    console.log(govYojanaList);
    renderPage(res, "user/govYojana/gov-yojana-list-page.pug", {
      title: "शासकीय योजना यादी",
      govYojanaList,
    });
  }),
);

govYojanaRouter.put(
  "/",
  asyncHandler(async (req, res) => {
    let govYojanaData = req.body;

    let [oldData] = await govYojanaModel.getById(res.pool, +govYojanaData.id);

    if (!oldData) {
      throw new AppError("योजना सापडली नाही.", 400);
    }

    let imageBanner = req.files?.imageBanner;

    let file = req.files?.file;

    /* =====================================
        IMAGE BANNER
    ===================================== */

    if (imageBanner) {
      if (oldData.image_banner) {
        await deleteFile(
          `${UPLOAD_PATHS.files.govYojanaImages}/${oldData.image_banner}`,
        );
      }

      let imageBannerName = generateUniqueFileName(
        imageBanner,
        "gov-image-banner-",
      );

      let dest = `${UPLOAD_PATHS.files.govYojanaImages}/${imageBannerName}`;

      await saveFile(imageBanner, dest);

      govYojanaData.image_banner = imageBannerName;

      req.filesToCleanup.push(dest);
    } else {
      govYojanaData.image_banner = oldData.image_banner;
    }

    /* =====================================
        DOCUMENT FILE
    ===================================== */

    if (file) {
      if (oldData.file_name) {
        await deleteFile(
          `${UPLOAD_PATHS.files.govYojana}/${oldData.file_name}`,
        );
      }

      let fileName = generateUniqueFileName(file, "gov-file-");

      let dest = `${UPLOAD_PATHS.files.govYojana}/${fileName}`;

      await saveFile(file, dest);

      govYojanaData.file_name = fileName;

      req.filesToCleanup.push(dest);
    } else {
      govYojanaData.file_name = oldData.file_name;
    }

    await govYojanaModel.update(res.pool, govYojanaData)

    return sendApiResponse(res, 200, true, "योजना अपडेट झाली.");
  }),
);

module.exports = govYojanaRouter;
