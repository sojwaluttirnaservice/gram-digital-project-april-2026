const subjects = require("../../data/tahsilOfficeSevaSubjects");
const tahsilOfficeSevaModel = require("../../model/gpApplications/tahsilOfficeSevaModel");
const { addCurrentTimeToDate } = require("../../utils/addCurrentTimeToDate");
const { sendApiResponse, sendApiError } = require("../../utils/apiResponses");
const AppError = require("../../utils/AppError");
const asyncHandler = require("../../utils/asyncHandler");
const generateUniqueFileName = require("../../utils/generateFileName");
const { saveFile, deleteFile } = require("../../utils/saveFile");
const { renderPage } = require("../../utils/sendResponse");
const { baseDir } = require("../createBaseDir");


const tahsilOfficeSevaController = {
  // ============================================
  // RENDER FORM PAGE
  // ============================================
  renderTahsilOfficeSevaFormPage: asyncHandler(async (req, res) => {
    renderPage(
      res,
      "user/gp-applications/tahsil-office-seva/tahsil-office-seva-form-page.pug",
      {
        title: "नागरिक सेवा अर्ज",
        subjects,
      },
    );
  }),

  // ============================================
  // RENDER EDIT PAGE
  // ============================================
  renderEditTahsilOfficeSevaPage: asyncHandler(async (req, res) => {
    const { applicationId } = req.params;

    const [application] = await tahsilOfficeSevaModel.getById(
      res.pool,
      applicationId,
    );

    if (!application) {
      return sendApiError(res, 404, false, "अर्ज सापडला नाही.");
    }

    renderPage(
      res,
      "user/gp-applications/tahsil-office-seva/edit-tahsil-office-seva-form-page.pug",
      {
        title: "नागरिक सुविधा सेवा अर्ज",
        application,
      },
    );
  }),

  // ============================================
  // RENDER LIST PAGE
  // ============================================
  renderTahsilOfficeSevaListPage: asyncHandler(async (req, res) => {
    const { sort = "desc", status = "pending", subject } = req.query;

    let applications = [];
    const websiteToShow =
      subjects.find((s) => s.subject_name.trim() === subject?.trim())
        ?.website || "";

    if (subject) {
      applications = await tahsilOfficeSevaModel.list(res.pool, {
        sort,
        status,
        subject,
      });
    }

    renderPage(
      res,
      "user/gp-applications/tahsil-office-seva/tahsil-office-seva-list-page.pug",
      {
        title: "नागरिक सुविधा सेवा अर्जांची यादी",
        applications,
        sort,
        status,
        selectedSubject: subject,
        subjects,
        websiteToShow,
      },
    );
  }),

  // ============================================
  // RENDER DETAILS PAGE
  // ============================================
  renderTahsilOfficeSevaDetailsPage: asyncHandler(async (req, res) => {
    const { applicationId } = req.params;

    const [application] = await tahsilOfficeSevaModel.getById(
      res.pool,
      applicationId,
    );

    renderPage(
      res,
      "user/gp-applications/tahsil-office-seva/tahsil-office-seva-application-print-page.pug",
      {
        title: "नागरिक सुविधा सेवा अर्जाची माहिती",
        applicationId,
        application,
      },
    );
  }),


  renderTahsilOfficeSevaApplicationDetailsPage: asyncHandler(async (req, res) => {
     
    const { applicationId } = req.params;

    const [application] = await tahsilOfficeSevaModel.getById(
      res.pool,
      applicationId,
    );

    renderPage(
      res,
      "user/gp-applications/tahsil-office-seva/tahsil-office-seva-application-print-page.pug",
      {
        title: "नागरिक सुविधा सेवा अर्जाची माहिती",
        applicationId,
        application,
      },
    );
  }),

  renderTahsilOfficeSevaReportPage: asyncHandler(async (req, res) => {
    let { cert: filterCertificate, type } = req.query;
    let applications = [];
    if (type === "yearToYear") {
      let { fromYear, toYear } = req.query;
      applications = await tahsilOfficeSevaModel.getByYearRange(
        res.pool,
        fromYear,
        toYear,
        {
          status: "accepted",
          subject: filterCertificate,
        },
      );
    } else if (type === "monthToMonth") {
      let { month, year } = req.query;
      applications = await tahsilOfficeSevaModel.getByMonthAndYear(
        res.pool,
        month,
        year,
        {
          status: "accepted",
          subject: filterCertificate,
        },
      );
    }
    renderPage(
      res,
      "user/gp-applications/tahsil-office-seva/tahsil-office-seva-applications-report-page.pug",
      {
        title: "नागरिक सुविधा सेवा अर्ज अहवाल",
        applications,
        subjects,
        filterCertificate,
      },
    );
  }),

  // ============================================
  // SAVE NEW APPLICATION
  // ============================================
  saveTahsilOfficeSevaApplication: asyncHandler(async (req, res) => {
    const body = req.body;
    const files = req.files || {};

    if (!body.applicant_mobile) {
        throw new AppError("मोबाईल क्रमांक आवश्यक आहे.", 400)
    }

    const existing = await tahsilOfficeSevaModel.getByMobile(
      res.pool,
      body.applicant_mobile,
    );

    if (existing.length > 0) {
      throw new AppError(`सदर मोबाईल क्र. ${body.applicant_mobile} आधीच वापरला आहे.`, 409)
    }

    // ============================================
    // UPLOADED DOCUMENTS
    // ============================================
    let documents = JSON.parse(body.uploaded_documents_list || "[]");

    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i];
      const fileKey = `document_file_${i}`;

      // ✅ Assign unique memberId if not present (for new members)
      if (!doc.id) {
        doc.id = `m-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      }

      if (files[fileKey]) {
        const file = files[fileKey];
        const savedName = generateUniqueFileName(file, "tahsil-doc-");

        let destPath = `${baseDir}/uploads/docs/tahsil-office-seva/${savedName}`
        await saveFile(
          file,
          destPath
        );

        req.filesToCleanup.push(destPath)

        doc.document_saved_path = savedName;
        doc.document_original_name = file.name;
      }
    }

    const data = {
      applicant_name: body.applicant_name,
      applicant_mobile: body.applicant_mobile,
      applicant_aadhaar: body.applicant_aadhaar,
      applicant_address: body.applicant_address,
      subject: body.subject,
      subject_id: body.subject_id,
      uploaded_documents_list: documents,
      createdAt : addCurrentTimeToDate(body.createdAt)
    };

    const { insertId } = await tahsilOfficeSevaModel.save(res.pool, data);

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

  // ============================================
  // UPDATE APPLICATION
  // ============================================
  updateTahsilOfficeSevaApplication: asyncHandler(async (req, res) => {
    const body = req.body;
    const files = req.files || {};
    const applicationId = body.id;

    if (!applicationId) {
      return sendApiError(res, 400, false, "अर्ज आयडी आवश्यक आहे.");
    }

    const [existingApplication] = await tahsilOfficeSevaModel.getById(
      res.pool,
      applicationId,
    );

    if (!existingApplication) {
      return sendApiError(res, 404, false, "अर्ज सापडला नाही.");
    }

    let documents = JSON.parse(body.uploaded_documents_list || "[]");
    let existingDocs = [];

    try {
      existingDocs = JSON.parse(
        existingApplication.uploaded_documents_list || "[]",
      );
    } catch {
      existingDocs = [];
    }

    // Remove deleted files
    const existingIds = existingDocs.map((d) => d.id);
    const updatedIds = documents.map((d) => d.id);

    const removedIds = existingIds.filter((id) => !updatedIds.includes(id));

    for (let rid of removedIds) {
      const removed = existingDocs.find((d) => d.id === rid);
      if (removed?.document_saved_path) {
        await deleteFile(
          `${baseDir}/uploads/docs/tahsil-office-seva/${removed.document_saved_path}`,
        );
      }
    }

    // Save new uploads
    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i];
      const fileKey = `document_file_${i}`;

      if (files[fileKey]) {
        if (doc.document_saved_path) {
          await deleteFile(
            `${baseDir}/uploads/docs/tahsil-office-seva/${doc.document_saved_path}`,
          );
        }

        const file = files[fileKey];
        const savedName = generateUniqueFileName(file, "tahsil-doc-");

        await saveFile(
          file,
          `${baseDir}/uploads/docs/tahsil-office-seva/${savedName}`,
        );

        doc.document_saved_path = savedName;
        doc.document_original_name = file.name;
      }
    }

    const data = {
      applicant_name: body.applicant_name,
      applicant_mobile: body.applicant_mobile,
      applicant_aadhaar: body.applicant_aadhaar,
      applicant_address: body.applicant_address,
      subject: body.subject,
      uploaded_documents_list: documents,
    };

    await tahsilOfficeSevaModel.update(res.pool, applicationId, data);

    return sendApiResponse(
      res,
      200,
      true,
      "अर्ज यशस्वीरीत्या अद्यतनित करण्यात आला.",
      { applicationId },
    );
  }),

  // ============================================
  // STATUS UPDATE
  // ============================================
  updateTahsilOfficeSevaStatus: asyncHandler(async (req, res) => {
    const { id, status, remark } = req.body;

    if (!id || !status) {
      return sendApiError(res, 400, false, "अर्ज आयडी व स्थिती आवश्यक आहे.");
    }

    const normalizedStatus = status.toUpperCase();

    if (normalizedStatus === "ACCEPTED") {
      await tahsilOfficeSevaModel.acceptApplication(res.pool, {
        id,
        acceptance_remark: remark || null,
      });
      return sendApiResponse(res, 200, true, "अर्ज मंजूर करण्यात आला आहे.");
    }

    if (normalizedStatus === "REJECTED") {
      await tahsilOfficeSevaModel.rejectApplication(res.pool, {
        id,
        rejection_remark: remark || null,
      });
      return sendApiResponse(res, 200, true, "अर्ज नामंजूर करण्यात आला आहे.");
    }

    if (normalizedStatus === "PENDING") {
      await tahsilOfficeSevaModel.revokeApplication(res.pool, id);
      return sendApiResponse(
        res,
        200,
        true,
        "अर्ज पुन्हा प्रलंबित स्थितीत ठेवण्यात आला आहे.",
      );
    }

    return sendApiError(res, 400, false, "अवैध स्थिती पाठविण्यात आली आहे.");
  }),
};

module.exports = tahsilOfficeSevaController;
