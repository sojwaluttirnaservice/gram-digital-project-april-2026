const complaintsModel = require("../../model/complaints/complaintsModel");
const { addCurrentTimeToDate } = require("../../utils/addCurrentTimeToDate");
const { sendApiResponse, sendApiError } = require("../../utils/apiResponses");
const AppError = require("../../utils/AppError");
const asyncHandler = require("../../utils/asyncHandler");
const generateUniqueFileName = require("../../utils/generateFileName");
const { saveFile } = require("../../utils/saveFile");
const { renderPage } = require("../../utils/sendResponse");
const { baseDir } = require("../createBaseDir");
const CandidateController = require("../HomeController");

const complaintsController = {
  // =====================================================
  // DISPLAY LISTING PAGES (HTML pages)
  // =====================================================

  renderComplaintsFormPage: asyncHandler(async (req, res) => {
    const allRequiredData = await CandidateController.getCommonData(req, res);
    renderPage(res, "user/complaints/complaints-form-page.pug", {
      ...allRequiredData,
    });
  }),

  renderComplaintsListPage: asyncHandler(async (req, res) => {
    const status = req.query.status || "pending";

    let sort = req.query.sort || "desc";

    const complaints = await complaintsModel.list(res.pool, status, sort);

    const viewMap = {
      pending: "user/complaints/complaints-list-page.pug",
      accepted: "user/complaints/accepted-complaints-list-page.pug",
      rejected: "user/complaints/rejected-complaints-list-page.pug",
      resolved: "user/complaints/resolved-complaints-list-page.pug",
    };

    const view = viewMap[status] || viewMap.pending;

    renderPage(res, view, { complaints, title: "तक्रार यादी", sort });
  }),

  renderComplaintPage: asyncHandler(async (req, res) => {
    let { complaintId } = req.params;

    let [complaint] = await complaintsModel.getComplaintById(
      res.pool,
      complaintId,
    );

    renderPage(res, "user/complaints/complaint-page.pug", {
      complaint,
    });
  }),

  renderComplaintsReportPage: asyncHandler(async (req, res) => {
    let { type } = req.query;

    let complaints = [];
    if (type === "yearToYear") {
      let { fromYear, toYear } = req.query;
      complaints = await complaintsModel.getComplaintsByYearRange(
        res.pool,
        fromYear,
        toYear,
      );
    } else if (type === "monthToMonth") {
      let { month, year } = req.query;
      complaints = await complaintsModel.getComplaintsByMonthAndYear(
        res.pool,
        month,
        year,
      );
    }

    renderPage(res, "user/complaints/complaints-report-page.pug", {
      complaints,
      title: "तक्रार यादी रिपोर्ट",
    });
  }),

  renderComplaintApplicationPage: asyncHandler(async (req, res) => {
    let { applicationId } = req.params;
    let [complaint] = await complaintsModel.getComplaintById(
      res.pool,
      applicationId,
    );
    renderPage(res, "user/complaints/complaint-application-print.pug", {
      complaint,
    });
  }),

  // =====================================================
  // API: Register Complaint
  // =====================================================
  registerComplaint: asyncHandler(async (req, res) => {
    let data = req.body;
    // console.log(data);

    const { imageForComplaint: complaintImage, docForComplaint: complaintDoc } =
      req.files;

    let existingComplaintsInPrevious90Days =
      await complaintsModel.existingComplaintsInPreviousDays(
        res.pool,
        data,
        90,
      );

    let totalComplaints = existingComplaintsInPrevious90Days.length;
    if (totalComplaints) {
      let lastComplaint =
        existingComplaintsInPrevious90Days[totalComplaints - 1];

      let lastComplaintDate = new Date(lastComplaint.createdAt);
      let today = new Date();

      // Difference in milliseconds
      let diffInMs = today - lastComplaintDate;

      // Convert to days
      let diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      // Remaining days out of 90
      let remainingDays = 90 - diffInDays;

      if (remainingDays > 0) {
        throw new AppError(`तुम्ही आधी तक्रार नोंदवली आहे. कृपया ${remainingDays} दिवसांनंतर पुन्हा तक्रार नोंदवा.`, 409)
      }
    }

    if (!complaintImage) {
        throw new AppError("तक्रार कोणत्या संदर्भात आहे याचा फोटो अपलोड करा", 404)
    }

    if (!complaintDoc) {
        throw new AppError("तक्रारीसाठी आवश्यक कागदपत्र जोडावेत", 404)
    }

    let complaintImageDir = `${baseDir}/uploads/images/complaints`;
    let imageName = generateUniqueFileName(complaintImage, "complaint-");
    let complaintImagePath = `${complaintImageDir}/${imageName}`;
    let isImageSaved = await saveFile(complaintImage, complaintImagePath);
    req.filesToCleanup.push(complaintImagePath)

    let complaintDocDir = `${baseDir}/uploads/docs/complaints`;
    let docName = generateUniqueFileName(complaintDoc, "complaint-");
    let complaintDocPath = `${complaintDocDir}/${docName}`;

    let isDocSaved = await saveFile(complaintDoc, complaintDocPath);
    req.filesToCleanup.push(complaintDocPath)

    data.complaintImageUrl = imageName;
    data.complaintDocUrl = docName;

    if (!data.imageLatitude || !data.imageLongitude) {
      throw new AppError("लोकेशन मिळाले नाही", 400)
    }

    const createdAt = addCurrentTimeToDate(data.createdAt);

    let { insertId }= await complaintsModel.register(res.pool, {...data, createdAt});

    return sendApiResponse(res, 200, true, "तक्रार नोंदवली गेली", {
        id: insertId
    });
  }),

  // =====================================================
  // API: List All Complaints
  // =====================================================
  getAllComplaints: asyncHandler(async (req, res) => {
    const rows = await complaintsModel.list(res.pool);

    return sendApiResponse(res, 200, true, "यशस्वी", rows);
  }),

  // =====================================================
  // API: Update Complaint Status
  //   not in USE TEMPORIRALY
  // =====================================================
  updateComplaintStatus: asyncHandler(async (req, res) => {
    const data = req.body;

    if (!data.id) return sendApiResponse(res, 400, false, "ID आवश्यक आहे");

    if (!data.complaintStatus)
      return sendApiResponse(res, 400, false, "स्टेटस आवश्यक आहे");

    await complaintsModel.updateStatus(res.pool, data);

    return sendApiResponse(res, 200, true, "स्टेटस अपडेट झाले");
  }),

  revokeComplaint: asyncHandler(async (req, res) => {
    let { id: complaintId } = req.body || req.params;

    await complaintsModel.revokeComplaint(res.pool, complaintId);

    return sendApiResponse(
      res,
      200,
      true,
      "तक्रार पुन्हा प्रलंबित स्थितीत आणली गेली आहे",
    );
  }),

  acceptComplaint: asyncHandler(async (req, res) => {
    const acceptedData = req.body;

    await complaintsModel.acceptComplaint(res.pool, acceptedData);

    // -----------------------------
    // 6. Success response
    // -----------------------------
    return sendApiResponse(
      res,
      200,
      true,
      "तक्रार यशस्वीरित्या स्वीकारली गेली.",
    );
  }),

  resolveComplaint: asyncHandler(async (req, res) => {
    const resolvedData = req.body;

    // -----------------------------
    // 1. Validate image presence
    // -----------------------------
    if (!req.files || !req.files.resolvedComplaintImage) {
      return sendApiError(
        res,
        400,
        false,
        "तक्रार निवारण झाल्याचे छायाचित्र अपलोड करणे आवश्यक आहे.",
      );
    }

    const complaintImage = req.files.resolvedComplaintImage;

    // -----------------------------
    // 2. Generate unique file name
    // -----------------------------
    const imageName = generateUniqueFileName(complaintImage);

    // -----------------------------
    // 3. Prepare save path
    // -----------------------------
    const resolutionImageDir = `${baseDir}/uploads/images/complaints/resolution`;
    const imagePath = `${resolutionImageDir}/${imageName}`;

    // -----------------------------
    // 4. Save image using helper
    // -----------------------------
    const isSaved = await saveFile(complaintImage, imagePath);

    if (!isSaved) {
      return sendApiError(
        res,
        500,
        false,
        "छायाचित्र जतन करता आले नाही. कृपया पुन्हा प्रयत्न करा.",
      );
    }

    // -----------------------------
    // 5. Persist DB data
    // -----------------------------
    resolvedData.complaintResolutionImageUrl = imageName;

    await complaintsModel.resolveComplaint(res.pool, resolvedData);

    // -----------------------------
    // 6. Success response
    // -----------------------------
    return sendApiResponse(
      res,
      200,
      true,
      "तक्रार यशस्वीरित्या स्वीकारली गेली.",
    );
  }),

  rejectComplaint: asyncHandler(async (req, res) => {
    let rejectedData = req.body;

    await complaintsModel.rejectComplaint(res.pool, rejectedData);

    return sendApiResponse(res, 200, true, "तक्रार नाकारण्यात आली.");
  }),

  extendResolutionDate: asyncHandler(async (req, res) => {
    let newExtendData = req.body;

    let { id: complaintId } = newExtendData;

    let [originalComplaintDetails] = await complaintsModel.getComplaintById(
      res.pool,
      complaintId,
    );

    // insert in history table
    await complaintsModel.addResolutionDateChange(
      res.pool,
      originalComplaintDetails,
      newExtendData,
      complaintId,
    );

    // update in main table
    await complaintsModel.updateResolutionDateChange(res.pool, newExtendData);

    return sendApiResponse(res, 200, true, "निवारण दिनांक पुढे ढकलण्यात आली.");
  }),
};

module.exports = complaintsController;
