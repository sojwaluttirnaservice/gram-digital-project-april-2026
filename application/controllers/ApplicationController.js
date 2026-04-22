let ApplicationModel = require("../model/ApplicationModel");
let HomeModel = require("../model/HomeModel");
const { sendApiResponse } = require("../utils/apiResponses");
const asyncHandler = require("../utils/asyncHandler");
const { renderPage } = require("../utils/sendResponse");

const ApplicationController = {
  allList: asyncHandler(async (req, res) => {
    const list = await ApplicationModel.getNewApplicationList(res.pool);

    renderPage(res, "user/newapplication/app_list", {
      title: "नवीन अर्ज नोंदणी यादी",
      list,
      json_list: JSON.stringify(list),
    });
  }),

  renderEditApplicationPage: asyncHandler(async (req, res) => {
    let { id } = req.params;
    let [application] = await ApplicationModel.getById(res.pool, id);
    const doc_list = await HomeModel.getDocList(res.pool);

    console.log("0-----")
    console.log(JSON.parse(application.docDetails));
    console.log("00------")

    console.log(doc_list);
    renderPage(res, "user/newapplication/edit-application-page.pug", {
      title: "Edit १ ते ७ दाखला अर्ज",
      application,
      doc_list,
      json_doc_list: JSON.stringify(doc_list),
    });
  }),

  renderApplicationReportPage: asyncHandler(async (req, res) => {
    let { cert } = req.query;
    if (!cert) cert = "";

    const applicationsList = await ApplicationModel.getAllApplications(
      res.pool,
    );
    renderPage(res, "user/newapplication/app-report", {
      applicationsList,
      filterCertificate: cert,
    });
  }),

  allRejectedList: asyncHandler(async (req, res) => {
    let list = await ApplicationModel.getRejectedApplicationList(res.pool);

    renderPage(res, "user/newapplication/app_list_reject", {
      list,
      json_list: JSON.stringify(list),
    });
  }),

  allAcceptedList: asyncHandler(async (req, res) => {
    let list = await ApplicationModel.getAcceptedApplicationList(res.pool);

    renderPage(res, "user/newapplication/app_list_accepted", {
      list,
      json_list: JSON.stringify(list),
    });
  }),

  saveDocAndSendSMS: function (req, res, next) {
    var data = req.body;
    ApplicationModel.sendSMS(data, function (responseData) {
      var resData = responseData.body.split("-");
      if (resData[0] !== "SUCCESS") {
        res.status(200).send({ call: 2 });
      } else {
        ApplicationModel.updateApplicationStatus(res.pool, data)
          .then((result) => {
            res.status(200).send({ call: 1 });
          })
          .catch((error) => {
            res.status(200).send({ call: 2, error: error });
          });
      }
    });
  },

  renderApplicationPrintsReportPage: asyncHandler(async (req, res) => {
    let { cert } = req.query;
    if (!cert) cert = "";
    const applicationsList =
      await ApplicationModel.getAcceptedApplicationListSortByCreateDate(
        res.pool,
        {
          sort: "ASC",
        },
      );

    renderPage(res, "user/newapplication/application-print-report-page.pug", {
      applicationsList,
      filterCertificate: cert,
    });
  }),

  updateDocRemark: asyncHandler(async (req, res) => {
    const { changeApplicationStatusTo, applicationId } = req.body;

    if (!changeApplicationStatusTo || !applicationId) {
      return sendApiResponse(res, 400, false, "Missing required fields");
    }

    const updateResult = await ApplicationModel.updateDocRemark(
      res.pool,
      req.body,
    );

    //    console.log(updateResult)
    // PENDING_SMS_FUNCTIONALITY

    // NEED TO IMPLEMENT THE SMS FUNCTIONALITY HERE, FOR BOTH CONDITIONS
    // TODO: ABOVE, AFTER TEMPLATE APPROVAL OF CHANDRESH SRI

    const message =
      changeApplicationStatusTo === "ACCEPTED"
        ? "अर्ज स्वीकारला आहे."
        : "अर्ज रद्द केला आहे.";

    return sendApiResponse(res, 200, true, message);
  }),

  getQuickUserInfoByAadhar: function (req, res, next) {
    var data = req.body;

    ApplicationModel.getQuickUserInfoByAadhar(res.pool, data)
      .then((result) => {
        if (result.length == 1)
          res.status(200).send({ call: 1, data: result[0] });
        else res.status(200).send({ call: 2 });
      })
      .catch((error) => {
        res.status(500).send({ call: 1, error: error });
      });
  },

  updateApplication: asyncHandler(async (req, res) => {
     
        let applicationData = req.body;

        await ApplicationModel.updateApplication(res.pool, applicationData);

        return sendApiResponse(res, 200, true, "अर्ज अपडेट झाला.")
  }),
};
module.exports = ApplicationController;
