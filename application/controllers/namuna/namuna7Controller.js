const { myDate } = require("../../config/_responderSet");
const {
  getPaymentTypesByIds,
  paymentTypesMap,
  isPaymentForOnlySamanya,
  isPaymentForOnlyPaani,
  isPaymentForPaaniAndCertificates,
  isPaymentForSamanyaAndCertificates,
} = require("../../data/paymentForOptions");
const bankDetailsModel = require("../../model/bankDetails/bankDetailsModel");
const namuna7Model = require("../../model/namuna/namuna7Model");
const namuna7ReasonsModel = require("../../model/namuna/namuna7ReasonsModel");
const paymentModel = require("../../model/payment-model/paymentModel");
const paymentPaniReceiptModel = require("../../model/payment-model/paymentPaniReceiptModel");
const paymentSamanyaReceiptModel = require("../../model/payment-model/paymentSamanyaReceiptModel");
const samanyaTransactionModel = require("../../model/transaction/samanyaTransactionModel");
const { sendApiResponse } = require("../../utils/apiResponses");
const AppError = require("../../utils/AppError");
const asyncHandler = require("../../utils/asyncHandler");
const runInTransaction = require("../../utils/runInTransaction");
const { renderPage } = require("../../utils/sendResponse");

let payment_options = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const _paymentOptions = getPaymentTypesByIds(payment_options);

const VALID_PAYMENT_MEDIUMS = [
  "CASH",
  "CHEQUE",
  "DEMAND_DRAFT",
  "RTGS",
  "UPI",
  "OTHER",
];

const dropdown = [
  {
    tax_category: "SAMANYA",
    payment_reason: {
      10: "फेरफार फी",
      11: "निविदा फी",
      12: "बायाना रक्कम (अनामत)",
      13: "अनुदान रक्कम",
      14: "कोंडवाडा व इतर फी",
      15: "इतर फी",
    },
  },
  {
    tax_category: "PANI",
    payment_reason: {
      11: "निविदा फी",
      12: "बायाना रक्कम (अनामत)",
      13: "अनुदान रक्कम",
      15: "इतर फी",
      16: "नळ कनेक्शन फी",
    },
  },
];

