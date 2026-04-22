const express = require("express");
const middleware = require("./middleware");
const indexRouter = express.Router();

const homeController = require("../application/controllers/HomeController");
const form9Router = require("./form9Router.js");
const formNinePrintTab = require("./Form_9_Routes/formNinePrintTab");
const formEightPrintTab = require("./Form_8_Routes/formEightPrintTab");
const MaghniLekhRouter = require("./maghniLekhRouter");
const nalBandRouter = require("./nalBandRouter");
const printRouter = require("./printRouter");
const marriageRouter = require("./marriageRouter");
const certificateRouter = require("./certificateRouter");
const applicationRouter = require("./applicationRouter");
const mobileServiceRouter = require("./mobileServiceRouter");
const selfDeclarationRouter = require("./selfDeclarationRouter");
const taxPayerRouter = require("./taxPayerRouter");
const exportsRouter = require("./exportsRouter");
const noticeRouter = require("./noticeRouter");
const masterRouter = require("./masterRouter.js");
const galleryRouter = require("./galleryRouter");
const meterRouter = require("./meterRouter.js");
const ahavalRouter = require("./ahavalRouter");
const bdAvahalRoutes = require("./bd-avahal/bdAvahalRoutes");

const masikNoticeRouter = require("./masikNoticeRouter");
const APIRouter = require("./APIRouter");
const rokadVahi = require("./rokadVahi");

const bleachingRoutes = require("./bleaching-avahal/bleachingRoutes");
const marriageRegistrationRoutes = require("./marriage-registration-avahal/marriageRegistrationRouter");

const smsRoutes = require("./sms/smsRouter");
const taxPaymentController = require("../application/controllers/isTaxPaid/taxPaymentController.js");
const paymentRoutes = require("./payment-routes/paymentRoutes.js");
const tharavRouter = require("./tharav/tharavRouter.js");
const divyangaRouter = require("./divyanga/divyangaRouter.js");
const educationDetailsRouter = require("./education/educationDetailsRouter.js");
const arogyaRouter = require("./arogya/arogyaRouter.js");
const krishiVidnyanRouter = require("./krishi-vidnyan/krishiVidnyanRouter.js");
const jobsRouter = require("./jobs/jobRoutes.js");
const villageRouter = require("./gaav/villageRouter.js");
const gramSandarbhaAhavalRouter = require("./gram-sandarbha-ahaval/gramSandarbhaAhavalRouter.js");
const updateForm8TableRouter = require("./updateForm8Table/updateForm8TableRouter.js");
const nagrikRouter = require("./nagrik/nagrikRoutes.js");
const watertaxRouter = require("./watertax/watertaxRouter.js");
const mangiBillRouter = require("./magni-bill/magniBillRouter.js");
const gpNoticeRouter = require("./gp-notice/gpNoticeRouter.js");
const HomeModel = require("../application/model/HomeModel.js");
const birthCertificateRouter = require("./certificates/birthCertificateRouter.js");
const deathCertificateRouter = require("./certificates/deathCertificateRouter.js");
const bdUnavailabilityRouter = require("./certificates/bdUnavailabilityRouter.js");
const gharkulYojanaRouter = require("./gharkulYojana/gharkulYojanaRouter.js");
const qrScanRouter = require("./qrScan/qrScanRouter.js");
const namunaRouter = require("./namuna/namunaRouter.js");
const MasterController = require("../application/controllers/MasterController.js");
const lokAdalatNoticesRouter = require("./notice/lokAdalatNoticesRouter.js");
const awardsRouter = require("./gp/awardsRouter.js");
const womensSavingsGroupsInitiativeRouter = require("./gp/womensSavingsGroupsInitiativeRouter.js");
const womensSavingsGroupNamesRouter = require("./gp/womensSavingsGroupNamesRouter.js");
const womenEmpowermentRouter = require("./gp/womenEmpowermentRouter.js");
const zpSchoolPointsRouter = require("./gp/zpSchoolPointsRouter.js");
const ashaWorkersRouter = require("./gp/ashaWorkersRouter.js");
const waterConservationRouter = require("./gp/waterConservationRouter.js");
const committeesRouter = require("./gp/committeesRouter.js");
const innovativeInitiativesRouter = require("./gp/innovativeInitiativesRouter.js");
const aanganwadiRouter = require("./gp/aanganwadiRouter.js");
const gpRouter = require("./gp/gpRouter.js");
const bplCertificateRouter = require("./certificates/bplCertificateRouter.js");
const qrCodeController = require("../application/controllers/qrCode/qrCodeController.js");
const laborAttendanceRouter = require("./laborAttendance/laborAttendanceRouter.js");
const complaintsRouter = require("./complaints/complaintsRouter.js");
const gpApplicationsRouter = require("./applications/gpApplicationsRouter.js");
const pptRouter = require("./ppt/pptRouter.js");
const rtiRouter = require("./rti/rtiRouter.js");
const bankRouter = require("./bank/bankRouter.js");

