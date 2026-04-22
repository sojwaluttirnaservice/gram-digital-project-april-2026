const HomeModel = require("../../../../model/HomeModel");
const qrCodeModel = require("../../../../model/qrCode/qrCodeModel");
const asyncHandler = require("../../../../utils/asyncHandler");
const { renderPage } = require("../../../../utils/sendResponse");
let FormEightModel = require("../../../../model/HomeModel");
const { sendApiResponse } = require("../../../../utils/apiResponses");

const namuna8BlankController = {
  renderOImageBlankPrint: asyncHandler(async (req, res) => {
    const [qrCodes] = await qrCodeModel.qrCodeList(res.pool);

    let form8UserId = 22;

    if (form8UserId == "undefined" || isNaN(form8UserId) || form8UserId < 1) {
      return sendApiResponse(
        res,
        400,
        false,
        "Form 8 User id not found or Invalid form 8 user id"
      );
    }

    let queryData = {id: form8UserId}
    // fetch fomr 8 user data
    const [userData] = await FormEightModel.formEightUser(res.pool, queryData);

    const allOldOwnerList = await HomeModel.getOldOwnerList(
      res.pool,
      form8UserId
    );

    const totalTaxSample = await FormEightModel.getFromEightTaxSampleData(
      res.pool,
      queryData
    );

    const totalTaxArray = await FormEightModel.getFromEightTaxTotalData(
      res.pool,
      queryData
    );

    // let waterTaxAmount =
    // 	userData.feu_water_tax === 'सामान्य पाणीकर'
    // 		? 150
    // 		: userData.feu_water_tax === 'विशेष पाणीकर'
    // 			? 1200
    // 			: 0

    let waterTaxAmount = 0; // TEMPORARY ZERO

    renderPage(
      res,
      "user/print/namuna8/blanks/pageFormEightSingleNoImageBlank",
      {
        qrCodes: qrCodes || {},
        //   userData,
        //         waterTaxAmount,
        //         totalTaxSample,
        //         totalTaxArray,
        //         allOldOwnerList,
        //         y1:2023,

        //         y2:2024,
      }
    );
  }),

  renderForm8ImageBlankPrint: asyncHandler(async (req, res) => {
    const [qrCodes] = await qrCodeModel.qrCodeList(res.pool);

    renderPage(res, "user/print/namuna8/blanks/pageFormEightImageSingleBlank", {
      qrCodes: qrCodes || {}, 
    });
  }),
};

module.exports = namuna8BlankController;