const namuna7Controller = {
  // ==================================
  // LIST PAGE
  // ==================================
  renderNamuna7ListPage: asyncHandler(async (req, res) => {
    const { taxCategory } = req.query;
    const namuna7Entries = await namuna7Model.list(res.pool, {
      taxCategory,
    });

    renderPage(res, "user/namuna/namuna7/namuna-7-list-page.pug", {
      title: "नमुना ७ यादी",
      namuna7Entries,
      paymentTypesMap,
      taxCategory,
    });
  }),

  // ==================================
  // FORM PAGE
  // ==================================
  renderNamuna7FormPage: asyncHandler(async (req, res) => {
    // noew fetchign from database
    const dropdown = await namuna7ReasonsModel.dropdownList(res.pool);

    renderPage(res, "user/namuna/namuna7/namuna-7-form-page.pug", {
      title: "नमुना ७ फॉर्म",
      _paymentOptions,
      dropdown,
    });
  }),

  // ==================================
  // GET SINGLE
  // ==================================
  getById: asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return sendApiResponse(res, 400, false, "ID आवश्यक आहे.");
    }

    const result = await namuna7Model.getById(res.pool, id);

    if (!result.length) {
      return sendApiResponse(res, 404, false, "रेकॉर्ड सापडले नाही.");
    }

    return sendApiResponse(res, 200, true, "माहिती मिळाली.", result[0]);
  }),

  // ==================================
  // SAVE
  // ==================================
  save: asyncHandler(async (req, res) => {
    const data = req.body;

    // -------- Basic Validation --------
    if (
      !data.recipient_name ||
      !data.date ||
      !data.payment_for ||
      !data.amount
    ) {
      throw new AppError("आवश्यक माहिती भरावी.", 400);
    }

    if (!VALID_PAYMENT_MEDIUMS.includes(data.payment_medium)) {
      throw new AppError("अवैध पेमेंट माध्यम.", 400);
    }

    if (isNaN(data.amount) || Number(data.amount) <= 0) {
      throw new AppError("रक्कम चुकीची आहे.", 400);
    }

    // 0 means offline and 1 means online
    let paymentMode = data.payment_medium?.toLowerCase() == "cash" ? 0 : 1;

    let existingBankRecord;

    if (
      // isPaymentForOnlySamanya(data.payment_for) ||
      // isPaymentForSamanyaAndCertificates(data.payment_for)
      data.tax_category == "SAMANYA"
    ) {
      [existingBankRecord] = await bankDetailsModel.getActiveAccountSamanya(
        res.pool,
        1,
      );
      if (!existingBankRecord) {
        throw new AppError("सामान्य खात्याची बँक माहिती सेट करा.", 400);
      }
    } else if (
      // isPaymentForOnlyPaani(data.payment_for) ||
      // isPaymentForPaaniAndCertificates(data.payment_for)
      data.tax_category == "PANI"
    ) {
      [existingBankRecord] = await bankDetailsModel.getActiveAccountPani(
        res.pool,
        1,
      );

      if (!existingBankRecord) {
        throw new AppError("पाणी खात्याची बँक माहिती सेट करा.", 400);
      }
    }

    const paymentData = {
      personName: data.recipient_name,
      malmattaNo: data.malmatta_no || "",
      paymentNumber: data.payment_number,

      paymentFor: data.payment_for,
      reason_in_words: data.reason_in_words,

      amount: data.amount,

      paymentDate: data.date,

      paymentMode: paymentMode,

      payment_medium: data.payment_medium,

      transactionNumber: data.transaction_number,
      check_no: data.check_no,
      demand_draft_no: data.demand_draft_no,
      rtgs_no: data.rtgs_no,
      other_id: data.other_id,
      other_id_name: data.other_id,
      ps_bank_details_id_fk: existingBankRecord.id,

      tax_category: data.tax_category,
      payment_for_desc: data.payment_for_desc,
    };

    let savedresult = await runInTransaction(req, async (conn) => {
      // first save the payment information and get the payment_id

      console.log("Comging in tranction");
      const { affectedRows, insertId: ps_payment_information_id_fk } =
        await paymentModel.savePaymentDetails(conn, paymentData);

      if (data.tax_category == "SAMANYA") {
        await paymentSamanyaReceiptModel.savePaymentDetails(conn, {
          ...paymentData,
          ps_payment_information_id_fk,
        });
      } else if (data.tax_category == "PANI") {
        await paymentPaniReceiptModel.savePaymentDetails(conn, {
          ...paymentData,
          ps_payment_information_id_fk,
        });
      }


      let ps_payment_receipt_samanya_id_fk;
      if(data.tax_category == "SAMANYA") {
        let {inserId} = await samanyaTransactionModel.creditAmount(conn, {
              ps_bank_details_id_fk: existingBankRecord.id,
              before_amount: existingBankRecord.account_balance,
              amount: +paymentData.amount,
              payment_mode: "ONLINE",
          });
          ps_payment_receipt_samanya_id_fk = insertId
      }else{
        // to do for water
      }

    //   console.log("credit part");
      if (paymentMode == 1) {
        await bankDetailsModel.creditBalance(
          conn,
          existingBankRecord.id,
          +data.amount,
        );
      } else {
        await bankDetailsModel.creditOfflinePayment(
          conn,
          existingBankRecord.id,
          +data.amount,
        );
      }

      const result = await namuna7Model.save(conn, {
        ...data,
        ps_payment_information_id_fk: ps_payment_information_id_fk,
        ps_payment_receipt_samanya_id_fk
      });
    });

    // console.log(savedresult);

    return sendApiResponse(res, 201, true, "जतन झाले.");
  }),

  // ==================================
  // UPDATE
  // ==================================
  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    if (!id) {
      return sendApiResponse(res, 400, false, "ID आवश्यक आहे.");
    }

    if (
      !data.recipient_name ||
      !data.date ||
      !data.payment_for ||
      !data.amount
    ) {
      return sendApiResponse(res, 400, false, "आवश्यक माहिती भरावी.");
    }

    if (!VALID_PAYMENT_MEDIUMS.includes(data.payment_medium)) {
      return sendApiResponse(res, 400, false, "अवैध पेमेंट माध्यम.");
    }

    await namuna7Model.update(res.pool, id, data);

    // await paymentModel.update(req.pool, record.payment_id, data);

    return sendApiResponse(res, 200, true, "अपडेट झाले.");
  }),

  // ==================================
  // DELETE
  // ==================================
  delete: asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
      return sendApiResponse(res, 400, false, "ID आवश्यक आहे.");
    }

    const [existing] = await namuna7Model.getById(res.pool, id);

    if (!existing) {
      return sendApiResponse(res, 404, false, "रेकॉर्ड सापडला नाही.");
    }

    await runInTransaction(req, async (conn) => {
      // check if we need to remove the balacne form accoutn of bank
      await namuna7Model.delete(conn, id);
      await paymentModel.deletePaymentRecord(
        conn,
        existing.ps_payment_information_id_fk,
      );
    });

    return sendApiResponse(res, 200, true, "रेकॉर्ड हटवले.", {});
  }),

  renderNamuna7ReasonsPage: asyncHandler(async (req, res) => {
    let n7Reasons = await namuna7ReasonsModel.list(res.pool);
    renderPage(res, "user/namuna/namuna7/namuna-7-reasons-page.pug", {
      title: "नमुना ७ कारण",
      n7Reasons,
    });
  }),

  saveNamuna7Reason: asyncHandler(async (req, res) => {
    let n7ReasonData = req.body;
    await namuna7ReasonsModel.save(res.pool, n7ReasonData);
    return sendApiResponse(res, 200, true, "Saved");
  }),
};

module.exports = namuna7Controller;
