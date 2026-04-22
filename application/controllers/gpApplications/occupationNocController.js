const { UPLOAD_PATHS } = require("../../config/uploadPaths");
const occupationNocSubjects = require("../../data/occupationNocSubjects");
const occupationNocModel = require("../../model/gpApplications/occupationNocModel");
const { addCurrentTimeToDate } = require("../../utils/addCurrentTimeToDate");
const { sendApiResponse, sendApiError } = require("../../utils/apiResponses");
const AppError = require("../../utils/AppError");
const asyncHandler = require("../../utils/asyncHandler");
const generateUniqueFileName = require("../../utils/generateFileName");
const { saveFile } = require("../../utils/saveFile");
const { renderPage } = require("../../utils/sendResponse");

const printPageMap = Object.freeze({
  कुक्कुटपालन_NOC: "poultry-farm-noc",
  किराणा_दुकान_व्यवसाय: "grocery-shop-license",
  गोशाळा_NOC: "goshala-noc",
  खान_व्यवसाय_NOC: "mining-business-noc",
  दवाखाना_NOC: "clinic-hospital-noc",
  दुग्ध_व्यवसाय_NOC: "dairy-business-noc",
  महावितरण_विद्युत_वहन_NOC: "electric-line-permission-noc",
  वृक्ष_तोडणी_NOC: "tree-cutting-noc",
  वीज_कनेक्शन_NOC: "electricity-connection-noc",
});