indexRouter.get("/", middleware.checkForPoolConnection, homeController.indexView);

indexRouter.post(
  "/site-seen",
  middleware.checkForPoolConnection,
  homeController.setSiteSeen
);


indexRouter.get(
  '/gram-adhik-info',
  middleware.checkForPoolConnection,
  homeController.gramAdhikInfo
)

// MOVING THE adarsh takta to the gram login
indexRouter.get(
  '/adarsh-takta',
  middleware.checkForPoolConnection,
  homeController.adarshTakta
)

indexRouter.get(
  '/upload-gr',
  middleware.checkForPoolConnection,
  homeController.get_gr_upload_view
)

// Moving the gram sadasya to gram login
indexRouter.get(
  '/gram-sadasya',
  middleware.checkForPoolConnection,
  homeController.gramSadasya
)

indexRouter.get(
  '/medical-room',
  middleware.checkForPoolConnection,
  homeController.getMedicalRoomView
)



indexRouter.get(
  '/upload-krishi-vidnyan-view',
  middleware.checkForPoolConnection,
  homeController.getKrishiVidnyanView
)


// Moving the gram list setting to gram login

indexRouter.get(
  '/gram-list-setting',
  middleware.checkForPoolConnection,
  homeController.gramListSetting
)


// indexRouter.get('/')

indexRouter.get(
  "/make-start",
  middleware.checkForPoolConnection,
  homeController.makeStart
);

// ********************
// AUTH ROUTES
// ********************
indexRouter.get(
  "/login",
  middleware.checkForPoolConnection,
  homeController.homeView
);
indexRouter.post("/logout", middleware.checkForPoolConnection, homeController.logout);

indexRouter.get(
  "/new-application-form",
  middleware.checkForPoolConnection,
  homeController.newApplicationForm
);

// form -8 routes
indexRouter.get(
  "/form-8",
  middleware.checkForPoolConnection,
  homeController.formEightHomeView
);


// this is the routes which triggers from the button on the page form_9.pug(original), and copy (form_9_copy.pug)
// having name नमुना ९ सामान्य व पाणी करासंदर्भात नोंदणी फॉर्म
indexRouter.put(
  "/form-8/update",
  middleware.checkForPoolConnection,
  homeController.updateFormEightUser
);

indexRouter.get(
  `/form-8-update-view`,
  middleware.checkForPoolConnection,
  homeController.formEightUpdateView
);

indexRouter.get(
  "/form-8/preview/:id",
  middleware.checkForPoolConnection,
  homeController.userPreview
);

indexRouter.get(
  "/form-8/phase-2/:id",
  middleware.checkForPoolConnection,
  homeController.homePhaseTwo
);

indexRouter.post(
  "/form-8/deleteUserDetails",
  middleware.checkForPoolConnection,
  homeController.deleteUserDetails
);

indexRouter.get(
  "/sample/:id",
  middleware.checkForPoolConnection,
  homeController.phaseTwoTotalCalc
);
indexRouter.get(
  "/web-notice",
  middleware.checkForPoolConnection,
  homeController.webNoticeView
);
indexRouter.get(
  "/web-notice/visibility",
  middleware.checkForPoolConnection,
  homeController.webNoticeVisibility
);
indexRouter.get(
  "/web-notice/remove",
  middleware.checkForPoolConnection,
  homeController.removeWebNotice
);

indexRouter.post(
  "/web-notice/save-message",
  middleware.checkForPoolConnection,
  homeController.webNoticeViewSaveMessage
);


// Login check
indexRouter.post(
  "/lCheck",
  middleware.checkForPoolConnection,
  homeController.lCheck
);

indexRouter.post(
    '/otpCheck',
    middleware.checkForPoolConnection,
    homeController.checkOtp
)

indexRouter.post(
  "/form-8/addNewFormEntry",
  middleware.checkForPoolConnection,
  homeController.addNewFormEntry
);

indexRouter.post(
  "/form-8/updateFormEntry",
  middleware.checkForPoolConnection,
  homeController.updateFormEntry
);

indexRouter.put(
    '/form-8/update-home-image',
    middleware.checkForPoolConnection,
    homeController.updateHomeImage
)

