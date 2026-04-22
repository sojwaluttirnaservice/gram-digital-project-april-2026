// var IndexModel = require('../model/indexModel');
var responderSet = require("../../config/_responderSet");
var myDates = responderSet.myDate;
// const axios = require('axios');
// let { createHash } = require('crypto');
const paymentModel = require("../../../application/model/payment-model/paymentModel");
const generateUniqueFileName = require("../../utils/generateFileName");
const { baseDir } = require("../createBaseDir");
const { saveFile } = require("../../utils/saveFile");
const asyncHandler = require("../../utils/asyncHandler");
const { sendApiResponse, sendApiError } = require("../../utils/apiResponses");
const TaxPayerModel = require("../../model/TaxPayerModel");
const { renderPage } = require("../../utils/sendResponse");
const FormNightModel = require("../../model/FormNightModel");
const TaxPaymentModel = require("../../model/isTaxPaid/TaxPaymentModel");
const {
  isPaymentForOnlySamanya,
  isPaymentForSamanyaAndCertificates,
  isPaymentForOnlyPaani,
  isPaymentForPaaniAndCertificates,
} = require("../../data/paymentForOptions");
const bankDetailsModel = require("../../model/bankDetails/bankDetailsModel");
const AppError = require("../../utils/AppError");
const runInTransaction = require("../../utils/runInTransaction");
const { UPLOAD_PATHS } = require("../../config/uploadPaths");
const paymentPaniReceiptModel = require("../../model/payment-model/paymentPaniReceiptModel");
const paymentSamanyaReceiptModel = require("../../model/payment-model/paymentSamanyaReceiptModel");
const samanyaTransactionModel = require("../../model/transaction/samanyaTransactionModel");

