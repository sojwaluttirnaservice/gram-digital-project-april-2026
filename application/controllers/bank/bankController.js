const bankDetailsModel = require("../../model/bankDetails/bankDetailsModel");
const { sendApiResponse } = require("../../utils/apiResponses");
const AppError = require("../../utils/AppError");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/sendResponse");

const bankTypes = [
  { label: "सामान्य", value: "SAMANYA" },
  { label: "पाणी", value: "PANI" },
  { label: "पोस्ट ऑफिस", value: "POST_OFFICE" },
];

const bankController = {
  renderBankListPage: asyncHandler(async (req, res) => {
    const banks = await bankDetailsModel.getAll(res.pool);

    renderPage(res, "user/bank/bank-list-page.pug", {
      title: "बँक यादी",
      banks,
    });
  }),

  renderBankFormPage: asyncHandler(async (req, res) => {
    const result = await bankDetailsModel.getCategoryCount(res.pool, "SAMANYA");
    renderPage(res, "user/bank/bank-form-page.pug", {
      bankTypes,
    });
  }),

  save: asyncHandler(async (req, res) => {
    const bankData = req.body;

    // =========================
    // 1. CHECK EXISTING BANK BY CATEGORY
    // =========================
    const result = await bankDetailsModel.getCategoryCount(
      res.pool,
      bankData.category,
    );

    const total = result?.[0]?.total || 0;

    // =========================
    // 2. BLOCK IF ALREADY EXISTS
    // =========================
    if (total > 0) {
      const categoryLabel =
        {
          SAMANYA: "सामान्य",
          PANI: "पाणी",
          POST_OFFICE: "पोस्ट ऑफिस",
        }[bankData.category] || "";

      throw new AppError(
        `${categoryLabel} कॅटेगरीसाठी बँक आधीच नोंदवली आहे.`,
        409,
      );
    }

    // =========================
    // 3. SAVE BANK DETAILS
    // =========================
    await bankDetailsModel.save(res.pool, bankData);

    // =========================
    // 4. SUCCESS RESPONSE
    // =========================
    return sendApiResponse(res, 201, true, "जतन केले.");
  }),

  update: asyncHandler(async (req, res) => {}),

  delete: asyncHandler(async (req, res) => {}),
};

module.exports = bankController;