const occupationNocController = {
  // =========================
  // RENDER FORM PAGE
  // =========================
  renderOccupationNocFormPage: asyncHandler(async (req, res) => {
    renderPage(
      res,
      "user/gp-applications/occupation-noc/occupation-noc-form-page.pug",
      {
        title: "व्यवसायासाठी ना हरकत प्रमाणपत्र अर्ज",
        occupationNocSubjects,
      },
    );
  }),

  // =========================
  // RENDER LIST PAGE
  // =========================
  renderOccupationNocListPage: asyncHandler(async (req, res) => {
    const { sort = "desc", status = "pending", subject } = req.query;

    const occupationNocApplications = await occupationNocModel.list(res.pool, {
      sort,
      status,
      subject,
    });

    renderPage(
      res,
      "user/gp-applications/occupation-noc/occupation-noc-list-page.pug",
      {
        title: "ना हरकत प्रमाणपत्र अर्जांची यादी",
        occupationNocApplications,
        occupationNocSubjects,
        sort,
        status,
        subject,
      },
    );
  }),

  // =========================
  // RENDER SINGLE DETAILS PAGE
  // =========================
  renderOccupationNocDetailsPage: asyncHandler(async (req, res) => {
    const { applicationId } = req.params;

    const [occupationNoc] = await occupationNocModel.getById(
      res.pool,
      applicationId,
    );

    if (!occupationNoc) {
      return sendApiError(res, 404, false, "अर्ज सापडला नाही.");
    }

    renderPage(
      res,
      "user/gp-applications/occupation-noc/occupation-noc-application-page.pug",
      {
        title: "ना हरकत प्रमाणपत्र अर्जाची माहिती",
        applicationId,
        occupationNoc,
      },
    );
  }),

  // =========================
  // RENDER PRINT PAGE
  // =========================
  renderOccupationNocPrintPage: asyncHandler(async (req, res) => {
    const { applicationId } = req.params;

    const [occupationNoc] = await occupationNocModel.getById(
      res.pool,
      applicationId,
    );

    if (!occupationNoc) {
      return sendApiError(res, 404, false, "अर्ज सापडला नाही.");
    }

    let printPageName = printPageMap[occupationNoc.subject_code];

    renderPage(
      res,
      `user/gp-applications/occupation-noc/print/${printPageName}-print-page.pug`,
      {
        title: "ना हरकत प्रमाणपत्र प्रिंट",
        applicationId,
        occupationNoc,
      },
    );
  }),

  // =========================
  // SAVE NEW APPLICATION
  // =========================
  saveOccupationNocApplication: asyncHandler(async (req, res) => {
    let occupationNocData = req.body;

    // console.log(occupationNocData)

    if (!occupationNocData.applicant_mobile) {
        throw new AppError("मोबाईल क्रमांक आवश्यक आहे.", 400)
    }

    const files = req.files || {};

    const existing = await occupationNocModel.getByMobile(
      res.pool,
      occupationNocData.applicant_mobile,
    );

    if (existing.length > 0) {
        throw new AppError(`सदर मोबाईल क्र. ${occupationNocData.applicant_mobile} आधीच वापरला आहे.`, 409)
    }

    let documents = JSON.parse(
      occupationNocData.uploaded_documents_list || "[]",
    );

    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i];
      const fileKey = `document_file_${i}`;

      // ✅ Assign unique memberId if not present (for new members)
      if (!doc.id) {
        doc.id = `m-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      }

      if (files[fileKey]) {
        const file = files[fileKey];
        const savedName = generateUniqueFileName(file, "occupation-noc-doc-");

        let destPath = `${UPLOAD_PATHS.occupationNoc.documents}/${savedName}`
        await saveFile(
          file,
          destPath
        );

        req.filesToCleanup.push(destPath);

        doc.document_saved_path = savedName;
        doc.document_original_name = file.name;
      }
    }

    occupationNocData = {
      ...occupationNocData,
      documents,
      createdAt: addCurrentTimeToDate(occupationNocData.createdAt)
    };

    const { insertId } = await occupationNocModel.save(
      res.pool,
      occupationNocData,
    );

    return sendApiResponse(
      res,
      201,
      true,
      "अर्ज यशस्वीरीत्या जतन करण्यात आला.",
      {
        applicationId: insertId,
      },
    );
  }),

  // =========================
  // UPDATE APPLICATION STATUS
  // =========================
  updateOccupationNocStatus: asyncHandler(async (req, res) => {
    const {
      id,
      status,
      remark,
      sabha_date,
      malmatta_no,
      resolution_no,
      print_date,
      survey_no,
    } = req.body;

    if (!id || !status) {
      return sendApiError(res, 400, false, "अर्ज आयडी आणि स्थिती आवश्यक आहे.");
    }

    const normalizedStatus = status.toUpperCase();

    if (normalizedStatus === "ACCEPTED") {
      await occupationNocModel.acceptApplication(res.pool, {
        id,
        acceptance_remark: remark || null,
        print_date,
        sabha_date,
        malmatta_no,
        resolution_no,
        survey_no,
      });

      return sendApiResponse(
        res,
        200,
        true,
        "ना हरकत प्रमाणपत्र अर्ज मंजूर करण्यात आला आहे.",
      );
    }

    if (normalizedStatus === "REJECTED") {
      await occupationNocModel.rejectApplication(res.pool, {
        id,
        rejection_remark: remark || null,
      });

      return sendApiResponse(
        res,
        200,
        true,
        "ना हरकत प्रमाणपत्र अर्ज नामंजूर करण्यात आला आहे.",
      );
    }

    if (normalizedStatus === "PENDING") {
      await occupationNocModel.revokeApplication(res.pool, id);

      return sendApiResponse(
        res,
        200,
        true,
        "ना हरकत प्रमाणपत्र अर्ज पुन्हा प्रलंबित स्थितीत ठेवण्यात आला आहे.",
      );
    }

    return sendApiError(res, 400, false, "अवैध अर्ज स्थिती.");
  }),

  renderOccupationNocReportPrintPage: asyncHandler(async (req, res) => {
    let { type, subject = "", fromYear, toYear, month, year } = req.query;
    let occupationNocs = [];

    if (type === "yearToYear") {
      occupationNocs = await occupationNocModel.listByYearRange(
        res.pool,
        fromYear,
        toYear,
        subject,
        {
          status: "ACCEPTED",
        },
      );
    } else if (type === "monthToMonth") {
      occupationNocs = await occupationNocModel.listByMonthAndYear(
        res.pool,
        month,
        year,
        subject,
        {
          status: "ACCEPTED",
        },
      );
    }

    console.log(year)

    console.log(
        {
        title: subject ? `${subject?.split("_").join(" ")} रिपोर्ट` : "व्यवसाय ना हरकत रिपोर्ट",

        occupationNocs,
        subject,
        occupationNocSubjects,

        type,

        month,
        year,

        fromYear,
        toYear
      }
    )

    renderPage(
      res,
      "user/gp-applications/occupation-noc/occupation-noc-report-print-page.pug",
      {
        title: subject ? `${subject?.split("_").join(" ")} रिपोर्ट` : "व्यवसाय ना हरकत रिपोर्ट",

        occupationNocs,
        subject,
        occupationNocSubjects,

        type,

        month,
        year,

        fromYear,
        toYear
      },
    );
  }),
};

module.exports = occupationNocController;