// Helper function to safely subtract numbers (avoiding NaN)
function safeSubtract(a, b) {
  const numA = Number(a) || 0;
  const numB = Number(b) || 0;
  return numA - numB;
}
const paymentController = {
  savePaymentDetails: async (req, res) => {
    // console.log(req.body, 'save payment');
    try {
      let paymentData = req.body;
      let paymentScreenshot = req.files?.paymentScreenshot;
      console.log(paymentScreenshot);

      let existingBankRecord;

      if (paymentData.tax_category == "SAMANYA") {
        [existingBankRecord] = await bankDetailsModel.getActiveAccountSamanya(
          res.pool,
          1,
        );
        if (!existingBankRecord) {
          return res.status(400).json({
            call: 0,
            message: "सामान्य खात्याची बँक माहिती सेट करा.",
          });
        }
      } else if (paymentData.tax_category == "PANI") {
        [existingBankRecord] = await bankDetailsModel.getActiveAccountPani(
          res.pool,
          1,
        );

        if (!existingBankRecord) {
          return res.status(400).json({
            call: 0,
            message: "पाणी खात्याची बँक माहिती सेट करा.",
          });
        }
      }

      let paymentMode = paymentData.payment_mode || paymentData.paymentMode;
      // Checking if transaction number is already used
      if (paymentMode == 1 && paymentData.transactionNumber?.trim() != "") {
        let existingPayments = await paymentModel.getPaymentByTransactionNumber(
          res.pool,
          paymentData.transactionNumber,
        );

        if (existingPayments?.length > 0) {
          return res.status(400).json({
            call: 0,
            message: "हा Transaction Number आधीच वापरला आहे.",
          });
        }
      }

      //   Checking if the transaction mode is online and the payment screenshot exists or not
      if (paymentMode == 1 && paymentScreenshot) {
        let paymentScreenshotDir = `${baseDir}/uploads/images/gp/payments/paymentScreenshots`;
        let paymentScreenshotImageName = generateUniqueFileName(
          paymentScreenshot,
          "payment-ss-",
        );
        paymentData.payment_screenshot_image_name = paymentScreenshotImageName;
        let savePath = `${paymentScreenshotDir}/${paymentScreenshotImageName}`;
        await saveFile(paymentScreenshot, savePath);
      }

      console.log(paymentData);


      console.log(existingBankRecord);

      let savePaymentResult = await paymentModel.savePaymentDetails(res.pool, {
        ...paymentData,
        ps_bank_details_id_fk: existingBankRecord?.id,
      });

      const ps_payment_information_id_fk = savePaymentResult.insertId;
      let samanyaPaymentReceipt;
      let paniPaymentReceipt
      if (paymentData.tax_category == "SAMANYA") {
        let samanyaReceiptSavedResult = await paymentSamanyaReceiptModel.savePaymentDetails(res.pool, {
          ...paymentData,
          ps_bank_details_id_fk: existingBankRecord?.id,
          ps_payment_information_id_fk,
        });
        samanyaPaymentReceipt = samanyaReceiptSavedResult.insertId 
      } else if (paymentData.tax_category == "PANI") {
        let paniReceiptSavedResult = await paymentPaniReceiptModel.savePaymentDetails(res.pool, {
          ...paymentData,
          ps_bank_details_id_fk: existingBankRecord?.id,
          ps_payment_information_id_fk,
        });
        paniPaymentReceipt = paniReceiptSavedResult.insertId
      }

    //   this it goes only direclty in transactionmode when the palyetn is online
      if(paymentData.tax_category == "SAMANYA" && paymentMode == 1) {
        await samanyaTransactionModel.creditAmount(res.pool, {
            ps_bank_details_id_fk: existingBankRecord.id,
            before_amount: existingBankRecord.account_balance,
            amount: paymentData.amount,
            payment_mode: paymentMode == 1 ? "ONLINE" : "CASH",
        })        
      }else{
        // to do add in the ledger
      }

      //   online
      if (paymentMode == 1) {
        await bankDetailsModel.creditBalance(
          res.pool,
          existingBankRecord?.id,
          paymentData.amount,
        );
      } else {
        await bankDetailsModel.creditOfflinePayment(
          res.pool,
          existingBankRecord.id,
          +paymentData.amount,
        );
      }

      if (savePaymentResult.affectedRows > 0) {
        // When the payment is done, send the sms to the user
        // TODO: SENDING SMS FOR TAX PAYMENT BASED ON THE TYPE OF PAYMENT MODE
        return res.status(200).json({
          call: 1,
          message: "Payment Successfully Done",
          reciptNumber: savePaymentResult.insertId,
          samanyaPaymentReceipt,
          paniPaymentReceipt
        });
      }

      return res.status(400).json({
        call: 0,
        message: "Unable to save payment details",
      });
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).json({
        call: 0,
        error: err,
      });
    }
  },

  savePaymentDetailsByUser: asyncHandler(async (req, res) => {
    let paymentData = req.body;

    let newSamanyaVasuliData = JSON.parse(paymentData?.newSamanyaVasuliData);

    if (!newSamanyaVasuliData) {
      throw new AppError("वसुली बद्दलचा डेटा प्राप्त नाही झाला.", 400);
    }

    let paymentScreenshot = req.files?.paymentScreenshot;

    let paymentMode = paymentData.payment_mode || paymentData.paymentMode;

    if (paymentMode == 1 && paymentData.transactionNumber?.trim() != "") {
      if (!paymentScreenshot) {
        throw new AppError("पेमेंट चा स्क्रीनशॉट जोडा.", 400);
      }

      // Check for any pendign transaction for samanya tax
      // 1 means सामान्य
      let paymentFor = 1;
      let pendingPayments = await paymentModel.getPendingPayments(
        res.pool,
        paymentFor,
      );

      if (pendingPayments.length > 0) {
        throw new AppError(
          "सामान्य करासाठीचे आधीचे पेमेंट ग्रामपंचायतीने स्वीकारलेले नाही. आपण पेमेंट केले असेल आणि तरीही ते स्वीकारले गेले नसेल, तर कृपया ग्रामपंचायतीशी संपर्क साधा.",
          409,
        );
      }

      let existingPayments = await paymentModel.getPaymentByTransactionNumber(
        res.pool,
        paymentData.transactionNumber,
      );

      if (existingPayments?.length > 0) {
        throw new AppError("हा Transaction Number आधीच वापरला आहे.", 409);
      }
    }

    // check existing bank account details

    let [existingBankRecord] = await bankDetailsModel.getActiveAccountSamanya(
      res.pool,
      1,
    );

    if (!existingBankRecord) {
      throw new AppError("सामान्य खात्याची बँक माहिती सेट करा.", 400);
    }

    if (paymentMode == 1 && paymentScreenshot) {
      let paymentScreenshotImageName = generateUniqueFileName(
        paymentScreenshot,
        "payment-ss-",
      );
      paymentData.payment_screenshot_image_name = paymentScreenshotImageName;

      let savePath = `${UPLOAD_PATHS.gpImages.paymentScreenshots}/${paymentScreenshotImageName}`;
      await saveFile(paymentScreenshot, savePath);
      req.filesToCleanup.push(savePath);
    }

    // run transaction now

    // in transaction credit blance in bank account if its online payemnt
    // BUT THSI CANNOT BE DONE UNLESS PAYMENT IS ACCEPTED, SO BIG NO

    await runInTransaction(req, async (conn) => {
      // save payment details
      const { insertId: ps_payment_information_id_fk } =
        await paymentModel.savePaymentDetails(conn, {
          ...paymentData,
          ps_bank_details_id_fk: existingBankRecord?.id,
        });

        const {insertId: ps_payment_receipt_samanya_id_fk} =  await paymentSamanyaReceiptModel.savePaymentDetails(res.pool, {
          ...paymentData,
          ps_bank_details_id_fk: existingBankRecord?.id,
          ps_payment_information_id_fk,
        });

      // then update in the tax vasuli details
      await TaxPayerModel.saveNewTaxVasuliDetails(conn, {
        ...newSamanyaVasuliData,
        ps_payment_information_id_fk,
        ps_payment_receipt_samanya_id_fk
      });
    });

    // tehen update in the tax vasuli details

    return sendApiResponse(
      res,
      200,
      true,
      "पेमेंट जतन झाले. पडताळणी झाल्यावर आपला कर प्राप्त झाला असे समजले जाईल.",
    );
  }),

  //   the improved version of this function is above
  // MARKED FOR DELETION
  savePaymentDetailsByUserOld: asyncHandler(async (req, res) => {
    // console.log(req.files)
    let paymentData = req.body;
    //   , newSamanyaVasuliData, newPaniVasuliData
    let newSamanyaVasuliData = JSON.parse(paymentData?.newSamanyaVasuliData);

    // let newPaniVasuliData = JSON.parse(paymentData?.newPaniVasuliData);

    let paymentScreenshot = req.files?.paymentScreenshot;

    let paymentMode = paymentData.payment_mode || paymentData.paymentMode;
    // Checking if transaction number is already used
    if (paymentMode == 1 && paymentData.transactionNumber?.trim() != "") {
      let existingPayments = await paymentModel.getPaymentByTransactionNumber(
        res.pool,
        paymentData.transactionNumber,
      );

      if (existingPayments?.length > 0) {
        return sendApiResponse(
          res,
          409,
          false,
          "हा Transaction Number आधीच वापरला आहे.",
        );
      }

      // Check for any pendign transaction for samanya tax
      // 1 means सामान्य
      let paymentFor = 1;
      let pendingPayments = await paymentModel.getPendingPayments(
        res.pool,
        paymentFor,
      );

      if (pendingPayments.length > 0) {
        return sendApiResponse(
          res,
          409,
          false,
          "सामान्य करासाठीचे आधीचे पेमेंट ग्रामपंचायतीने स्वीकारलेले नाही. आपण पेमेंट केले असेल आणि तरीही ते स्वीकारले गेले नसेल, तर कृपया ग्रामपंचायतीशी संपर्क साधा.",
        );
      }
    }

    //   Checking if the transaction mode is online and the payment screenshot exists or not
    if (paymentMode == 1 && paymentScreenshot) {
      let paymentScreenshotDir = `${baseDir}/uploads/images/gp/payments/paymentScreenshots`;

      let paymentScreenshotImageName = generateUniqueFileName(
        paymentScreenshot,
        "payment-ss-",
      );

      paymentData.payment_screenshot_image_name = paymentScreenshotImageName;

      let savePath = `${paymentScreenshotDir}/${paymentScreenshotImageName}`;
      await saveFile(paymentScreenshot, savePath);
      req.filesToCleanup.push(savePath);
    }

    let savePaymentResult = await paymentModel.savePaymentDetails(
      res.pool,
      paymentData,
    );

    if (savePaymentResult.affectedRows < 1) {
      // When the payment is done, send the sms to the user
      // TODO: SENDING SMS FOR TAX PAYMENT BASED ON THE TYPE OF PAYMENT MODE

      return sendApiError(res, 400, false, "पेमेंट जतन नाही झाले.");
    }

    // insert into in the ps_tax_payer_list_samanya
    if (newSamanyaVasuliData) {
      newSamanyaVasuliData.ps_payment_information_id_fk =
        savePaymentResult.insertId;
      // flow => insert into the log table
      const insertResult = await TaxPayerModel.saveNewTaxVasuliDetails(
        res.pool,
        newSamanyaVasuliData,
      );

      if (!insertResult.insertId) {
        return sendApiError(res, 400, false, "पेमेंट जतन नाही होऊ शकले.");
      }

      return sendApiResponse(
        res,
        201,
        true,
        "पेमेंट जतन झाले. पडताळणी झाल्यावर आपला कर प्राप्त झाला असे समजले जाईल.",
      );
    }

    return sendApiError(res, 400, false, "पेमेंट जतन नाही करता आले");
  }),

  savePaymentDetailsByUserWater: asyncHandler(async (req, res) => {
    let paymentData = req.body;

    //   , newPaniVasuliData, newPaniVasuliData

    let newPaniVasuliData = JSON.parse(paymentData?.newPaniVasuliData);

    if (!newPaniVasuliData) {
      throw new AppError("वसुली बद्दलचा डेटा प्राप्त नाही झाला.", 400);
    }

    let paymentScreenshot = req.files?.paymentScreenshot;
    let paymentMode = paymentData.payment_mode || paymentData.paymentMode;

    if (paymentMode == 1 && paymentData.transactionNumber?.trim() != "") {
      if (!paymentScreenshot) {
        throw new AppError("पेमेंट चा स्क्रीनशॉट जोडा.", 400);
      }

      // Check for any pendign transaction for samanya tax
      // 2 means पाणी
      let paymentFor = 2;
      let pendingPayments = await paymentModel.getPendingPayments(
        res.pool,
        paymentFor,
      );

      if (pendingPayments.length > 0) {
        throw new AppError(
          "पाणी करासाठीचे आधीचे पेमेंट ग्रामपंचायतीने स्वीकारलेले नाही. आपण पेमेंट केले असेल आणि तरीही ते स्वीकारले गेले नसेल, तर कृपया ग्रामपंचायतीशी संपर्क साधा.",
          409,
        );
      }

      let existingPayments = await paymentModel.getPaymentByTransactionNumber(
        res.pool,
        paymentData.transactionNumber,
      );

      if (existingPayments?.length > 0) {
        throw new AppError("हा Transaction Number आधीच वापरला आहे.", 409);
      }
    }

    // check existing bank account details

    let [existingBankRecord] = await bankDetailsModel.getActiveAccountPani(
      res.pool,
      1,
    );

    if (!existingBankRecord) {
      throw new AppError("पाणी खात्याची बँक माहिती सेट करा.", 400);
    }

    if (paymentMode == 1 && paymentScreenshot) {
      let paymentScreenshotImageName = generateUniqueFileName(
        paymentScreenshot,
        "payment-ss-",
      );
      paymentData.payment_screenshot_image_name = paymentScreenshotImageName;

      let savePath = `${UPLOAD_PATHS.gpImages.paymentScreenshots}/${paymentScreenshotImageName}`;
      await saveFile(paymentScreenshot, savePath);
      req.filesToCleanup.push(savePath);
    }

    // run transaction now

    // in transaction credit blance in bank account if its online payemnt
    // BUT THSI CANNOT BE DONE UNLESS PAYMENT IS ACCEPTED, SO BIG NO

    await runInTransaction(req, async (conn) => {
      const { insertId: ps_payment_information_id_fk } =
        await paymentModel.savePaymentDetails(conn, {
          ...paymentData,
          ps_bank_details_id_fk: existingBankRecord?.id,
        });

        await paymentPaniReceiptModel.savePaymentDetails(res.pool, {
          ...paymentData,
          ps_bank_details_id_fk: existingBankRecord?.id,
          ps_payment_information_id_fk,
        });

      const insertResult = await TaxPayerModel.saveNewTaxVasuliPaniDetails(
        conn,
        { ...newPaniVasuliData, ps_payment_information_id_fk },
      );
    });

    return sendApiResponse(
      res,
      200,
      true,
      "पेमेंट जतन झाले. पडताळणी झाल्यावर आपला कर प्राप्त झाला असे समजले जाईल.",
    );
  }),

  //   now this has became old, and above has became the new, with transaction details
  //   savePaymentDetailsByUserWaterOld: asyncHandler(async (req, res) => {
  //     // console.log(req.files)
  //     let paymentData = req.body;

  //     //   , newPaniVasuliData, newPaniVasuliData

  //     let newPaniVasuliData = JSON.parse(paymentData?.newPaniVasuliData);

  //     let paymentScreenshot = req.files?.paymentScreenshot;

  //     let paymentMode = paymentData.payment_mode || paymentData.paymentMode;
  //     // Checking if transaction number is already used
  //     if (paymentMode == 1 && paymentData.transactionNumber?.trim() != "") {
  //       let existingPayments = await paymentModel.getPaymentByTransactionNumber(
  //         res.pool,
  //         paymentData.transactionNumber,
  //       );

  //       if (existingPayments?.length > 0) {
  //         return sendApiResponse(
  //           res,
  //           409,
  //           false,
  //           "हा Transaction Number आधीच वापरला आहे.",
  //         );
  //       }

  //       // Check for any pendign transaction for samanya tax
  //       // 2 means पाणी
  //       let paymentFor = 2;
  //       let pendingPayments = await paymentModel.getPendingPayments(
  //         res.pool,
  //         paymentFor,
  //       );

  //       if (pendingPayments.length > 0) {
  //         return sendApiResponse(
  //           res,
  //           409,
  //           false,
  //           "पाणी करासाठीचे आधीचे पेमेंट ग्रामपंचायतीने स्वीकारलेले नाही. आपण पेमेंट केले असेल आणि तरीही ते स्वीकारले गेले नसेल, तर कृपया ग्रामपंचायतीशी संपर्क साधा.",
  //         );
  //       }
  //     }

  //     //   Checking if the transaction mode is online and the payment screenshot exists or not
  //     if (paymentMode == 1 && paymentScreenshot) {
  //       let paymentScreenshotDir = `${baseDir}/uploads/images/gp/payments/paymentScreenshots`;

  //       let paymentScreenshotImageName = generateUniqueFileName(
  //         paymentScreenshot,
  //         "payment-ss-",
  //       );

  //       paymentData.payment_screenshot_image_name = paymentScreenshotImageName;

  //       let savePath = `${paymentScreenshotDir}/${paymentScreenshotImageName}`;
  //       await saveFile(paymentScreenshot, savePath);
  //     }

  //     let savePaymentResult = await paymentModel.savePaymentDetails(
  //       res.pool,
  //       paymentData,
  //     );

  //     if (savePaymentResult.affectedRows < 1) {
  //       // When the payment is done, send the sms to the user
  //       // TODO: SENDING SMS FOR TAX PAYMENT BASED ON THE TYPE OF PAYMENT MODE

  //       return sendApiError(res, 400, false, "पेमेंट जतन नाही झाले.");
  //     }

  //     newPaniVasuliData.ps_payment_information_id_fk = savePaymentResult.insertId;
  //     // flow => insert into the log table
  //     const insertResult = await TaxPayerModel.saveNewTaxVasuliPaniDetails(
  //       res.pool,
  //       newPaniVasuliData,
  //     );

  //     if (!insertResult.insertId) {
  //       return sendApiError(res, 400, false, "पेमेंट जतन नाही होऊ शकले.");
  //     }

  //     return sendApiResponse(
  //       res,
  //       201,
  //       true,
  //       "पेमेंट जतन झाले. पडताळणी झाल्यावर आपला कर प्राप्त झाला असे समजले जाईल.",
  //     );
  //   }),

  renderPaymentsListSamanya: asyncHandler(async (req, res) => {
    //   1 represent Samanya
    let paymentFor = 1;
    const pendingSamanyaPaymentList = await paymentModel.getPendingPayments(
      res.pool,
      paymentFor,
    );

    // console.log(pendingSamanyaPaymentList);
    renderPage(res, "user/payments/payments-list.pug", {
      title: "सामान्य पेमेंट यादी",
      pendingSamanyaPaymentList,
    });
    // return res.send({pendingSamanyaPaymentList})
  }),

  //  TODO: IMPLEMENTATION IS REMAINGING YET
  renderPaymentsListPani: asyncHandler(async (req, res) => {
    //   2 represents Water or Pani
    let paymentFor = 2;
    const pendingPaniPaymentList = await paymentModel.getPendingPayments(
      res.pool,
      paymentFor,
    );

    renderPage(res, "user/payments/payments-list-water.pug", {
      pendingPaniPaymentList,
    });
  }),

  //   updatePaymentStatusOld: asyncHandler(async (req, res) => {
  //     let { paymentId, updatePaymentStatusTo, formNineId, f8UserId } = req.body;

  //     // Basic validation for payment status
  //     if (
  //       updatePaymentStatusTo !== "REJECTED" &&
  //       updatePaymentStatusTo !== "APPROVED"
  //     ) {
  //       return sendApiError(res, 400, false, "Invalid payment status");
  //     }

  //     // Update payment status in DB
  //     const { affectedRows } = await paymentModel.updatePaymentStatus(res.pool, {
  //       paymentId,
  //       updatePaymentStatusTo,
  //     });

  //     if (affectedRows < 1) {
  //       return sendApiError(res, 500, false, "Failed to update payment status");
  //     }

  //     // If payment status is REJECTED, respond immediately after update
  //     if (updatePaymentStatusTo === "REJECTED") {
  //       return sendApiResponse(
  //         res,
  //         200,
  //         true,
  //         "Payment status updated to REJECTED",
  //       );
  //     }

  //     // If APPROVED, fetch existing Form Nine details
  //     const [existingFormNineDetails] =
  //       await FormNightModel.getFormNineSavedDetails(res.pool, {
  //         id: f8UserId,
  //       });

  //     if (!existingFormNineDetails) {
  //       return sendApiError(res, 404, false, "Form Nine details not found");
  //     }

  //     // Fetch tax payment details by paymentId
  //     const [taxAmountPaidDuringPaymentDetails] =
  //       await TaxPayerModel.getSamanyaTaxEntryByPaymentId(res.pool, paymentId);

  //     if (!taxAmountPaidDuringPaymentDetails) {
  //       return sendApiError(res, 404, false, "Payment tax details not found");
  //     }

  //     const f9Tax = existingFormNineDetails;
  //     const paidTax = taxAmountPaidDuringPaymentDetails;

  //     // Prepare updated Form Nine data by subtracting paid tax amounts
  //     const updateFormNine = {
  //       // Current Taxes
  //       currentArogyaTax: safeSubtract(
  //         f9Tax.currentArogyaTax,
  //         paidTax.tpl_currentArogyaTax,
  //       ),
  //       currentBuildingTax: safeSubtract(
  //         f9Tax.currentBuildingTax,
  //         paidTax.tpl_currentBuildingTax,
  //       ),
  //       currentDivaTax: safeSubtract(
  //         f9Tax.currentDivaTax,
  //         paidTax.tpl_currentDivaTax,
  //       ),
  //       currentCleaningTax: safeSubtract(
  //         f9Tax.currentCleaningTax,
  //         paidTax.tpl_currentCleaningTax,
  //       ),
  //       currentEducationTax: safeSubtract(
  //         f9Tax.currentEducationTax,
  //         paidTax.tpl_currentEducationTax,
  //       ),
  //       currentFireblegateTax: safeSubtract(
  //         f9Tax.currentFireblegateTax,
  //         paidTax.tpl_currentFireblegateTax,
  //       ),
  //       currentTreeTax: safeSubtract(
  //         f9Tax.currentTreeTax,
  //         paidTax.tpl_currentTreeTax,
  //       ),

  //       // Last Taxes
  //       lastArogyaTax: safeSubtract(
  //         f9Tax.lastArogyaTax,
  //         paidTax.tpl_lastArogyaTax,
  //       ),
  //       lastBuildingTax: safeSubtract(
  //         f9Tax.lastBuildingTax,
  //         paidTax.tpl_lastBuildingTax,
  //       ),
  //       lastDivaTax: safeSubtract(f9Tax.lastDivaTax, paidTax.tpl_lastDivaTax),
  //       lastTaxFine: safeSubtract(f9Tax.lastTaxFine, paidTax.tpl_lastTaxFine),
  //       lastTaxRelief: safeSubtract(
  //         f9Tax.lastTaxRelief,
  //         paidTax.tpl_lastTaxRelief,
  //       ),
  //       lastCleaningTax: safeSubtract(
  //         f9Tax.lastCleaningTax,
  //         paidTax.tpl_lastCleaningTax,
  //       ),
  //       lastEducationTax: safeSubtract(
  //         f9Tax.lastEducationTax,
  //         paidTax.tpl_lastEducationTax,
  //       ),
  //       lastFireblegateTax: safeSubtract(
  //         f9Tax.lastFireblegateTax,
  //         paidTax.tpl_lastFireblegateTax,
  //       ),
  //       lastTreeTax: safeSubtract(f9Tax.lastTreeTax, paidTax.tpl_lastTreeTax),

  //       formNineId: Number(formNineId),
  //       userId: Number(f8UserId),
  //       checkNo: paidTax.checkNo,
  //     };

  //     // Update Form Nine table with adjusted tax values
  //     const updateFormNineResult =
  //       await TaxPayerModel.updateFromNineAgentTaxVasuli(
  //         res.pool,
  //         updateFormNine,
  //       );

  //     // Check if update was successful (optional, based on your model)
  //     if (!updateFormNineResult || updateFormNineResult.affectedRows < 1) {
  //       return sendApiError(
  //         res,
  //         500,
  //         false,
  //         "Failed to update Form Nine tax details",
  //       );
  //     }

  //     // Final response
  //     return sendApiResponse(
  //       res,
  //       200,
  //       true,
  //       "Payment status and Form Nine tax details updated successfully",
  //     );
  //   }),

  updatePaymentStatus: asyncHandler(async (req, res) => {
    let { paymentId, updatePaymentStatusTo, formNineId, f8UserId } = req.body;

    // Basic validation for payment status
    if (
      updatePaymentStatusTo !== "REJECTED" &&
      updatePaymentStatusTo !== "APPROVED"
    ) {
      throw new AppError("Invalid payment status", 400);
    }

    const [existingFormNineDetails] =
      await FormNightModel.getFormNineSavedDetails(res.pool, {
        id: f8UserId,
      });

    if (!existingFormNineDetails) {
      //   return sendApiError(res, 404, false, "Form Nine details not found");
      throw new AppError("Form Nine details not found", 404);
    }

    // Fetch tax payment details by paymentId
    const [taxAmountPaidDuringPaymentDetails] =
      await TaxPayerModel.getSamanyaTaxEntryByPaymentId(res.pool, paymentId);

    if (!taxAmountPaidDuringPaymentDetails) {
      //   return sendApiError(res, 404, false, "Payment tax details not found");
      throw new AppError("Payment tax details not found", 404);
    }

    let [existingBankRecord] = await bankDetailsModel.getActiveAccountSamanya(
      res.pool,
      1,
    );

    if (!existingBankRecord) {
      throw new AppError("सामान्य खात्याची बँक माहिती सेट करा.", 400);
    }

    const f9Tax = existingFormNineDetails;
    const paidTax = taxAmountPaidDuringPaymentDetails;

    // Prepare updated Form Nine data by subtracting paid tax amounts
    const updateFormNine = {
      // Current Taxes
      currentArogyaTax: safeSubtract(
        f9Tax.currentArogyaTax,
        paidTax.tpl_currentArogyaTax,
      ),
      currentBuildingTax: safeSubtract(
        f9Tax.currentBuildingTax,
        paidTax.tpl_currentBuildingTax,
      ),
      currentDivaTax: safeSubtract(
        f9Tax.currentDivaTax,
        paidTax.tpl_currentDivaTax,
      ),
      currentCleaningTax: safeSubtract(
        f9Tax.currentCleaningTax,
        paidTax.tpl_currentCleaningTax,
      ),
      currentEducationTax: safeSubtract(
        f9Tax.currentEducationTax,
        paidTax.tpl_currentEducationTax,
      ),
      currentFireblegateTax: safeSubtract(
        f9Tax.currentFireblegateTax,
        paidTax.tpl_currentFireblegateTax,
      ),
      currentTreeTax: safeSubtract(
        f9Tax.currentTreeTax,
        paidTax.tpl_currentTreeTax,
      ),

      // Last Taxes
      lastArogyaTax: safeSubtract(
        f9Tax.lastArogyaTax,
        paidTax.tpl_lastArogyaTax,
      ),
      lastBuildingTax: safeSubtract(
        f9Tax.lastBuildingTax,
        paidTax.tpl_lastBuildingTax,
      ),
      lastDivaTax: safeSubtract(f9Tax.lastDivaTax, paidTax.tpl_lastDivaTax),
      lastTaxFine: safeSubtract(f9Tax.lastTaxFine, paidTax.tpl_lastTaxFine),
      lastTaxRelief: safeSubtract(
        f9Tax.lastTaxRelief,
        paidTax.tpl_lastTaxRelief,
      ),
      lastCleaningTax: safeSubtract(
        f9Tax.lastCleaningTax,
        paidTax.tpl_lastCleaningTax,
      ),
      lastEducationTax: safeSubtract(
        f9Tax.lastEducationTax,
        paidTax.tpl_lastEducationTax,
      ),
      lastFireblegateTax: safeSubtract(
        f9Tax.lastFireblegateTax,
        paidTax.tpl_lastFireblegateTax,
      ),
      lastTreeTax: safeSubtract(f9Tax.lastTreeTax, paidTax.tpl_lastTreeTax),

      formNineId: Number(formNineId),
      userId: Number(f8UserId),
      checkNo: paidTax.checkNo,
    };

    await runInTransaction(req, async (conn) => {
      // Update payment status in DB
      const [paymentData] = await paymentModel.getPaymentDetailsByPaymentId(
        conn,
        paymentId,
      );

      const { affectedRows } = await paymentModel.updatePaymentStatus(
        conn,
        {
          paymentId: +paymentId,
          updatePaymentStatusTo,
        },
      );

      await paymentSamanyaReceiptModel.updateStatusByPaymentInformationId(conn, {paymentId: paymentId, newStatus: updatePaymentStatusTo})

      if (updatePaymentStatusTo != "REJECTED") {
        // ALSO CREDIT THE AMOUNT IN THE BANK BALANCE I THINK
        await bankDetailsModel.creditBalance(
          conn,
          existingBankRecord?.id,
          +paymentData.payment_amount,
        );

        await samanyaTransactionModel.creditAmount(conn, {
            ps_bank_details_id_fk: existingBankRecord.id,
            before_amount: existingBankRecord.account_balance,
            amount: +paymentData.payment_amount,

            payment_mode: "ONLINE",
        })

        // Update Form Nine table with adjusted tax values
        const updateFormNineResult =
          await TaxPayerModel.updateFromNineAgentTaxVasuli(
            conn,
            updateFormNine,
          );
      }
    });

    return sendApiResponse(
      res,
      200,
      true,
      "Payment status and Form Nine tax details updated successfully",
    );
  }),

  updatePaymentStatusWater: asyncHandler(async (req, res) => {
    let { paymentId, updatePaymentStatusTo, formNineId, f8UserId } = req.body;

    // Basic validation for payment status
    if (
      updatePaymentStatusTo !== "REJECTED" &&
      updatePaymentStatusTo !== "APPROVED"
    ) {
      throw new AppError("Invalid payment status", 400);
    }

    const [existingFormNineDetails] =
      await FormNightModel.getFormNineSavedDetails(res.pool, {
        id: f8UserId,
      });

    if (!existingFormNineDetails) {
      //   return sendApiError(res, 404, false, "Form Nine details not found");
      throw new AppError("Form Nine details not found", 404);
    }

    // Fetch tax payment details by paymentId
    const [taxAmountPaidDuringPaymentDetails] =
      await TaxPayerModel.getPaniTaxEntryByPaymentId(res.pool, paymentId);
    if (!taxAmountPaidDuringPaymentDetails) {
      //   return sendApiError(res, 404, false, "Payment tax details not found");
      throw new AppError("Payment tax details not found", 404);
    }

    let [existingBankRecord] = await bankDetailsModel.getActiveAccountPani(
      res.pool,
      1,
    );

    if (!existingBankRecord) {
      throw new AppError("पाणी खात्याची बँक माहिती सेट करा.", 400);
    }

    const f9Tax = existingFormNineDetails;
    const paidTax = taxAmountPaidDuringPaymentDetails;
    let updateFormNine = {
      // general tax
      lastGenealWaterTax:
        f9Tax.lastGenealWaterTax - paidTax.tpl_lastGenealWaterTax,
      currentGenealWaterTax:
        f9Tax.currentGenealWaterTax - paidTax.tpl_currentGenealWaterTax,
      totalGenealWaterTax:
        f9Tax.lastGenealWaterTax -
        paidTax.tpl_lastGenealWaterTax +
        (f9Tax.currentGenealWaterTax - paidTax.tpl_currentGenealWaterTax),

      // special water tax
      lastSpacialWaterTax:
        f9Tax.lastSpacialWaterTax - paidTax.tpl_lastSpacialWaterTax,
      currentSpacialWaterTax:
        f9Tax.currentSpacialWaterTax - paidTax.tpl_currentSpacialWaterTax,
      totalSpacialWaterTax:
        f9Tax.lastSpacialWaterTax -
        paidTax.tpl_lastSpacialWaterTax +
        (f9Tax.currentSpacialWaterTax - paidTax.tpl_currentSpacialWaterTax),

      checkNo: paidTax.checkNo,

      formNineId: Number(paidTax.form_nine_id),
      userId: Number(paidTax.user_id),
    };

    await runInTransaction(req, async (conn) => {
      // get payment data
      const [paymentData] = await paymentModel.getPaymentDetailsByPaymentId(
        res.pool,
        paymentId,
      );
      // update status

      const { affectedRows } = await paymentModel.updatePaymentStatus(
        res.pool,
        {
          paymentId: +paymentId,
          updatePaymentStatusTo,
        },
      );

      // if not rejected
      if (updatePaymentStatusTo != "REJECTED") {
        // credit balance if mode is online
        await bankDetailsModel.creditBalance(
          conn,
          existingBankRecord?.id,
          +paymentData.payment_amount,
        );

        // updateFormNineAgent

        const updateFormNineResult =
          await TaxPayerModel.updatePaniFromNineAgentTaxVasuli(
            conn,
            updateFormNine,
          );
      }
    });

    // Final response
    return sendApiResponse(
      res,
      200,
      true,
      "Payment status updated and Form Nine tax details updated successfully",
    );
  }),

  //   mark for deleted
  updatePaymentStatusWaterOld: asyncHandler(async (req, res) => {
    let { paymentId, updatePaymentStatusTo, formNineId, f8UserId } = req.body;

    // Basic validation for payment status
    if (
      updatePaymentStatusTo !== "REJECTED" &&
      updatePaymentStatusTo !== "APPROVED"
    ) {
      return sendApiError(res, 400, false, "Invalid payment status");
    }

    // Update payment status in DB
    const { affectedRows } = await paymentModel.updatePaymentStatus(res.pool, {
      paymentId,
      updatePaymentStatusTo,
    });

    if (affectedRows < 1) {
      return sendApiError(res, 500, false, "Failed to update payment status");
    }

    // If payment status is REJECTED, respond immediately after update
    if (updatePaymentStatusTo === "REJECTED") {
      return sendApiResponse(
        res,
        200,
        true,
        "Payment status updated to REJECTED",
      );
    }

    // If APPROVED, fetch existing Form Nine details
    const [existingFormNineDetails] =
      await FormNightModel.getFormNineSavedDetails(res.pool, {
        id: f8UserId,
      });

    if (!existingFormNineDetails) {
      return sendApiError(res, 404, false, "Form Nine details not found");
    }

    // Fetch tax payment details by paymentId
    const [taxAmountPaidDuringPaymentDetails] =
      await TaxPayerModel.getPaniTaxEntryByPaymentId(res.pool, paymentId);

    if (!taxAmountPaidDuringPaymentDetails) {
      return sendApiError(res, 404, false, "Payment tax details not found");
    }

    const f9Tax = existingFormNineDetails;
    const paidTax = taxAmountPaidDuringPaymentDetails;

    let updateFormNine = {
      // general tax
      lastGenealWaterTax:
        f9Tax.lastGenealWaterTax - paidTax.tpl_lastGenealWaterTax,
      currentGenealWaterTax:
        f9Tax.currentGenealWaterTax - paidTax.tpl_currentGenealWaterTax,
      totalGenealWaterTax:
        f9Tax.lastGenealWaterTax -
        paidTax.tpl_lastGenealWaterTax +
        (f9Tax.currentGenealWaterTax - paidTax.tpl_currentGenealWaterTax),

      // special water tax
      lastSpacialWaterTax:
        f9Tax.lastSpacialWaterTax - paidTax.tpl_lastSpacialWaterTax,
      currentSpacialWaterTax:
        f9Tax.currentSpacialWaterTax - paidTax.tpl_currentSpacialWaterTax,
      totalSpacialWaterTax:
        f9Tax.lastSpacialWaterTax -
        paidTax.tpl_lastSpacialWaterTax +
        (f9Tax.currentSpacialWaterTax - paidTax.tpl_currentSpacialWaterTax),

      checkNo: paidTax.checkNo,

      formNineId: Number(paidTax.form_nine_id),
      userId: Number(paidTax.user_id),
    };

    // Update Form Nine table with adjusted tax values
    const updateFormNineResult =
      await TaxPayerModel.updatePaniFromNineAgentTaxVasuli(
        res.pool,
        updateFormNine,
      );

    // Check if update was successful (optional, based on your model)
    if (!updateFormNineResult || updateFormNineResult.affectedRows < 1) {
      return sendApiError(
        res,
        500,
        false,
        "Failed to update Form Nine tax details",
      );
    }

    // Final response
    return sendApiResponse(
      res,
      200,
      true,
      "Payment status updated and Form Nine tax details updated successfully",
    );
  }),

  renderPaymentHistoryPage: asyncHandler(async (req, res) => {
    let { malmattaNo, paymentFor, forText } = req.query;
    const paymentHistory =
      await TaxPaymentModel.getPaymentDetailsByMalmattaAndPaymentFor(
        res.pool,
        malmattaNo,
        paymentFor,
      );
    renderPage(res, "user/payments/payments-history-page.pug", {
      title: "Payment History",
      paymentHistory,
    });
  }),

  renderPaymentHistoryPageForUser: asyncHandler(async (req, res) => {
    let { malmattaNo, paymentFor, forText } = req.query;
    const paymentHistory =
      await TaxPaymentModel.getPaymentDetailsByMalmattaAndPaymentFor(
        res.pool,
        malmattaNo,
        paymentFor,
      );

    renderPage(res, "user/payments/payments-history-page-user.pug", {
      title: "Payment History",
      paymentHistory,
    });
  }),

  // getVerifyDetails: async (req, res) => {
  //   var getData = req.body;
  //   let pay = {};
  //   let userData = [];

  //   IndexModel.getUserDetailsByTransactionId(res.pool, getData.transactionId)
  //     .then(function (result) {
  //       userData = result;
  //       if (userData.length === 0) {
  //         res.status(200).send({
  //           message: 'User Not Found'
  //         });
  //         return false;
  //       }
  //       let merchantId = process.env.MERCHANT_ID;
  //       let merchantTransactionId = getData.transactionId;
  //       let salt = process.env.SALT;
  //       let saltIndex = process.env.SALT_INDEX;

  //       let details_1 =
  //         `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt;
  //       let sha256 = createHash('sha256').update(details_1).digest('hex');
  //       sha256 += '###' + saltIndex;

  //       const options = {
  //         method: 'GET',
  //         url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
  //         headers: {
  //           accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           'X-VERIFY': sha256,
  //           'X-MERCHANT-ID': merchantId
  //         }
  //       };

  //       axios
  //         .request(options)
  //         .then(function (response) {
  //           let updatePay = {
  //             token: response.data.data.merchantTransactionId,
  //             transactionId: response.data.data.transactionId,
  //             amount: response.data.data.amount,
  //             state: response.data.data.state,
  //             responseCode: response.data.data.responseCode,
  //             fullPayDetails: response.data
  //           };
  //           pay = { ...updatePay };
  //           var _date = {
  //             date: myDates.getDate(),
  //             time: myDates.getTime()
  //           };
  //           return IndexModel.updateOnlinePaymentStatus(
  //             res.pool,
  //             updatePay,
  //             _date
  //           );
  //         })
  //         .then(function (result) {
  //           if (result.affectedRows !== 0) {
  //             res.render('new/verify_user_online_payment', {
  //               call: 1,
  //               userData: userData[0],
  //               pay
  //             });
  //           } else {
  //             res.status(200).send({
  //               call: 0
  //             });
  //           }
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //           console.log(error);
  //           console.log(error);

  //           res.status(500).send({ data: error, call: 0 });
  //         });
  //     })
  //     .catch(function (error) {
  //       res.status(500).send({ data: error, call: 0 });
  //     });
  // },
  // getPlacePaymentOrder: async (req, res) => {
  //   var getData = req.body;
  //   var params = {};
  //   IndexModel.getOnlinePaymentToken(res.pool, getData)
  //     .then((result) => {
  //       let salt = process.env.SALT;
  //       let saltIndex = process.env.SALT_INDEX;
  //       let details = {
  //         merchantId: process.env.MERCHANT_ID,
  //         merchantTransactionId: result[0].token,
  //         merchantUserId: `MUID${result[0].token}`,
  //         amount: 1000,
  //         redirectUrl: process.env.BASE_URL + '/verify-details',
  //         redirectMode: 'POST',
  //         callbackUrl: process.env.BASE_URL + '/payment',
  //         mobileNumber: '9999999999',
  //         paymentInstrument: {
  //           type: 'PAY_PAGE'
  //         }
  //       };
  //       let base64data = Buffer.from(JSON.stringify(details)).toString(
  //         'base64'
  //       );

  //       let details_1 = base64data + '/pg/v1/pay' + salt;
  //       let sha256 = createHash('sha256').update(details_1).digest('hex');
  //       sha256 += '###' + saltIndex;

  //       const options = {
  //         method: 'POST',
  //         url: 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
  //         headers: {
  //           accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           'X-VERIFY': sha256
  //         },
  //         data: {
  //           request: base64data
  //         }
  //       };

  //       axios
  //         .request(options)
  //         .then(function (response) {
  //           res.status(200).send({
  //             data: response.data.data.instrumentResponse.redirectInfo.url,
  //             call: 1
  //           });
  //         })
  //         .catch(function (error) {
  //           console.log(error.response.data);
  //           console.log(error.response.status);
  //           console.log(error.response.headers);

  //           res.status(500).send({ data: error.response.data, call: 0 });
  //         });
  //     })
  //     .catch(function (error) {
  //       res.status(500).send({ data: error, call: 0 });
  //     });
  // },
  // getPlacePaymentOrderVerify: (req, res) => {
  //   var getData = req.body;
  //   var body = req.body.razorpay_order_id + '|' + req.body.razorpay_payment_id;
  //   var crypto = require('crypto');
  //   var expectedSignature = crypto
  //     .createHmac('sha256', 'oA0ygiaELrNyziKLoYLchCy9')
  //     .update(body.toString())
  //     .digest('hex');
  //   var response = { call: 0 };
  //   if (expectedSignature === req.body.razorpay_signature) {
  //     /*var mailData = {
  //       to: data.newMailPartOne + "@" + data.newMailPartTwo,
  //       subject: `${process.name} Recruitment Process.`,
  //       message: `Dear ${data.newFname},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Your registration for ${process.name} recruitment is done successfully.Your login details are as <br> UserName: <strong>${result.insertId} </strong> <br> Password: <strong>${randomstring} </strong> <br>Do not share the credentials.<br>Thank you.`,
  //     };
  //     emailModel.sendEmailGmailCallback(mailData, function (data) {});
  //     */
  //     //email
  //     var _date = {
  //       date: myDates.getDate(),
  //       time: myDates.getTime()
  //     };
  //     var SMS = {
  //       userMobileNo: getData.contact,
  //       docSMS: `Dear ${getData.name},\nThank you for your payment.Please refer details of transaction.\nProcess :: ${getData.process} \nPost:: ${getData.post} \nAmount :: Rs.${getData.amount}/- \nDate:: ${_date.date} ${_date.time} \nTransaction ID:: ${getData.razorpay_payment_id}.`
  //     };

  //     IndexModel.updatePaymentStatus(res.pool, getData, _date)
  //       .then((result) => {
  //         res.status(200).send({ call: 1, result: result });
  //       })
  //       .catch((error) => {
  //         res.status(500).send({ call: 2, error: error });
  //       });
  //   } else {
  //     res.status(200).send({ call: 0 });
  //   }
  // },

  // // SAVE PAYMENT DETAILS
  // postPaymentDetails: (req, res) => {
  //   let data = req.body;

  //   paymentModel
  //     .postPaymentDetails(res.pool, data)
  //     .then((result) => {
  //       res.status(201).json({
  //         call: 1
  //       });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({
  //         call: 0,
  //         data: err
  //       });
  //     });
  // },

  // // get all payment list
  // getAllPaymentsData: (req, res) => {
  //   paymentModel
  //     .getAllPaymentsData(res.pool)
  //     .then((result) => {
  //       res.status(200).json({
  //         call: 1,
  //         result
  //       });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({
  //         call: 0,
  //         data: err
  //       });
  //     });
  // }
};

module.exports = paymentController;