indexRouter.post(
  "/form-8/getFerfarDetails",
  middleware.checkForPoolConnection,
  homeController.getFerfarDetails
);
indexRouter.get(
  "/form-8/fer-far",
  middleware.checkForPoolConnection,
  homeController.form8FerFar
);
indexRouter.post(
  "/form-8/update-ferfar",
  middleware.checkForPoolConnection,
  homeController.updateFerfarDetails
);

indexRouter.get(
  "/form-8/ferfar-avahal-print",
  middleware.checkForPoolConnection,
  homeController.form8FerfarAvahalPrintView
);

indexRouter.get(
  "/form-8/ferfar-avahal-print-year-wise",
  middleware.checkForPoolConnection,
  homeController.form8FerfarAvahalPrintView
);

indexRouter.get(
  "/form-8/ferfar-avahal-print-date-to-date",
  middleware.checkForPoolConnection,
  homeController.form8FerfarAvahalDateToDatePrintView
);

indexRouter.delete(
  "/form-8/delete-ferfar-avahal-date-to-date",
  middleware.checkForPoolConnection,
  homeController.deleteFerfarAvahalDateToDate
);

indexRouter.post(
  "/form-8/fetch-data-to-edit",
  middleware.checkForPoolConnection,
  homeController.fetchDataToEdit
);

indexRouter.post(
  "/form-8/save-edited-data-ferfar",
  middleware.checkForPoolConnection,
  homeController.saveEditedFerfarData
);

indexRouter.get(
  "/form-8/get-ferfar-avahal-months",
  middleware.checkForPoolConnection,
  homeController.getFerfarAvahalMonths
);

indexRouter.delete(
  `/form-8/delete-ferfar-avahal`,
  middleware.checkForPoolConnection,
  homeController.deleteFerfarAvahal
);

indexRouter.delete(
  "/form-8/delete-ferfar-avahal-year-wise",
  middleware.checkForPoolConnection,
  homeController.deleteFerfarAvahal
);

indexRouter.post(
  "/form-8/checkMalmattaDetails",
  middleware.checkForPoolConnection,
  homeController.checkMalmattaDetails
);

indexRouter.post(
  "/form-8/saveTaxSample",
  middleware.checkForPoolConnection,
  homeController.saveTaxSample
);
indexRouter.post(
  "/form-8/getFromEightTaxSampleData",
  middleware.checkForPoolConnection,
  homeController.getFromEightTaxSampleData
);
indexRouter.post(
  "/form-8/checkNextUser",
  middleware.checkForPoolConnection,
  homeController.checkNextUser
);

indexRouter.post(
  '/form-8/checkNextUserByMalmatta',
  middleware.checkForPoolConnection,
  homeController.checkNextUserByMalmatta
)

indexRouter.post(
  "/form-8/removeSingleTaxSample",
  middleware.checkForPoolConnection,
  homeController.removeSingleTaxSample
);

indexRouter.post(
  "/form-8/getSingleUserDetails",
  middleware.checkForPoolConnection,
  homeController.getSingleUserDetails
);

indexRouter.use("/form8", formEightPrintTab);

//Form 8 payment

indexRouter.post(
  `/form-8/check-tax-paid`,
  middleware.checkForPoolConnection,
  taxPaymentController.isTaxPaid
);

// indexRouter.get(
//   '/get-payment-details',
//   middleware.checkForPoolConnection,
//   taxPaymentController.getPaymentDetails
// );

indexRouter.post(
  "/save-new-application",
  middleware.checkForPoolConnection,
  homeController.addNewApplication
);
indexRouter.post(
  "/add-new-member",
  middleware.checkForPoolConnection,
  homeController.addNewMember
);

indexRouter.get(
  "/get-people-list",
  middleware.checkForPoolConnection,
  homeController.getPeopleList
);
indexRouter.get(
  "/print-application/:id",
  middleware.checkForPoolConnection,
  homeController.printApplication
);
indexRouter.get(
  "/gram-panchayet-ahaval",
  middleware.checkForPoolConnection,
  homeController.gramPanchayeAhaval
);

// indexRouter.post(
//   '/get-user-info',
//   middleware.checkForPoolConnection,
//   homeController.getUserInfo
// );

indexRouter.post(
  "/get-user-info",
  middleware.checkForPoolConnection,
  homeController.getUserInfo
);

//form - 9
indexRouter.use("/form-9", form9Router);
indexRouter.use("/form9", formNinePrintTab);

// print
indexRouter.use("/print", printRouter);
indexRouter.use("/self-declaration", selfDeclarationRouter);

