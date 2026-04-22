const { UPLOAD_PATHS } = require("../../../config/uploadPaths");
const bankDetailsModel = require("../../../model/bankDetails/bankDetailsModel");
const namuna5kPaniModel = require("../../../model/namuna/namuna5k/namuna5kPaniModel");
const { sendApiResponse } = require("../../../utils/apiResponses");
const AppError = require("../../../utils/AppError");
const asyncHandler = require("../../../utils/asyncHandler");
const generateUniqueFileName = require("../../../utils/generateFileName");
const runInTransaction = require("../../../utils/runInTransaction");
const { saveFile } = require("../../../utils/saveFile");

const namuna5kPaniController = {
  /**
   * Save a new payment
   * Expects req.body to have:
   * {
   *   ps_bank_details_id_fk,
   *   payment_from_date,
   *   payment_upto_date,
   *   actual_cash_outstanding,
   *   deposited_cash_amount,
   *   receipt_file_name (optional)
   * }
   */
  savePayment: asyncHandler(async (req, res) => {
    const n5kData = req.body;

    // Validation (basic)
    if (
      //   !n5kData.ps_bank_details_id_fk ||
      //   !n5kData.payment_from_date ||
      !n5kData.payment_upto_date ||
      //   n5kData.actual_cash_outstanding === undefined ||
      n5kData.deposited_cash_amount === undefined
    ) {
      throw new AppError("सर्व आवश्यक माहिती भरा.", 400);
    }

    if (!req.files || !req.files.receiptFile) {
      throw new AppError("कृपया पावती फाईल भरा.", 400);
    }

    let [existingBankRecord] = await bankDetailsModel.getActiveAccountPani(
      res.pool,
      1,
    );

    if (!existingBankRecord) {
      throw new AppError("पाणी खात्याची बँक माहिती सेट करा.", 400);
    }

    const recieptPhoto = req.files.receiptFile;

    const recieptPhotoImageName = generateUniqueFileName(
      recieptPhoto,
      "n-5k-pani-receipt-",
    );

    let uploadPath = `${UPLOAD_PATHS.namuna.namuna5kPani}/${recieptPhotoImageName}`;
    await saveFile(recieptPhoto, uploadPath);
    req.filesToCleanup.push(uploadPath);

    // const

    await runInTransaction(req, async (conn) => {
      // Save payment
      await namuna5kPaniModel.savePayment(conn, {
        ...n5kData,
        receipt_file_name: recieptPhotoImageName,
        actual_cash_outstanding: existingBankRecord.account_offline_amount,
        ps_bank_details_id_fk: existingBankRecord.id,
      });

      // deduct offline amoutn from bank accoutn

      await bankDetailsModel.debitOfflineBalance(
        conn,
        existingBankRecord.id,
        n5kData.deposited_cash_amount,
      );

      // incremtn original or online account in the same

      await bankDetailsModel.creditBalance(
        conn,
        existingBankRecord.id,
        n5kData.deposited_cash_amount,
      );
    });

    return sendApiResponse(res, 201, true, "जतन केले.");
  }),
  /**
   * Fetch last payment
   */
  lastPayment: asyncHandler(async (req, res) => {
    const bankId = req.query.bankId || null;

    const result = await namuna5kPaniModel.lastPayment(res.pool, bankId);

    if (!result || result.length === 0) {
      //   return sendApiResponse(res, 404, false, "कोणतीही रक्कम सापडली नाही");
      throw new AppError("कोणतीही रक्कम सापडली नाही", 200);
    }

    return sendApiResponse(res, 200, true, "शेवटची पेमेंट सापडली", result[0]);
  }),

  /**
   * Fetch unpaid periods for a bank account
   */
  getUnpaidPeriods: asyncHandler(async (req, res) => {
    const bankId = req.query.bankId || null;

    const result = await namuna5kPaniModel.getUnpaidPeriods(res.pool, bankId);

    return sendApiResponse(res, 200, true, "अपूर्ण पेमेंट्स सापडल्या", result);
  }),

  getNamuna5kPaymentDate: asyncHandler(async (req, res) => {
    const [lastPaymentEntry] = await namuna5kPaniModel.lastPayment(res.pool);

    return sendApiResponse(res, 200, true, "Last payment date recieved", {
      payment_upto_date: lastPaymentEntry?.payment_upto_date,
    });
  }),
};

module.exports = namuna5kPaniController;
