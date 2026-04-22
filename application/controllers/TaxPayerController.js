const Razorpay = require("razorpay");
var crypto = require("crypto");
let TaxPayerModel = require("../model/TaxPayerModel");
let FormNightModel = require("../model/FormNightModel");
let HomeModel = require("../model/HomeModel");
var responderSet = require("../config/_responderSet");
const qrCodeModel = require("../model/qrCode/qrCodeModel");
const asyncHandler = require("../utils/asyncHandler");
const { renderPage } = require("../utils/sendResponse");
const runInTransaction = require("../utils/runInTransaction");
const { sendApiResponse, sendApiError } = require("../utils/apiResponses");
const paymentModel = require("../model/payment-model/paymentModel");
const { UPLOAD_PATHS } = require("../config/uploadPaths");
const generateUniqueFileName = require("../utils/generateFileName");
const { saveFile } = require("../utils/saveFile");
const { isPaymentForOnlySamanya } = require("../data/paymentForOptions");
const bankDetailsModel = require("../model/bankDetails/bankDetailsModel");
const AppError = require("../utils/AppError");
const paymentSamanyaReceiptModel = require("../model/payment-model/paymentSamanyaReceiptModel");
const paymentPaniReceiptModel = require("../model/payment-model/paymentPaniReceiptModel");
const samanyaTransactionModel = require("../model/transaction/samanyaTransactionModel");
let myDates = responderSet.myDate;

var instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