indexRouter.use("/magni-lekh", MaghniLekhRouter);
indexRouter.use("/nal-band-notice", nalBandRouter);
indexRouter.use("/marriage", marriageRouter);
indexRouter.use("/certificate", certificateRouter);
indexRouter.use('/gp-applications', gpApplicationsRouter)
indexRouter.use("/application", applicationRouter);
indexRouter.use("/network-service", mobileServiceRouter);
indexRouter.use("/masik-notice", masikNoticeRouter);
indexRouter.use("/tax-payer", taxPayerRouter);
indexRouter.use("/exports", exportsRouter);
indexRouter.use("/notices", noticeRouter);

indexRouter.use("/gp-notice", gpNoticeRouter);

indexRouter.use("/master", masterRouter);
indexRouter.use("/gallery", galleryRouter);
indexRouter.use("/meter", meterRouter);
indexRouter.use("/api", APIRouter);
indexRouter.use("/sms", smsRoutes);
indexRouter.use("/tharav", tharavRouter);
indexRouter.use("/divyanga", divyangaRouter);
indexRouter.use("/education", educationDetailsRouter);
indexRouter.use("/arogya", arogyaRouter);
indexRouter.use("/jobs", jobsRouter);
indexRouter.use("/nagrik", nagrikRouter);
indexRouter.use("/village", villageRouter);

indexRouter.use("/magni-bill", mangiBillRouter);
indexRouter.use("/gram-sandarbha-ahaval", gramSandarbhaAhavalRouter);

indexRouter.use("/update-database-table", updateForm8TableRouter);

indexRouter.use("/watertax", watertaxRouter);

indexRouter.use("/death-certificate", deathCertificateRouter);
indexRouter.use("/birth-certificate", birthCertificateRouter);
indexRouter.use("/unavailability-certificate", bdUnavailabilityRouter);
indexRouter.use('/bpl-certificate', bplCertificateRouter)
indexRouter.use("/gharkul-yojana", gharkulYojanaRouter)

indexRouter.use('/qr-scan', qrScanRouter)

indexRouter.get(
    '/qr-codes/qr-list',
    middleware.checkForPoolConnection,
    qrCodeController.renderQrCodePageVillage
)

indexRouter.use('/lok-adalat-notices', lokAdalatNoticesRouter)


indexRouter.use('/awards', awardsRouter)

// wg -> women groups
// initiatvie means upkram here
// बचत गट

indexRouter.use('/wg-initiatives', womensSavingsGroupsInitiativeRouter)
indexRouter.use('/wg-names', womensSavingsGroupNamesRouter)



indexRouter.use('/women-empowerment', womenEmpowermentRouter)
indexRouter.use('/zp-school-points', zpSchoolPointsRouter)


indexRouter.use('/asha-workers', ashaWorkersRouter)
indexRouter.use('/water-conservation', waterConservationRouter)


indexRouter.use('/innovative-initiatives', innovativeInitiativesRouter)
// committee

indexRouter.use('/committees', committeesRouter)

indexRouter.use('/aanganwadi', aanganwadiRouter)

indexRouter.use('/gp', gpRouter)

indexRouter.use('/labor-attendance', laborAttendanceRouter)

indexRouter.use('/complaints', complaintsRouter)

// NAMUNA 

indexRouter.use('/namuna', namunaRouter)

indexRouter.use('/ppt', pptRouter)

indexRouter.use('/rti', rtiRouter)

indexRouter.use("/bank", bankRouter)

indexRouter.use(
  "/gp-certificates",
  middleware.checkForPoolConnection,
  async (req, res) => {
    try {
      const _gp = await HomeModel.getGpData(res.pool);
      res.render("user/certificates/certificates-page.pug", {
        gp: _gp[0],
      });
    } catch (err) {
      console.log(`Error while showing the certificates page : ${err}`);
    }
  }
);
indexRouter.use(rokadVahi);

// **************
// AVAHAL ROUTES
// **************

// kar-wasuli
indexRouter.use("/kar-wasuli", ahavalRouter);

// bleaching routes
indexRouter.use("/bleaching-avahal", bleachingRoutes);

// bd avahal routes
indexRouter.use("/bd-avahal", bdAvahalRoutes);

//marriage registraiton avahal
indexRouter.use("/marriage-registration-avahal", marriageRegistrationRoutes);

// PAYMENT ROUTES
indexRouter.use("/payment", paymentRoutes);

// KRISHI VIDNYAN
indexRouter.use("/krishi-vidnyan", krishiVidnyanRouter);

module.exports = indexRouter;
