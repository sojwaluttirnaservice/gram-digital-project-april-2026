const empDemandModel = require("../../model/gpApplications/empDemandModel");
const jobCardModel = require("../../model/gpApplications/jobCardModel");
const { sendApiResponse, sendApiError } = require("../../utils/apiResponses");
const asyncHandler = require("../../utils/asyncHandler");
const generateUniqueFileName = require("../../utils/generateFileName");
const { saveFile } = require("../../utils/saveFile");
const { renderPage } = require("../../utils/sendResponse");
const { baseDir } = require("../createBaseDir");

const empDemandController = {
  renderEmpDemandFormPage: asyncHandler(async (req, res) => {
    renderPage(
      res,
      "user/gp-applications/emp-demand/emp-demand-form-page.pug",
      {
        title: "वैयक्तिक सामूहिक रोजगार मागणीचा अर्ज",
      },
    );
  }),

  renderEmpDemandListPage: asyncHandler(async (req, res) => {
    const { sort = "desc", status = "pending" } = req.query;

    const empDemandApplications = await empDemandModel.list(res.pool, {
      sort,
      status,
    });

    console.log(empDemandApplications);

    renderPage(
      res,
      "user/gp-applications/emp-demand/emp-demand-list-page.pug",
      {
        title: "वैयक्तिक / सामूहिक रोजगार मागणी अर्जांची यादी",
        empDemandApplications,
        sort,
        status,
      },
    );
  }),

  renderEmpDemandReportPage: asyncHandler(async (req, res) => {
    let { type } = req.query;

    let records = [];

    if (type === "yearToYear") {
      let { fromYear } = req.query;
      records = await empDemandModel.getEmploymentApplicationsByYearRange(
        res.pool,
        fromYear,
      );
    } else if (type === "monthToMonth") {
      let { month, year } = req.query;
      records = await empDemandModel.getEmploymentApplicationsByMonthAndYear(
        res.pool,
        month,
        year,
      );
    }

    renderPage(
      res,
      "user/gp-applications/emp-demand/emp-demand-report-page.pug",
      {
        title: "कर्मचारी मागणी अहवाल",
        records,
      },
    );
  }),

  renderEmpDemandApplicationPrintPage: asyncHandler(async (req, res) => {
    let { empDemandId } = req.params;

    let [empDemandApplication] = await empDemandModel.empDemandById(
      res.pool,
      empDemandId,
    );

    console.log(empDemandApplication);

    renderPage(
      res,
      "user/gp-applications/emp-demand/emp-demand-application-print-page.pug",
      {
        empDemandApplication,
      },
    );
  }),

  renderEmpDemandNamuna5ListPage: asyncHandler(async (req, res) => {
    let { empDemandId } = req.params;
    let namuna5EmpDemandList = await empDemandModel.namuna5EmpDemandList(
      res.pool,
      empDemandId,
    );
    renderPage(
      res,
      "user/gp-applications/emp-demand/emp-demand-n-5-list-page.pug",
      {
        namuna5EmpDemandList,
        empDemandId,
      },
    );
  }),

  renderEmpDemandN5Print: asyncHandler(async (req, res) => {
    let { n5DemandId } = req.params;

    let [n5Demand] = await empDemandModel.getEmpDemandN5ById(
      res.pool,
      n5DemandId,
    );
    await empDemandModel.updateEmpDemandN5PrintDate(res.pool);

    if (n5Demand) console.log(n5Demand);
    renderPage(
      res,
      "user/gp-applications/emp-demand/emp-demand-n-5-print-page.pug",
      {
        n5Demand,
      },
    );
  }),

  checkIfAlreadyApplied: asyncHandler(async (req, res) => {
    const { job_card_number } = req.query;

    // 1️⃣ Validation: missing job card number
    if (!job_card_number) {
      return sendApiError(res, 400, false, "जॉब कार्ड क्रमांक पाठवलेला नाही");
    }

    // 2️⃣ Validate job card number
    const jobCards = await jobCardModel.getByJobCardNumber(
      res.pool,
      job_card_number,
    );

    if (!jobCards || jobCards.length === 0) {
      return sendApiError(res, 404, false, "अवैध जॉब कार्ड क्रमांक");
    }

    // 3️⃣ Get last employment demand application
    const applications = await empDemandModel.checkIfAlreadyApplied(
      res.pool,
      job_card_number,
    );

    // 4️⃣ No previous application → allowed
    if (!applications || applications.length === 0) {
      return sendApiResponse(
        res,
        200,
        true,
        "या जॉब कार्डसाठी पूर्वी कोणताही रोजगार मागणी अर्ज केलेला नाही",
        {
          alreadyApplied: false,
          jobCard: jobCards[0],
        },
      );
    }

    const lastApplication = applications[0];

    // Normalize to_date
    const toDate = new Date(lastApplication.to_date);
    toDate.setHours(0, 0, 0, 0);

    // Allowed date = next day
    const applyFromDate = new Date(toDate);
    applyFromDate.setDate(applyFromDate.getDate() + 1);

    // Normalize today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Date formatter (DD-MM-YYYY)
    const formatDate = (date) => {
      const d = String(date.getDate()).padStart(2, "0");
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const y = date.getFullYear();
      return `${d}-${m}-${y}`;
    };

    // 5️⃣ Conflict: application already active
    if (today <= toDate) {
      return sendApiResponse(
        res,
        409,
        false,
        `या जॉब कार्डसाठी दिलेल्या कालावधीमध्ये रोजगार मागणीचा अर्ज आधीच लागू आहे. आपण दिनांक ${formatDate(
          applyFromDate,
        )} पासून नवीन अर्ज करू शकता.`,
        {
          alreadyApplied: true,
          validUpto: toDate,
          applyAfter: applyFromDate,
        },
      );
    }

    // 6️⃣ Allowed to apply
    return sendApiResponse(
      res,
      200,
      true,
      "नवीन रोजगार मागणी अर्ज करण्यास परवानगी आहे",
      {
        alreadyApplied: false,
        jobCard: jobCards[0],
        applyFrom: applyFromDate,
      },
    );
  }),

  saveEmpDemandForm: asyncHandler(async (req, res) => {
    const body = req.body;
    const files = req.files || {};

    // -------------------------
    // Validate Job Card Number
    // -------------------------
    if (!body.job_card_number_fk) {
      return sendApiError(res, 400, false, "जॉब कार्ड क्रमांक आवश्यक आहे.");
    }

    // -------------------------
    // Calculate TO DATE (125 days exclusive)
    // -------------------------
    let toDate = null;

    if (body.from_date) {
      const [yyyy, mm, dd] = body.from_date.split("-").map(Number);
      const fromDateObj = new Date(yyyy, mm - 1, dd);
      fromDateObj.setDate(fromDateObj.getDate() + 124);

      toDate = `${fromDateObj.getFullYear()}-${String(
        fromDateObj.getMonth() + 1,
      ).padStart(2, "0")}-${String(fromDateObj.getDate()).padStart(2, "0")}`;
    }

    // -------------------------
    // Build Family Members (IMPORTANT FIX)
    // -------------------------
    const members = [];

    Object.keys(body).forEach((key) => {
      const match = key.match(/^family_members\[(\d+)\]\[(.+)\]$/);

      if (!match) return;

      const index = Number(match[1]);
      const field = match[2];

      if (!members[index]) {
        members[index] = {
          id: `m-${Date.now()}-${index}`,
        };
      }

      members[index][field] = body[key];
    });

    // -------------------------
    // Handle Member Files
    // -------------------------
    for (let i = 0; i < members.length; i++) {
      const fileKey = `family_members[${i}][sign_or_thumb_stamp_photo]`;
      const file = files[fileKey];

      if (file) {
        const fileName = generateUniqueFileName(file, `sign-${i}-`);

        await saveFile(
          file,
          `${baseDir}/uploads/images/emp-demand/signatures/${fileName}`,
        );

        members[i].sign_or_thumb_stamp_photo_name = fileName;
      } else {
        members[i].sign_or_thumb_stamp_photo_name = null;
      }
    }

    // -------------------------
    // Save Data
    // -------------------------
    const data = {
      job_card_number_fk: body.job_card_number_fk,
      from_date: body.from_date,
      to_date: toDate,
      family_members_list: JSON.stringify(members.filter(Boolean)),
    };

    const { insertId } = await empDemandModel.saveEmpDemandApplication(
      res.pool,
      data,
    );

    return sendApiResponse(
      res,
      201,
      true,
      "रोजगार मागणी अर्ज यशस्वीरीत्या जतन करण्यात आला.",
      {
        applicationId: insertId,
        to_date: toDate,
      },
    );
  }),

  updateEmpDemandStatus: asyncHandler(async (req, res) => {
    const { id, status, job_card_number_fk, remark } = req.body;

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
      await empDemandModel.acceptEmpDemandApplication(res.pool, {
        id,
        acceptance_remark: remark || null,
        job_card_number_fk,
      });

      return sendApiResponse(
        res,
        200,
        true,
        "रोजगार मागणी अर्ज यशस्वीरित्या मंजूर करण्यात आला आहे.",
      );
    }

    if (normalizedStatus === "REJECTED") {
      await empDemandModel.rejectEmpDemandApplication(res.pool, {
        id,
        rejection_remark: remark || null,
      });

      return sendApiResponse(
        res,
        200,
        true,
        "रोजगार मागणी अर्ज नामंजूर करण्यात आला आहे.",
      );
    }

    if (normalizedStatus === "PENDING") {
      await empDemandModel.revokeEmpDemandApplication(res.pool, id);

      return sendApiResponse(
        res,
        200,
        true,
        "रोजगार मागणी अर्ज पुन्हा प्रलंबित स्थितीत ठेवण्यात आला आहे.",
      );
    }

    return sendApiResponse(
      res,
      400,
      false,
      "अवैध अर्ज स्थिती पाठवण्यात आली आहे.",
    );
  }),

  // ============================================
  // SAVE EMP DEMAND NAMUNA 5 CONTROLLER
  // ============================================
  saveEmpDemandN5Form: asyncHandler(async (req, res) => {
    const {
      ps_individual_group_employment_demand_application_id_fk,
      n5_from_date,
      n5_to_date,
      total_days,
    } = req.body;

    // -------------------------
    // Basic Validation
    // -------------------------
    if (
      !ps_individual_group_employment_demand_application_id_fk ||
      !n5_from_date ||
      !n5_to_date ||
      !total_days
    ) {
      return sendApiResponse(
        res,
        400,
        false,
        "सर्व आवश्यक नमुना ५ माहिती भरणे आवश्यक आहे.",
      );
    }

    await empDemandModel.saveEmpDemandN5Form(res.pool, {
      ps_individual_group_employment_demand_application_id_fk,
      n5_from_date,
      n5_to_date,
      total_days,
    });

    return sendApiResponse(
      res,
      201,
      true,
      "नमुना ५ नोंद यशस्वीरित्या जतन करण्यात आली.",
    );
  }),
};

module.exports = empDemandController;