let TaxPayerController = {
  getListView: asyncHandler(async (req, res) => {
    // Use destructuring with default values for malmattaNo and userId
    let malmattaNo = -1;
    let userId = -1;
    if (req.query.malmattaNo !== undefined) {
      malmattaNo = req.query.malmattaNo;
      userId = req.query.user_id;
    }

    // If malmattaNo or userId is not provided, handle the default case
    // if (!malmattaNo || !userId) {
    //     return res.status(400).send({
    //         call: 0,
    //         message: 'malmattaNo and userId are required parameters.',
    //     });
    // }

    // Fetch the Main List of Tax Payers using async/await
    const result = await TaxPayerModel.getMainList(res.pool);

    let _samanyaKarBharanaList = [];

    _samanyaKarBharanaList = await TaxPayerModel.getSamanyaKarBharanaList(
      res.pool,
    );

    // console.log(_samanyaKarBharanaList);
    // console.log(_samanyaKarBharanaList.length)

    let _paniKarBharanaList = [];

    _paniKarBharanaList = await TaxPayerModel.getPaniKarBharanaList(res.pool);

    // Render the response with the fetched data
    renderPage(res, "user/tax_payer/tp_list", {
      malmattaNo,
      userId,
      list: result,
      json_list: JSON.stringify(result),

      samanyaKarBharanaList: _samanyaKarBharanaList,
      paniKarBharanaList: _paniKarBharanaList,
    });
  }),

  getTaxPayerSamanyaView: function (req, res, next) {
    var user_id = req.params.id;
    let malmattaNo = req.query.malNo;
    if (isNaN(user_id)) {
      res.status(200).send({ call: 0, data: "Invalid User Details" });
      return false;
    }
    // console.log("doign this in here for what")
    var gp = {};
    HomeModel.getGpData(res.pool)
      .then((result) => {
        gp = result[0];
        FormNightModel.getNightPreTaxationData(
          res.pool,
          { id: Number(user_id) },
          async function (status, sendData) {
            switch (sendData.call) {
              case 1:
                sendData.data["sessionUser"] = req.session.User;
                sendData.data["taxDetails"] = JSON.stringify([
                  sendData.data.formNineSavedDetails,
                ]);
                let [qrCodes] = await qrCodeModel.qrCodeList(res.pool);

                res.render("user/tax_payer/add_tax_payer", {
                  ...sendData.data,
                  qrCodes: qrCodes || {},
                });
                break;
              case 2:
                res.status(200).send({ call: 1, data: "Invalid Details" });
                break;
              default:
                res.redirect("/tax-payer");
                break;
            }
          },
        );
      })
      .catch((error) => {
        console.log(`Error whlie showing the page : ${error}`);
        res.status(500).send({ call: 0, data: error });
      });
  },

  getPaymentDetails: async function (req, res, next) {
    var user_id = req.params.id;
    if (isNaN(user_id)) {
      res.status(200).send({ call: 0, data: "Invalid User Details" });
      return false;
    }
    var gp = {};

    let [qrCodes] = await qrCodeModel.qrCodeList(res.pool);

    HomeModel.getGpData(res.pool)
      .then((result) => {
        gp = result[0];
        FormNightModel.getNightPreTaxationData(
          res.pool,
          { id: Number(user_id) },
          function (status, sendData) {
            switch (sendData.call) {
              case 1:
                sendData.data["sessionUser"] = req.session.User;
                // console.log(sendData);
                sendData.data["taxDetails"] = JSON.stringify([
                  sendData.data.formNineSavedDetails,
                ]);
                sendData.data.qrCodes = qrCodes || {};
                res.render("user/tax_payer/add_tax_payment", sendData.data);
                break;
              case 2:
                res.status(200).send({ call: 1, data: "Invalid Details" });
                break;
              default:
                res.redirect("/tax-payer");
                break;
            }
          },
        );
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },

  // water tax payment page for the user
  // implementing this
  getPaymentDetailsWater: (req, res, next) => {
    var user_id = req.params.id;
    if (isNaN(user_id)) {
      res.status(200).send({ call: 0, data: "Invalid User Details" });
      return false;
    }
    var gp = {};
    HomeModel.getGpData(res.pool)
      .then((result) => {
        gp = result[0];
        FormNightModel.getNightPreTaxationData(
          res.pool,
          { id: Number(user_id) },
          async function (status, sendData) {
            switch (sendData.call) {
              case 1:
                sendData.data["sessionUser"] = req.session.User;
                // console.log(sendData);
                sendData.data["taxDetails"] = JSON.stringify([
                  sendData.data.formNineSavedDetails,
                ]);

                let [qrCodes] = await qrCodeModel.qrCodeList(res.pool);

                res.render("user/tax_payer/add_tax_payment_water", {
                  ...sendData.data,
                  qrCodes,
                });
                break;
              case 2:
                res.status(200).send({ call: 1, data: "Invalid Details" });
                break;
              default:
                res.redirect("/tax-payer");
                break;
            }
          },
        );
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },

  getPayList: function (req, res, next) {
    var user_id = req.params.id;
    if (isNaN(user_id)) {
      res.status(200).send({ call: 0, data: "Invalid User Details" });
      return false;
    }
    var gp = {};

    // console.log("only rendering this page")
    HomeModel.getGpData(res.pool)
      .then((result) => {
        gp = result[0];
        FormNightModel.getNightPreTaxationData(
          res.pool,
          { id: Number(user_id) },
          function (status, sendData) {
            switch (sendData.call) {
              case 1:
                sendData.data["sessionUser"] = req.session.User;
                sendData.data["taxDetails"] = JSON.stringify([
                  sendData.data.formNineSavedDetails,
                ]);
                res.render("user/tax_payer/payment-list", sendData.data);
                break;
              case 2:
                res.status(200).send({ call: 1, data: "Invalid Details" });
                break;
              default:
                res.redirect("/tax-payer");
                break;
            }
          },
        );
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },
  getTaxPayerPaniView: function (req, res, next) {
    var user_id = req.params.id;
    if (isNaN(user_id)) {
      res.status(200).send({ call: 0, data: "Invalid User Details" });
      return false;
    }
    var gp = {};
    HomeModel.getGpData(res.pool)
      .then((result) => {
        gp = result[0];
        FormNightModel.getNightPreTaxationData(
          res.pool,
          { id: Number(user_id) },
          async function (status, sendData) {
            switch (sendData.call) {
              case 1:
                sendData.data["sessionUser"] = req.session.User;
                console.log(sendData);
                sendData.data["taxDetails"] = JSON.stringify([
                  sendData.data.formNineSavedDetails,
                ]);

                let [qrCodes] = await qrCodeModel.qrCodeList(res.pool);

                res.render("user/tax_payer/add_tax_payer1", {
                  ...sendData.data,
                  qrCodes: qrCodes || {},
                });
                break;
              case 2:
                res.status(200).send({ call: 1, data: "Invalid Details" });
                break;
              default:
                res.redirect("/tax-payer");
                break;
            }
          },
        );
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },
  /* // Refactored version is below, this one is kept for backup
    saveNewPay: function (req, res) {
        var data = req.body;
        var insertId = 0;
        // console.log("IN save new pay");
        TaxPayerModel.saveNewTaxVasuliDetails(res.pool, data.newVasuliData)
            .then((result) => {
                if (!result.insertId) {
                    res.status(200).send({ call: 0 });
                    return 999;
                } else {
                    insertId = result.insertId;
                    return TaxPayerModel.updateFromNineAgentTaxVasuli(
                        res.pool,
                        data.updateFormNine
                    );
                }
            })
            .then((result) => {
                if (result !== 999) {
                    if (result.affectedRows === 1)
                        return res.status(200).send({ call: 1, id: insertId });
                    else return res.status(500).send({ call: 0, data: error });
                }
            })
            .catch((error) => {
                console.log('Errorrrr', error);
                return res.status(500).send({ call: 0, data: error });
            });
    },
    */

  // Refactoring the saveNewPay
  saveNewPay: async (req, res) => {
    try {
      const { newVasuliData, updateFormNine } = req.body;

      console.log(newVasuliData);

      // flow => insert into the log table
      const insertResult = await TaxPayerModel.saveNewTaxVasuliDetails(
        res.pool,
        newVasuliData,
      );

      if (!insertResult.insertId) {
        return res.status(200).send({
          call: 0,
        });
      }

      // then update the same data in the original table

      const updateFormNineResult =
        await TaxPayerModel.updateFromNineAgentTaxVasuli(
          res.pool,
          updateFormNine,
        );

      if (updateFormNineResult.affectedRows) {
        return res.status(200).send({
          call: 1,
          id: insertResult.insertId,
        });
      }

      return res.status(500).send({
        call: 0,
        data: "Update failed. No rows affected in updateFromNineAgentTaxVasuli.",
      });
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).send({
        call: 0,
        data: err.message || "Internal Server Error",
      });
    }
  },

  saveNewWaterPay: async (req, res) => {
    try {
      let data = req.body;

      const { insertId } = await TaxPayerModel.saveNewTaxVasuliPaniDetails(
        res.pool,
        data.newVasuliData,
      );

      if (!insertId) {
        return res.status(500).send({
          call: 0,
        });
      }

      const { affectedRows } =
        await TaxPayerModel.updatePaniFromNineAgentTaxVasuli(
          res.pool,
          data.updateFormNine,
        );

      if (!affectedRows) {
        return res.status(500).send({
          call: 0,
          data: "Error",
        });
      }

      return res.status(200).send({
        call: 1,
        id: insertId,
      });
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).send({ call: 0, data: err });
    }
  },

  // working on the functions to save samanya payment alogn with payment
  // save payment fist, then immedicaly save hte samnay tax details payment in it

  // THE ORIGINAL FLOW WAS TO /payment/save then hit the endpoint
  // /tax-payer/saveNewPay

  saveSamanyaTaxPaymentWithPaidTaxDetails: asyncHandler(async (req, res) => {
    // first save he payment details

    console.log(req.body);
    // let {paymentData, newVasuliData, updateFormNine} = req.body;
    let paymentData, newVasuliData, updateFormNine;

    // console.log("Content-Type:", req.headers["content-type"]); // see actual header
    // console.log("req.is multipart/form-data:", req.is("multipart/form-data"));
    if (req.is("multipart/form-data")) {
      paymentData = req.body.paymentData
        ? JSON.parse(req.body.paymentData)
        : {};
      newVasuliData = req.body.newVasuliData
        ? JSON.parse(req.body.newVasuliData)
        : {};
      updateFormNine = req.body.updateFormNine
        ? JSON.parse(req.body.updateFormNine)
        : {};
    } else {
      ({ paymentData, newVasuliData, updateFormNine } = req.body);
    }

    let paymentScreenshot = req.files?.paymentScreenshot;

    let paymentMode = paymentData.payment_mode || paymentData.paymentMode;

    // Checking if transaction number is already used
    if (paymentMode == 1 && paymentData.transactionNumber?.trim() != "") {
      let existingPayments = await paymentModel.getPaymentByTransactionNumber(
        res.pool,
        paymentData.transactionNumber,
      );

      if (existingPayments?.length > 0) {
        throw new AppError("हा Transaction Number आधीच वापरला आहे.", 400)
      }
    }

    // unncesary here, bcz this is by default for samanya tax
    // if(isPaymentForOnlySamanya(paymentData.paymentFor || paymentData.payment_for)) {
    // }

    let [existingBankRecord] = await bankDetailsModel.getActiveAccountSamanya(
      res.pool,
      1,
    );

    if (!existingBankRecord) {
      throw new AppError("सामान्य खात्याची बँक माहिती सेट करा.", 400);
    }

    //   Checking if the transaction mode is online and the payment screenshot exists or not
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

    let insertIdNewTaxVasuli;

    await runInTransaction(req, async (conn) => {

        // fetch again to acquire the lock on the db and make the trasaction atomic
        let [existingBankRecord] = await bankDetailsModel.getActiveAccountSamanya(
            conn,
            1,
        );

      // about the payment,
      // if payment mode was online, then and then only credit the balance in the account, else, no need for that? right
      if (paymentMode == 1) {
          await samanyaTransactionModel.creditAmount(conn, {
              ps_bank_details_id_fk: existingBankRecord.id,
              before_amount: existingBankRecord.account_balance,
              amount: +paymentData.amount,

              payment_mode: "ONLINE",
          });

        await bankDetailsModel.creditBalance(
          conn,
          existingBankRecord.id,
          +paymentData.amount,
        );

      } else {
        await bankDetailsModel.creditOfflinePayment(
          conn,
          existingBankRecord.id,
          +paymentData.amount,
        );
      }

      // this insertid will become hte ps_payment_information_id_fk for this
      const { insertId: ps_payment_information_id_fk } =
        await paymentModel.savePaymentDetails(conn, {
          ...paymentData,
          ps_bank_details_id_fk: existingBankRecord?.id,
        });

        const {insertId: ps_payment_receipt_samanya_id_fk} = await paymentSamanyaReceiptModel.savePaymentDetails(conn, {
            ...paymentData,
            
            ps_bank_details_id_fk: existingBankRecord?.id,
            ps_payment_information_id_fk
        }, newVasuliData)

      // flow =>
      // 1. insert into the log table
      const { insertId } = await TaxPayerModel.saveNewTaxVasuliDetails(conn, {
        ...newVasuliData,
        ps_payment_information_id_fk,
        ps_payment_receipt_samanya_id_fk
      });
      insertIdNewTaxVasuli = insertId;
      // 2. then update the same data in the original table
      await TaxPayerModel.updateFromNineAgentTaxVasuli(conn, updateFormNine);
    });

    return sendApiResponse(res, 200, true, "सामान्य कर भरला", {
      insertIdNewTaxVasuli,
    });
  }),

  saveWaterTaxPaymentWithPaidTaxDetails: asyncHandler(async (req, res) => {
    // first save he payment details
    // let {paymentData, newVasuliData, updateFormNine} = req.body;
    let paymentData, newVasuliData, updateFormNine;

    console.log("*************");
    console.log(req.is);
    console.log("***********");
    if (req.is("multipart/form-data")) {
      paymentData = req.body.paymentData
        ? JSON.parse(req.body.paymentData)
        : {};
      newVasuliData = req.body.newVasuliData
        ? JSON.parse(req.body.newVasuliData)
        : {};
      updateFormNine = req.body.updateFormNine
        ? JSON.parse(req.body.updateFormNine)
        : {};
    } else {
      ({ paymentData, newVasuliData, updateFormNine } = req.body);
    }

    let paymentScreenshot = req.files?.paymentScreenshot;

    let paymentMode = paymentData.payment_mode || paymentData.paymentMode;

    // Checking if transaction number is already used
    if (paymentMode == 1 && paymentData.transactionNumber?.trim() != "") {
      let existingPayments = await paymentModel.getPaymentByTransactionNumber(
        res.pool,
        paymentData.transactionNumber,
      );

      if (existingPayments?.length > 0) {
        return sendApiError(
          res,
          400,
          false,
          "हा Transaction Number आधीच वापरला आहे.",
        );
      }
    }

    // unncesary here, bcz this is by default for pani tax
    // if(isPaymentForOnlyPaani(paymentData.paymentFor || paymentData.payment_for)) {
    // }

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

    let insertIdNewTaxVasuli;
    await runInTransaction(req, async (conn) => {
      // about the payment,
      // if payment mode was online, then and then only credit the balance in the account, else, no need for that? right
      if (paymentMode == 1) {
        await bankDetailsModel.creditBalance(
          conn,
          existingBankRecord.id,
          +paymentData.amount,
        );
      } else {
        await bankDetailsModel.creditOfflinePayment(
          conn,
          existingBankRecord.id,
          +paymentData.amount,
        );
      }

      // this insertid will become hte ps_payment_information_id_fk for this
      const { insertId: ps_payment_information_id_fk } =
        await paymentModel.savePaymentDetails(conn, {
          ...paymentData,
          ps_bank_details_id_fk: existingBankRecord?.id,
        });


        await paymentPaniReceiptModel.savePaymentDetails(conn, {
            ...paymentData,
            ps_bank_details_id_fk: existingBankRecord?.id,
            ps_payment_information_id_fk
        }, newVasuliData)

      // flow =>
      // 1. insert into the log table
      const { insertId } = await TaxPayerModel.saveNewTaxVasuliPaniDetails(
        conn,
        { ...newVasuliData, ps_payment_information_id_fk },
      );
      insertIdNewTaxVasuli = insertId;

      // 2. then update the same data in the original table
      await TaxPayerModel.updatePaniFromNineAgentTaxVasuli(
        conn,
        updateFormNine,
      );
    });

    return sendApiResponse(res, 200, true, "पाणी कर भरला गेला", {
      insertIdNewTaxVasuli,
    });
  }),

  getAutoSearch: function (req, res, next) {
    var data = req.body;
    console.log("In get auto search for data body", data);
    TaxPayerModel.getSingleTaxUserListAutocomplete(res.pool, data)
      .then((result) => {
        console.log("in same result = ", result);
        res.status(200).send({ call: result });
      })
      .catch((error) => {
        res.status(500).send({ call: error });
      });
  },
  createPaymentID: async (req, response) => {
    const { amount } = req.body;
    let receipt_id = Math.random();
    receipt_id = receipt_id * 10000;
    receipt_id = Math.floor(receipt_id);
    var options = {
      amount: Number(amount),
      currency: "INR",
      receipt: "order_" + receipt_id,
    };
    try {
      let order = await instance.orders.create(options);
      response.status(200).send({
        status: true,
        order,
        pk: process.env.KEY_ID,
      });
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  callback: async (request, response) => {
    let { payment_id, order_id, signature } = request.body;

    let bodyText = order_id + "|" + payment_id;

    var expectedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(bodyText.toString())
      .digest("hex");

    console.log("sig received ", signature);
    console.log("sig generated ", expectedSignature);

    var result = { status: false };

    if (expectedSignature === signature) result = { status: true };
    response.status(200).send(result);
  },
};
module.exports = TaxPayerController;
