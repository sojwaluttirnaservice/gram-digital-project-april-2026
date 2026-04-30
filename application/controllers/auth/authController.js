const dbService = require("../../services/db.service");
const { sendApiResponse } = require("../../utils/apiResponses");
const AppError = require("../../utils/AppError");
const asyncHandler = require("../../utils/asyncHandler");
const { sendError } = require("../../utils/sendResponse");

const authController = {
  checkLogin: asyncHandler(async (req, res) => {
    let loginData = req.body;

    let { gp_code, username, password, dbId } = loginData;

    // console.log(loginData);

    // let endpoint = `${gsevaBaseUrl}/auth/gp-user`;
    // let { success, message } = await fetch(endpoint, {
    //   method: "POST",
    //   body: JSON.stringify(req.body),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then((r) => r.json());

    let { success, message } = await dbService.checkLogin(req.body);

    if (!success) throw new AppError(message, 400);

    return sendApiResponse(res, 200, success, message);
  }),

  // this one is gonna for hte website (frontned or web app)

  verifyGpCode: asyncHandler(async (req, res) => {
    // let {gp_code} = req.body;

    // let [websites] = await websitesModel.getByGpCode({gp_code});

    // if(!websites.length) {
    //     throw new AppError("Invalid GP Code", 400);
    // }

    // const [dbList] = await dbListModel.list({websiteId: websites[0].id, excludeFields: ['db_name']});

    // console.log(dbList)

    // let endpoint = `${gsevaBaseUrl}/auth/gp-code`;

    // console.log(endpoint);
    // const { success, message, data } = await fetch(endpoint, {
    //   method: "POST",
    //   body: JSON.stringify(req.body),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then((r) => r.json());

    const { success, message, data } = await dbService.verifyGpCode(req.body);

    if (!success) throw new AppError(message, 400);

    return sendApiResponse(res, 200, success, message, data);
  }),

  checkOtp: asyncHandler(async (req, res) => {
    let { otp, dbId } = req.body;

    let loginData = req.body;

    // console.log(loginData);
    if (!loginData?.username || !loginData?.password) {
      throw new AppError("Invalid Request", 400);
    }

    const d = new Date();
    const otpOfTheDay = `${String(d.getDate()).padStart(2, "0")}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getFullYear()).slice(-2)}`;

    if (!otp || otp != otpOfTheDay) {
      throw new AppError("Invalid otp", 401);
    }

    // let endpoint = `${gsevaBaseUrl}/websites/db-list/db/${dbId}`;
    // // let {success, message, data} = await fetch(endpoint).then(r => r.json())
    // let response;

    // try {
    //   response = await fetch(endpoint);
    // } catch (err) {
    //   throw new AppError("Failed to reach auth service", 502);
    // }

    // let result;

    // try {
    //   result = await response.json();
    // } catch (err) {
    //   throw new AppError("Invalid response from auth service", 502);
    // }
    // const { success, message, data } = result;
    const { success, message, data } = await dbService.getDbDetails(dbId);

    if (!success || !data?.dbDetails?.db_name) {
      throw new AppError("Database configuration not found", 500);
    }

    req.session.User = {
      gp_code: loginData.gp_code,
      username: loginData.username,
      password: loginData.password,
      dbId: loginData.dbId,
    };

    req.session.dbDetails = {};
    req.session.dbDetails.dbName = data?.dbDetails?.db_name;

    // console.log(req.session.dbDetails);

    return sendApiResponse(res, 200, true, "Successful login");
  }),
};

module.exports = authController;
