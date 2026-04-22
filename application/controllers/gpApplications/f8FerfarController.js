const { UPLOAD_PATHS } = require("../../config/uploadPaths");
const ferfarApplicationsModel = require("../../model/gpApplications/ferfarApplicationsModel");
const { addCurrentTimeToDate } = require("../../utils/addCurrentTimeToDate");
const { sendApiResponse, sendApiError } = require("../../utils/apiResponses");
const AppError = require("../../utils/AppError");
const asyncHandler = require("../../utils/asyncHandler");
const generateUniqueFileName = require("../../utils/generateFileName");
const { saveFile } = require("../../utils/saveFile");
const { renderPage } = require("../../utils/sendResponse");
const { baseDir } = require("../createBaseDir");

const f8FerfarController = {
  renderFerfarApplicationsList: asyncHandler(async (req, res) => {
    let { sort = "desc", status = "pending" } = req.query;

    const f8FerfarApplications = await ferfarApplicationsModel.list(res.pool, {
      sort,
      status,
    });
    renderPage(
      res,
      "user/gp-applications/ferfar/property-ferfar-application-list-page.pug",
      {
        f8FerfarApplications,
        status,
        sort,
      }
    );
  }),
  renderGpPropertyFerfarFormPage: asyncHandler(async (req, res) => {
    renderPage(
      res,
      "user/gp-applications/ferfar/property-ferfar-form-page.pug"
    );
  }),

  registerGpPropertyFerfarForm: asyncHandler(async (req, res) => {
    let ferfarApplication = req.body;

    let ferfarDocument = req.files.ferfarDocument;

    if (!ferfarDocument) {
      throw new AppError("फेरफार कागदपत्र जोडा.", 400)
    }

    let fileName = generateUniqueFileName(ferfarDocument, "ferfar-doc-");

    let ferfarApplicationDocs = `${baseDir}/uploads/docs/ferfar-applications`;

    let savePath = `${ferfarApplicationDocs}/${fileName}`;

    let isSaved = await saveFile(ferfarDocument, savePath);
    req.filesToCleanup.push(savePath)

    if (!isSaved) {
      throw new AppError("फेरफार कागदपत्र जतन नाही करता आला.", 400)
    }

    ferfarApplication.ferfar_document_saved_name = fileName;

    ferfarApplication.application_date = addCurrentTimeToDate(ferfarApplication.application_date) 
    console.log('------')
    console.log(ferfarApplication)
    console.log('-----')
    let { insertId } = await ferfarApplicationsModel.saveFerfarApplication(
      res.pool,
      ferfarApplication
    );

    return sendApiResponse(res, 201, true, "अर्ज नोंदवला गेला", {
      ferfarApplicationId: insertId,
    });
  }),

  renderFerfarApplicationPrint: asyncHandler(async (req, res) => {
    let { applicationId } = req.params;

    let [ferfarApplication] =
      await ferfarApplicationsModel.getFerfarApplicationById(
        res.pool,
        applicationId
      );

    renderPage(
      res,
      "user/gp-applications/ferfar/property-ferfar-application-print.pug",
      { ferfarApplication }
    );
  }),

  revokeFerfarApplication: asyncHandler(async (req, res) => {
    let { id: ferfarApplicationId } = req.body;
    await ferfarApplicationsModel.revokeFerfarApplication(
      res.pool,
      ferfarApplicationId
    );

    sendApiResponse(res, 200, true, "फेरफार अर्ज प्रलंबित करण्यात आला.");
  }),

  acceptFerfarApplication: asyncHandler(async (req, res) => {
    let acceptanceData = req.body;

    await ferfarApplicationsModel.acceptFerfarApplication(
      res.pool,
      acceptanceData
    );

    return sendApiResponse(res, 200, true, "फेरफार अर्ज स्वीकारण्यात आला.");
  }),

  rejectFerfarApplication: asyncHandler(async (req, res) => {
    let rejectionData = req.body;

    await ferfarApplicationsModel.rejectFerfarApplication(
      res.pool,
      rejectionData
    );

    return sendApiResponse(res, 200, true, "फेरफार अर्ज नाकारण्यात आला.");
  }),

  resolveFerfarApplication: asyncHandler(async (req, res) => {
    let resolutionData = req.body;

    await ferfarApplicationsModel.resolveFerfarApplication(
      res.pool,
      resolutionData
    );

    return sendApiResponse(res, 200, true, "फेरफार अर्जाची पूर्तता झाली.");
  }),

  renderFerfarReportPage: asyncHandler(async (req, res) => {
    let { type } = req.query;

    let f8FerfarApplications = [];
    if (type === "yearToYear") {
      let { fromYear, toYear } = req.query;
      f8FerfarApplications =
        await ferfarApplicationsModel.getFerfarApplicationsByYearRange(
          res.pool,
          fromYear,
          toYear
        );
    } else if (type === "monthToMonth") {
      let { month, year } = req.query;
      f8FerfarApplications =
        await ferfarApplicationsModel.getFerfarApplicationsByMonthAndYear(
          res.pool,
          month,
          year
        );
    }

    renderPage(
      res,
      "user/gp-applications/ferfar/property-ferfar-report-page.pug",
      {
        f8FerfarApplications,
        title: "फेरफार अर्ज रिपोर्ट",
      }
    );
  }),


  renderFerfarApplicationDetailsPage: asyncHandler(async (req, res) => {
     let {applicationId} = req.params;

     let [ferfarApplication] = await ferfarApplicationsModel.getFerfarApplicationById(res.pool, applicationId);
     
    renderPage(res, 'user/gp-applications/ferfar/property-ferfar-details-page.pug', {
        ferfarApplication
    })
  }),
};

module.exports = f8FerfarController;
