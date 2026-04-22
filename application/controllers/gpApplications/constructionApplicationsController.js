const constructionApplicationsModel = require("../../model/gpApplications/constructionApplicationsModel");
const { addCurrentTimeToDate } = require("../../utils/addCurrentTimeToDate");
const { sendApiResponse } = require("../../utils/apiResponses");
const asyncHandler = require("../../utils/asyncHandler");
const generateUniqueFileName = require("../../utils/generateFileName");
const generatePdf = require("../../utils/generatePdf");
const { saveFile } = require("../../utils/saveFile");
const { renderPage } = require("../../utils/sendResponse");
const { baseDir } = require("../createBaseDir");

const constructionApplicationsController = {
  // render form page
  renderConstructionAppliationFormPage: asyncHandler(async (req, res) => {
    renderPage(
      res,
      "user/gp-applications/construction/construction-form-page.pug",
      {
        title: "इमारत बांधकाम परवानगी अर्ज",
      },
    );
  }),

  // render list page
  renderConstructionApplicationsListPage: asyncHandler(async (req, res) => {
    let { sort = "desc", status = "pending" } = req.query;

    const constructionApplications = await constructionApplicationsModel.list(
      res.pool,
      { sort, status },
    );

    renderPage(
      res,
      "user/gp-applications/construction/construction-applications-list-page.pug",
      {
        title: "इमारत बांधकाम परवानगी अर्ज यादी",
        constructionApplications,
        sort,
        status,
      },
    );
  }),

  // render report page
  renderConstructionApplicationsReportPage: asyncHandler(async (req, res) => {
    let { type } = req.query;

    let constructionApplications = [];
    if (type === "yearToYear") {
      let { fromYear, toYear } = req.query;
      constructionApplications =
        await constructionApplicationsModel.getConstructionApplicationByYearRange(
          res.pool,
          fromYear,
          toYear,
        );
    } else if (type === "monthToMonth") {
      let { month, year } = req.query;
      constructionApplications =
        await constructionApplicationsModel.getConstructionApplicationByMonthAndYear(
          res.pool,
          month,
          year,
        );
    }
    renderPage(
      res,
      "user/gp-applications/construction/construction-applications-report-page.pug",
      {
        title: "इमारत बांधकाम परवानगी अर्ज रिपोर्ट",
        constructionApplications,
      },
    );
  }),

  // render print page

  renderConstructionApplicationPrintPage: asyncHandler(async (req, res) => {
    const { applicationId } = req.params;

    const [constructionApplication] =
      await constructionApplicationsModel.getConstructionApplicationById(
        res.pool,
        applicationId,
      );

    renderPage(
      res,
      "user/gp-applications/construction/construction-application-print.pug",
      {
        title: "इमारत बांधकाम परवानगी अर्ज प्रिंट",
        applicationId,
        constructionApplication,
      },
    );
  }),

  renderConstructionApplicationPdf: asyncHandler(async (req, res) => {
    const { applicationId } = req.params;

    const pdfUrl = `${req.protocol}://${req.get("host")}/construction/application/${applicationId}/print`;

    const pdfBuffer = await generatePdf(pdfUrl);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Imarat_Bandhkam_Parvangi_Arj_${applicationId}.pdf"`,
      "Content-Length": pdfBuffer.length,
    });

    res.send(pdfBuffer);
  }),

  // render single application page (QR / public view)
  renderConstructionApplicationPage: asyncHandler(async (req, res) => {
    const { applicationId } = req.params;

    const [constructionApplication] =
      await constructionApplicationsModel.getConstructionApplicationById(
        res.pool,
        applicationId,
      );

    renderPage(
      res,
      "user/gp-applications/construction/construction-application-details-page.pug",
      {
        title: "इमारत बांधकाम परवानगी अर्ज",
        applicationId,
        constructionApplication,
      },
    );
  }),

  // save new application
  saveConstructionApplication: asyncHandler(async (req, res) => {
    const body = req.body;
    const files = req.files || {};

    // =========================
    // 1. BUILD ATTACHED DOCUMENTS ARRAY
    // =========================
    const attached_documents = [];

    const constructionApplicationDocs = `${baseDir}/uploads/docs/construction/construction-docs`;

    const constructionDocsPublicDir = `/uploads/docs/construction/construction-docs`;

    // Mandatory documents (1–6)
    for (let i = 1; i <= 6; i++) {
      const file = files[`mandatory_document_file_${i}`] || null;

      if (file) {
        const savedName = generateUniqueFileName(file, "construction-doc-");

        await saveFile(file, `${constructionApplicationDocs}/${savedName}`);

        attached_documents.push({
          type: "MANDATORY",
          document_name: body[`mandatory_document_name_${i}`] || "",
          document_saved_name: savedName,
          document_original_name: file.name,
          saved_dir: constructionDocsPublicDir,
        });
      }
    }

    // Optional documents (dynamic)
    for (const key of Object.keys(files)) {
      if (key.startsWith("optional_document_file_")) {
        const index = key.split("_").pop();
        const file = files[key];

        const savedName = generateUniqueFileName(file, "construction-doc-");

        await saveFile(file, `${constructionApplicationDocs}/${savedName}`);

        attached_documents.push({
          type: "OPTIONAL",
          document_name: body[`optional_document_name_${index}`] || "",
          document_saved_name: savedName,
          document_original_name: file.name,
          saved_dir: constructionDocsPublicDir,
        });
      }
    }

    // =========================
    // 2. LANDMARK IMAGES
    // =========================
    const constructionApplicationDirections = `${baseDir}/uploads/images/construction/directions`;

    const constructionDirectionsPublicDir = `/uploads/images/construction/directions`;

    const getImageName = async (field, prefix) => {
      if (!files[field]) return null;

      const file = files[field];
      const savedName = generateUniqueFileName(file, prefix);

      await saveFile(file, `${constructionApplicationDirections}/${savedName}`);

      return savedName;
    };

    const eastImage = await getImageName("east_landmark_image_name", "east-");
    const westImage = await getImageName("west_landmark_image_name", "west-");
    const northImage = await getImageName(
      "north_landmark_image_name",
      "north-",
    );
    const southImage = await getImageName(
      "south_landmark_image_name",
      "south-",
    );

    // =========================
    // 3. FINAL DATA OBJECT
    // =========================
    const data = {
      malmatta_dharak_name: body.malmatta_dharak_name,
      applicant_mobile: body.applicant_mobile,
      applicant_adhar: body.applicant_adhar,
      applicant_address: body.applicant_address,
      gp_name: body.gp_name,
      application_subject: body.application_subject,
      malmatta_no: body.malmatta_no || "",

      attached_documents: attached_documents,

      east_landmark_image_name: eastImage,
      east_landmark_image_latitude: body.east_landmark_image_latitude,
      east_landmark_image_longitude: body.east_landmark_image_longitude,

      west_landmark_image_name: westImage,
      west_landmark_image_latitude: body.west_landmark_image_latitude,
      west_landmark_image_longitude: body.west_landmark_image_longitude,

      north_landmark_image_name: northImage,
      north_landmark_image_latitude: body.north_landmark_image_latitude,
      north_landmark_image_longitude: body.north_landmark_image_longitude,

      south_landmark_image_name: southImage,
      south_landmark_image_latitude: body.south_landmark_image_latitude,
      south_landmark_image_longitude: body.south_landmark_image_longitude,
     
      application_date: body.application_date
    };

    // =========================
    // 4. SAVE TO DB
    // =========================
    data.application_date = addCurrentTimeToDate(data.application_date)
    let { insertId } =
      await constructionApplicationsModel.saveConstructionApplication(
        res.pool,
        data,
      );

    return sendApiResponse(res, 201, true, "बांधकाम अर्ज भरण्यात आला आहे.", {
      applicationId: insertId,
    });
  }),

  // accept application
  acceptConstructionApplication: asyncHandler(async (req, res) => {
    const acceptanceData = req.body;

    // future DB logic
    await constructionApplicationsModel.acceptConstructionApplication(
      res.pool,
      acceptanceData,
    );

    return sendApiResponse(res, 200, true, "बांधकाम परवानगी अर्ज स्वीकारला.");
  }),

  // reject application
  rejectConstructionApplication: asyncHandler(async (req, res) => {
    const rejectionData = req.body;

    // future DB logic
    await constructionApplicationsModel.rejectConstructionApplication(
      res.pool,
      rejectionData,
    );

    return sendApiResponse(res, 200, true, "बांधकाम परवानगी अर्ज नाकारला.");
  }),

  revokeConstructionApplication: asyncHandler(async (req, res) => {
    const { id: applicationId } = req.body;

    // future DB logic
    await constructionApplicationsModel.revokeConstructionApplication(
      res.pool,
      applicationId,
    );

    return sendApiResponse(
      res,
      200,
      true,
      "बांधकाम परवानगी अर्ज प्रलंबित करण्यात आला.",
    );
  }),

  // resolve application
  resolveConstructionApplication: asyncHandler(async (req, res) => {
    const body = req.body;
    const files = req.files || {};

    // =========================
    // 1. BASIC VALIDATION
    // =========================
    if (!body.id) {
      return sendApiResponse(res, 400, false, "अर्ज आयडी आवश्यक आहे.");
    }

    // =========================
    // 2. HANDLE CERTIFICATE FILE
    // =========================
    let certificateFileName = null;

    const constructionCertificateDir = `${baseDir}/uploads/images/construction/certificates`;

    if (files.constructionCertificate) {
      const file = files.constructionCertificate;

      const savedName = generateUniqueFileName(
        file,
        "construction-certificate-",
      );

      await saveFile(file, `${constructionCertificateDir}/${savedName}`);

      certificateFileName = savedName;
    }

    // =========================
    // 3. BUILD UPDATE DATA
    // =========================
    const resolveData = {
      id: body.id,

      application_status: "RESOLVED",

      date_of_resolution: new Date(),

      resolution_remark: body.resolution_remark || null,

      masik_sabha_date: body.masik_sabha_date || null,
      masik_tharav_number: body.masik_tharav_number || null,
      resolution_malmatta_number: body.resolution_malmatta_number || null,

      construction_certificate_date: body.construction_certificate_date || null,

      construction_certification_doc_name: certificateFileName,

      // ===== NEW FIELDS FROM SCHEMA =====
      survey_no: body.survey_no || null,
      group_no: body.group_no || null,
      plot_no: body.plot_no || null,
      total_area_sq_m: body.total_area_sq_m || null,
      total_area_sq_ft: body.total_area_sq_ft || null,
      upper_floor_area_sq_m: body.upper_floor_area_sq_m || null,
      approved_construction_area_sq_m:
        body.approved_construction_area_sq_m || null,
    };

    // =========================
    // 4. DB UPDATE
    // =========================
    await constructionApplicationsModel.resolveConstructionApplication(
      res.pool,
      resolveData,
    );

    return sendApiResponse(
      res,
      200,
      true,
      "बांधकाम अर्जाची पूर्तता यशस्वीरीत्या झाली.",
    );
  }),

  renderConstructionCertificatePrint: asyncHandler(async (req, res) => {
    const { applicationId } = req.params;

    const [constructionApplication] =
      await constructionApplicationsModel.getConstructionApplicationById(
        res.pool,
        applicationId,
      );

    renderPage(
      res,
      "user/gp-applications/construction/construction-certificate-print.pug",
      {
        title: "इमारत बांधकाम परवानगी अर्ज",
        applicationId,
        constructionApplication,
      },
    );
  }),
};

module.exports = constructionApplicationsController;
