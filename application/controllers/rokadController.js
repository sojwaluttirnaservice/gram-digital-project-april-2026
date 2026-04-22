const {
  paymentTypesMap,
  samanyaAndCertificates,
  onlySamanya,
} = require("../data/paymentForOptions");
const gpModel = require("../model/ZPModel");
const bankDetailsModel = require("../model/bankDetails/bankDetailsModel");
const TaxPaymentModel = require("../model/isTaxPaid/TaxPaymentModel");
const namuna5kSamanyaModel = require("../model/namuna/namuna5k/namuna5kSamanyaModel");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { renderPage } = require("../utils/sendResponse");

const rokadController = {
  getRokadVahiPage: asyncHandler(async (req, res) => {
    renderPage(res, "user/rokadVahi/rokad-vahi", {
      title: "रोकड वही",
    });
  }),

  // GETTING SAMANYA ROKAD VAHI
  //   bakcup function for the below function
  //   getSamanyaRokadVahi: asyncHandler(async (req, res) => {
  //     // [1,3,4,5,6]
  //     const paymentDetails = await TaxPaymentModel.getPaymentDetails(
  //       res.pool,
  //       [1, 3, 4, 5, 6],
  //       req.query,
  //     );
  //     console.log(paymentDetails);
  //     renderPage(res, "user/rokadVahi/rokad-vahi-samanya", {
  //       title: "दैनिक रोकड वही सामान्य",
  //       paymentDetails,
  //       ...(req.query || {}),
  //     });
  //   }),

  getSamanyaRokadVahi: asyncHandler(async (req, res) => {
    let {
      pFor: paymentFor,
      for: forType,
      month,
      year,
      fromYear,
      toYear,
    } = req.query;

    // paymentFor = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 18, 19];

    // paymentFor = [...onlySamanya, ...samanyaAndCertificates]


    const [samanyaBankRecord] = await bankDetailsModel.getActiveAccountSamanya(res.pool, 1);

    if(!samanyaBankRecord){
        throw new AppError("सामान्य खात्याची माहिती सेट करा.", 400)
    }


    // console.log('----')
    // console.log(samanyaBankRecord)
    // console.log('------')

    const [lastPaymentRecord] =await namuna5kSamanyaModel.lastPayment(res.pool, samanyaBankRecord.id)



    // console.log(lastPaymentRecord)


    const paymentDetails =
      await TaxPaymentModel.getPaymentDetailsFor5CSamanyaAllWithCertificates(
        res.pool,
        forType,
        {...req.query, payment_upto_date: lastPaymentRecord?.payment_upto_date},
      );
    renderPage(res, "user/rokadVahi/rokad-vahi-samanya", {
      title: "दैनिक रोकड वही सामान्य",
      paymentDetails,
      paymentTypesMap,
      //   ...(req.query || {}),
      samanyaBankRecord,
    lastPaymentRecord,

      month,
      year,
      fromYear,
      toYear,
    });
  }),

  getPaniRokadVahi: asyncHandler(async (req, res) => {
    let {
      pFor: paymentFor,
      for: forType,
      month,
      year,
      fromYear,
      toYear,
    } = req.query;

    const paymentDetails =
      await TaxPaymentModel.getPaymentDetailsFor5CPaniAllWithCertificates(
        res.pool,
        forType,
        req.query,
      );

    //   console.log(paymentDetails)

    renderPage(res, "user/rokadVahi/rokad-vahi-pani", {
      title: "दैनिक रोकड वही पाणी",
      paymentDetails,
      paymentTypesMap,
      //   ...(req.query || {}),

      month,
      year,
      fromYear,
      toYear,
    });
  }),

  // GETTING PANI ROKAD VAHI
  getPaniRokadVahiOLD: asyncHandler(async (req, res) => {
    const paymentDetails = await TaxPaymentModel.getPaymentDetails(
      res.pool,
      2,
      req.query,
    );
    console.log(paymentDetails);
    renderPage(res, "user/rokadVahi/rokad-vahi-pani-backup-02-04-26", {
      title: "दैनिक रोकड वही पाणी",
      paymentDetails,
      ...(req.query || {}),
    });
  }),

  getSamanyaAndPaniRokadVahiRecords: asyncHandler(async (req, res) => {
    let { date_from, date_to } = req.query;

    let _date1 = date_from.split("/").reverse().join("-");
    let _date2 = date_to.split("/").reverse().join("-");

    const paymentDetails =
      await TaxPaymentModel.getPaymentDetailsForSamanyaAndPani(
        res.pool,
        _date1,
        _date2,
      );

    renderPage(res, "user/rokadVahi/all-rokad-vahi-records", {
      title: "दैनिक रोकड वही",
      paymentDetails,
      date_from,
      date_to,
    });
  }),

  getNamuma5K: asyncHandler(async (req, res) => {
    renderPage(res, "user/rokadVahi/namuna5K", {
      title: "नमुना ५ क",
    });
  }),

  getDakhlaPaylistView: asyncHandler(async (req, res) => {
    // FOR REFERENCE ONLY
    // const certificates = [{ id: 1, value: "सामान्य कर भरणा" }, { id: 2, value: "पाणी कर भरणा" }, { id: 3, value: "विवाह नोंदणी प्रमाणपत्र" }, { id: 4, value: "रहिवासी स्वयंघोषितपत्र" }, { id: 5, value: "नमुना ८ प्रिंट" }, { id: 6, value: "थकबाकी/निराधार प्रमाणपत्र" }];
    let {
      pFor: paymentFor,
      for: forType,
      month,
      year,
      fromYear,
      toYear,
    } = req.query;
    // if (forType == "samanya") {
    // //   paymentFor = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 18, 19];
    //     paymentFor = samanyaAndCertificates
    // }
    // if (forType == "pani") {
    //   paymentFor = [2, 12, 14, 16, 17];
    // }

    // remove if needed
    // const paymentDetails =
    //   await TaxPaymentModel.getPaymentDetailsWithDateGroupForNamuna7Old(
    //     res.pool,
    //     paymentFor ? paymentFor : -1,
    //     { month, year, fromYear, toYear },
    //   );

    let paymentDetails = [];

    if (forType == "samanya") {
      paymentDetails =
        await TaxPaymentModel.getPaymentDetailsWithDateGroupForNamuna7(
          res.pool,
          forType,
          { month, year, fromYear, toYear },
        );
    } else if (forType == "pani") {
      paymentDetails =
        await TaxPaymentModel.getPaymentDetailsWithDateGroupForNamuna7Water(
          res.pool,
          forType,
          { month, year, fromYear, toYear },
        );
    }

    // console.log(paymentDetails[0]);
    // const sizeInBytes = Buffer.byteLength(JSON.stringify(paymentDetails));
    // console.log("paymentDetails size:", (sizeInBytes / 1024).toFixed(2), "kb");

    const page =
      forType == "samanya"
        ? "user/rokadVahi/dakhla-paylist"
        : "user/rokadVahi/dakhla-paylist-pani";
    renderPage(res, page, {
      title: "दैनिक रोकड वही (दाखले)",
      paymentDetails,
      paymentTypesMap,
      paymentFor: paymentFor ? paymentFor : -1,
      month,
      year,
      fromYear,
      toYear,
    });
  }),
};

module.exports = rokadController;
