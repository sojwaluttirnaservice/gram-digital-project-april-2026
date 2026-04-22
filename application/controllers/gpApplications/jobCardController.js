const jobCardModel = require("../../model/gpApplications/jobCardModel");
const { addCurrentTimeToDate } = require("../../utils/addCurrentTimeToDate");
const { sendApiResponse, sendApiError } = require("../../utils/apiResponses");
const AppError = require("../../utils/AppError");
const asyncHandler = require("../../utils/asyncHandler");
const generateUniqueFileName = require("../../utils/generateFileName");
const { saveFile, deleteFile } = require("../../utils/saveFile");
const { renderPage } = require("../../utils/sendResponse");
const { baseDir } = require("../createBaseDir");

const jobCardController = {
  // render form page
  renderJobCardFormPage: asyncHandler(async (req, res) => {
    renderPage(res, "user/gp-applications/job-card/job-card-form-page.pug", {
      title: "मनरेगा जॉब कार्ड अर्ज",
    });
  }),

  renderEditJobCardApplicationPage: asyncHandler(async (req, res) => {
    let { applicationId } = req.params;
    // 1️⃣ Validate applicationId presence

    let [jobCardApplication] = await jobCardModel.getJobCardById(
      res.pool,
      applicationId,
    );
    renderPage(
      res,
      "user/gp-applications/job-card/edit-job-card-form-page.pug",
      {
        title: "मनरेगा जॉब कार्ड अर्ज",
        jobCardApplication,
      },
    );
  }),

  // render list page
  renderJobCardListPage: asyncHandler(async (req, res) => {
    const { sort = "desc", status = "pending" } = req.query;

    const jobCardApplications = await jobCardModel.list(res.pool, {
      sort,
      status,
    });

    renderPage(res, "user/gp-applications/job-card/job-card-list-page.pug", {
      title: "जॉब कार्ड अर्जांची यादी",
      jobCardApplications,
      sort,
      status,
    });
  }),

  // render single application page
  renderJobCardDetailsPage: asyncHandler(async (req, res) => {
    const { applicationId } = req.params;

    const [jobCard] = await jobCardModel.getJobCardById(
      res.pool,
      applicationId,
    );

    renderPage(res, "user/gp-applications/job-card/job-card-details-page.pug", {
      title: "जॉब कार्ड अर्जाची माहिती",
      applicationId,
      jobCard,
    });
  }),

  renderJobCardPrintPage: asyncHandler(async (req, res) => {
    const { applicationId } = req.params;

    const [jobCard] = await jobCardModel.getJobCardById(
      res.pool,
      applicationId,
    );

    renderPage(res, "user/gp-applications/job-card/job-card-print-page.pug", {
      title: "जॉब कार्ड प्रिंट",
      applicationId,
      jobCard,
    });
  }),

  checkApplicationExistsByMobile: asyncHandler(async (req, res) => {
    const { applicant_mobile } = req.query;

    if (!applicant_mobile) {
      return sendApiError(res, 400, false, "मोबाईल क्रमांक आवश्यक आहे.");
    }

    const existing = await jobCardModel.getJobCardByMobile(
      res.pool,
      applicant_mobile,
    );

    if (existing.length > 0) {
      return sendApiError(
        res,
        409,
        false,
        `सदर मोबाईल क्र. ${applicant_mobile} आधीच वापरला आहे.`,
      );
    }

    return sendApiResponse(res, 200, true, "मोबाईल क्रमांक उपलब्ध आहे.", {
      exists: false,
    });
  }),

  // =========================
  // SAVE NEW JOB CARD APPLICATION
  // =========================

  saveJobCardApplication: asyncHandler(async (req, res) => {
    const body = req.body;
    const files = req.files || {};

    // check for existing application based on the moible number of the applicant

    if (!body.applicant_mobile) {
        throw new AppError("मोबाईल क्रमांक आवश्यक.", 400)
    }

    let existing = await jobCardModel.getJobCardByMobile(
      res.pool,
      body.applicant_mobile,
    );

    if (existing.length) {
      throw new AppError(`सदर मोबाईल क्र. ${body.applicant_mobile} आधीच वापरला आहे.`, 409)
    }

    // -------------------------
    // FAMILY PHOTO & RATION CARD
    // -------------------------
    let familyPhotoFileName = null;
    let rationCardFileName = null;

    if (files.family_photo_image_name) {
      familyPhotoFileName = generateUniqueFileName(
        files.family_photo_image_name,
        "family-photo-",
      );

      let destPath = `${baseDir}/uploads/images/job-cards/family-photos/${familyPhotoFileName}`
      await saveFile(
        files.family_photo_image_name,
        destPath
      );
      req.filesToCleanup.push(destPath)
    }

    if (files.family_head_ration_card_pdf) {
      rationCardFileName = generateUniqueFileName(
        files.family_head_ration_card_pdf,
        "ration-card-",
      );

      let destPath = `${baseDir}/uploads/docs/job-cards/ration-cards/${rationCardFileName}`;

      await saveFile(
        files.family_head_ration_card_pdf,
        destPath
      );
      req.filesToCleanup.push(destPath)
    }

    // -------------------------
    // FAMILY MEMBERS
    // -------------------------
    // -------------------------
    // FAMILY MEMBERS
    // -------------------------
    let members = JSON.parse(body.family_members_list || "[]");

    for (let i = 0; i < members.length; i++) {
      const member = members[i];

      // ✅ Assign unique memberId if not present (for new members)
      if (!member.memberId) {
        member.memberId = `m-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      }

      // Aadhaar
      if (files[`adhar_card_file_${i}`]) {
        const file = files[`adhar_card_file_${i}`];
        const name = generateUniqueFileName(file, `adhar-${i}-`);

        let destPath = `${baseDir}/uploads/docs/job-cards/adhar-cards/${name}`
        await saveFile(
          file,
          destPath
        );
        req.filesToCleanup.push(destPath)

        member.adhar_card_pdf_name = name;
      } else {
        // For new members without upload, keep existing value if present
        member.adhar_card_pdf_name = member.adhar_card_pdf_name || null;
      }

      // Member photo
      if (files[`family_member_photo_file_${i}`]) {
        const file = files[`family_member_photo_file_${i}`];
        const name = generateUniqueFileName(file, `member-photo-${i}-`);

        let destPath = `${baseDir}/uploads/images/job-cards/member-photos/${name}`
        await saveFile(
          file,
          destPath
        );

        req.filesToCleanup.push(destPath)

        member.family_member_photo_name = name;
      } else {
        // Keep existing value if present
        member.family_member_photo_name =
          member.family_member_photo_name || null;
      }
    }

    // -------------------------
    // SAVE DATA
    // -------------------------
    const data = {
      ...body,
      family_photo_image_name: familyPhotoFileName,
      family_head_ration_card_pdf: rationCardFileName,
      family_members_list: members,
      createdAt: addCurrentTimeToDate(body.createdAt)
    };

    const { insertId } = await jobCardModel.saveJobCardApplication(
      res.pool,
      data,
    );

    return sendApiResponse(res, 201, true, "Saved successfully", {
      applicationId: insertId,
    });
  }),

  updateJobCardApplication: asyncHandler(async (req, res) => {
    const body = req.body;
    const files = req.files || {};
    const applicationId = body.id;

    if (!applicationId) {
      return sendApiError(res, 400, false, "अर्जाचा आयडी उपलब्ध नाही.");
    }

    // -------------------------
    // FETCH EXISTING APPLICATION
    // -------------------------
    const [existingApplication] = await jobCardModel.getJobCardById(
      res.pool,
      applicationId,
    );
    if (!existingApplication) {
      return sendApiError(res, 404, false, "अर्ज सापडला नाही.");
    }

    // -------------------------
    // FAMILY PHOTO & RATION CARD
    // -------------------------
    let familyPhotoFileName = existingApplication.family_photo_image_name;
    let rationCardFileName = existingApplication.family_head_ration_card_pdf;

    if (files.family_photo_image_name) {
      if (familyPhotoFileName) {
        await deleteFile(
          `${baseDir}/uploads/images/job-cards/family-photos/${familyPhotoFileName}`,
        );
      }
      familyPhotoFileName = generateUniqueFileName(
        files.family_photo_image_name,
        "family-photo-",
      );
      await saveFile(
        files.family_photo_image_name,
        `${baseDir}/uploads/images/job-cards/family-photos/${familyPhotoFileName}`,
      );
    }

    if (files.family_head_ration_card_pdf) {
      if (rationCardFileName) {
        await deleteFile(
          `${baseDir}/uploads/docs/job-cards/ration-cards/${rationCardFileName}`,
        );
      }
      rationCardFileName = generateUniqueFileName(
        files.family_head_ration_card_pdf,
        "ration-card-",
      );
      await saveFile(
        files.family_head_ration_card_pdf,
        `${baseDir}/uploads/docs/job-cards/ration-cards/${rationCardFileName}`,
      );
    }

    // -------------------------
    // FAMILY MEMBERS
    // -------------------------
    const members = JSON.parse(body.family_members_list || "[]");

    // Fetch existing members from DB
    let existingMembersRaw = await jobCardModel.getFamilyMembersByApplicationId(
      res.pool,
      applicationId,
    );
    let existingMembers = [];
    if (existingMembersRaw.length > 0) {
      try {
        existingMembers = JSON.parse(
          existingMembersRaw[0].family_members_list || "[]",
        );
      } catch (e) {
        existingMembers = [];
      }
    }

    const existingMemberIds = existingMembers.map((m) => m.memberId);

    // Detect removed members
    const updatedMemberIds = members.map((m) => m.memberId).filter(Boolean);
    const removedMemberIds = existingMemberIds.filter(
      (id) => !updatedMemberIds.includes(id),
    );

    // Delete files of removed members
    for (let rmId of removedMemberIds) {
      const removed = existingMembers.find((m) => m.memberId === rmId);
      if (removed) {
        if (removed.adhar_card_pdf_name) {
          await deleteFile(
            `${baseDir}/uploads/docs/job-cards/adhar-cards/${removed.adhar_card_pdf_name}`,
          );
        }
        if (removed.family_member_photo_name) {
          await deleteFile(
            `${baseDir}/uploads/images/job-cards/member-photos/${removed.family_member_photo_name}`,
          );
        }
      }
    }

    // Helper to merge frontend with existing values
    function keepUpdated(frontendValue, existingValue, defaultValue = "") {
      return frontendValue !== undefined && frontendValue !== ""
        ? frontendValue
        : (existingValue ?? defaultValue);
    }

    // Process each member
    for (let i = 0; i < members.length; i++) {
      const member = members[i];

      console.log(member);

      // Find existing member data if available
      const existingMember = existingMembers.find(
        (m) => m.memberId === member.memberId,
      );

      // Assign memberId if new
      if (!member.memberId) {
        member.memberId = `m-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      }

      // Merge frontend and existing values
      member.member_name = keepUpdated(
        member.member_name,
        existingMember?.member_name,
      );
      member.relation_to_family_head = keepUpdated(
        member.relation_to_family_head,
        existingMember?.relation_to_family_head,
      );
      member.gender = keepUpdated(
        member.gender,
        existingMember?.gender,
        "पुरुष",
      );
      member.age = keepUpdated(member.age, existingMember?.age);
      member.is_disabled = keepUpdated(
        member.is_disabled,
        existingMember?.is_disabled,
        "NO",
      );

      // Aadhaar PDF
      if (files[`adhar_card_file_${i}`]) {
        const file = files[`adhar_card_file_${i}`];
        const name = generateUniqueFileName(file, `adhar-${i}-`);
        if (existingMember?.adhar_card_pdf_name) {
          await deleteFile(
            `${baseDir}/uploads/docs/job-cards/adhar-cards/${existingMember.adhar_card_pdf_name}`,
          );
        }
        await saveFile(
          file,
          `${baseDir}/uploads/docs/job-cards/adhar-cards/${name}`,
        );
        member.adhar_card_pdf_name = name;
      } else {
        member.adhar_card_pdf_name =
          member.adhar_card_pdf_name ||
          existingMember?.adhar_card_pdf_name ||
          null;
      }

      // Member photo
      if (files[`family_member_photo_file_${i}`]) {
        const file = files[`family_member_photo_file_${i}`];
        const name = generateUniqueFileName(file, `member-photo-${i}-`);
        if (existingMember?.family_member_photo_name) {
          await deleteFile(
            `${baseDir}/uploads/images/job-cards/member-photos/${existingMember.family_member_photo_name}`,
          );
        }
        await saveFile(
          file,
          `${baseDir}/uploads/images/job-cards/member-photos/${name}`,
        );
        member.family_member_photo_name = name;
      } else {
        member.family_member_photo_name =
          member.family_member_photo_name ||
          existingMember?.family_member_photo_name ||
          null;
      }
    }

    // -------------------------
    // UPDATE APPLICATION
    // -------------------------
    const data = {
      ...body,
      family_photo_image_name: familyPhotoFileName,
      family_head_ration_card_pdf: rationCardFileName,
      family_members_list: members,
    };

    await jobCardModel.updateJobCardApplication(res.pool, applicationId, data);

    // After updation is done, simply revoke it
    // await jobCardModel.revokeJobCardApplication(res.pool, applicationId)

    return sendApiResponse(
      res,
      200,
      true,
      "अर्ज यशस्वीरीत्या अद्यतनित करण्यात आला.",
      {
        applicationId,
      },
    );
  }),

  // =========================
  // STATUS HANDLING: ACCEPT / REJECT / REVOKE
  // =========================
  updateJobCardStatus: asyncHandler(async (req, res) => {
    const { id, status, job_card_number, remark } = req.body;

    if (!id || !status) {
      return sendApiResponse(
        res,
        400,
        false,
        "अर्ज क्रमांक आणि स्थिती आवश्यक आहे.",
      );
    }

    const normalizedStatus = status.toUpperCase();

    if (normalizedStatus === "ACCEPTED") {
      await jobCardModel.acceptJobCardApplication(res.pool, {
        id,
        acceptance_remark: remark || null,
        job_card_number,
      });
      return sendApiResponse(
        res,
        200,
        true,
        "जॉब कार्ड अर्ज यशस्वीरित्या मंजूर करण्यात आला आहे.",
      );
    }

    if (normalizedStatus === "REJECTED") {
      await jobCardModel.rejectJobCardApplication(res.pool, {
        id,
        rejection_remark: remark || null,
      });
      return sendApiResponse(
        res,
        200,
        true,
        "जॉब कार्ड अर्ज नामंजूर करण्यात आला आहे.",
      );
    }

    if (normalizedStatus === "PENDING") {
      await jobCardModel.revokeJobCardApplication(res.pool, id);
      return sendApiResponse(
        res,
        200,
        true,
        "जॉब कार्ड अर्ज पुन्हा प्रलंबित स्थितीत ठेवण्यात आला आहे.",
      );
    }

    return sendApiResponse(
      res,
      400,
      false,
      "अवैध अर्ज स्थिती पाठवण्यात आली आहे.",
    );
  }),

  renderJobCardReportPage: asyncHandler(async (req, res) => {
    let { type } = req.query;
    let status = "ACCEPTED"
    let acceptedJobCards = [];
    if (type === "yearToYear") {
      let { fromYear, toYear } = req.query;
      acceptedJobCards = await jobCardModel.getByYearRange(
        res.pool,
        fromYear,
        toYear,
        status
      );
    } else if (type === "monthToMonth") {
      let { month, year } = req.query;
      acceptedJobCards = await jobCardModel.getByMonthAndYear(
        res.pool,
        month,
        year,
        status,
      );
    } else {
      acceptedJobCards = await jobCardModel.list(res.pool, {
        sort: "asc",
        status: "ACCEPTED",
      });
    }

    renderPage(res, "user/gp-applications/job-card/job-card-report-page.pug", {
      title: "जॉब कार्ड रिपोर्ट",
      acceptedJobCards,
    });
  }),
};

module.exports = jobCardController;
