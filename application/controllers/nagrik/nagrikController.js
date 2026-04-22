const { UPLOAD_PATHS } = require("../../config/uploadPaths");
const nagrikModel = require("../../model/nagrik/nagrikModel");
const { addCurrentTimeToDate } = require("../../utils/addCurrentTimeToDate");
const { sendApiResponse } = require("../../utils/apiResponses");
const asyncHandler = require("../../utils/asyncHandler");
const generateUniqueFileName = require("../../utils/generateFileName");
const { saveFile, deleteFile } = require("../../utils/saveFile");
const { renderPage } = require("../../utils/sendResponse");

const nagrikController = {
  renderNagrikNondaniReportView: asyncHandler(async (req, res) => {
    const nagrikList = await nagrikModel.getNagrikList(res.pool);
    renderPage(res, `user/nagrik/nagrik-nondani-report-view.pug`, {
      title: "नागरिक नोंदणी यादी",
      imageBaseUrl: `new-gp-page/main-page/images/user-pic`,
      nagrikList,
    });
  }),

  renderNagrikNondaiReportPrintPage: asyncHandler(async (req, res) => {
    let filters = req.query;

    const nagrikList = await nagrikModel.getNagrikList(res.pool, filters);
    renderPage(res, `user/nagrik/nagrik-nondani-report-print-page.pug`, {
      imageBaseUrl: `new-gp-page/main-page/images/user-pic`,
      nagrikList,
    });
  }),

  renderNagrikNondaniEditPage: asyncHandler(async (req, res) => {
    let { id } = req.params;
    const [nagrik] = await nagrikModel.getById(res.pool, id);

    renderPage(res, "user/nagrik/nagrik-nondani-edit-page.pug", {
      title: "Edit नागरीक नोंदणी",
      imageBaseUrl: `new-gp-page/main-page/images/user-pic`,
      nagrik,
    });
  }),


  updateNagrikDetails: asyncHandler(async (req, res) => {
     
     const nagrikData = req.body;

     const userImage = req.files?.userImage;


     const [existingData] = await nagrikModel.getById(res.pool, nagrikData.id)

    let newData = {...existingData, ...nagrikData}

     if(!userImage) {
        newData.image = existingData.fImage;
     }else{
        const imageName = generateUniqueFileName(userImage, "nagrik-");

        console.log("new iamge Name", imageName)
        const destPath = `${UPLOAD_PATHS.users.profile}/${imageName}`;
        await saveFile(userImage, destPath);
        req.filesToCleanup.push(destPath);
        newData.image = imageName
        console.log("old file name", `${UPLOAD_PATHS.users.profile}/${existingData.fImage}`)
        await deleteFile(`${UPLOAD_PATHS.users.profile}/${existingData.fImage}`)
     }

     nagrikData.createdAt = addCurrentTimeToDate(nagrikData.createdAt)


     await nagrikModel.update(res.pool, newData);

     return sendApiResponse(res, 200, true, "Updated.")
  }),
};

module.exports = nagrikController;
